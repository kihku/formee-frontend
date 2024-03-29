import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material";
import { CustomIcon } from "components/CustomIcon";
import { COLORS } from "styles";

interface CustomCheckboxProps {
  label?: string;
  size?: number;
  defaultValue?: any;
  options: any[];
  chosenValues: any[];
  showLabel?: boolean;
  handleOnChange: (event: any) => void;
}

export const CustomCheckbox = ({
  label,
  showLabel,
  size,
  options,
  defaultValue,
  chosenValues,
  handleOnChange,
}: CustomCheckboxProps) => {
  return (
    <FormControl>
      {Boolean(showLabel) && <FormLabel>{label ?? label}</FormLabel>}
      <FormGroup defaultValue={defaultValue} onChange={e => handleOnChange(e)}>
        {options.map((opt, key) => {
          return (
            <FormControlLabel
              key={key}
              value={opt.value}
              label={opt.title}
              checked={chosenValues.includes(opt.value)}
              control={
                <Checkbox
                  disableRipple={opt.disableRipple ?? opt.disableRipple}
                  icon={
                    <CustomIcon
                      name={opt.icon ? opt.icon : "squareCheckBox"}
                      size={size ?? 24}
                      color={opt.iconColor ? opt.iconColor : COLORS.lightText}
                    />
                  }
                  checkedIcon={
                    <CustomIcon
                      name={opt.checkedIcon ? opt.checkedIcon : "squareCheckBoxChecked"}
                      size={size ?? 24}
                      color={opt.checkedIconColor ? opt.checkedIconColor : COLORS.primary}
                    />
                  }
                />
              }
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
};
