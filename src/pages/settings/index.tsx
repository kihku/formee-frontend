import { Box, Divider, Grid } from "@mui/material";
import { COLORS } from "styles";

function SettingsPage() {
  return (
    <Grid container sx={{ marginTop: 5, paddingX: 15 }}>
      <Grid item xs={12} sx={{ fontWeight: 700, fontSize: "28px", textAlign: "start", marginBottom: 4 }}>
        Account Settings
      </Grid>
      <Grid item xs={3} sx={{ display: "flex", flexDirection: "column", gap: 3, cursor: "pointer" }}>
        <Box sx={{ fontWeight: 700, color: COLORS.primary }}>Account details</Box>
        <Box>Notifications</Box>
      </Grid>
      <Grid item xs={9}>
        <Box sx={{ fontWeight: 700, color: COLORS.primary, fontSize: "24px", marginBottom: 3 }}>Account details</Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ fontWeight: 700, fontSize: "18px" }}>Personal information</Box>
          <Box>
            <Divider />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SettingsPage;
