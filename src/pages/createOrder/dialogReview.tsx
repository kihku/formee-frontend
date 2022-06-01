import { Avatar, Box, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Tooltip } from "@mui/material";
import { CustomTextField } from "components/CustomTextField";
import { CustomTitle } from "components/CustomTitle";
import { useFormik } from "formik";
import { CommentDTO, FormDTO, FormResponseDTO, FormSectionDTO } from "models/form";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { CustomIcon } from "components/CustomIcon";
import { COLORS } from "styles";
import CreateFieldsForm, { CreateFieldsFormProps } from "components/CreateFieldsForm";
import { CustomButton } from "components/CustomButton";
import { OrderService } from "apis/orderService/orderService";

export interface DialogReviewOrderProps {
  formik: any;
  fields: FormSectionDTO[];
  form: FormDTO;
  openDialog: boolean;
  handleCloseDialog: () => void;
}

const DialogReviewOrder = ({ formik, fields, form, openDialog, handleCloseDialog }: DialogReviewOrderProps) => {
  const { t } = useTranslation(["orders"]);

  function closeDialog() {
    handleCloseDialog();
  }

  async function handleSubmitForm(values: FormResponseDTO) {
    console.log("values", values);
    await new OrderService().createOrder({ ...values, response: JSON.stringify(values.response) }).then(response => {
    //   console.log("result", response.result);
      closeDialog();
    });
  }

  return (
    <Dialog fullWidth maxWidth="lg" open={openDialog} onClose={closeDialog}>
      <DialogTitle>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <CustomTitle
              text={[
                { text: form.name, highlight: false },
                { text: "/", highlight: false },
                { text: "Order Confirmation", highlight: true },
              ]}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Tooltip title={t("order_download")}>
              <IconButton>
                <CustomIcon name="download" color={COLORS.primary} />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("order_link")}>
              <IconButton>
                <CustomIcon name="copyLink" color={COLORS.primary} />
              </IconButton>
            </Tooltip>
            <IconButton onClick={closeDialog}>
              <CustomIcon name="close" size={30} />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container>
          <Grid item xs={12} sx={{ paddingX: 1.5, paddingTop: 1.5 }}>
            <CreateFieldsForm enableEditing={false} disabled formik={formik} sections={fields} />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Box sx={{ display: "flex", gap: 1.5, paddingX: "10px", marginBottom: 1 }}>
              <CustomButton
                text="Back"
                type="outlined"
                handleOnClick={() => {
                  closeDialog();
                }}
              />
              <CustomButton
                text="Confirm"
                type="default"
                startIcon="save"
                handleOnClick={() => {
                  handleSubmitForm(formik.values);
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
export default DialogReviewOrder;
