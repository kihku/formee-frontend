import { Box, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { FormService } from "apis/formService/formService";
import { OrderService } from "apis/orderService/orderService";
import CreateFieldsForm from "components/CreateFieldsForm";
import { FormAddress } from "components/CreateFieldsForm/FormFields/FormAddress";
import { FormCart } from "components/CreateFieldsForm/FormFields/FormCart";
import { FormPayment } from "components/CreateFieldsForm/FormFields/FormPayment";
import { FormPhoneSearch } from "components/CreateFieldsForm/FormFields/FormPhoneSearch";
import { FormShipping } from "components/CreateFieldsForm/FormFields/FormShipping";
import { FormTextField } from "components/CreateFieldsForm/FormFields/FormTextField";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomButton } from "components/CustomButton";
import { CustomTextField, StyledInput } from "components/CustomTextField";
import { CustomTitle } from "components/CustomTitle";
import { useFormik } from "formik";
import { FormDTO, FormSectionDTO } from "models/form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { openNotification } from "redux/actions/notification";
import { COLORS } from "styles";
import CommonUtils from "utils/commonUtils";
import StringUtils from "utils/stringUtils";
import * as Yup from "yup";
import DialogFinishOrder from "./dialogFinish";

function CreateOrderPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation(["forms", "orders", "messages", "commons"]);
  const currentLanguage = String(localStorage.getItem("i18nextLng"));

  const [form, setForm] = useState<FormDTO>({} as FormDTO);
  const [responseId, setResponseId] = useState<string>("");
  const [orderName, setOrderName] = useState<string>("");
  const [fields, setFields] = useState<FormSectionDTO[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    response: Yup.array()
      .test("test-phone", t("messages:messages_empty_order_phone"), value => {
        if (value) {
          return !StringUtils.isNullOrEmty(value[0]);
        }
        return false;
      })
      .test("invalid-phone", t("messages:messages_invalid_phone"), value => {
        if (value) {
          return /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(value[0]);
        }
        return true;
      })
      .test("test-name", t("messages:messages_empty_order_customer"), value => {
        if (value) {
          return !StringUtils.isNullOrEmty(value[1]);
        }
        return false;
      })
      .test("no-products", t("messages:messages_empty_order_cart"), value => {
        if (value) {
          return value[4].length > 0;
        }
        return true;
      }),
  });

  const handleSubmitForm = async (values: any) => {
    await new OrderService().createOrder({ ...values, response: JSON.stringify(values.response) }).then(response => {
      setResponseId(response.result.uuid);
      setOrderName(response.result.orderName);
      setOpenDialog(true);
    });
  };

  const formik = useFormik({
    initialValues: { uuid: "", response: [], orderName: "", discount: "0", responsePermission: "AllowAll" } as any,
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
            index: index,
            isEditing: true,
            xs: component.xs,
            type: component.type,
            label: component.title,
            options: [],
            required: component.validation.some((val: any) => val.type === "REQUIRED"),
            Component:
              component.type === "TEXT"
                ? FormTextField
                : component.type === "SHIPPING"
                ? FormShipping
                : component.type === "CART"
                ? FormCart
                : component.type === "ADDRESS"
                ? FormAddress
                : component.type === "PHONE"
                ? FormPhoneSearch
                : component.type === "PAYMENT"
                ? FormPayment
                : undefined,
          });
          index++;
        });
        result.push(sectionDTO);
      });
      formik.setFieldValue(
        "response",
        Array.from({ length: index }, (item, index) => (cartIndex.includes(index) ? [] : "")),
      );
    }
    setFields(result);
  };

  const getForm = async (formId: string) => {
    await new FormService().getFormById(formId).then(response => {
      if (response.result) {
        setForm(response.result);
        formik.setFieldValue("formId", response.result.uuid);
        formik.setFieldValue("responsePermission", response.result.responsePermission);
      }
    });
  };

  const handleUpdatePermission = async () => {
    if (location.state) {
      let state: any = location.state;
      let formId: string = String(state.formId);
      await new FormService().updatePermission(formId).then(response => {
        if (Number(response.code) === 200) {
          dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
          formik.setFieldValue("responsePermission", form.responsePermission === "AllowAll" ? "OwnerOnly" : "AllowAll");
          setForm(prev => {
            return { ...prev, responsePermission: prev.responsePermission === "AllowAll" ? "OwnerOnly" : "AllowAll" };
          });
        }
      });
    }
  };

  useEffect(() => {
    CommonUtils.setPageTitle(currentLanguage === "en" ? "Create new order" : "Tạo đơn hàng mới");
    if (location.state) {
      let state: any = location.state;
      getForm(String(state.formId));
    }
  }, []);

  useEffect(() => {
    getFields();
  }, [form]);

  useEffect(() => {
    formik.errors["response"] &&
      dispatch(openNotification({ open: true, content: String(formik.errors["response"]), severity: "error" }));
  }, [formik.errors["response"]]);

  return (
    <Box>
      <Grid container sx={{ minHeight: "95vh" }}>
        <Grid item xs={12} sx={{ padding: 5 }}>
          <Grid item xs={12} sx={{ fontWeight: 800, fontSize: "25px", marginBottom: 4 }}>
            <Grid
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
                  { text: t("orders:order_new"), highlight: true },
                ]}
              />
              <Box
                sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: 2 }}
              >
                <Typography sx={{ color: COLORS.primaryLight }}>{t("orders:order_permission")}</Typography>
                <Select
                  value={formik.values["responsePermission"]}
                  defaultValue={formik.values["responsePermission"]}
                  onChange={handleUpdatePermission}
                  input={<StyledInput />}
                >
                  {[
                    {
                      title: currentLanguage === "en" ? "Anyone with the link can edit" : "Ai cũng có quyền chỉnh sửa",
                      value: "AllowAll",
                    },
                    {
                      title: currentLanguage === "en" ? "Anyone with the link can view" : "Người mua chỉ có quyền xem",
                      value: "OwnerOnly",
                    },
                  ].map((option, key) => {
                    return <MenuItem value={option.value}>{option.title}</MenuItem>;
                  })}
                </Select>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CustomBackgroundCard sizeX="auto" sizeY="auto">
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={2}>
                    <InputLabel sx={{ whiteSpace: "normal", textOverflow: "unset" }}>
                      {t("orders:order_form_name")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={5} sx={{ marginBottom: 2, paddingX: "10px" }}>
                    <CustomTextField formik={formik} name="orderName" />
                  </Grid>
                </Grid>
              </Grid>
              <CreateFieldsForm disabled={false} enableEditing={false} formik={formik} sections={fields} />
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: 2, marginTop: 2 }}>
                <CustomButton
                  text={t("orders:order_new")}
                  type="rounded-outlined"
                  startIcon="checkCircle"
                  color={COLORS.primary}
                  handleOnClick={() => {
                    formik.handleSubmit();
                  }}
                />
              </Grid>
            </CustomBackgroundCard>
          </Grid>
        </Grid>
        {openDialog && (
          <DialogFinishOrder
            orderName={orderName}
            responseId={responseId}
            openDialog={openDialog}
            handleCloseDialog={() => {
              setOpenDialog(false);
              window.location.reload();
            }}
          />
        )}
      </Grid>
    </Box>
  );
}
export default CreateOrderPage;
