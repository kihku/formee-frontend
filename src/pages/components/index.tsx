import { Grid } from "@mui/material";
import { CustomIcon } from "components/CustomIcon";
import { COLORS } from "styles";
import { CustomChip } from "components/CustomChip";
import { CustomButton } from "components/CustomButton";
import { CustomSwitch } from "components/CustomSwitch";
import { CustomRadio } from "components/CustomRadio";
import { CustomCheckbox } from "components/CustomCheckbox";
import { genderOptions, testOptions } from "models/customOption";
import { CustomTextField } from "components/CustomTextField";
import { CustomTitle } from "components/CustomTitle";
import { GoogleLoginButton } from "firebase/googleLoginButton";

function ComponentsPage() {
  return (
    <Grid
      container
      sx={{
        rowGap: 1,
        columnGap: 1,
        paddingTop: "3vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={12} sx={{ fontSize: "30px" }}>
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
        <CustomChip text="fast food"></CustomChip>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", gap: "10px" }}>
        {/* <GoogleLoginButton /> */}
        <CustomButton
          text="button"
          endIcon="settings"
          type="rounded-outlined"
          handleOnClick={() => {
            alert("clicked");
          }}
        />
      </Grid>
      {/* <Grid item xs={12} >
          <CustomBackgroundCard sizeX={800} sizeY={400}/>
        </Grid> */}
      <Grid item xs={12}>
        <CustomSwitch
          defaultChecked
          handleOnChange={e => {
            // alert(e.target.checked);
          }}
        />
        <CustomRadio
          options={genderOptions}
          handleOnChange={e => {
            // alert(e.target.value);
          }}
          defaultValue={1}
        />
        <CustomCheckbox
          options={testOptions}
          handleOnChange={e => {
            // alert(e.target.value);
          }}
          defaultValue={1}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          label="Text field"
          handleOnChange={e => {
            // alert(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          label="Text field"
          handleOnChange={e => {
            // alert(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          label="Text field"
          handleOnChange={e => {
            // alert(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          label="Text field"
          handleOnChange={e => {
            // alert(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          label="Text field"
          handleOnChange={e => {
            // alert(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          label="Text field"
          handleOnChange={e => {
            // alert(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          label="Text field"
          handleOnChange={e => {
            // alert(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          label="Text field"
          handleOnChange={e => {
            // alert(e.target.value);
          }}
        />
      </Grid>
    </Grid>
  );
}

export default ComponentsPage;