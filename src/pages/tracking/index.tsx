import { Box, Grid } from "@mui/material";
import { CustomTitle } from "components/CustomTitle";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FormDTO, FormResponseDTO, FormSectionDTO } from "models/form";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { useTranslation } from "react-i18next";
import CreateFieldsForm from "components/CreateFieldsForm";
import { orderStatusList } from "constants/constants";
import { FormTextField } from "components/CreateFieldsForm/FormFields/FormTextField";
import { FormSelect } from "components/CreateFieldsForm/FormFields/FormSelect";
import { FormCart } from "components/CreateFieldsForm/FormFields/FormCart";
import { useEffect, useState } from "react";
import { OrderService } from "apis/orderService/orderService";
import CommonUtils from "utils/commonUtils";
import { FormService } from "apis/formService/formService";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "components/CustomButton";
import { COLORS } from "styles";
import DialogRequestEditOrder from "./requestEditDialog";
import { CommentDTO } from "models/comment";
import { HistoryItem } from "pages/orders/components/historyItem";
import { openNotification } from "redux/actions/notification";
import { useDispatch } from "react-redux";
import { CustomChip } from "components/CustomChip";
import { FormSection } from "components/CreateFieldsForm/FormFields/FormSection";
import { FormAddress } from "components/CreateFieldsForm/FormFields/FormAddress";

function OrderTrackingPage() {
  const { t } = useTranslation(["forms", "buttons", "orders"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState<FormDTO>({} as FormDTO);
  const [formResponse, setFormResponse] = useState<FormResponseDTO>({} as FormResponseDTO);
  const [formId, setFormId] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");
  const [fields, setFields] = useState<FormSectionDTO[]>([]);
  const [openRequestDialog, setOpenRequestDialog] = useState<boolean>(false);
  // const [requested, setRequested] = useState<boolean>(false);
  const [enableEditing, setEnableEditing] = useState<boolean>(false);
  // const [statusIndex, setStatusIndex] = useState<number>(-1);

  const validationSchema = Yup.object().shape({});

  const handleSubmitForm = async (values: any) => {
    await new OrderService().updateOrder({ ...values, response: JSON.stringify(values.response) }).then(response => {
      if (Number(response.code) === 200) {
        setEnableEditing(!enableEditing);
        dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
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
    let index = 0;
    if (form.layoutJson) {
      let layout: any = JSON.parse(String(form.layoutJson));
      layout.sections.forEach((section: any) => {
        let sectionDTO: FormSectionDTO = { title: String(section.title), components: [] };
        section.components.forEach((component: any) => {
          sectionDTO.components.push({
            index: index,
            disabled: true,
            isEditing: false,
            show: component.type !== "STATUS",
            xs: component.xs,
            type: component.type,
            label: component.title,
            options: component.type === "STATUS" ? orderStatusList : [],
            required: component.validation.some((val: any) => val.type === "REQUIRED"),
            Component:
              component.type === "TEXT" || component.type === "PHONE"
                ? FormTextField
                : component.type === "STATUS"
                ? FormSelect
                : component.type === "CART"
                ? FormCart
                : component.type === "ADDRESS"
                ? FormAddress
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
        // formik.setFieldValue("formId", response.result.uuid);
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
          // console.log(response.result.requested);
          // setRequested(Boolean(response.result.requested));
        }
      })
      .catch(e => {
        navigate("/error");
      });
  };

  // console.log("response", formik.values);

  useEffect(() => {
    if (window.location.href) {
      let encodedId: string = String(window.location.href.split("/").at(-1));
      let decodedId: string = CommonUtils.decodeUUID(encodedId);
      setOrderId(decodedId);
      getOrderResponse(decodedId);
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
      <Grid container>
        <Grid item xs={12} sx={{ padding: 5 }}>
          <Grid item xs={12} sx={{ fontWeight: 800, fontSize: "25px", marginBottom: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <CustomTitle
                  text={[
                    { text: "Theo dõi đơn hàng " + String(form.name), highlight: false },
                    { text: "/", highlight: false },
                    { text: String(formResponse.orderName), highlight: true },
                  ]}
                />
                <CustomChip
                  text={orderStatusList.find(item => item.value === formik.values.status)?.title}
                  backgroundColor={orderStatusList.find(item => item.value === formik.values.status)?.backgroundColor}
                  textColor={orderStatusList.find(item => item.value === formik.values.status)?.color}
                />
              </Box>
            </Box>
          </Grid>
          <Grid container>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
              <CustomBackgroundCard sizeX="80vw" sizeY="auto">
                <CreateFieldsForm
                  disabled={!enableEditing}
                  disabledFormCart={true}
                  enableEditing={false}
                  formik={formik}
                  sections={fields}
                />
                <Grid item xs={12} sx={{ marginBottom: 3 }}>
                  <FormSection index={2} title={"C. Lịch sử"} />
                  {formResponse.comments?.map(comment => {
                    return (
                      <HistoryItem
                        item={comment}
                        direction={comment.createdBy === String(form.createdBy) ? "left" : "right"}
                      />
                    );
                  })}
                </Grid>

                <Box sx={{ display: "flex", gap: 1.5, justifyContent: "flex-end" }}>
                  {
                    <CustomButton
                      text={
                        enableEditing
                          ? "Lưu thay đổi"
                          : `${form.responsePermission === "OwnerOnly" ? "Yêu cầu chỉnh" : "Chỉnh"} sửa`
                      }
                      type="rounded-outlined"
                      startIcon={enableEditing ? "checkCircle" : "edit"}
                      color={COLORS.primary}
                      handleOnClick={() => {
                        // check permission
                        if (form.responsePermission === "AllowAll") {
                          // check if there is a user token
                          enableEditing ? formik.handleSubmit() : setEnableEditing(true);
                          // else go to login page
                        } else {
                          // OwnerOnly: open request edit dialog
                          setOpenRequestDialog(true);
                        }
                      }}
                    />
                  }
                  {!enableEditing && (
                    <CustomButton
                      text="Xác nhận"
                      type="rounded"
                      startIcon="checkCircle"
                      color={COLORS.white}
                      handleOnClick={() => {
                        setEnableEditing(false);
                      }}
                    />
                  )}
                </Box>
              </CustomBackgroundCard>
            </Grid>
          </Grid>
        </Grid>
        {openRequestDialog && (
          <DialogRequestEditOrder
            orderId={formResponse.uuid}
            openDialog={openRequestDialog}
            handleCloseDialog={(result: CommentDTO) => {
              setOpenRequestDialog(false);
              getOrderResponse(orderId);
            }}
          />
        )}
      </Grid>
    </Box>
  );
}
export default OrderTrackingPage;
