import FormControl from "@mui/material/FormControl";
import { FormHelperText, NativeSelect } from "@mui/material";
import { useEffect, useState } from "react";
import { StyledInput } from "components/CustomTextField";
import { CustomOption } from "models/baseModels";

interface FormSelectProps {
  index: number;
  placeholder?: string;
  formik?: any;
  required?: boolean;
  disabled?: boolean;
  options: CustomOption[];
  handleOnChange?: (event: any) => void;
}

export const FormSelect = ({ index, placeholder, formik, required, disabled, options }: FormSelectProps) => {
  const [value, setValue] = useState<string>("");

  const renderValue = () => {
    if (formik) {
      //   console.log("value", index, formik.values["response"].at(index));
      setValue(formik.values["response"] && formik.values["response"].at(index));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    formik &&
      formik.setFieldValue &&
      formik.setFieldValue("response", [
        ...formik.values["response"].slice(0, index),
        e.target.value,
        ...formik.values["response"].slice(index + 1),
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
    <FormControl variant="standard" sx={{ width: "auto" }}>
      <NativeSelect
        disabled={disabled}
        value={value}
        onChange={handleChange}
        input={<StyledInput disabled={disabled} />}
      >
        {options &&
          options.map((option, key) => {
            return (
              <option value={option.value} key={key}>
                {option.title}
              </option>
            );
          })}
      </NativeSelect>
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
