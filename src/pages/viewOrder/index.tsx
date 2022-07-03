import { Avatar, Box, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Tooltip } from "@mui/material";
import { CustomTextField } from "components/CustomTextField";
import { CustomTitle } from "components/CustomTitle";
import { useFormik } from "formik";
import { FormDTO, FormResponseDTO, FormSectionDTO } from "models/form";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { CustomIcon } from "components/CustomIcon";
import { COLORS } from "styles";
import CreateFieldsForm, { CreateFieldsFormProps } from "components/CreateFieldsForm";
import { CustomButton } from "components/CustomButton";
import { OrderService } from "apis/orderService/orderService";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { useEffect, useState } from "react";
import { FormTextField } from "components/CreateFieldsForm/FormFields/FormTextField";
import { FormSelect } from "components/CreateFieldsForm/FormFields/FormSelect";
import { FormCart } from "components/CreateFieldsForm/FormFields/FormCart";
import { FormService } from "apis/formService/formService";
import CommonUtils from "utils/commonUtils";
import { useLocation, useNavigate } from "react-router-dom";
import { openNotification } from "redux/actions/notification";
import { useDispatch } from "react-redux";
import { FormAddress } from "components/CreateFieldsForm/FormFields/FormAddress";
import { URL_PROFILE } from "apis/axiosClient";

export interface ReviewOrderPageProps {}

const ReviewOrderPage = ({}: ReviewOrderPageProps) => {
  const { t } = useTranslation(["orders"]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [form, setForm] = useState<FormDTO>({} as FormDTO);
  const [formResponse, setFormResponse] = useState<FormResponseDTO>({} as FormResponseDTO);
  const [formId, setFormId] = useState<string>("");
  const [fields, setFields] = useState<FormSectionDTO[]>([]);

  const validationSchema = Yup.object().shape({});

  const handleSubmitForm = async (values: any) => {};

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
            xs: component.xs,
            type: component.type,
            label: component.title,
            options: [],
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
      }
    });
  };

  const getOrderResponse = async (orderId: string) => {
    await new OrderService()
      .getOrderById(orderId)
      .then(response => {
        if (response.result) {
          console.log(response.result);
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

  // console.log("formik", formik.values);

  return (
    <Box>
      <Grid container>
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
                  { text: "/", highlight: false },
                  { text: formResponse.orderName, highlight: true },
                ]}
              />
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <CustomButton
                  text="Copy order link"
                  type="rounded-outlined"
                  startIcon="copyLink"
                  color={COLORS.primary}
                  handleOnClick={() => {
                    navigator.clipboard.writeText(
                      `${URL_PROFILE.WEB}/tracking/${CommonUtils.encodeUUID(formResponse.uuid)}`,
                    );
                    dispatch(openNotification({ open: true, content: "Order link copied", severity: "success" }));
                  }}
                />
                <CustomButton
                  text="Edit order"
                  type="rounded-outlined"
                  startIcon="edit"
                  color={COLORS.primary}
                  handleOnClick={() => {
                    let state: any = location.state;
                    navigate("/order/edit", {
                      state: {
                        // formId: form.uuid,
                        orderId: state.orderId,
                      },
                    });
                  }}
                />
                <CustomButton
                  text="Close"
                  type="rounded-outlined"
                  startIcon="close"
                  color={COLORS.primary}
                  handleOnClick={() => {
                    navigate("/orders", {
                      state: {
                        formId: form.uuid,
                      },
                    });
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <CustomBackgroundCard sizeX="auto" sizeY="auto">
              <CreateFieldsForm disabled enableEditing={false} formik={formik} sections={fields} />
            </CustomBackgroundCard>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ReviewOrderPage;
