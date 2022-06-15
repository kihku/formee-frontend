import { Box, Grid, InputAdornment, Typography } from "@mui/material";
import { StyledInput } from "components/CustomTextField";
import React, { useEffect, useState } from "react";
import { COLORS } from "styles";

export interface CustomCartFooterProps {
  formik: any;
  index: number;
  disabled?: boolean;
}

const CustomCartFooter: React.FC<CustomCartFooterProps> = ({ formik, index, disabled }: CustomCartFooterProps) => {
  const [total, setTotal] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  const updateTotal = () => {
    let newTotal: number = 0;
    let discountPercentage: number = (100 - discount) / 100;
    formik.values["response"].at(index).forEach((product: any) => {
      newTotal += product.productPrice * product.quantity;
    });
    setTotal(newTotal * discountPercentage);
    setSubTotal(newTotal);
  };

  useEffect(() => {
    updateTotal();
  }, [formik.values]);

  useEffect(() => {
    console.log("discount", discount);
    formik.values["discount"] = discount;
  }, [discount]);

  return (
    <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", textAlign: "end", gap: 2, paddingTop: 3 }}>
      <Grid container>
        <Grid item xs={9}></Grid>
        <Grid item xs={3} sx={{ marginY: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: 500 }}>
            <Box>Tổng đơn hàng</Box>
            <Box>
              {subTotal}
              {" đ"}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={9}></Grid>
        <Grid item xs={3} sx={{ marginY: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 500 }}>
            <Box>Giảm giá</Box>
            {disabled ? (
              <Box>{formik.values["discount"] + " %"}</Box>
            ) : (
              <StyledInput
                type="number"
                defaultValue={0}
                sx={{
                  maxWidth: "7vw",
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                  },
                }}
                inputProps={{
                  min: 0,
                  max: 100,
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <Typography sx={{ fontWeight: 500 }}>%</Typography>
                  </InputAdornment>
                }
                onChange={e => {
                  setDiscount(Number(e.target.value));
                }}
              />
            )}
          </Box>
        </Grid>

        <Grid item xs={9}></Grid>
        <Grid item xs={3} sx={{ marginY: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 600,
              fontSize: 18,
              color: COLORS.primary,
            }}
          >
            <Box>Tổng tiền</Box>
            <Box>
              {total}
              {" đ"}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CustomCartFooter;
