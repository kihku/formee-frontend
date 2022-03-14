import "./App.css";
import { Grid } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Grid container>
        <Grid item xs={12} sx={{ fontSize: "30px", fontWeight: "700" }}>
          setup complete
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
