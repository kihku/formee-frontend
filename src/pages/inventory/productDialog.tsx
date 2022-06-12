import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputLabel, styled } from "@mui/material";
import { ProductService } from "apis/productService/productService";
import CreateFields, { CreateFieldsProps } from "components/CreateFields";
import { CustomButton } from "components/CustomButton";
import { CustomTextField, StyledInput } from "components/CustomTextField";
import { useFormik } from "formik";
import { initProduct, ProductDTO } from "models/product";
import { ChangeEvent, useEffect, useState } from "react";
import * as Yup from "yup";

export interface DialogProductProps {
  itemEdit: ProductDTO;
  openDialog: boolean;
  handleCloseDialog: () => void;
}

const DialogProduct = ({ itemEdit, openDialog, handleCloseDialog }: DialogProductProps) => {
  //   const [image, setImage] = useState<any>();

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

  //   const fields: CreateFieldsProps<ProductDTO, any>[] = [
  //     {
  //       label: "Product name",
  //       name: "name",
  //       xs: 6,
  //       required: true,
  //       Component: CustomTextField,
  //     },
  //     {
  //       label: "Product price",
  //       name: "productPrice",
  //       type: "number",
  //       xs: 6,
  //       required: true,
  //       Component: CustomTextField,
  //     },
  //   ];

  function closeDialog() {
    formik.resetForm();
    handleCloseDialog();
  }

  async function handleSubmitForm(values: ProductDTO) {
    console.log("values", values);
    // await new ProductService()
    //   .uploadImageToServer(formik.values.image, formik.values.uuid)
    //   .then(response => console.log(response));

    await new ProductService().createProduct({ ...values }).then(response => {
      console.log(response);
      closeDialog();
    });
    // closeDialog();
  }

  async function handleImport(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      try {
        formik.setFieldValue("image", e.target.files[0]);
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
          formik.setFieldValue("imageBase64", reader.result);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    formik.setValues(itemEdit);
  }, [itemEdit]);

  return (
    <Dialog fullWidth maxWidth="md" open={openDialog} onClose={closeDialog}>
      <DialogTitle>
        <Box component="span">{"EDIT PRODUCT"}</Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box>
          <Grid container>
            {/* <CreateFields formik={formik} fields={fields} /> */}
            <Grid item xs={6} sx={{ paddingX: 1 }}>
              <Grid container>
                <Grid item xs={12}>
                  <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                    {"Product name *"}
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
                    {"Product price *"}
                  </InputLabel>
                </Grid>
                <Grid item xs={12}>
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
              </Grid>
            </Grid>

            <Grid item xs={6} sx={{ paddingX: 1 }}>
              <Grid container>
                <Grid item xs={12}>
                  <Box display="flex" flexDirection="row" alignItems="center" paddingBottom="15px">
                    <InputLabel sx={{ paddingLeft: 1, fontWeight: 500 }}>Add product image</InputLabel>
                    <input
                      accept="image/*"
                      hidden={true}
                      id="contained-button-file"
                      multiple={false}
                      type="file"
                      onChange={handleImport}
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="outlined"
                        size="small"
                        component="span"
                        disableElevation
                        style={{ marginLeft: 8, height: "32px" }}
                      >
                        Choose file
                      </Button>
                    </label>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  {formik.values.imageBase64 !== "" &&
                    formik.values.imageBase64 !== undefined &&
                    formik.values.imageBase64 !== null && (
                      <Box display="flex" alignItems="center" flexDirection="row">
                        <img
                          src={formik.values.imageBase64}
                          alt="thumbnail"
                          width="300"
                          height="300"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            placeContent: "center",
                          }}
                        />
                      </Box>
                    )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
              <Box sx={{ display: "flex", gap: 1.5, paddingX: "10px", marginBottom: 1 }}>
                <CustomButton
                  text="Save"
                  type="default"
                  handleOnClick={() => {
                    formik.handleSubmit();
                  }}
                />
                <CustomButton
                  text="Close"
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
