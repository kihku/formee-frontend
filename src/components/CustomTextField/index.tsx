import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { COLORS } from "styles";
import { FormHelperText } from "@mui/material";
import { useEffect, useState } from "react";
import StringUtils from "utils/stringUtils";
import { getIn } from "formik";

export const StyledInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    flexGrow: 1,
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? COLORS.background : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    fontFamily: "Inter",
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

interface CustomTextFieldProps {
  name?: string;
  label?: string;
  helperText?: string;
  placeholder?: string;
  formik?: any;
  defaultValue?: any;
  required?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  type?: "text" | "number" | "password" | "date";
  handleOnChange?: (event: any) => void;
  handleOnClickHelperText?: () => void;
}

export const CustomTextField = ({
  name,
  label,
  helperText,
  placeholder,
  formik,
  defaultValue,
  required,
  disabled,
  multiline,
  type,
  handleOnClickHelperText,
}: CustomTextFieldProps) => {
  const [value, setValue] = useState<String>("");

  const renderValue = () => {
    if ((type === "text" || type === "number") && name && formik) {
      setValue(formik.values[`${name}`] && String(formik.values[`${name}`]));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      formik &&
        formik.setFieldValue &&
        formik.setFieldValue(
          `${name}`,
          StringUtils.isNumeric(e.target.value) || e.target.value === "" ? e.target.value : value + "",
        );
      setValue(StringUtils.isNumeric(e.target.value) || e.target.value === "" ? e.target.value : value + "");
      return;
    }
    formik && formik.setFieldValue && formik.setFieldValue(`${name}`, e.target.value);
    setValue(e.target.value);
  };

  const hasErrors = () => {
    return Boolean(getIn(formik && formik.errors, `${name}`)) && formik;
  };

  useEffect(() => {
    renderValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik && formik.values]);

  return (
    <FormControl variant="standard" sx={{ width: "100%" }}>
      {label && (
        <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
          {label}
          {required && " *"}
        </InputLabel>
      )}
      <StyledInput
        fullWidth
        name={`${name}`}
        type={type}
        required={required}
        disabled={disabled}
        multiline={multiline}
        placeholder={placeholder}
        defaultValue={defaultValue ?? defaultValue}
        onChange={handleChange}
        inputProps={{
          autoComplete: "new-password",
          min: 0,
          form: {
            autoComplete: "off",
          },
        }}
      />
      <FormHelperText
        sx={{
          color: hasErrors() ? "red" : COLORS.primary,
          cursor: handleOnClickHelperText ? "pointer" : "auto",
          paddingTop: 0.75,
          ":hover": {
            textDecorationLine: handleOnClickHelperText ? "underline" : "none",
          },
        }}
        onClick={() => {
          handleOnClickHelperText && handleOnClickHelperText();
        }}
      >
        {hasErrors() ? formik.errors[`${name}`] : helperText}
      </FormHelperText>
    </FormControl>
  );
};
