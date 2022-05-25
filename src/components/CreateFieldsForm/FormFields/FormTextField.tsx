import FormControl from "@mui/material/FormControl";
import { FormHelperText } from "@mui/material";
import { useEffect, useState } from "react";
import { StyledInput } from "components/CustomTextField";

interface FormTextFieldProps {
  index: number;
  placeholder?: string;
  formik?: any;
  required?: boolean;
  disabled?: boolean;
  type?: "text" | "number" | "password" | "date";
  handleOnChange?: (event: any) => void;
}

export const FormTextField = ({ index, placeholder, formik, required, disabled, type }: FormTextFieldProps) => {
  const [value, setValue] = useState<string>("");

  const renderValue = () => {
    if (formik) {
      // console.log("value", index, formik.values["response"].at(index));
      setValue(formik.values["response"] && formik.values["response"].at(index));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(
    //   index,
    //   formik.values["response"] && formik.values["response"].slice(0, index),
    //   formik.values["response"] && formik.values["response"].slice(index + 1),
    // );
    formik &&
      formik.setFieldValue &&
      formik.setFieldValue("response", [
        ...(formik.values["response"] ? formik.values["response"].slice(0, index) : []),
        e.target.value,
        ...(formik.values["response"] ? formik.values["response"].slice(index + 1) : []),
      ]);
    setValue(e.target.value);
  };

  const hasErrors = () => {
    return false;
    // return Boolean(getIn(formik && formik.errors, `${name}`)) && formik;
  };

  useEffect(() => {
    renderValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik && formik.values]);

  return (
    <FormControl variant="standard" sx={{ width: "100%" }}>
      <StyledInput
        fullWidth
        type={type}
        value={value}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        // defaultValue={defaultValue ?? defaultValue}
        onChange={handleChange}
        inputProps={{
          autoComplete: "new-password",
          form: {
            autoComplete: "off",
          },
        }}
      />
      <FormHelperText
        sx={{
          color: "red",
          paddingTop: 0.75,
        }}
      >
        {hasErrors() ? formik.errors[`${index}`] : ""}
      </FormHelperText>
    </FormControl>
  );
};
