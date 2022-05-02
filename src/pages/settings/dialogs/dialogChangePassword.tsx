import { Box, Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import CreateFields, { CreateFieldsProps } from "components/CreateFields";
import { CustomButton } from "components/CustomButton";
import { CustomTextField } from "components/CustomTextField";
import { useFormik } from "formik";
import { initDataUser, UserDTO } from "models/user";
import * as Yup from "yup";

export interface DialogChangePasswordProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
}

const DialogChangePassword = (props: DialogChangePasswordProps) => {
  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().trim().required("Current password must not be empty"),
    newPassword: Yup.string().trim().required("New password must not be empty"),
    confirmPassword: Yup.string().trim().required("Confirm new password must not be empty"),
  });

  const formik = useFormik({
    initialValues: initDataUser,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  const fields: CreateFieldsProps<any, any>[] = [
    {
      label: "Current password",
      name: "currentPassword",
      type: "password",
      xs: 12,
      required: true,
      Component: CustomTextField,
    },
    {
      label: "New password",
      name: "newPassword",
      type: "password",
      helperText:
        "Password must have at least 8 characters, 1 upper case, 1 lower case, 1 number, and 1 special character",
      xs: 12,
      required: true,
      Component: CustomTextField,
    },
    {
      label: "Confirm new password",
      name: "confirmPassword",
      type: "password",
      xs: 12,
      required: true,
      Component: CustomTextField,
    },
  ];

  function closeDialog() {
    formik.resetForm();
    props.handleCloseDialog();
  }

  async function handleSubmitForm(values: UserDTO) {
    console.log("values", values);
    // closeDialog();
  }

  return (
    <Dialog fullWidth maxWidth="sm" open={props.openDialog} onClose={closeDialog}>
      <DialogTitle>
        <Box component="span">{"CHANGE PASSWORD"}</Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box>
          <Grid container>
            <CreateFields formik={formik} fields={fields} />
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
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
export default DialogChangePassword;
