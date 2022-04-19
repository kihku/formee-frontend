import { Box } from "@mui/system";
import { ReactNode } from "react";

interface CustomBackgroundCardProps {
  backgroundColor?: string;
  sizeX?: number | string;
  sizeY?: number | string;
  children?: ReactNode;
  padding?: number;
}

export const CustomBackgroundCard = ({
  backgroundColor,
  sizeX,
  sizeY,
  children,
  padding,
}: CustomBackgroundCardProps) => {
  const cardBackgroundColor = backgroundColor ?? "white";
  const cardWidth = sizeX ?? 200;
  const cardHeight = sizeY ?? 300;
  const cardStyle = {
    bgcolor: cardBackgroundColor,
    width: cardWidth,
    height: cardHeight,
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
    borderRadius: 2,
    padding: 4 + (padding ? padding : 0),
  };
  return <Box sx={cardStyle}>{children}</Box>;
};
