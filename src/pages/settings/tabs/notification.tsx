import { Box, Divider, Fade, Grid, InputLabel } from "@mui/material";
import { CustomSwitch } from "components/CustomSwitch";
import { useTranslation } from "react-i18next";
import { COLORS } from "styles";

interface NotificationSettingsProps {
  tab: string;
}

function NotificationSettings(props: NotificationSettingsProps) {
  const { t } = useTranslation(["settings", "buttons"]);

  return (
    <Fade in={props.tab === "notification"}>
      <Box>
        <Box sx={{ fontWeight: 700, color: COLORS.primary, fontSize: "24px", marginBottom: 4 }}>
          {t("settings_noti_title")}
        </Box>
        <Box>
          <Grid container>
            <Grid item xs={4}>
              <InputLabel
                shrink
                sx={{ color: "#24354f", fontSize: "18px", fontWeight: 500, textTransform: "uppercase" }}
              >
                {t("settings_noti_type")}
              </InputLabel>
            </Grid>
            <Grid item xs={1}>
              <InputLabel
                shrink
                sx={{
                  color: "#24354f",
                  fontSize: "18px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  paddingLeft: 2,
                }}
              >
                {t("settings_noti_push")}
              </InputLabel>
            </Grid>
            <Grid item xs={1}>
              <InputLabel
                shrink
                sx={{
                  color: "#24354f",
                  fontSize: "18px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  paddingLeft: 1,
                }}
              >
                {t("settings_noti_email")}
              </InputLabel>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <Divider sx={{ width: "100%", borderBottomWidth: "2px" }} />
            </Grid>
            <Grid item xs={6}></Grid>
            {[
              t("settings_noti_type_comments"),
              t("settings_noti_type_orders"),
              t("settings_noti_type_order_confirm"),
              t("settings_noti_type_order_change"),
            ].map((item, key) => {
              return (
                <Grid
                  item
                  key={key}
                  xs={12}
                  sx={{
                    paddingY: 1,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  <Grid item xs={4}>
                    {item}
                  </Grid>
                  <Grid item xs={1}>
                    <CustomSwitch handleOnChange={e => {}} />
                  </Grid>
                  <Grid item xs={1}>
                    <CustomSwitch handleOnChange={e => {}} />
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Fade>
  );
}

export default NotificationSettings;
