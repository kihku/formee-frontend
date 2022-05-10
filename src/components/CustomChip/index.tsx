import { Chip, SxProps } from "@mui/material";

interface CustomChipProps {
  text: string | React.ReactNode;
  textColor?: string;
  backgroundColor?: string;
  size?: number;
  clickable?: boolean;
  rounded?: boolean;
  handleOnClick?: () => void;
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
}: CustomChipProps) => {
  return (
    <Chip
      label={text}
      onClick={handleOnClick}
      sx={{
        backgroundColor: backgroundColor,
        color: textColor,
        fontSize: size,
        fontWeight: 500,
        paddingX: rounded ? 0 : 1,
        cursor: clickable ? "pointer" : "default",
        borderRadius: rounded ? 50 : "auto",
        ...style,
      }}
    ></Chip>
  );
};
