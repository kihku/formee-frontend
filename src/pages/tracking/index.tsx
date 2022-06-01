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
import { TemplateService } from "apis/template/templateService";
import { OrderService } from "apis/orderService/orderService";
import CommonUtils from "utils/commonUtils";

function OrderTrackingPage() {
  const { t } = useTranslation(["forms", "buttons", "orders"]);

  const [form, setForm] = useState<FormDTO>({} as FormDTO);
  const [formResponse, setFormResponse] = useState<FormResponseDTO>({} as FormResponseDTO);
  const [formId, setFormId] = useState<string>("");
  const [fields, setFields] = useState<FormSectionDTO[]>([]);

  const validationSchema = Yup.object().shape({});

  const handleSubmitForm = async (values: any) => {
    console.log("values", values);
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
                : undefined,
          });
          index++;
        });
        result.push(sectionDTO);
      });
    }
    setFields(result);
  };

  const getFormTemplate = async (formId: string) => {
    await new TemplateService().getTemplateById(formId).then(response => {
      if (response.result) {
        setForm(response.result);
      }
    });
  };

  const getOrderResponse = async (orderId: string) => {
    await new OrderService().getOrderById(orderId).then(response => {
      if (response.result) {
        setFormResponse({ ...response.result, response: JSON.parse(response.result.response) });
        formik.setValues({ ...response.result, response: JSON.parse(response.result.response) });
        setFormId(response.result.formId);
      }
    });
  };

  // console.log("response", formik.values);

  useEffect(() => {
    if (window.location.href) {
      let encodedId: string = String(window.location.href.split("/").at(-1));
      let orderId: string = CommonUtils.decodeUUID(encodedId);
      getOrderResponse(orderId);
    }
  }, []);

  useEffect(() => {
    formId && getFormTemplate(formId);
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
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <CustomTitle text={[{ text: String(form.name) + " Tracking", highlight: true }]} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <CustomBackgroundCard sizeX="auto" sizeY="auto">
              <CreateFieldsForm enableEditing={false} formik={formik} sections={fields} />
            </CustomBackgroundCard>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
export default OrderTrackingPage;
