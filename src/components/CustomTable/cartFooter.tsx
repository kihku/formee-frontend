import { Box, Grid } from "@mui/material";
import React from "react";
import { COLORS } from "styles";

export interface CustomCartFooterProps {}

const CustomCartFooter: React.FC<CustomCartFooterProps> = () => {
  return (
    <Grid xs={12} sx={{ display: "flex", flexDirection: "column", textAlign: "end", gap: 2, paddingTop: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: 500 }}>
        <Box>Subtotal</Box>
        <Box>0đ</Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: 500 }}>
        <Box>Discount</Box>
        <Box>0đ</Box>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", fontWeight: 600, fontSize: 18, color: COLORS.primary }}
      >
        <Box>Total</Box>
        <Box>0đ</Box>
      </Box>
    </Grid>
  );
};

export default CustomCartFooter;
