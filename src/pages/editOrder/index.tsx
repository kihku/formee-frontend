import { Box, Grid, InputLabel } from "@mui/material";
import { FormService } from "apis/formService/formService";
import { OrderService } from "apis/orderService/orderService";
import CreateFieldsForm from "components/CreateFieldsForm";
import { FormAddress } from "components/CreateFieldsForm/FormFields/FormAddress";
import { FormCart } from "components/CreateFieldsForm/FormFields/FormCart";
import { FormPayment } from "components/CreateFieldsForm/FormFields/FormPayment";
import { FormSection } from "components/CreateFieldsForm/FormFields/FormSection";
import { FormShipping } from "components/CreateFieldsForm/FormFields/FormShipping";
import { FormTextField } from "components/CreateFieldsForm/FormFields/FormTextField";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomButton } from "components/CustomButton";
import { StyledInput } from "components/CustomTextField";
import { CustomTitle } from "components/CustomTitle";
import { useFormik } from "formik";
import { CommentDTO } from "models/comment";
import { FormDTO, FormResponseDTO, FormSectionDTO } from "models/form";
import { HistoryItem } from "pages/orders/components/historyItem";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { openNotification } from "redux/actions/notification";
import { COLORS } from "styles";
import * as Yup from "yup";
import DialogRequestMessage from "./requestMessageDialog";

interface EditOrderPageProps {
  fromRequest: boolean;
}

function EditOrderPage({ fromRequest }: EditOrderPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation(["forms", "buttons", "orders"]);

  const [form, setForm] = useState<FormDTO>({} as FormDTO);
  const [formResponse, setFormResponse] = useState<FormResponseDTO>({} as FormResponseDTO);
  const [formId, setFormId] = useState<string>("");
  const [fields, setFields] = useState<FormSectionDTO[]>([]);
  const [openMessageDialog, setOpenMessageDialog] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({});

  const handleSubmitForm = async (values: any) => {
    await new OrderService().updateOrder({ ...values, response: JSON.stringify(values.response) }).then(response => {
      if (Number(response.code) === 200) {
        dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
        navigate("/orders");
      } else {
        dispatch(openNotification({ open: true, content: response.message, severity: "error" }));
      }
    });
  };

  const formik = useFormik({
    initialValues: { uuid: "", response: [] } as any,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  const getFields = () => {
    let result: FormSectionDTO[] = [];
    let cartIndex: any[] = [];
    let index = 0;
    if (form.layoutJson) {
      let layout: any = JSON.parse(String(form.layoutJson));
      layout.sections.forEach((section: any) => {
        let sectionDTO: FormSectionDTO = { title: String(section.title), components: [] };
        section.components.forEach((component: any) => {
          if (component.type === "CART") {
            cartIndex.push(index);
          }
          sectionDTO.components.push({
            isEditing: true,
            index: index,
            xs: component.xs,
            type: component.type,
            label: component.title,
            options: [],
            required: component.validation.some((val: any) => val.type === "REQUIRED"),
            Component:
              component.type === "TEXT" || component.type === "PHONE"
                ? FormTextField
                : component.type === "SHIPPING"
                ? FormShipping
                : component.type === "CART"
                ? FormCart
                : component.type === "ADDRESS"
                ? FormAddress
                : component.type === "PAYMENT"
                ? FormPayment
                : undefined,
          });
          index++;
        });
        result.push(sectionDTO);
      });
    }
    setFields(result);
  };

  const getForm = async (formId: string) => {
    await new FormService().getFormById(formId).then(response => {
      if (response.result) {
        setForm(response.result);
        formik.setFieldValue("formId", response.result.uuid);
      }
    });
  };

  const getOrderResponse = async (orderId: string) => {
    await new OrderService()
      .getOrderById(orderId)
      .then(response => {
        if (response.result) {
          setFormResponse({ ...response.result, response: JSON.parse(response.result.response) });
          formik.setValues({ ...response.result, response: JSON.parse(response.result.response) });
          setFormId(response.result.formId);
        }
      })
      .catch(e => {
        navigate("/error");
      });
  };

  useEffect(() => {
    if (location.state) {
      let state: any = location.state;
      getOrderResponse(state.orderId);
    }
  }, []);

  useEffect(() => {
    formId && getForm(formId);
  }, [formId]);

  useEffect(() => {
    getFields();
  }, [form]);

  return (
    <Box>
      <Grid container sx={{ minHeight: "95vh" }}>
        <Grid item xs={12} sx={{ padding: 5 }}>
          <Grid item xs={12} sx={{ fontWeight: 800, fontSize: "25px", marginBottom: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <CustomTitle
                text={[
                  { text: String(form.name), highlight: false },
                  { text: "/", highlight: true },
                  { text: "Chỉnh sửa đơn hàng " + formResponse.orderName, highlight: true },
                ]}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <CustomBackgroundCard sizeX="auto" sizeY="auto">
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={2}>
                    <InputLabel sx={{ whiteSpace: "normal", textOverflow: "unset" }}>{"Tên đơn hàng"}</InputLabel>
                  </Grid>
                  <Grid item xs={5} sx={{ marginBottom: 2, paddingX: "10px" }}>
                    <StyledInput
                      fullWidth
                      name={"orderName"}
                      value={formik.values.orderName}
                      onChange={e => {
                        formik.setFieldValue("orderName", e.target.value);
                      }}
                      inputProps={{
                        autoComplete: "new-password",
                        form: {
                          autoComplete: "off",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <CreateFieldsForm disabled={false} enableEditing={false} formik={formik} sections={fields} />
              <Grid item xs={12} sx={{ marginBottom: 3 }}>
                <FormSection index={2} title={"Lịch sử"} color={COLORS.red} />
                {formResponse.comments?.map(comment => {
                  return (
                    <HistoryItem
                      item={comment}
                      direction={comment.createdBy === String(form.createdBy) ? "left" : "right"}
                    />
                  );
                })}
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: 2, marginTop: 2 }}>
                <CustomButton
                  text="Lưu đơn hàng"
                  type="rounded-outlined"
                  startIcon="checkCircle"
                  color={COLORS.primary}
                  handleOnClick={() => {
                    setOpenMessageDialog(true);
                  }}
                />
              </Grid>
            </CustomBackgroundCard>
          </Grid>
          {openMessageDialog && (
            <DialogRequestMessage
              orderId={formResponse.uuid}
              openDialog={openMessageDialog}
              handleCloseDialog={(result: CommentDTO) => {
                formik.setFieldValue("message", result.message);
                formik.setFieldValue("requested", true);
                formik.handleSubmit();
                setOpenMessageDialog(false);
              }}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
export default EditOrderPage;
