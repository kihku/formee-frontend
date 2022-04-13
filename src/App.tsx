import "./App.css";
import { Grid } from "@mui/material";
import { Title } from "./components/Title";

function App() {
  return (
    <div className="App">
      <Grid container className="text-title">
        <Grid item xs={12} sx={{fontSize: "100px" }}>
         <Title text={[{text:"Order", highlight: true},{text:"/", highlight: false},{text:"Gallery", highlight: false}]} /> 
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
