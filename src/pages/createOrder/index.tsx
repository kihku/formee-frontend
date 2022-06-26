import { Box, Grid, InputLabel } from "@mui/material";
import { CustomTitle } from "components/CustomTitle";
import { COLORS } from "styles";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FormDTO, FormSectionDTO } from "models/form";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { useTranslation } from "react-i18next";
import CreateFieldsForm from "components/CreateFieldsForm";
import { orderStatusList } from "constants/constants";
import { FormTextField } from "components/CreateFieldsForm/FormFields/FormTextField";
import { FormSelect } from "components/CreateFieldsForm/FormFields/FormSelect";
import { FormCart } from "components/CreateFieldsForm/FormFields/FormCart";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CustomButton } from "components/CustomButton";
import { FormService } from "apis/formService/formService";
import { FormAddress } from "components/CreateFieldsForm/FormFields/FormAddress";
import { OrderService } from "apis/orderService/orderService";
import { CustomTextField } from "components/CustomTextField";
import { FormPhoneSearch } from "components/CreateFieldsForm/FormFields/FormPhoneSearch";
import DialogFinishOrder from "./dialogFinish";
import { CustomSwitch } from "components/CustomSwitch";
import { openNotification } from "redux/actions/notification";
import { useDispatch } from "react-redux";
import StringUtils from "utils/stringUtils";

function CreateOrderPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(["forms", "buttons", "orders"]);

  const [form, setForm] = useState<FormDTO>({} as FormDTO);
  const [responseId, setResponseId] = useState<string>("");
  const [orderName, setOrderName] = useState<string>("");
  const [fields, setFields] = useState<FormSectionDTO[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    response: Yup.array()
      .test("test-phone", "Số điện thoại không được bỏ trống", value => {
        if (value) {
          return !StringUtils.isNullOrEmty(value[0]);
        }
        return false;
      })
      .test("test-name", "Tên người mua không được bỏ trống", value => {
        if (value) {
          return !StringUtils.isNullOrEmty(value[1]);
        }
        return false;
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
    initialValues: { uuid: "", response: [], orderName: "", discount: "0" } as any,
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
            options: component.type === "STATUS" ? orderStatusList : [],
            required: component.validation.some((val: any) => val.type === "REQUIRED"),
            Component:
              component.type === "TEXT"
                ? FormTextField
                : component.type === "STATUS"
                ? FormSelect
                : component.type === "CART"
                ? FormCart
                : component.type === "ADDRESS"
                ? FormAddress
                : component.type === "PHONE"
                ? FormPhoneSearch
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
          setForm(prev => {
            return { ...prev, responsePermission: prev.responsePermission === "AllowAll" ? "OwnerOnly" : "AllowAll" };
          });
        }
      });
    }
  };

  useEffect(() => {
    if (location.state) {
      let state: any = location.state;
      getForm(String(state.formId));
      // getCustomers();
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
                  { text: t("orders:order_new"), highlight: true },
                ]}
              />
              <CustomSwitch
                tooltipText="Cho phép khách hàng chỉnh sửa đơn hàng"
                handleOnChange={handleUpdatePermission}
                value={form.responsePermission === "AllowAll"}
                defaultChecked={form.responsePermission === "AllowAll"}
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
                    <CustomTextField formik={formik} name="orderName" />
                  </Grid>
                </Grid>
              </Grid>
              <CreateFieldsForm disabled={false} enableEditing={false} formik={formik} sections={fields} />
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: 2, marginTop: 2 }}>
                <CustomButton
                  text="Tạo đơn hàng"
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
            }}
          />
        )}
      </Grid>
    </Box>
  );
}
export default CreateOrderPage;
