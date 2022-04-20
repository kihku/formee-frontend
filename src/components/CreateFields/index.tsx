import { Grid, GridSize, InputLabel } from "@mui/material";
import { FieldGeneral, FormikType } from "models/baseModels";

export interface CreateFieldsProps<T, K> extends FieldGeneral<T, K> {
  Component?: React.ElementType;
  xs?: GridSize;
}

export interface FieldsArray<T, K> {
  fields: CreateFieldsProps<T, K>[];
  formik?: FormikType<T>;
}

export const CreateFields = <T extends object, K extends object>({ fields, formik }: FieldsArray<T, K>) => {
  return (
    <>
      {fields.map(({ Component, label, name, xs, helplerText, ...rest }, index) => {
        if (!xs) {
          return null;
        }
        if (label && !Component) {
          return (
            <Grid item xs={xs} key={index} sx={{ alignSelf: "center", marginBottom: 2 }}>
              <InputLabel>{label}</InputLabel>
            </Grid>
          );
        }
        if (!Component && !name) {
          return (
            <Grid item xs={xs} key={index} sx={{ marginBottom: 2 }}>
              <InputLabel>{label}</InputLabel>
            </Grid>
          );
        }
        return (
          <Grid item xs={xs} key={index} sx={{ marginBottom: 2, paddingX: "10px" }}>
            {Component && (
              <Component {...rest} formik={formik} label={label} name={name} helperText={helplerText && helplerText} />
            )}
          </Grid>
        );
      })}
    </>
  );
};

export default CreateFields;
