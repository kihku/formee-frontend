import { Box, Button, Grid, IconButton, InputLabel } from "@mui/material";
import { useState } from "react";
import { COLORS } from "styles";

export const ImagePicker = () => {
  const [icon, setIcon] = useState<string>("");

  const handleUploadClick = (e: any) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setIcon("data:image/x-icon;base64," + reader.result?.toString().split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Grid container>
      <Grid item xs={3} className="grid-item">
        <InputLabel style={{ marginBottom: 0 }}>Icon</InputLabel>
        <Grid container style={{ flexDirection: "row" }}>
          <input
            accept="image/*"
            hidden={true}
            id="contained-button-file"
            multiple={false}
            type="file"
            onChange={handleUploadClick}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="outlined"
              size="small"
              color="primary"
              component="span"
              disableElevation
              style={{ marginRight: "10px", height: "32px", color: "#7f7f7f" }}
            >
              Choose file
            </Button>
            {/* <CustomButton
              text="button"
              type="default"
              
              // variant="outlined"
              // size="small"
              // color="default"
              // component="span"
              // disableElevation
              // style={{ marginRight: "10px", height: "32px", color: "#7f7f7f" }}
            /> */}
          </label>
          {icon !== "" && icon !== undefined && icon !== null && (
            <Box display="flex" alignItems="center" flexDirection="row">
              <img
                src={icon}
                alt="thumbnail"
                width="30"
                height="30"
                style={{
                  backgroundColor: COLORS.primary,
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  placeContent: "center",
                }}
              />
              <IconButton
                color="primary"
                aria-label="remove"
                size="small"
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  setIcon("");
                }}
                name="remove"
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
