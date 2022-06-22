import { Box, Chip, SxProps } from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

interface CustomChipProps {
  text: string | React.ReactNode;
  textColor?: string;
  backgroundColor?: string;
  size?: number;
  clickable?: boolean;
  isSelect?: boolean;
  rounded?: boolean;
  handleOnClick?: (e: any) => void;
  style?: SxProps;
}

export const CustomChip = ({
  text,
  textColor,
  backgroundColor,
  size,
  clickable,
  rounded,
  handleOnClick,
  style,
  isSelect,
}: CustomChipProps) => {
  return (
    <Chip
      label={
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          {text}
          {isSelect && <ArrowDropDownRoundedIcon />}
        </Box>
      }
      onClick={handleOnClick}
      sx={{
        backgroundColor: backgroundColor,
        color: textColor,
        fontSize: size,
        fontWeight: 500,
        paddingLeft: rounded ? 0 : 1,
        paddingRight: isSelect ? 0 : 1,
        cursor: clickable ? "pointer" : "default",
        borderRadius: rounded ? 50 : "auto",
        ...style,
      }}
      // deleteIcon={}
    />
  );
};
