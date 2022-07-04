import { Box, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Link, Tooltip } from "@mui/material";
import { URL_PROFILE } from "apis/axiosClient";
import { FormService } from "apis/formService/formService";
import { OrderService } from "apis/orderService/orderService";
import CreateFieldsForm from "components/CreateFieldsForm";
import { FormAddress } from "components/CreateFieldsForm/FormFields/FormAddress";
import { FormCart } from "components/CreateFieldsForm/FormFields/FormCart";
import { FormPayment } from "components/CreateFieldsForm/FormFields/FormPayment";
import { FormSelect } from "components/CreateFieldsForm/FormFields/FormSelect";
import { FormShipping } from "components/CreateFieldsForm/FormFields/FormShipping";
import { FormTextField } from "components/CreateFieldsForm/FormFields/FormTextField";
import { CustomButton } from "components/CustomButton";
import { CustomChip } from "components/CustomChip";
import { CustomIcon } from "components/CustomIcon";
import { CustomTitle } from "components/CustomTitle";
import { orderStatusListEng, orderStatusListVi } from "constants/constants";
import { useFormik } from "formik";
import { FormDTO, FormResponseDTO, FormSectionDTO } from "models/form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openNotification } from "redux/actions/notification";
import { COLORS } from "styles";
import CommonUtils from "utils/commonUtils";
import * as Yup from "yup";

export interface DialogFinishOrderProps {
  orderName: string;
  responseId: string;
  openDialog: boolean;
  handleCloseDialog: () => void;
}

const DialogFinishOrder = ({ responseId, openDialog, handleCloseDialog, orderName }: DialogFinishOrderProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(["orders"]);
  const currentLanguage = String(localStorage.getItem("i18nextLng"));

  function closeDialog() {
    handleCloseDialog();
  }

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
    getOrderResponse(responseId);
  }, []);

  useEffect(() => {
    formId && getForm(formId);
  }, [formId]);

  useEffect(() => {
    getFields();
  }, [form]);

  return (
    <Dialog fullWidth maxWidth="lg" open={openDialog} onClose={closeDialog}>
      <DialogTitle>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1.5 }}>
            <CustomTitle text={[{ text: orderName, highlight: true }]} />
            <CustomChip
              text={
                (currentLanguage === "en" ? orderStatusListEng : orderStatusListVi).find(
                  item => item.value === formik.values.status,
                )?.title
              }
              backgroundColor={
                (currentLanguage === "en" ? orderStatusListEng : orderStatusListVi).find(
                  item => item.value === formik.values.status,
                )?.backgroundColor
              }
              textColor={
                (currentLanguage === "en" ? orderStatusListEng : orderStatusListVi).find(
                  item => item.value === formik.values.status,
                )?.color
              }
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <IconButton onClick={closeDialog}>
              <CustomIcon name="close" size={30} />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container sx={{ padding: 1 }}>
          <Grid item xs={12} sx={{ paddingX: 1.5, paddingTop: 2.5 }}>
            <CreateFieldsForm enableEditing={false} disabled formik={formik} sections={fields} />
          </Grid>
          <Grid item xs={12} sx={{ paddingX: 1.5, paddingTop: 2.5 }}>
            <Divider sx={{ width: "100%", borderBottomWidth: "2px" }} />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              {t("order_track_link")}
              <Box sx={{ textDecoration: "underline", color: COLORS.primary, cursor: "pointer" }}>
                <Link
                  href={`/tracking/${CommonUtils.encodeUUID(responseId)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${URL_PROFILE.WEB}/tracking/${CommonUtils.encodeUUID(responseId)}`}
                </Link>
                <Tooltip title={t("order_copy_link")}>
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${URL_PROFILE.WEB}/tracking/${CommonUtils.encodeUUID(responseId)}`,
                      );
                      dispatch(
                        openNotification({
                          open: true,
                          content: t("order_copy_link_success"),
                          severity: "success",
                        }),
                      );
                    }}
                  >
                    <CustomIcon name="duplicate" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ display: "flex", gap: 1.5, paddingTop: 2, marginBottom: 1 }}>
              <CustomButton
                text={t("order_edit")}
                type="rounded-outlined"
                startIcon="edit"
                color={
                  formResponse.status === "COMPLETED" || formResponse.status === "CANCELLED"
                    ? COLORS.lightText
                    : COLORS.primary
                }
                disabled={formResponse.status === "COMPLETED" || formResponse.status === "CANCELLED"}
                handleOnClick={() => {
                  navigate("/order/edit", {
                    state: {
                      orderId: responseId,
                    },
                  });
                }}
              />
              <CustomButton
                text={t("order_manage")}
                type="rounded-outlined"
                startIcon="manage"
                handleOnClick={() => {
                  navigate("/orders");
                }}
              />
              <CustomButton
                text={t("order_to_home")}
                type="rounded-outlined"
                startIcon="home"
                handleOnClick={() => {
                  navigate("/home");
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
export default DialogFinishOrder;
