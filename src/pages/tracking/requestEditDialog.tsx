import { Box, Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import { CommentService } from "apis/commentService/commentService";
import CreateFields, { CreateFieldsProps } from "components/CreateFields";
import { CustomButton } from "components/CustomButton";
import { CustomTextField } from "components/CustomTextField";
import { useFormik } from "formik";
import { CommentDTO } from "models/comment";
import { useDispatch } from "react-redux";
import { openNotification } from "redux/actions/notification";
import * as Yup from "yup";

export interface DialogRequestEditOrderProps {
  orderId: string;
  openDialog: boolean;
  handleCloseDialog: (result: CommentDTO) => void;
}

const DialogRequestEditOrder = (props: DialogRequestEditOrderProps) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    message: Yup.string().trim().required("Vui lòng nhập lời nhắn cho người bán"),
  });

  const closeDialog = (result: CommentDTO) => {
    formik.resetForm();
    props.handleCloseDialog(result);
  };

  const handleSubmitForm = async (values: CommentDTO) => {
    await new CommentService().createComment(values).then(response => {
      if (Number(response.code) === 200) {
        dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
        closeDialog(response.result);
      }
    });
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
      required: true,
      multiline: true,
      xs: 12,
    },
  ];

  return (
    <Dialog fullWidth maxWidth="sm" open={props.openDialog} onClose={closeDialog}>
      <DialogTitle>
        <Box component="span">{"Yêu cầu chỉnh sửa đơn hàng"}</Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box>
          <Grid container>
            <Grid item xs={12} sx={{ marginBottom: 2, paddingX: "10px", lineHeight: 1.5 }}>
              {
                "Vui lòng để lại lời nhắn cho người bán để yêu cầu chỉnh sửa thông tin."
              }
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
                    closeDialog({} as CommentDTO);
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
export default DialogRequestEditOrder;
