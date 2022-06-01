import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";
import { StyledInput } from "components/CustomTextField";
import { CustomOption } from "models/baseModels";

interface CustomSelectProps {
  label?: string;
  options: CustomOption[];
  defaultValue?: any;
  handleOnChange: (event: any) => void;
  disabled?: boolean;
}

export const CustomSelect = ({ label, options, defaultValue, handleOnChange, disabled }: CustomSelectProps) => {
  return (
    <FormControl variant="standard" sx={{ width: "100%" }} disabled={disabled}>
      <Select defaultValue={defaultValue} onChange={handleOnChange} input={<StyledInput />}>
        {options.map((option, key) => {
          return <MenuItem value={option.value}>{option.title}</MenuItem>;
        })}
      </Select>
      <FormHelperText
        sx={{
          color: "red",
          paddingTop: 0.75,
        }}
      >
        {/* {hasErrors() ? formik.errors[`${index}`] : ""} */}
      </FormHelperText>
    </FormControl>
  );
};
