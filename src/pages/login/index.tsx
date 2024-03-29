/* eslint-disable jsx-a11y/alt-text */
import {
  Box,
  CssBaseline,
  FormHelperText,
  Grid,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { UserService } from "apis/userService/userService";
import { CustomButton } from "components/CustomButton";
import { StyledInput } from "components/CustomTextField";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import i18n from "i18n";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openNotification } from "redux/actions/notification";
import { COLORS } from "styles";
import { lightTheme } from "styles/theme";
import CommonUtils from "utils/commonUtils";
import { setCookie } from "utils/cookieUtils";
import * as Yup from "yup";
import { GoogleLoginButton } from "../../firebase/googleLoginButton";

const firebaseConfig = {
  apiKey: "AIzaSyDD3tHhoMp11ShrhXjNH2KJ1ysudzVcmwk",
  authDomain: "formee-c27c5.firebaseapp.com",
  projectId: "formee-c27c5",
  storageBucket: "formee-c27c5.appspot.com",
  messagingSenderId: "27783212010",
  appId: "1:27783212010:web:47a588185bfc51c59ba093",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

function LoginPage() {
  const { t } = useTranslation(["login", "messages", "commons"]);
  const currentLanguage = String(localStorage.getItem("i18nextLng"));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeLanguage = (language: "en" | "vi") => {
    i18n.changeLanguage(language);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required(t("messages:messages_empty_email"))
      .test("invalid-email", t("messages:messages_invalid_email"), email => {
        if (email !== undefined) {
          let str = email.toString();
          return /^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(str);
        }
        return true;
      }),
    password: Yup.string().trim().required(t("messages:messages_empty_password")),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" } as any,
    onSubmit: () => {},
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  async function handleSignIn(values: any) {
    signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)
      .then(result => {
        result.user.getIdToken(true).then(idToken => {
          handleLogin(idToken, result.user.uid);
        });
      })
      .catch(error => {
        dispatch(openNotification({ open: true, content: error.message, severity: "error" }));
      });
  }

  const handleLogin = (idToken: string, uid: string) => {
    setCookie("USER_TOKEN", idToken);
    setCookie("USER_ID", uid);
    new UserService()
      .login(idToken)
      .then(response => {
        localStorage.setItem(
          "USER_DATA",
          JSON.stringify({
            uuid: response.uuid,
            username: response.username,
            email: response.email,
            fullName: response.fullName,
            phone: response.phone,
            profilePicture: response.profilePicture,
          }),
        );
        navigate("/home");
      })
      .catch(e => {
        dispatch(openNotification({ open: true, content: e.message, severity: "error" }));
      });
  };

  useEffect(() => {
    CommonUtils.setPageTitle(currentLanguage === "en" ? "Sign in" : "Đăng nhập");
  }, []);

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(/images/loginBG.svg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
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
            />
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
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Select input={<InputBase value={String(localStorage.getItem("i18nextLng"))} />}>
                <MenuItem
                  value={"vi"}
                  onClick={() => {
                    changeLanguage("vi");
                    window.location.reload();
                  }}
                >
                  <Box
                    sx={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      fontSize: 14,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <img src={"/images/language-vi.png"} width={"20vh"} height={"20vh"} />
                    {t("commons:header_language_vi")}
                  </Box>
                </MenuItem>
                <MenuItem
                  value={"en"}
                  onClick={() => {
                    changeLanguage("en");
                    window.location.reload();
                  }}
                >
                  <Box
                    sx={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      fontSize: 14,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <img src={"/images/language-en.png"} width={"20vh"} height={"20vh"} />
                    {t("commons:header_language_en")}
                  </Box>
                </MenuItem>
              </Select>
              <Box
                sx={{
                  gap: 2,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "right",
                  alignItems: "center",
                }}
              >
                <ThemeProvider theme={lightTheme}>
                  <Typography sx={{ color: COLORS.lightText }}>{t("login_new_acc")}</Typography>

                  <CustomButton
                    text={t("login_sign_up")}
                    type="rounded-outlined"
                    endIcon="rightArrow"
                    color={COLORS.lightText}
                    handleOnClick={() => {
                      navigate("/register");
                    }}
                  />
                </ThemeProvider>
              </Box>
            </Box>

            <Box sx={{ paddingTop: "4%", paddingBottom: "4%", zoom: "120%" }}>
              <Typography fontWeight={700} fontSize={35}>
                {t("login_title")}
              </Typography>
              <Typography fontWeight={500} color={COLORS.lightText}>
                {t("login_subtitle")}
              </Typography>
              <Box
                sx={{
                  paddingTop: "5%",
                  paddingRight: "5%",
                  gap: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* email */}
                <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                  {t("login_email")}
                </InputLabel>
                <StyledInput
                  fullWidth
                  value={formik.values.email}
                  onChange={e => {
                    formik.setFieldValue("email", e.target.value);
                  }}
                  // sx={{ marginBottom: 1 }}
                  inputProps={{
                    autoComplete: "new-password",
                    form: {
                      autoComplete: "off",
                    },
                  }}
                />
                <FormHelperText
                  sx={{
                    color: "red",
                  }}
                >
                  {formik.errors["email"] && formik.errors["email"]}
                </FormHelperText>

                {/* password */}
                <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                  {t("login_password")}
                </InputLabel>
                <StyledInput
                  fullWidth
                  type="password"
                  value={formik.values.password}
                  onChange={e => {
                    formik.setFieldValue("password", e.target.value);
                  }}
                  // sx={{ marginBottom: 1 }}
                  inputProps={{
                    autoComplete: "new-password",
                    form: {
                      autoComplete: "off",
                    },
                  }}
                />
                <FormHelperText
                  sx={{
                    color: "red",
                  }}
                >
                  {formik.errors["password"] && formik.errors["password"]}
                </FormHelperText>
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
                text={t("login_sign_in")}
                type="rounded"
                handleOnClick={() => {
                  handleSignIn(formik.values);
                }}
              />
              <Typography
                sx={{
                  fontWeight: "500",
                  color: COLORS.lightText,
                }}
              >
                {t("login_google")}
              </Typography>
              <GoogleLoginButton openUserGuide={false} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
export default LoginPage;
