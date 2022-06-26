import { Box, Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import CreateFields, { CreateFieldsProps } from "components/CreateFields";
import { CustomButton } from "components/CustomButton";
import { CustomTextField } from "components/CustomTextField";
import { useFormik } from "formik";
import { CommentDTO } from "models/comment";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

export interface DialogConfirmEditOrderProps {
  orderId: string;
  openDialog: boolean;
  handleSubmitDialog: (values: any) => void;
  handleCloseDialog: () => void;
}

const DialogConfirmEditOrder = (props: DialogConfirmEditOrderProps) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({});

  const closeDialog = () => {
    formik.resetForm();
    props.handleCloseDialog();
  };

  const handleSubmitForm = async (comment: CommentDTO) => {
    props.handleSubmitDialog({ ...comment, message: "Đã chỉnh sửa đơn hàng với nội dung: " + comment.message });
    props.handleCloseDialog();
  };

  const formik = useFormik({
    initialValues: { orderId: props.orderId, message: "", fromEdit: true } as CommentDTO,
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
        <Box component="span">{"Xác nhận chỉnh sửa đơn hàng"}</Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box>
          <Grid container>
            <Grid item xs={12} sx={{ marginBottom: 2, paddingX: "10px", lineHeight: 1.5 }}>
              {"Để lại lời nhắn cho người bán (không bắt buộc)."}
            </Grid>
            <CreateFields formik={formik} fields={fields} />
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Box sx={{ display: "flex", gap: 1.5, paddingX: "10px", marginBottom: 1 }}>
                <CustomButton
                  text="Gửi"
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
export default DialogConfirmEditOrder;
