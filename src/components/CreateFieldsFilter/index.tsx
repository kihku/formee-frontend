import { Box, Collapse, Grid, IconButton } from "@mui/material";
import { CustomChip } from "components/CustomChip";
import { FilterFieldGeneral, FormikType } from "models/baseModels";
import { useEffect, useState } from "react";
import { COLORS } from "styles";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import StringUtils from "utils/stringUtils";

export interface CreateFieldsFilterProps<T, K> extends FilterFieldGeneral<T, K> {
  Component?: React.ElementType;
}

export interface FieldsArray<T, K> {
  fields: CreateFieldsFilterProps<T, K>[];
  formik: FormikType<T>;
}

export const CreateFieldsFilter = <T extends object, K extends object>({ fields, formik }: FieldsArray<T, K>) => {
  const [expanded, setExpanded] = useState<boolean[]>(Array.from({ length: fields.length }, () => false));

  const getValueCount = (type: "text" | "checkbox" | "picker" | "select", value: any) => {
    switch (type) {
      case "text":
        return StringUtils.isNullOrEmty(value) ? 0 : 1;
      case "checkbox":
        return value.length;
    }
  };

  useEffect(() => {
    // console.log("formik", formik.values);
  }, [formik.values]);

  return (
    <>
      {fields.map(({ Component, type, label, name, ...rest }, index) => {
        return (
          <Grid item xs={12} key={index} sx={{ paddingX: 0.25 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
                cursor: "pointer",
                paddingBottom: 0.5,
              }}
              onClick={() => {
                setExpanded(expanded.map((item, idx) => (idx === index ? !item : item)));
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
                <Box sx={{ fontWeight: 600 }}>{label}</Box>
                {getValueCount(type, formik.values[name]) > 0 && (
                  <CustomChip
                    rounded
                    text={String(getValueCount(type, formik.values[name]))}
                    backgroundColor={COLORS.primaryBackground}
                    textColor={COLORS.primary}
                    size={14}
                  />
                )}
              </Box>
              <IconButton>
                <ExpandMoreRoundedIcon
                  sx={{ transform: expanded[index] ? "rotate(180deg)" : "rotate(0)", transition: "all 0.15s linear" }}
                />
              </IconButton>
            </Box>
            <Collapse in={expanded[index]} timeout={400}>
              <Box sx={{ paddingY: 0.25 }}>
                {Component && <Component {...rest} formik={formik} label={label} name={name} />}
              </Box>
            </Collapse>
          </Grid>
        );
      })}
    </>
  );
};

export default CreateFieldsFilter;
