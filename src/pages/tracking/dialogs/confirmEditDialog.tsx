import { Box, Dialog, DialogContent, DialogTitle, FormHelperText, Grid } from "@mui/material";
import CreateFields, { CreateFieldsProps } from "components/CreateFields";
import { CustomButton } from "components/CustomButton";
import { CustomTextField } from "components/CustomTextField";
import { useFormik } from "formik";
import { CommentDTO } from "models/comment";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { CAPTCHA_KEYS } from "constants/keys";

export interface DialogConfirmEditOrderProps {
  orderId: string;
  openDialog: boolean;
  handleSubmitDialog: (values: any) => void;
  handleCloseDialog: () => void;
}

const DialogConfirmEditOrder = (props: DialogConfirmEditOrderProps) => {
  const { t } = useTranslation(["commons", "tracking"]);

  const validationSchema = Yup.object().shape({
    captcha: Yup.string().required("Vui lòng xác thực mã captcha"),
  });

  const closeDialog = () => {
    formik.resetForm();
    props.handleCloseDialog();
  };

  const handleSubmitForm = async (comment: CommentDTO) => {
    props.handleSubmitDialog({ ...comment, message: "Đã chỉnh sửa đơn hàng với nội dung: " + comment.message });
    props.handleCloseDialog();
  };

  const formik = useFormik({
    initialValues: { orderId: props.orderId, message: "", fromEdit: true, captcha: "" } as CommentDTO,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  const fields: CreateFieldsProps<CommentDTO, any>[] = [
    {
      label: "",
      name: "message",
      Component: CustomTextField,
      required: true,
      multiline: true,
      xs: 12,
    },
  ];

  return (
    <Dialog fullWidth maxWidth="sm" open={props.openDialog} onClose={closeDialog}>
      <DialogTitle>
        <Box component="span">{t("tracking:tracking_edit_title")}</Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box>
          <Grid container>
            <Grid item xs={12} sx={{ marginBottom: 2, paddingX: "10px", lineHeight: 1.5 }}>
              {t("tracking:tracking_edit_content")}
            </Grid>
            <CreateFields formik={formik} fields={fields} />
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "end",
                paddingRight: "10px",
                paddingBottom: "20px",
                flexDirection: "column",
              }}
            >
              <ReCAPTCHA
                style={{ display: "inline-block" }}
                theme="light"
                ref={React.createRef()}
                sitekey={CAPTCHA_KEYS.PRODUCTION.siteKey}
                onChange={(value: any) => {
                  // console.log("aaaa", value);
                  formik.setFieldValue("captcha", value);
                }}
                asyncScriptOnLoad={() => {}}
              />
              <FormHelperText
                sx={{
                  color: "red",
                }}
              >
                {formik.errors["captcha"] && formik.errors["captcha"]}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Box sx={{ display: "flex", gap: 1.5, paddingX: "10px", marginBottom: 1 }}>
                <CustomButton
                  text={t("commons:button_confirm")}
                  type="rounded"
                  startIcon="checkCircle"
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
export default DialogConfirmEditOrder;
