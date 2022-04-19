import { Box, Divider, Grid, InputLabel } from "@mui/material";
import { CustomSwitch } from "components/CustomSwitch";
import { COLORS } from "styles";

function NotificationSettings() {
  return (
    <Box>
      <Box sx={{ fontWeight: 700, color: COLORS.primary, fontSize: "24px", marginBottom: 4 }}>Notifications</Box>
      <Box>
        <Grid container>
          <Grid item xs={4}>
            <InputLabel shrink sx={{ color: "#24354f", fontSize: "18px", fontWeight: 500, textTransform: "uppercase" }}>
              Notification type
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
              Push
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
              Email
            </InputLabel>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Divider sx={{ width: "100%", borderBottomWidth: "2px" }} />
          </Grid>
          <Grid item xs={6}></Grid>
          {["New comments", "New orders", "Order confirmation", "Order changes"].map((item, key) => {
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
  );
}

export default NotificationSettings;
