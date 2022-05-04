import { Box, Grid } from "@mui/material";
import { CustomTextField } from "components/CustomTextField";
import { CustomTitle } from "components/CustomTitle";
import { COLORS } from "styles";
import * as Yup from "yup";
import CreateFieldsFilter, { CreateFieldsFilterProps } from "components/CreateFieldsFilter";
import { useFormik } from "formik";
import { CustomOption } from "models/baseModels";
import { CustomButton } from "components/CustomButton";
import { useState } from "react";
import { FormDTO, FormLayoutDTO } from "models/form";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { useTranslation } from "react-i18next";
import { CustomSelect } from "components/CustomSelect";
import { componentTypes, validationTypes } from "constants/forms";
import CreateFieldsForm, { CreateFieldsFormProps } from "components/CreateFieldsForm";
import {  orderStatusList } from "constants/constants";
import { FormTextField } from "components/CreateFieldsForm/FormFields/FormTextField";
import { FormSelect } from "components/CreateFieldsForm/FormFields/FormSelect";
import { FormCart } from "components/CreateFieldsForm/FormFields/FormCart";

function CreateFormPage() {
  const formName = "Untitled Form";
  const { t } = useTranslation(["forms", "buttons"]);

  // const [form, setForm] = useState<FormDTO>({} as FormDTO);

  const validationSchema = Yup.object().shape({});

  const fieldsSettings: CreateFieldsFilterProps<any, CustomOption>[] = [
    {
      label: t("form_settings_label"),
      name: "label",
      type: "text",
      Component: () => {
        return (
          <CustomTextField
            handleOnChange={e => {
              formik.setFieldValue("label", e.target.value);
            }}
          />
        );
      },
    },
    {
      label: t("form_settings_description"),
      name: "description",
      type: "text",
      Component: () => {
        return (
          <CustomTextField
            multiline
            handleOnChange={e => {
              formik.setFieldValue("description", e.target.value);
            }}
          />
        );
      },
    },
    {
      label: t("form_settings_type"),
      name: "type",
      type: "text",
      Component: () => {
        return <CustomSelect options={componentTypes} handleOnChange={(event: any) => {}} />;
      },
    },
    {
      label: t("form_settings_validation"),
      name: "validation",
      type: "text",
      Component: () => {
        return (
          <Box>
            <CustomSelect options={validationTypes} handleOnChange={(event: any) => {}} />
            <CustomTextField placeholder="Custom error message" />
          </Box>
        );
      },
    },
  ];

  const handleSubmitForm = async (values: any) => {
    console.log("values", values);
  };

  const formik = useFormik({
    initialValues: {} as any,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  const formikFields = useFormik({
    initialValues: { id: "", sections: [] } as FormLayoutDTO,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  const getFields = (): CreateFieldsFormProps<any, any>[] => {
    let result: CreateFieldsFormProps<any, any>[] = [];
    let index = 0;
    formikFields.values.sections.forEach(section => {
      section.components.forEach(component => {
        result.push({
          index: index,
          type: component.type,
          label: component.title,
          options: component.type === "STATUS" ? orderStatusList : [],
          required: component.validation.some(val => val.type === "REQUIRED"),
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
    });
    return result;
  };

  const fields: CreateFieldsFormProps<any, any>[] = getFields();

  const handleNewField = () => {
    formikFields.setFieldValue(
      "sections",
      formikFields.values.sections.map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            components: [
              ...item.components,
              {
                title: "Untitled field",
                type: "TEXT",
                validation: [],
                showOnTable: true,
              },
            ],
          };
        }
        return item;
      }),
    );
  };

  const handleNewSection = () => {
    formikFields.setFieldValue("sections", [
      ...formikFields.values.sections,
      { title: "Untitled Section", components: [] },
    ]);
  };

  return (
    <Box>
      <Grid container sx={{ minHeight: "95vh" }}>
        <Grid item xs={2.5} sx={{ padding: 3, backgroundColor: COLORS.white }}>
          <Grid item xs={12} sx={{ fontWeight: 700, fontSize: "25px", marginBottom: 3 }}>
            {t("form_settings_title")}
          </Grid>
          <CreateFieldsFilter formik={formik} fields={fieldsSettings} />
        </Grid>
        <Grid item xs={9.5} sx={{ padding: 5 }}>
          <Grid item xs={12} sx={{ fontWeight: 800, fontSize: "30px", marginBottom: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <CustomTitle
                text={[
                  { text: formName, highlight: false },
                  { text: "/", highlight: true },
                  { text: t("form_view"), highlight: true },
                ]}
              />
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <CustomButton text="button_save" type="rounded-outlined" startIcon="save" color={COLORS.lightText} />
                <CustomButton
                  text="button_new_order"
                  type="rounded-outlined"
                  startIcon="lightAdd"
                  color={COLORS.primary}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <CustomBackgroundCard sizeX="auto" sizeY="auto">
              <CreateFieldsForm
                enableEditing
                formik={formik}
                fields={fields}
                sections={formikFields.values.sections}
                handleNewField={handleNewField}
                handleNewSection={handleNewSection}
              />
            </CustomBackgroundCard>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
export default CreateFormPage;
