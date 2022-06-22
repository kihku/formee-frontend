import { Box, Grid, Paper, CssBaseline, Link, Typography, ThemeProvider, InputLabel } from "@mui/material";
import { CustomButton } from "components/CustomButton";
import { CustomTextField } from "components/CustomTextField";
import { GoogleLoginButton } from "../../firebase/googleLoginButton";

import { COLORS } from "styles";
import { lightTheme } from "styles/theme";
import { useNavigate } from "react-router-dom";
import CreateFields, { CreateFieldsProps } from "components/CreateFields";
import { useFormik } from "formik";
import * as Yup from "yup";

function LoginPage() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: {} as any,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  async function handleSubmitForm(values: any) {
    console.log("values", values);
    // closeDialog();
  }

  return (
    <Paper
      // className="classes.pageMedia"
      title="Login Page"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(/images/loginBG.svg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // width: "100vw",
        // height: "auto",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          // height: "auto",
          padding: "25px",
          backgroundColor: "white",
          marginX: 10,
          marginY: 10,
          borderRadius: 3,
        }}
      >
        <Grid container component="main" sx={{ height: "100%", width: "100%" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={3}
            md={4.5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: "100%",
                minHeight: "80vh",
                backgroundImage: "url(/images/startImage.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 2,
              }}
            ></Box>
          </Grid>
          <Grid
            item
            md={7.5}
            sx={{
              paddingLeft: "5%",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                // paddingTop: "40px",
                // paddingRight: "25px",
                gap: "4%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "right",
                // height: "5%",
                alignItems: "center",
              }}
            >
              <ThemeProvider theme={lightTheme}>
                <Link href="#" sx={{}}>
                  {"Already have an account?"}
                </Link>

                <CustomButton text="SIGN IN" type="rounded-outlined" color={COLORS.lightText} />
              </ThemeProvider>
            </Box>
            <Box sx={{ paddingTop: "4%", paddingBottom: "4%", zoom: "120%" }}>
              <Typography fontWeight={700} fontSize={40}>
                Welcome to FORMEE!
              </Typography>
              <Typography fontWeight={500} color={COLORS.lightText}>
                Register your account
              </Typography>
              {/* <CreateFields formik={formik} fields={fields} /> */}
              <Box
                sx={{
                  paddingTop: "5%",
                  paddingRight: "5%",
                  gap: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* <CustomTextField
                  label="Name"
                  handleOnChange={e => {
                    // alert(e.target.value);
                  }}
                ></CustomTextField> */}
                <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                  {"Email/Phone"}
                </InputLabel>
                <CustomTextField
                  label="Email"
                  handleOnChange={e => {
                    // alert(e.target.value);
                  }}
                />
                <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                  {"Password"}
                </InputLabel>
                <CustomTextField
                  type="password"
                  label="Password"
                  handleOnChange={e => {
                    // alert(e.target.value);
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                zoom: "120%",
                display: "flex",
                flexDirection: "row",
                gap: "3%",
                alignItems: "center",
              }}
            >
              <CustomButton
                text="Login"
                type="rounded"
                handleOnClick={() => {
                  navigate("/home");
                }}
              />
              <Typography
                sx={{
                  fontWeight: "500",
                  color: COLORS.lightText,
                }}
              >
                Or login with
              </Typography>
              <GoogleLoginButton />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
export default LoginPage;
