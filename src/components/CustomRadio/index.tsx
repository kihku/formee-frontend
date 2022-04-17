import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { CustomOption } from "models/customOption";

interface CustomRadioProps {
  label?: string;
  size?: number;
  options: CustomOption[];
  defaultValue?: any;
  handleOnChange: (event: any) => void;
}

export const CustomRadio = ({ label, size, options, defaultValue, handleOnChange }: CustomRadioProps) => {
  return (
    <FormControl>
      <FormLabel>{label ?? label}</FormLabel>
      <RadioGroup defaultValue={defaultValue} onChange={e => handleOnChange(e)}>
        {options.map((opt, key) => {
          return (
            <FormControlLabel
              key={key}
              value={opt.value}
              label={opt.title}
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: size ?? 24,
                    },
                  }}
                />
              }
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
