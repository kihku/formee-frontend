import { Box, Dialog, DialogContent, DialogTitle, Grid, InputLabel } from "@mui/material";
import { URL_PROFILE } from "apis/axiosClient";
import { CustomButton } from "components/CustomButton";
import { useFormik } from "formik";
import { initProduct, ProductDTO } from "models/product";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { COLORS } from "styles";
import * as Yup from "yup";

export interface DialogViewProductProps {
  itemEdit: ProductDTO;
  openDialog: boolean;
  handleCloseDialog: () => void;
}

const DialogViewProduct = ({ itemEdit, openDialog, handleCloseDialog }: DialogViewProductProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [imageList, setImageList] = useState<string[]>([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("Product name is requried"),
    productPrice: Yup.string().trim().required("Product price is requried"),
  });

  const formik = useFormik({
    initialValues: itemEdit.uuid ? itemEdit : initProduct,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  function closeDialog() {
    formik.resetForm();
    handleCloseDialog();
  }

  async function handleSubmitForm(values: ProductDTO) {
    console.log("values", values);
    // await new ProductService()
    //   .uploadImageToServer(formik.values.image, formik.values.uuid)
    //   .then(response => console.log(response));

    // await new ProductService()
    //   .createProduct({
    //     ...values,
    //     imageName: String(imageList.at(0)),
    //     imageList: JSON.stringify(imageList),
    //   })
    //   .then(response => {
    //     console.log(response);
    //     closeDialog();
    //   });
    // closeDialog();
  }

  useEffect(() => {
    formik.setValues(itemEdit);
    setImageList(JSON.parse(itemEdit.imageList));
  }, [itemEdit]);

  // console.log("formik", formik.values);

  return (
    <Dialog fullWidth maxWidth="md" open={openDialog} onClose={closeDialog}>
      <DialogTitle>
        {/* <Box component="span">{"Thông tin sản phẩm"}</Box> */}
        <Grid item xs={12} sx={{ fontSize: "22px", fontWeight: 600, color: COLORS.primary }}>
          {formik.values.name}
        </Grid>
      </DialogTitle>

      <DialogContent dividers>
        <Box>
          <Grid container>
            <Grid item xs={6} sx={{ paddingX: 1 }}>
              <Grid container>
                {/* description */}
                <Grid item xs={4}>
                  <InputLabel shrink sx={{ marginBottom: 2, fontSize: "20px", fontWeight: 500 }}>
                    {"Mô tả"}
                  </InputLabel>
                </Grid>
                <Grid item xs={8} sx={{ marginBottom: 2, color: COLORS.text }}>
                  {formik.values.description}
                </Grid>

                {/* quantity */}
                <Grid item xs={4}>
                  <InputLabel shrink sx={{ marginBottom: 2, fontSize: "20px", fontWeight: 500 }}>
                    {"Số lượng"}
                  </InputLabel>
                </Grid>
                <Grid item xs={8} sx={{ marginBottom: 2 }}>
                  {formik.values.quantity}
                </Grid>

                {/* product price */}
                <Grid item xs={4}>
                  <InputLabel shrink sx={{ marginBottom: 2, fontSize: "20px", fontWeight: 500 }}>
                    {"Giá"}
                  </InputLabel>
                </Grid>
                <Grid item xs={8} sx={{ marginBottom: 2, fontWeight: 600, color: COLORS.primary }}>
                  {formik.values.productPrice.toLocaleString()}
                  {/* {" đ"} */}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6} sx={{ paddingX: 1 }}>
              <Grid container>
                <Grid item xs={12}>
                  <Carousel
                    onChange={index => {
                      setCurrentIndex(Number(index));
                    }}
                    autoPlay={false}
                  >
                    {imageList &&
                      imageList.length > 0 &&
                      imageList.map((item, i) => (
                        <div key={i}>
                          <img
                            style={{
                              zIndex: 99,
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            src={`${URL_PROFILE.PRO}/images/${item}`}
                            alt="product"
                          />
                        </div>
                      ))}
                  </Carousel>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
              <Box sx={{ display: "flex", gap: 1.5, paddingX: "10px", marginBottom: 1 }}>
                <CustomButton
                  text="Đóng"
                  type="outlined"
                  handleOnClick={() => {
                    closeDialog();
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default DialogViewProduct;
