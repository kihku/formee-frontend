import { Box, Grid } from "@mui/material";
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
import { OrderService } from "apis/orderService/orderService";
import { FormService } from "apis/formService/formService";
import { FormAddress } from "components/CreateFieldsForm/FormFields/FormAddress";

function CreateOrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation(["forms", "buttons", "orders"]);

  const [form, setForm] = useState<FormDTO>({} as FormDTO);
  const [fields, setFields] = useState<FormSectionDTO[]>([]);

  const validationSchema = Yup.object().shape({});

  const handleSubmitForm = async (values: any) => {
    console.log("values", values);
    await new OrderService().createOrder({ ...values, response: JSON.stringify(values.response) }).then(response => {
      console.log("result", response.result);
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
          component.type === "CART" && cartIndex.push(index);
          sectionDTO.components.push({
            index: index,
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

  // console.log("formik", formik.values.response);

  const getForm = async (formId: string) => {
    await new FormService().getFormById(formId).then(response => {
      if (response.result) {
        setForm(response.result);
        formik.setFieldValue("formId", response.result.uuid);
      }
    });
  };

  // console.log("form", form);

  useEffect(() => {
    if (location.state) {
      let state: any = location.state;
      getForm(String(state.formId));
    }
  }, []);

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
                  { text: t("orders:order_new"), highlight: true },
                ]}
              />
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <CustomButton
                  text="Manage orders"
                  type="rounded-outlined"
                  startIcon="manage"
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
              <CreateFieldsForm enableEditing={false} formik={formik} sections={fields} />
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: 2, marginTop: 2 }}>
                <CustomButton
                  text="Reset quantity"
                  type="rounded-outlined"
                  startIcon="refresh-partial"
                  color={COLORS.lightText}
                  handleOnClick={() => {
                    // reset quantities
                  }}
                />
                <CustomButton
                  text="Reset order"
                  type="rounded-outlined"
                  startIcon="refresh"
                  color={COLORS.lightText}
                  handleOnClick={() => {
                    formik.setFieldValue(
                      "response",
                      Array.from({ length: formik.values["response"].length }, () => ""),
                    );
                  }}
                />
                <CustomButton
                  text="Preview order"
                  type="rounded-outlined"
                  startIcon="preview"
                  color={COLORS.primary}
                  handleOnClick={() => {
                    formik.handleSubmit();
                  }}
                />
              </Grid>
            </CustomBackgroundCard>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
export default CreateOrderPage;
