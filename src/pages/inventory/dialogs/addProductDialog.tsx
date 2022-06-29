import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import { ProductService } from "apis/productService/productService";
import { CustomButton } from "components/CustomButton";
import { StyledInput } from "components/CustomTextField";
import { useFormik } from "formik";
import { initProduct, ProductDTO, ProductTypeDTO } from "models/product";
import { ChangeEvent, useState } from "react";
import Carousel from "react-material-ui-carousel";
import * as Yup from "yup";

export interface DialogAddProductProps {
  openDialog: boolean;
  productTypes: ProductTypeDTO[];
  handleCloseDialog: () => void;
}

const DialogAddProduct = ({ openDialog, handleCloseDialog, productTypes }: DialogAddProductProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [imageList, setImageList] = useState<string[]>([]);
  const [fileList, setFileList] = useState<File[]>([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("Tên sản phẩm không được bỏ trống"),
    productPrice: Yup.string().trim().required("Giá bán không được bỏ trống"),
    costPrice: Yup.string().trim().required("Giá gốc không được bỏ trống"),
    typeId: Yup.string().trim().required("Loại sản phẩm không được bỏ trống"),
    inventory: Yup.string().trim().required("Số lượng trong kho không được bỏ trống"),
  });

  const formik = useFormik({
    initialValues: initProduct,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  function closeDialog() {
    formik.resetForm();
    handleCloseDialog();
  }

  async function handleSubmitForm(values: ProductDTO) {
    await new ProductService()
      .createProduct({
        ...values,
        sales: 0,
      })
      .then(response => {
        console.log(response);
        new ProductService()
          .uploadImageToServer(fileList, response.result.uuid)
          .then(response => console.log(response));
        closeDialog();
      });
  }

  async function handleImport(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      try {
        let files: File[] = Array.from(e.target.files);
        setFileList(files);
        setImageList(
          files.map((file: any) => {
            return URL.createObjectURL(file);
          }),
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Dialog fullWidth maxWidth="md" open={openDialog} onClose={closeDialog}>
      <DialogTitle>
        <Box component="span">{"Tạo sản phẩm mới"}</Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box>
          <Grid container>
            {/* <CreateFields formik={formik} fields={fields} /> */}
            <Grid item xs={6} sx={{ paddingX: 1 }}>
              <Grid container>
                {/* name */}
                <Grid item xs={12}>
                  <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                    {"Tên sản phẩm *"}
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 1 }}>
                  <StyledInput
                    fullWidth
                    value={formik.values.name}
                    onChange={e => {
                      formik.setFieldValue("name", e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 1 }}>
                  <FormHelperText
                    sx={{
                      color: "red",
                    }}
                  >
                    {formik.errors["name"] && formik.errors["name"]}
                  </FormHelperText>
                </Grid>

                {/* description */}
                <Grid item xs={12}>
                  <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                    {"Mô tả"}
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 2 }}>
                  <StyledInput
                    fullWidth
                    value={formik.values.description}
                    onChange={e => {
                      formik.setFieldValue("description", e.target.value);
                    }}
                  />
                </Grid>

                {/* type */}
                <Grid item xs={12}>
                  <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                    {"Loại sản phẩm *"}
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 1 }}>
                  <Select
                    fullWidth
                    value={formik.values.typeId}
                    onChange={e => {
                      formik.setFieldValue("typeId", e.target.value);
                    }}
                    input={<StyledInput />}
                  >
                    {productTypes.map((option, key) => {
                      return <MenuItem value={option.uuid}>{option.name}</MenuItem>;
                    })}
                  </Select>
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 1 }}>
                  <FormHelperText
                    sx={{
                      color: "red",
                    }}
                  >
                    {formik.errors["typeId"] && formik.errors["typeId"]}
                  </FormHelperText>
                </Grid>

                {/* cost price */}
                <Grid item xs={12}>
                  <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                    {"Giá gốc *"}
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 1 }}>
                  <StyledInput
                    fullWidth
                    type="number"
                    value={formik.values.productPrice}
                    onChange={e => {
                      formik.setFieldValue("costPrice", e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 1 }}>
                  <FormHelperText
                    sx={{
                      color: "red",
                    }}
                  >
                    {formik.errors["costPrice"] && formik.errors["costPrice"]}
                  </FormHelperText>
                </Grid>

                {/* product price */}
                <Grid item xs={12}>
                  <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                    {"Giá bán *"}
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 1 }}>
                  <StyledInput
                    fullWidth
                    type="number"
                    value={formik.values.productPrice}
                    onChange={e => {
                      formik.setFieldValue("productPrice", e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 1 }}>
                  <FormHelperText
                    sx={{
                      color: "red",
                    }}
                  >
                    {formik.errors["productPrice"] && formik.errors["productPrice"]}
                  </FormHelperText>
                </Grid>

                {/* inventory */}
                <Grid item xs={12}>
                  <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                    {"Số lượng trong kho *"}
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 1 }}>
                  <StyledInput
                    fullWidth
                    type="number"
                    value={formik.values.inventory}
                    onChange={e => {
                      formik.setFieldValue("inventory", e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 1 }}>
                  <FormHelperText
                    sx={{
                      color: "red",
                    }}
                  >
                    {formik.errors["inventory"] && formik.errors["inventory"]}
                  </FormHelperText>
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
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
              <Box sx={{ display: "flex", gap: 1.5, paddingX: "10px", marginBottom: 1 }}>
                <CustomButton
                  text="Lưu"
                  type="rounded"
                  startIcon="save"
                  handleOnClick={() => {
                    formik.handleSubmit();
                  }}
                />
                <CustomButton
                  text="Đóng"
                  type="rounded-outlined"
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
export default DialogAddProduct;
