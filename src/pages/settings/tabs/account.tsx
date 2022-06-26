import { Box, Fade, Grid } from "@mui/material";
import { UserService } from "apis/userService/userService";
import { CustomButton } from "components/CustomButton";
import { StyledInput } from "components/CustomTextField";
import { useFormik } from "formik";
import { UserDTO } from "models/user";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openNotification } from "redux/actions/notification";
import { COLORS } from "styles";
import * as Yup from "yup";
import DialogChangePassword from "../dialogs/dialogChangePassword";

interface AccountSettingsProps {
  tab: string;
}

function AccountSettings(props: AccountSettingsProps) {
  const { t } = useTranslation(["settings", "buttons"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({});

  const handleSubmit = async (values: UserDTO) => {
    await new UserService().updateProfile(values).then(response => {
      if (Number(response.code) === 200) {
        dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
        localStorage.setItem("USER_DATA", JSON.stringify(values));
        navigate(window.location.pathname);
      } else {
        dispatch(openNotification({ open: true, content: response.message, severity: "error" }));
      }
    });
  };

  const formik = useFormik({
    initialValues: JSON.parse(String(localStorage.getItem("USER_DATA"))) as UserDTO,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  return (
    <Fade in={props.tab === "account"}>
      <Box>
        <Box sx={{ fontWeight: 700, color: COLORS.primary, fontSize: "24px", marginBottom: 4 }}>
          {t("settings_account_title")}
        </Box>
        <Box sx={{ marginBottom: 1 }}>
          <Grid container sx={{ marginTop: 4 }}>
            {/* full name */}
            <Grid item xs={3} sx={{ marginBottom: 3 }}>
              <Box>{"Tên tài khoản"}</Box>
            </Grid>
            <Grid item xs={6} sx={{ marginBottom: 3 }}>
              <StyledInput
                value={formik.values.fullName}
                fullWidth
                onChange={e => {
                  formik.setFieldValue("fullName", e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={3} sx={{ marginBottom: 3 }}></Grid>

            {/* phone */}
            <Grid item xs={3} sx={{ marginBottom: 3 }}>
              <Box>{"Số điện thoại"}</Box>
            </Grid>
            <Grid item xs={6} sx={{ marginBottom: 3 }}>
              <StyledInput
                value={formik.values.phone}
                fullWidth
                onChange={e => {
                  formik.setFieldValue("phone", e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={3} sx={{ marginBottom: 3 }}></Grid>

            {/* email */}
            <Grid item xs={3} sx={{ marginBottom: 3 }}>
              <Box>{"Email"}</Box>
            </Grid>
            <Grid item xs={6} sx={{ marginBottom: 3 }}>
              <StyledInput
                value={formik.values.email}
                fullWidth
                onChange={e => {
                  formik.setFieldValue("email", e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={3} sx={{ marginBottom: 3 }}></Grid>

            <Grid item xs={3}></Grid>
            <Grid item xs={9} sx={{ paddingX: "10px" }}>
              <CustomButton
                text={t("button_save")}
                type="rounded-outlined"
                startIcon="save"
                handleOnClick={() => {
                  formik.handleSubmit();
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {openDialog && (
          <DialogChangePassword
            openDialog={openDialog}
            handleCloseDialog={() => {
              setOpenDialog(false);
            }}
          />
        )}
      </Box>
    </Fade>
  );
}

export default AccountSettings;
