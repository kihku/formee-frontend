import { Box, Grid, Paper, CssBaseline, Link, Typography, ThemeProvider } from "@mui/material";
import { CustomButton } from "components/CustomButton";
import { CustomTextField } from "components/CustomTextField";
import { GoogleLoginButton } from "../../firebase/googleLoginButton";

import { COLORS } from "styles";
import { lightTheme } from "styles/theme";


function LoginPage() {
  return (
    //     <Box sx={{
    //       backgroundColor: "red",
    //       //   backgroundImage: "require("/images/loginBG.svg")",
    //       backgroundPosition: "center",
    //       backgroundSize: "cover",
    //       backgroundRepeat: "no-repeat",
    //       height: "100%",
    //     }}>
    //     <Grid container sx={{ marginTop: 0, paddingX: 15 }}>
    //       <Grid item xs={12} sx={{ marginBottom: 4 }}>
    //         abc
    //       </Grid>
    //     </Grid>
    //   <Box/>
    <Paper
      //image="/images/loginBG.svg" // require image
      className="classes.pageMedia"
      title="LoginPage"
      //component={"img"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(/images/loginBG.svg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",

        //backgroundImage:"/images/loginBG.svg",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "90%",
          height: "85%",
          backgroundColor: "white",
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
                height: "80vh",
                width: "31vw",
                backgroundImage: "url(/images/startImage.jpg)",
                backgroundRepeat: "no-repeat",
                //backgroundColor: t => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Box>
          </Grid>
          <Grid
            item
            md={7.5}
            sx={{
              
              alignItems: "center",
            }}
          >
            <Box
              sx={{
               
                paddingTop: "40px",
                paddingRight: "25px",
                gap: "4%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "right",
                height: "5%",
                alignItems: "center",
              }}
            >
              <ThemeProvider theme={lightTheme}>
              <Link href="#" variant="body2" sx={{}}>
                {"Already have an account?"}
              </Link>
              
              <CustomButton text="SIGN IN" type="rounded-outlined" color={COLORS.lightText} />
              </ThemeProvider>
            </Box>
            <Box sx={{ paddingLeft: "7%", paddingTop:"8%", paddingBottom:"5%",  zoom: "130%", }}>
              <Typography fontWeight={700} fontSize={40}>
                Welcome to FORMEE!
              </Typography>
              <Typography fontWeight={500} color={COLORS.lightText}>
                Register your account
              </Typography>
              <Box
                sx={{
                  paddingTop: "5%",
                  paddingRight: "10%",
                  gap: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CustomTextField
                  label="Name"
                  handleOnChange={e => {
                    // alert(e.target.value);
                  }}
                ></CustomTextField>
                <CustomTextField
                  label="Email"
                  handleOnChange={e => {
                    // alert(e.target.value);
                  }}
                ></CustomTextField>
                <CustomTextField
                  label="Password"
                  handleOnChange={e => {
                    // alert(e.target.value);
                  }}
                ></CustomTextField>
              </Box>
            </Box>
            <Box
              sx={{
                zoom: "120%",
                paddingLeft: "7%",
                display: "flex",
                flexDirection: "row",
                gap: "3%",

                alignItems: "center",
              }}
            >
              <CustomButton text="Login" type="rounded" />

              <Typography sx={{
                fontWeight:"500",
                color:COLORS.lightText,
              }}>Or login with</Typography>
              <GoogleLoginButton />
            </Box>

           
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
export default LoginPage;
