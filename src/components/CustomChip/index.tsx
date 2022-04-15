import { Chip } from "@mui/material";
import { COLORS } from "styles";

interface CustomChipProps {
  text: string;
  color?: string;
  size?: number;
}
export const CustomChip = ({text,color,size}: CustomChipProps) => {
  const chipColor = color ?? COLORS.primary;
  const chipStyle = {  fill: chipColor };
  return <Chip label={text} sx = {chipStyle}></Chip>;
};
