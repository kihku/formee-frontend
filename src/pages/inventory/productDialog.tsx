import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputLabel, styled } from "@mui/material";
import { ProductService } from "apis/productService/productService";
import CreateFields, { CreateFieldsProps } from "components/CreateFields";
import { CustomButton } from "components/CustomButton";
import { CustomTextField, StyledInput } from "components/CustomTextField";
import { useFormik } from "formik";
import { initProduct, ProductDTO } from "models/product";
import { ChangeEvent, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import * as Yup from "yup";

export interface DialogProductProps {
  itemEdit: ProductDTO;
  openDialog: boolean;
  handleCloseDialog: () => void;
}

const DialogProduct = ({ itemEdit, openDialog, handleCloseDialog }: DialogProductProps) => {
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

    await new ProductService()
      .createProduct({
        ...values,
        imageName: String(imageList.at(0)),
        imageList: JSON.stringify(imageList),
      })
      .then(response => {
        console.log(response);
        closeDialog();
      });
    // closeDialog();
  }

  async function handleImport(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      try {
        let files = Array.from(e.target.files);
        setImageList(
          files.map((file: any) => {
            return URL.createObjectURL(file);
          }),
        );
        // formik.setFieldValue(
        //   "imageList",
        //   files.map((file: any) => {
        //     return URL.createObjectURL(file);
        //   }),
        // );
        // console.log(
        //   files.map((file: any) => {
        //     return URL.createObjectURL(file);
        //   }),
        // );
        // console.log("files", URL.createObjectURL(e.target.files[0]));
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          // console.log("image", reader.result);
          formik.setFieldValue("imageBase64", reader.result);
        };
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    formik.setValues(itemEdit);
    setImageList(JSON.parse(itemEdit.imageList));
  }, [itemEdit]);

  // console.log("formik", formik.values);

  return (
    <Dialog fullWidth maxWidth="md" open={openDialog} onClose={closeDialog}>
      <DialogTitle>
        <Box component="span">{"Chỉnh sửa thông tin sản phẩm"}</Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box>
          <Grid container>
            {/* <CreateFields formik={formik} fields={fields} /> */}
            <Grid item xs={6} sx={{ paddingX: 1 }}>
              <Grid container>
                <Grid item xs={12}>
                  <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                    {"Tên sản phẩm *"}
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 2 }}>
                  <StyledInput
                    fullWidth
                    value={formik.values.name}
                    defaultValue={itemEdit.name}
                    onChange={e => {
                      formik.setFieldValue("name", e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                    {"Giá thành *"}
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 2 }}>
                  <StyledInput
                    fullWidth
                    type="number"
                    value={formik.values.productPrice}
                    defaultValue={itemEdit.productPrice}
                    onChange={e => {
                      formik.setFieldValue("productPrice", e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                    {"Mô tả"}
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 2 }}>
                  <StyledInput
                    fullWidth
                    value={formik.values.description}
                    defaultValue={itemEdit.description}
                    onChange={e => {
                      formik.setFieldValue("description", e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                    {"Hình ảnh"}
                  </InputLabel>
                </Grid>
                <Grid item xs={12}>
                  <Box paddingBottom="15px">
                    <input
                      accept="image/*"
                      hidden={true}
                      id="contained-button-file"
                      multiple={true}
                      type="file"
                      onChange={handleImport}
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="outlined"
                        size="small"
                        component="span"
                        disableElevation
                        style={{ height: "32px" }}
                      >
                        Chọn tệp tin
                      </Button>
                    </label>
                  </Box>
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
                            src={item}
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
                  text="Lưu"
                  type="default"
                  handleOnClick={() => {
                    formik.handleSubmit();
                  }}
                />
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
export default DialogProduct;
