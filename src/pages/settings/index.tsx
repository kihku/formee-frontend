import { Box, Grid } from "@mui/material";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomIcon, IconType } from "components/CustomIcon";
import { CustomOption } from "models/baseModels";
import { useState } from "react";
import { COLORS } from "styles";
import AccountSettings from "./account";
import NotificationSettings from "./notification";

function SettingsPage() {
  const [chosenTab, setChosenTab] = useState("account");

  const settingOptions: CustomOption[] = [
    { title: "Account details", value: "account", icon: "person", component: <AccountSettings tab={chosenTab} /> },
    {
      title: "Notifications",
      value: "notification",
      icon: "notification",
      component: <NotificationSettings tab={chosenTab} />,
    },
  ];

  return (
    <Box>
      <Grid container sx={{ marginTop: 5, marginBottom: 8, paddingX: 15 }}>
        <Grid
          item
          xs={12}
          sx={{ fontWeight: 800, fontSize: "30px", textAlign: "start", marginBottom: 4, color: COLORS.text }}
        >
          ACCOUNT SETTINGS
        </Grid>
        <Grid item xs={2} sx={{ display: "flex", flexDirection: "column" }}>
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
                  backgroundColor: chosenTab === opt.value ? "#eeefff" : "#ffffff",
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
                    backgroundColor: COLORS.background,
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
        <Grid item xs={10} sx={{ paddingX: 5 }}>
          <CustomBackgroundCard sizeX="100%" sizeY="auto">
            {settingOptions.find(opt => opt.value === chosenTab)?.component}
          </CustomBackgroundCard>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SettingsPage;
