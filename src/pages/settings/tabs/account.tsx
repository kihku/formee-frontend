import { Box, Divider, Fade, Grid } from "@mui/material";
import CreateFields, { CreateFieldsProps } from "components/CreateFields";
import { CustomButton } from "components/CustomButton";
import { CustomTextField } from "components/CustomTextField";
import { useFormik } from "formik";
import { initDataUser, UserDTO } from "models/user";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { COLORS } from "styles";
import * as Yup from "yup";
import DialogChangePassword from "../dialog/dialogChangePassword";

interface AccountSettingsProps {
  tab: string;
}

function AccountSettings(props: AccountSettingsProps) {
  const { t } = useTranslation(["settings", "buttons"]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({});

  const handleSubmit = (values: UserDTO) => {
    console.log("values", values);
  };

  const formik = useFormik({
    initialValues: initDataUser,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  const fieldsInfo: CreateFieldsProps<UserDTO, any>[] = [
    {
      label: t("settings_account_info_first_name"),
      name: "firstName",
      xs: 3,
      Component: CustomTextField,
    },
    {
      label: t("settings_account_info_last_name"),
      name: "lastName",
      xs: 3,
      Component: CustomTextField,
    },
    {
      xs: 6,
    },
    {
      label: t("settings_account_info_bday"),
      name: "birthDate",
      xs: 3,
      Component: CustomTextField,
    },
    {
      label: t("settings_account_info_phone"),
      name: "phoneNumber",
      xs: 3,
      Component: CustomTextField,
    },
  ];

  const fieldsAccount: CreateFieldsProps<UserDTO, any>[] = [
    {
      label: t("settings_account_email"),
      name: "email",
      xs: 3,
      Component: CustomTextField,
    },
    {
      label: t("settings_account_password"),
      name: "password",
      helplerText: t("settings_account_password_change"),
      handleOnClickHelperText: () => {
        setOpenDialog(true);
      },
      xs: 3,
      Component: CustomTextField,
    },
  ];

  return (
    <Fade in={props.tab === "account"}>
      <Box>
        <Box sx={{ fontWeight: 700, color: COLORS.primary, fontSize: "24px", marginBottom: 4 }}>{t("settings_account_title")}</Box>
        <Box sx={{ marginBottom: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ fontWeight: 600, fontSize: "18px", width: "25%" }}>{t("settings_account_info")}</Box>
            <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
              <Divider sx={{ width: "100%", borderBottomWidth: "2px" }} />
            </Box>
          </Box>
          <Grid container sx={{ marginTop: 4 }}>
            <CreateFields fields={fieldsInfo} formik={formik} />
            <Grid item xs={12} sx={{ paddingX: "10px" }}>
              <CustomButton
                text={t("button_save")}
                type="outlined"
                startIcon="save"
                handleOnClick={() => {
                  formik.handleSubmit();
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ fontWeight: 600, fontSize: "18px", width: "25%" }}>{t("settings_account")}</Box>
            <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
              <Divider sx={{ width: "100%", borderBottomWidth: "2px" }} />
            </Box>
          </Box>
          <Grid container sx={{ marginTop: 4 }}>
            <CreateFields fields={fieldsAccount} formik={formik} />
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "15px", paddingX: "10px" }}>
                <CustomButton text={t("button_save")} type="outlined" startIcon="save" />
                <CustomButton text={t("button_log_out")} type="default" startIcon="logout" />
              </Box>
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
