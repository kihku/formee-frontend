import { Grid, InputLabel } from "@mui/material";
import CustomCartFooter from "components/CustomTable/cartFooter";
import { FormFieldGeneral, FormikType } from "models/baseModels";
import { FormSectionDTO } from "models/form";
import { useTranslation } from "react-i18next";
import StringUtils from "utils/stringUtils";
import { FormSection } from "./FormFields/FormSection";

export interface CreateFieldsFormProps<T, K> extends FormFieldGeneral<T, K> {
  Component?: React.ElementType;
}

export interface FieldsArray<T, K> {
  fields?: CreateFieldsFormProps<T, K>[];
  formik?: FormikType<T>;
  sections: FormSectionDTO[];
  enableEditing: boolean;
  handleNewField?: () => void;
  handleNewSection?: () => void;
  disabled?: boolean;
  disabledForm?: boolean;
}

export const CreateFieldsForm = <T extends object, K extends object>({
  fields,
  sections,
  formik,
  enableEditing,
  handleNewField,
  handleNewSection,
  disabled,
  disabledForm,
}: FieldsArray<T, K>) => {
  const { t } = useTranslation(["forms"]);

  return (
    <>
      {sections &&
        sections.map((section, key) => {
          return (
            <Grid container key={key}>
              <Grid item xs={12}>
                <FormSection index={key} title={section.title} />
              </Grid>
              <Grid item xs={12}>
                {section.components.map(({ Component, label, index, helperText, xs, show, ...rest }, idx) => {
                  return show === undefined || show === true ? (
                    <Grid container key={idx}>
                      {!StringUtils.isNullOrEmty(label) && (
                        <Grid
                          item
                          xs={12}
                          md={2}
                          sx={{
                            marginBottom: {
                              xs: 1,
                              md: 0,
                            },
                          }}
                        >
                          <InputLabel
                            sx={{
                              whiteSpace: "normal",
                              textOverflow: "unset",
                              paddingRight: { xs: 0, md: 3 },
                              textAlign: { xs: "left", md: "right" },
                              paddingTop: 1,
                            }}
                          >
                            {label}
                          </InputLabel>
                          {/* <FormHelperText
                            sx={{
                              color: COLORS.primary,
                              cursor: "auto",
                              paddingTop: 0.75,
                            }}
                          >
                            {helperText}
                          </FormHelperText> */}
                        </Grid>
                      )}
                      {!enableEditing && (
                        <Grid
                          item
                          xs={12}
                          md={
                            !StringUtils.isNullOrEmty(label)
                              ? rest.disabled && ["TEXT", "PHONE"].includes(rest.type)
                                ? 5
                                : xs
                              : 12
                          }
                          key={key}
                          sx={{
                            marginBottom: {
                              xs: 0.5,
                              md: 2,
                            },
                          }}
                        >
                          {Component && (
                            <Component
                              {...rest}
                              formik={formik}
                              helperText={helperText && helperText}
                              index={index}
                              disabled={disabled}
                              disabledForm={disabledForm}
                            />
                          )}
                        </Grid>
                      )}
                      {enableEditing && (
                        <Grid item xs={StringUtils.isNullOrEmty(label) ? xs : 12} key={key} sx={{ marginBottom: 2 }}>
                          {Component && (
                            <Component
                              {...rest}
                              formik={formik}
                              helperText={helperText && helperText}
                              index={index}
                              disabled={disabled}
                            />
                          )}
                        </Grid>
                      )}
                      {/* {enableEditing && (
                        <Grid item xs={0.5}>
                          <IconButton>
                            <CustomIcon name="edit" />
                          </IconButton>
                        </Grid>
                      )}
                      {enableEditing && (
                        <Grid item xs={0.5}>
                          <IconButton>
                            <CustomIcon name="delete" />
                          </IconButton>
                        </Grid>
                      )} */}
                    </Grid>
                  ) : null;
                })}
              </Grid>
            </Grid>
          );
        })}

      <Grid container>
        <CustomCartFooter formik={formik} index={4} disabled={disabled} disabledForm={disabledForm} />
      </Grid>
      {/* {enableEditing && (
        <Grid item xs={12} sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <CustomButton
            text={"New field"}
            type="rounded-outlined"
            startIcon="lightAdd"
            handleOnClick={handleNewField}
          />
          <CustomButton
            text={"New section"}
            type="rounded-outlined"
            startIcon="lightAdd"
            handleOnClick={handleNewSection}
          />
        </Grid>
      )} */}
    </>
  );
};

export default CreateFieldsForm;
