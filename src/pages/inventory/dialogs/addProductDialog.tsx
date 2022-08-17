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
  Select,
} from "@mui/material";
import { ProductService } from "apis/productService/productService";
import { CustomButton } from "components/CustomButton";
import { StyledInput } from "components/CustomTextField";
import { useFormik } from "formik";
import { initProduct, ProductDTO, ProductTypeDTO } from "models/product";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import Carousel from "react-material-ui-carousel";
import StringUtils from "utils/stringUtils";
import * as Yup from "yup";

export interface DialogAddProductProps {
  openDialog: boolean;
  productTypes: ProductTypeDTO[];
  handleCloseDialog: () => void;
  selectedTypeId: string;
}

const DialogAddProduct = ({ openDialog, handleCloseDialog, productTypes, selectedTypeId }: DialogAddProductProps) => {
  const { t } = useTranslation(["commons", "products", "messages"]);

  const [imageList, setImageList] = useState<string[]>([]);
  const [fileList, setFileList] = useState<File[]>([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required(t("messages:messages_empty_product_name")),
    productPrice: Yup.string().trim().required(t("messages:messages_empty_product_price")),
    costPrice: Yup.string().trim().required(t("messages:messages_empty_product_price")),
    inventory: Yup.string().trim().required(t("messages:messages_empty_product_inventory")),
  });

  const formik = useFormik({
    initialValues: StringUtils.isNullOrEmty(selectedTypeId) ? initProduct : { ...initProduct, typeId: selectedTypeId },
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
        <Box component="span">{t("products:products_create")}</Box>
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
                    {/* {"Tên sản phẩm *"} */}
                    {t("products:products_name")}
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
                    {/* {"Mô tả"} */}
                    {t("products:products_description")}
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 2 }}>
                  <StyledInput
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.description}
                    onChange={e => {
                      formik.setFieldValue("description", e.target.value);
                    }}
                  />
                </Grid>

                {/* type */}
                <Grid item xs={12}>
                  <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                    {/* {"Loại sản phẩm"} */}
                    {t("products:products_type")}
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

                {/* cost price */}
                <Grid item xs={12}>
                  <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                    {/* {"Giá gốc *"} */}
                    {t("products:products_cost_price")}
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 1 }}>
                  <StyledInput
                    fullWidth
                    type="number"
                    value={formik.values.costPrice}
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
                    {/* {"Giá bán *"} */}
                    {t("products:products_product_price")}
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
                    {/* {"Số lượng trong kho *"} */}
                    {t("products:products_inventory")}
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
                  <Carousel autoPlay={false}>
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
                    {/* {"Hình ảnh"} */}
                    {t("products:products_image")}
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
                        {/* Chọn tệp tin */}
                        {t("products:products_image_upload")}
                      </Button>
                    </label>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
              <Box sx={{ display: "flex", gap: 1.5, paddingX: "10px", marginBottom: 1 }}>
                <CustomButton
                  text={t("commons:button_save")}
                  type="rounded"
                  startIcon="save"
                  handleOnClick={() => {
                    formik.handleSubmit();
                  }}
                />
                <CustomButton
                  text={t("commons:button_close")}
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
