import { Box, Divider, Fade, Grid } from "@mui/material";
import { CustomButton } from "components/CustomButton";
import { CustomTextField } from "components/CustomTextField";
import { COLORS } from "styles";

interface AccountSettingsProps {
  tab: string;
}

function AccountSettings(props: AccountSettingsProps) {
  return (
    <Fade in={props.tab === "account"}>
      <Box>
        <Box sx={{ fontWeight: 700, color: COLORS.primary, fontSize: "24px", marginBottom: 4 }}>Account Details</Box>
        <Box sx={{ marginBottom: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ fontWeight: 600, fontSize: "18px", width: "25%" }}>Personal information</Box>
            <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
              <Divider sx={{ width: "100%", borderBottomWidth: "2px" }} />
            </Box>
          </Box>
          <Grid container sx={{ marginTop: 4 }}>
            <Grid item xs={6} sx={{ marginBottom: 4, display: "flex", flexDirection: "row" }}>
              <Grid item>
                <CustomTextField label="FIRST NAME" handleOnChange={e => {}} />
              </Grid>
              <Grid item sx={{ paddingX: "25px" }}>
                <CustomTextField label="LAST NAME" handleOnChange={e => {}} />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              {/* Avatar */}
            </Grid>
            <Grid item xs={6} sx={{ marginBottom: 4, display: "flex", flexDirection: "row" }}>
              <Grid item>
                <CustomTextField label="BIRTHDATE" handleOnChange={e => {}} />
              </Grid>
              <Grid item sx={{ paddingX: "25px" }}>
                <CustomTextField label="PHONE NUMBER" handleOnChange={e => {}} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <CustomButton text="Save changes" type="outlined" startIcon="save" />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ fontWeight: 600, fontSize: "18px", width: "25%" }}>Account</Box>
            <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
              <Divider sx={{ width: "100%", borderBottomWidth: "2px" }} />
            </Box>
          </Box>
          <Grid container sx={{ marginTop: 4 }}>
            <Grid item xs={6} sx={{ marginBottom: 4, display: "flex", flexDirection: "row" }}>
              <Grid item>
                <CustomTextField label="EMAIL" handleOnChange={e => {}} />
              </Grid>
              <Grid item sx={{ paddingX: "25px" }}>
                <CustomTextField label="PASSWORD" handleOnChange={e => {}} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "15px" }}>
                <CustomButton text="Save changes" type="outlined" startIcon="save" />
                <CustomButton text="Log out" type="default" startIcon="logout" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Fade>
  );
}

export default AccountSettings;
