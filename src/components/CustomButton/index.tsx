import { Button, SxProps } from "@mui/material";
import { IconType } from "components/CustomIcon";
import { CustomIcon } from "components/CustomIcon";
import { useTranslation } from "react-i18next";
import { COLORS } from "styles";

export type ButtonType = "default" | "rounded" | "outlined" | "rounded-outlined";

interface CustomButtonProps {
  text: string;
  link?: string;
  color?: string;
  startIcon?: IconType;
  endIcon?: IconType;
  type: ButtonType;
  style?: SxProps;
  handleOnClick?: () => void;
  handleOnClickMenu?: (e: any) => void;
}

export const CustomButton = ({
  text,
  link,
  color,
  startIcon,
  endIcon,
  type,
  style,
  handleOnClick,
  handleOnClickMenu,
}: CustomButtonProps) => {
  const { t } = useTranslation(["buttons"]);

  const isType = (keyword: string) => {
    return type.includes(keyword);
  };

  const buttonStyle = {
    paddingX: 2.5,
    paddingY: 0.75,
    borderRadius: isType("rounded") ? 10 : 1.5,
    textTransform: "none",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    color: color ? color : "",
    fontSize: 14,
    border: isType("outlined") ? `solid 2px ${color ? color : ""}` : "",
    ":hover": {
      border: isType("outlined") ? `solid 2px ${color ? color : ""}` : "",
    },
    ...style,
  };

  return (
    <Button
      disableElevation
      variant={isType("outlined") ? "outlined" : "contained"}
      size="medium"
      startIcon={
        startIcon && (
          <CustomIcon
            name={startIcon}
            color={isType("outlined") ? (color ? color : COLORS.primary) : "white"}
            size={20}
          />
        )
      }
      endIcon={
        endIcon && (
          <CustomIcon
            name={endIcon}
            color={isType("outlined") ? (color ? color : COLORS.primary) : "white"}
            size={20}
          />
        )
      }
      sx={buttonStyle}
      onClick={handleOnClick ? handleOnClick : handleOnClickMenu}
    >
      {t(text)}
    </Button>
  );
};
