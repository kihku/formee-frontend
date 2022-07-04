import { Box, Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import CreateFields, { CreateFieldsProps } from "components/CreateFields";
import { CustomButton } from "components/CustomButton";
import { CustomTextField } from "components/CustomTextField";
import { useFormik } from "formik";
import { CommentDTO } from "models/comment";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

export interface DialogRequestMessageProps {
  orderId: string;
  openDialog: boolean;
  handleSubmitDialog: (result: CommentDTO) => void;
  handleCloseDialog: () => void;
}

const DialogRequestMessage = (props: DialogRequestMessageProps) => {
  const { t } = useTranslation(["orders", "commons"]);

  const validationSchema = Yup.object().shape({});

  const closeDialog = () => {
    formik.resetForm();
    props.handleCloseDialog();
  };

  const handleSubmitForm = async (values: CommentDTO) => {
    props.handleSubmitDialog(values);
    closeDialog();
  };

  const formik = useFormik({
    initialValues: { orderId: props.orderId, message: "" } as CommentDTO,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  const fields: CreateFieldsProps<CommentDTO, any>[] = [
    {
      label: "",
      name: "message",
      Component: CustomTextField,
      multiline: true,
      xs: 12,
    },
  ];

  return (
    <Dialog fullWidth maxWidth="sm" open={props.openDialog} onClose={closeDialog}>
      <DialogTitle>
        <Box component="span">{t("order_edit_confirm")}</Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box>
          <Grid container>
            <Grid item xs={12} sx={{ marginBottom: 2, paddingX: "10px", lineHeight: 1.5 }}>
              {t("order_edit_message")}
            </Grid>
            <CreateFields formik={formik} fields={fields} />
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Box sx={{ display: "flex", gap: 1.5, paddingX: "10px", marginBottom: 1 }}>
                <CustomButton
                  text={t("commons:button_confirm")}
                  type="rounded"
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
export default DialogRequestMessage;
