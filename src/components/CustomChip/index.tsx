import { Chip } from "@mui/material";

interface CustomChipProps {
  text: string;
  textColor?: string;
  backgroundColor?: string;
  size?: number;
  clickable?: boolean;
  handleOnClick?: () => void;
}

export const CustomChip = ({ text, textColor, backgroundColor, size, clickable, handleOnClick }: CustomChipProps) => {
  return (
    <Chip
      label={text}
      onClick={handleOnClick}
      sx={{
        backgroundColor: backgroundColor,
        color: textColor,
        fontSize: size,
        fontWeight: 500,
        paddingX: 1,
        cursor: clickable ? "pointer" : "default",
      }}
    ></Chip>
  );
};
