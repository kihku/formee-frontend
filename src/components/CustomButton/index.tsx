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
    ":hover": {
      backgroundColor: color ? (isType("outlined") ? COLORS.background : color) : COLORS.primary,
      color: "white",
    },
    padding: "10px 20px",
    backgroundColor: color ? (isType("outlined") ? COLORS.background : color) : COLORS.primary,
    borderRadius: isType("rounded") ? 10 : 2,
  };

  return (
    <Button
      variant="contained"
      size="medium"
      startIcon={startIcon && <CustomIcon name={startIcon} color="white" size={20} />}
      endIcon={endIcon && <CustomIcon name={endIcon} color="white" size={20} />}
      sx={buttonStyle}
      onClick={handleOnClick}
    >
      {text}
    </Button>
  );
  //}
};
