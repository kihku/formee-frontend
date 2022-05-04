import { FormHelperText, Grid, IconButton, InputLabel } from "@mui/material";
import { CustomButton } from "components/CustomButton";
import { CustomIcon } from "components/CustomIcon";
import { FormFieldGeneral, FormikType } from "models/baseModels";
import { FormSectionDTO } from "models/form";
import { COLORS } from "styles";
import { FormSection } from "./FormFields/FormSection";

export interface CreateFieldsFormProps<T, K> extends FormFieldGeneral<T, K> {
  Component?: React.ElementType;
}

export interface FieldsArray<T, K> {
  fields: CreateFieldsFormProps<T, K>[];
  formik?: FormikType<T>;
  sections: FormSectionDTO[];
  enableEditing: boolean;
  handleNewField?: () => void;
  handleNewSection?: () => void;
}

export const CreateFieldsForm = <T extends object, K extends object>({
  fields,
  sections,
  formik,
  enableEditing,
  handleNewField,
  handleNewSection,
}: FieldsArray<T, K>) => {
  return (
    <>
      {sections.map((section, key) => {
        return (
          <Grid container>
            <Grid item xs={12}>
              <FormSection index={key} title={section.title} />
            </Grid>
            <Grid item xs={12}>
              {fields.map(({ Component, label, index, helperText, ...rest }, key) => {
                return (
                  <Grid container>
                    <Grid item xs={2.5}>
                      <InputLabel>{label}</InputLabel>
                      <FormHelperText
                        sx={{
                          color: COLORS.primary,
                          cursor: "auto",
                          paddingTop: 0.75,
                        }}
                      >
                        {helperText}
                      </FormHelperText>
                    </Grid>
                    {!enableEditing && (
                      <Grid item xs={9.5} key={key} sx={{ marginBottom: 2, paddingX: "10px" }}>
                        {Component && (
                          <Component {...rest} formik={formik} helperText={helperText && helperText} index={index} />
                        )}
                      </Grid>
                    )}
                    {enableEditing && (
                      <Grid item xs={8.5} key={key} sx={{ marginBottom: 2, paddingX: "10px" }}>
                        {Component && (
                          <Component {...rest} formik={formik} helperText={helperText && helperText} index={index} />
                        )}
                      </Grid>
                    )}
                    {enableEditing && (
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
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        );
      })}

      {enableEditing && (
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
      )}
    </>
  );
};

export default CreateFieldsForm;
