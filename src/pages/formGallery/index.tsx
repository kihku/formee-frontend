import { Box, Grid, Grow, Zoom } from "@mui/material";
import CreateFieldsFilter, { CreateFieldsFilterProps } from "components/CreateFieldsFilter";
import { FormSection } from "components/CreateFieldsForm/FormFields/FormSection";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomButton } from "components/CustomButton";
import { CustomFormCard } from "components/CustomFormCard";
import { CustomSelect } from "components/CustomSelect";
import { CustomTextField } from "components/CustomTextField";
import { CustomTitle } from "components/CustomTitle";
import { exampleLayout, exampleTemplates1, exampleTemplates2, formTypeOptions } from "constants/constants";
import { useFormik } from "formik";
import { CustomOption } from "models/baseModels";
import { FormDTO } from "models/form";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { COLORS } from "styles";
import * as Yup from "yup";
import DialogFormTemplate from "./dialogTemplate";

function FormGalleryPage() {
  const { t } = useTranslation(["commons", "forms"]);

  const [chosenItem, setChosenItem] = useState<FormDTO>({} as FormDTO);
  const [openTemplateDialog, setOpenTemplateDialog] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values: any) => {},
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  const fieldsSettings: CreateFieldsFilterProps<any, CustomOption>[] = [
    {
      label: t("forms:form_settings_type"),
      name: "type",
      type: "text",
      Component: () => {
        return <CustomSelect options={formTypeOptions} handleOnChange={(event: any) => {}} />;
      },
    },
  ];

  const handleOpenDialog = (item: FormDTO) => {
    setChosenItem(item);
    setOpenTemplateDialog(true);
  };

  return (
    <Box>
      <Grid container sx={{ minHeight: "95vh" }}>
        <Grid item xs={2.5} sx={{ padding: 3, backgroundColor: COLORS.white }}>
          <Grid item xs={12} sx={{ fontWeight: 700, fontSize: "25px", marginBottom: 3 }}>
            {t("helper_filters")}
          </Grid>
          <Grid item xs={12}>
            <CustomTextField placeholder={t("helper_search")} />
          </Grid>
          <CreateFieldsFilter formik={formik} fields={fieldsSettings} />
          <Grid
            item
            xs={12}
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "row",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <CustomButton
              text="button_clear"
              type="rounded-outlined"
              startIcon="cancelCircle"
              color={COLORS.lightText}
            />
            <CustomButton text="button_apply" type="rounded-outlined" startIcon="checkCircle" />
          </Grid>
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
              <CustomTitle text={[{ text: "Form Gallery", highlight: true }]} />
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
              <Box sx={{ paddingX: 1.5, paddingY: 1.5 }}>
                <FormSection index={""} title={"Top picks"} style={{ fontSize: "25px" }} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "3%",
                  }}
                >
                  {exampleTemplates1.map((template, key) => {
                    return (
                      <Zoom in style={{ transformOrigin: "50% 50% 0" }} {...{ timeout: 500 }}>
                        <div>
                          <CustomFormCard
                            key={key}
                            item={template}
                            handleOnClick={() => {
                              handleOpenDialog(template);
                            }}
                          />
                        </div>
                      </Zoom>
                    );
                  })}
                </Box>
              </Box>

              <Box sx={{ paddingX: 1.5, paddingY: 1.5 }}>
                <FormSection index={""} title={"Food"} style={{ fontSize: "25px" }} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "3%",
                  }}
                >
                  {exampleTemplates2.map((template, key) => {
                    return (
                      <Zoom in style={{ transformOrigin: "50% 50% 0" }} {...{ timeout: 500 }}>
                        <div>
                          <CustomFormCard
                            key={key}
                            item={template}
                            handleOnClick={() => {
                              handleOpenDialog(template);
                            }}
                          />
                        </div>
                      </Zoom>
                    );
                  })}
                </Box>
              </Box>
            </CustomBackgroundCard>
          </Grid>
        </Grid>
        {openTemplateDialog && (
          <DialogFormTemplate
            item={chosenItem}
            openDialog={openTemplateDialog}
            handleCloseDialog={() => {
              setOpenTemplateDialog(false);
            }}
          />
        )}
      </Grid>
    </Box>
  );
}
export default FormGalleryPage;
