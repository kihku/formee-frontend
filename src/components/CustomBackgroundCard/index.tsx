import { Box } from "@mui/system";
import { COLORS } from "styles";

interface CustomBackgroundCardProps {
  backgroundColor?: string;
  sizeX?: number;
  sizeY?: number;
}
export const CustomBackgroundCard = ({ backgroundColor, sizeX, sizeY }: CustomBackgroundCardProps) => {
  const cardBackgroundColor = backgroundColor ?? "white";
  const cardWidth = sizeX ?? 200;
  const cardHeight = sizeY ?? 300;
  const cardStyle = {bgcolor: cardBackgroundColor,width: cardWidth, height: cardHeight, boxShadow: "0 4px 8px rgb(176 190 197 / 0.24)", borderRadius: 8 }
  return <Box sx={cardStyle}></Box>;
};
