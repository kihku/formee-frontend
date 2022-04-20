import { Button } from "@mui/material";
import { IconType } from "components/CustomIcon";
import { CustomIcon } from "components/CustomIcon";
import { COLORS } from "styles";

export type ButtonType = "default" | "rounded" | "outlined" | "rounded-outlined";

interface CustomButtonProps {
  text: string;
  link?: string;
  color?: string;
  startIcon?: IconType;
  endIcon?: IconType;
  type: ButtonType;
  handleOnClick?: () => void;
}

export const CustomButton = ({ text, link, color, startIcon, endIcon, type, handleOnClick }: CustomButtonProps) => {
  const isType = (keyword: string) => {
    return type.includes(keyword);
  };

  const buttonStyle = {
    paddingX: isType("rounded") ? 4 : 2.5,
    paddingY: isType("rounded") ?0.5:1,
    borderRadius: isType("rounded") ? 10 : 1,
    textTransform: "none"
  };

  return (
    <Button
      variant={isType("outlined") ? "outlined" : "contained"}
      size="medium"
      startIcon={
        startIcon && <CustomIcon name={startIcon} color={isType("outlined") ? COLORS.primary : "white"} size={20} />
      }
      endIcon={endIcon && <CustomIcon name={endIcon} color={isType("outlined") ? COLORS.primary : "white"} size={20} />}
      sx={buttonStyle}
      onClick={handleOnClick}
    >
      {text}
    </Button>
  );
  //}
};
