import { Box, Grid } from "@mui/material";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomIcon, IconType } from "components/CustomIcon";
import { CustomOption } from "models/baseModels";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { COLORS } from "styles";
import CommonUtils from "utils/commonUtils";
import AccountSettings from "./tabs/account";
import NotificationSettings from "./tabs/notification";

function SettingsPage() {
  const { t } = useTranslation(["settings", "commons"]);
  const [chosenTab, setChosenTab] = useState("account");

  const settingOptions: CustomOption[] = [
    {
      title: t("settings_account_title"),
      value: "account",
      icon: "person",
      component: <AccountSettings tab={chosenTab} />,
    },
    // {
    //   title: t("settings_noti_title"),
    //   value: "notification",
    //   icon: "notification",
    //   component: <NotificationSettings tab={chosenTab} />,
    // },
  ];

  useEffect(() => {
    CommonUtils.setPageTitle(t("commons:title_settings"));
  }, []);

  return (
    <Box>
      <Grid container sx={{ paddingTop: 5, paddingBottom: 8, paddingX: 15 }}>
        <Grid
          item
          xs={12}
          sx={{
            fontWeight: 800,
            fontSize: "25px",
            textAlign: "start",
            marginBottom: 4,
            color: COLORS.text,
            letterSpacing: 0.75,
          }}
        >
          {t("settings_title")}
        </Grid>
        <Grid item xs={2.5} sx={{ display: "flex", flexDirection: "column" }}>
          {settingOptions.map((opt, key) => {
            return (
              <Box
                key={key}
                onClick={() => {
                  setChosenTab(opt.value);
                }}
                sx={{
                  marginBottom: 1,
                  fontWeight: 700,
                  color: chosenTab === opt.value ? COLORS.primary : COLORS.text,
                  backgroundColor: chosenTab === opt.value ? COLORS.primaryBackground : "",
                  paddingLeft: 2,
                  paddingY: 2,
                  borderRadius: "5px 100px 100px 5px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: 1,
                  transition: "all 0.15s ease",
                  cursor: "pointer",
                  ":hover": {
                    backgroundColor: COLORS.primaryBackground,
                  },
                }}
              >
                <CustomIcon
                  name={opt.icon as IconType}
                  color={chosenTab === opt.value ? COLORS.primary : COLORS.text}
                  size={24}
                />
                <Box sx={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{opt.title}</Box>
              </Box>
            );
          })}
        </Grid>
        <Grid item xs={9.5} sx={{ paddingX: 5 }}>
          <CustomBackgroundCard sizeX="100%" sizeY="auto">
            {settingOptions.find(opt => opt.value === chosenTab)?.component}
          </CustomBackgroundCard>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SettingsPage;
