import { Chip } from "@mui/material";
import { COLORS } from "styles";

interface CustomChipProps {
  text: string;
  color?: string;
  size?: number;
}
export const CustomChip = (props: CustomChipProps) => {
  const chipColor = props.color ?? COLORS.primary;
  const chipStyle = {  fill: chipColor };
  return <Chip label={props.text} sx = {chipStyle}></Chip>;
};
