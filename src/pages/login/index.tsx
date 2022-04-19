import {
  CardMedia,
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  CssBaseline,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import { CustomButton } from "components/CustomButton";
import { CustomTextField } from "components/CustomTextField";

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
      title="Contemplative Reptile"
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
            sm={4}
            md={4.5}
            sx={{
              backgroundImage: "url(/images/startImage.jpg)",
              backgroundRepeat: "no-repeat",
              //backgroundColor: t => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
              backgroundSize: "90% 90%",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            md={7.5}
            sx={{
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                margin: "25px",
                gap: "4%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "right",
                height: "5%",
                alignItems: "center",
              }}
            >
              <Link href="#" variant="body2" sx={{}}>
                {"Already have an account?"}
              </Link>
              <CustomButton text="SIGN IN" type="rounded-outlined" />
            </Box>
            <Box sx={{ margin: "5%" }}>
              <Box fontWeight={700} fontSize={40}>
                Welcome to FORMEE!
              </Box>
              <Box>Register your account</Box>
              <Box
                sx={{
                  marginTop: "5%",
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
                gap: "3%",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                margin: "5%",
              }}
            >
              <CustomButton text="Login" type="rounded" />
              Create account with
              <IconButton></IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
export default LoginPage;
