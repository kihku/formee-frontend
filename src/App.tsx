import "./App.css";
import { Grid } from "@mui/material";
import { CustomTitle } from "./components/CustomTitle";
import { CustomIcon } from "components/CustomIcon";
import { COLORS } from "styles";

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
          <CustomIcon name="settings" size={75} color={COLORS.primary} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
