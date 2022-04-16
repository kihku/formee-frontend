import "./App.css";
import { Grid } from "@mui/material";
import { CustomTitle } from "./components/CustomTitle";
import { CustomIcon } from "components/CustomIcon";
import { COLORS } from "styles";
import { CustomChip } from "components/CustomChip";
import { CustomButton } from "components/CustomButton";
import { GoogleLoginButton } from "./firebase/googleLoginButton";

function App() {
  return (
    <div className="App">
      <Grid container className="text-title">
        <Grid item xs={12} sx={{ fontSize: "100px" }}>
          <CustomTitle
            text={[
              { text: "Order", highlight: true },
              { text: "/", highlight: false },
              { text: "Gallery", highlight: false },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomIcon name="settings" />
          <CustomIcon name="about" size={75} color={COLORS.primary} />
        </Grid>
        <Grid item xs={12}>
          <CustomChip text="fast food" color="red"></CustomChip>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", gap: "10px" }}>
          {/* <CustomButton text="button" startIcon="settings" type="default" />
          <CustomButton text="button" endIcon="settings" type="rounded" color={COLORS.text} />
          <CustomButton text="button" endIcon="settings" type="outlined" color={"white"} /> */}
          <GoogleLoginButton></GoogleLoginButton>
          <CustomButton
            color={"white"}
            text="button"
            endIcon="settings"
            type="rounded-outlined"
            handleOnClick={() => {
              alert("clicked");
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
