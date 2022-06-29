import { Box, Dialog, DialogContent, DialogTitle, FormHelperText, Grid, InputLabel } from "@mui/material";
import { CustomButton } from "components/CustomButton";
import { StyledInput } from "components/CustomTextField";
import { productTypeColors } from "constants/constants";
import { useFormik } from "formik";
import { initProductType, ProductTypeDTO } from "models/product";
import StringUtils from "utils/stringUtils";
import * as Yup from "yup";

export interface DialogAddProductTypeProps {
  itemEdit: ProductTypeDTO;
  openDialog: boolean;
  handleSubmitDialog: (values: ProductTypeDTO) => void;
  handleCloseDialog: () => void;
}

const DialogAddProductType = ({
  itemEdit,
  openDialog,
  handleCloseDialog,
  handleSubmitDialog,
}: DialogAddProductTypeProps) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("Tên loại sản phẩm không được bỏ trống"),
  });

  const formik = useFormik({
    initialValues: StringUtils.isNullOrEmty(itemEdit.uuid) ? initProductType : itemEdit,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  function closeDialog() {
    formik.resetForm();
    handleCloseDialog();
  }

  async function handleSubmitForm(values: ProductTypeDTO) {
    handleSubmitDialog(values);
  }

  return (
    <Dialog fullWidth maxWidth="sm" open={openDialog} onClose={closeDialog}>
      <DialogTitle>
        <Box component="span">{`${
          StringUtils.isNullOrEmty(itemEdit.uuid) ? "Thêm mới" : "Chỉnh sửa"
        } loại sản phẩm`}</Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box>
          <Grid container>
            <Grid item xs={12} sx={{ paddingX: 1 }}>
              <Grid container>
                {/* name */}
                <Grid item xs={12}>
                  <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                    {"Tên loại sản phẩm *"}
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
                <Grid item xs={12} sx={{ marginBottom: 2 }}>
                  <FormHelperText
                    sx={{
                      color: "red",
                    }}
                  >
                    {formik.errors["name"] && formik.errors["name"]}
                  </FormHelperText>
                </Grid>

                {/* color */}
                <Grid item xs={2}>
                  <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                    {"Màu sắc"}
                  </InputLabel>
                </Grid>
                <Grid item xs={10} sx={{ display: "flex", flexDirction: "row", gap: 2 }}>
                  {productTypeColors.map(color => {
                    return (
                      <Box
                        sx={{
                          width: 30,
                          height: 30,
                          backgroundColor: `${color.title}`,
                          borderRadius: 50,
                          cursor: "pointer",
                          outline: formik.values.color === color.title ? `${color.title} solid 2px` : "",
                          outlineOffset: formik.values.color === color.title ? 4 : 0,
                        }}
                        onClick={() => {
                          formik.setFieldValue("color", color.title);
                          formik.setFieldValue("backgroundColor", color.value);
                        }}
                      />
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}>
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
export default DialogAddProductType;
