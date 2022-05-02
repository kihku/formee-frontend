import { FormHelperText, Grid, InputLabel } from "@mui/material";
import { FormFieldGeneral, FormikType } from "models/baseModels";
import { COLORS } from "styles";

export interface CreateFieldsFormProps<T, K> extends FormFieldGeneral<T, K> {
  Component?: React.ElementType;
}

export interface FieldsArray<T, K> {
  fields: CreateFieldsFormProps<T, K>[];
  formik?: FormikType<T>;
}

export const CreateFieldsForm = <T extends object, K extends object>({ fields, formik }: FieldsArray<T, K>) => {
  return (
    <>
      {fields.map(({ Component, label, index, helperText, ...rest }, key) => {
        return (
          <Grid container>
            <Grid item xs={3}>
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
            <Grid item xs={9} key={key} sx={{ marginBottom: 2, paddingX: "10px" }}>
              {Component && <Component {...rest} formik={formik} helperText={helperText && helperText} index={index} />}
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

export default CreateFieldsForm;
