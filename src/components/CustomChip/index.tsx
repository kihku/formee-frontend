import { Chip } from "@mui/material";


interface CustomChipProps {
  text: string;
  textColor?: string;
  backgroundColor?: string;
  size?: number;
}
export const CustomChip = ({ text, textColor, backgroundColor, size }: CustomChipProps) => {
  return <Chip label={text} color="secondary" sx={{ backgroundColor: { backgroundColor }, color: { textColor } }}></Chip>;
};
