import { Box } from "@mui/material";
import { COLORS } from "styles";

interface FooterProps {}

export const Footer = ({}: FooterProps) => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingY: "3vh",
        maxHeight: "8vh",
        backgroundColor: COLORS.background,
        boxShadow: " rgba(0, 0, 0, 0.1) 0px -4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
      }}
    >
      Footer
    </Box>
  );
};
