/* eslint-disable jsx-a11y/alt-text */
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Box, CssBaseline, Fade, FormHelperText, Grid, Grow, InputLabel, Paper, Typography } from "@mui/material";
import { ProductService } from "apis/productService/productService";
import { UserService } from "apis/userService/userService";
import { CustomButton } from "components/CustomButton";
import { StyledInput } from "components/CustomTextField";
import { productTypesEng, productTypesVi } from "constants/productTypes";
import { useFormik } from "formik";
import { UserDTO } from "models/user";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openNotification } from "redux/actions/notification";
import { COLORS } from "styles";
import CommonUtils from "utils/commonUtils";
import StringUtils from "utils/stringUtils";
import * as Yup from "yup";

function OnboardingPage() {
  const { t } = useTranslation(["login", "commons", "messages"]);
  const currentLanguage = String(localStorage.getItem("i18nextLng"));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [chosenParents, setChosenParents] = useState<number[]>([]);
  const [chosenChildren, setChosenChildren] = useState<string[]>([]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .nullable()
      .test("invalid-email", t("messages:messages_invalid_email"), email => {
        if (email) {
          let str = email.toString();
          return /^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(str);
        }
        return true;
      }),
    phone: Yup.string()
      .trim()
      .nullable()
      .test("invalid-phone", t("messages:messages_invalid_phone"), phone => {
        if (phone) {
          let str = phone.toString();
          return /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(str);
        }
        return true;
      }),
  });

  const formik = useFormik({
    initialValues: JSON.parse(String(localStorage.getItem("USER_DATA"))) as UserDTO,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  async function handleSubmit(values: any) {
    if (currentStep < 2) {
      StringUtils.isNullOrEmty(formik.errors["email"]) &&
        StringUtils.isNullOrEmty(formik.errors["phone"]) &&
        setCurrentStep(step => step + 1);
    } else {
      console.log(formik.values, chosenChildren);
      await new UserService().updateProfile(values).then(response => {
        if (Number(response.code) === 200) {
          dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
          localStorage.setItem("USER_DATA", JSON.stringify(values));
          navigate(window.location.pathname);
        } else {
          dispatch(openNotification({ open: true, content: response.message, severity: "error" }));
        }
      });

      await new ProductService().createMultipleProductTypes(chosenChildren).then(response => {
        if (Number(response.code) === 200) {
          dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
          navigate("/home", {
            state: {
              openUserGuide: true,
            },
          });
        } else {
          dispatch(openNotification({ open: true, content: response.message, severity: "error" }));
        }
      });
    }
  }

  useEffect(() => {
    CommonUtils.setPageTitle(currentLanguage === "en" ? "Welcome!" : "Chào mừng!");
  }, []);

  return (
    <Fade in timeout={400}>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "url(/images/onboardingBG.svg)",
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
                  backgroundImage: "url(/images/setupImage.jpg)",
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
                position: "relative",
              }}
            >
              {/* step 0 */}
              {currentStep === 0 && (
                <Box>
                  <Box sx={{ paddingTop: "4%", paddingBottom: "4%", zoom: "120%" }}>
                    <Typography fontWeight={700} fontSize={35} sx={{ paddingBottom: 1 }}>
                      {t("onboarding_title")}
                    </Typography>
                    <Typography fontWeight={500} color={COLORS.lightText}>
                      {t("onboarding_subtitle")}
                    </Typography>
                    <Box
                      sx={{
                        paddingTop: "3%",
                        paddingRight: "5%",
                        gap: "8px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* display name */}
                      <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                        {t("onboarding_display_name")}
                      </InputLabel>
                      <StyledInput
                        fullWidth
                        value={formik.values.fullName}
                        onChange={e => {
                          formik.setFieldValue("fullName", e.target.value);
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
                        {formik.errors["fullName"] && formik.errors["fullName"]}
                      </FormHelperText>

                      {/* phone */}
                      <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                        {t("onboarding_phone")}
                      </InputLabel>
                      <StyledInput
                        fullWidth
                        value={formik.values.phone}
                        onChange={e => {
                          formik.setFieldValue("phone", e.target.value);
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
                        {formik.errors["phone"] && formik.errors["phone"]}
                      </FormHelperText>

                      {/* email */}
                      <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                        {t("onboarding_email")}
                      </InputLabel>
                      <StyledInput
                        fullWidth
                        type="email"
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
                    </Box>
                  </Box>
                </Box>
              )}

              {/* step 1 */}
              {currentStep === 1 && (
                <Box>
                  <Box sx={{ paddingTop: "4%", paddingBottom: "4%", zoom: "120%" }}>
                    <Typography fontWeight={700} fontSize={25} sx={{ paddingBottom: 1 }}>
                      {t("onboarding_product_title")}
                    </Typography>
                    <Typography fontWeight={500} color={COLORS.lightText}>
                      {t("onboarding_product_subtitle")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 2,
                      maxHeight: "50vh",
                      overflow: "auto",
                    }}
                  >
                    {(currentLanguage === "en" ? productTypesEng : productTypesVi).map((type, index) => (
                      <Grow key={index} in style={{ transformOrigin: "50% 50% 0" }} {...{ timeout: 100 * (index + 1) }}>
                        <Box
                          sx={{
                            paddingY: 1.5,
                            paddingX: 3,
                            border: `2px solid ${chosenParents.includes(index) ? COLORS.primaryLight : COLORS.text}`,
                            fontWeight: chosenParents.includes(index) ? 600 : 400,
                            color: chosenParents.includes(index) ? COLORS.white : COLORS.text,
                            background: chosenParents.includes(index) ? COLORS.primaryLight : COLORS.white,
                            borderRadius: "50px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setChosenParents(prev =>
                              chosenParents.includes(index)
                                ? prev.filter(item => item !== index)
                                : chosenParents.length < 3
                                ? [...prev, index]
                                : prev,
                            );
                          }}
                        >
                          {type.name}
                        </Box>
                      </Grow>
                    ))}
                  </Box>
                </Box>
              )}

              {/* step 2 */}
              {currentStep === 2 && (
                <Box>
                  <Box sx={{ paddingTop: "4%", paddingBottom: "4%", zoom: "120%" }}>
                    <Typography fontWeight={700} fontSize={25} sx={{ paddingBottom: 1 }}>
                      {t("onboarding_product_detail_title")}
                    </Typography>
                    <Typography fontWeight={500} color={COLORS.lightText}>
                      {t("onboarding_product_detail_subtitle")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 2,
                      maxHeight: "50vh",
                      overflow: "auto",
                    }}
                  >
                    {(currentLanguage === "en" ? productTypesEng : productTypesVi)
                      .filter((item, index) => chosenParents.includes(index))
                      .map((parent, idx) => {
                        return (
                          <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
                            {parent.children?.map(child => (
                              <Grow
                                key={idx}
                                in
                                style={{ transformOrigin: "50% 50% 0" }}
                                {...{ timeout: 150 * (idx + 1) }}
                              >
                                <Box
                                  sx={{
                                    paddingY: 1,
                                    paddingX: 3,
                                    color: idx === 0 ? COLORS.blue : idx === 1 ? COLORS.red : COLORS.green,
                                    background:
                                      idx === 0
                                        ? COLORS.blueBackground
                                        : idx === 1
                                        ? COLORS.redBackground
                                        : COLORS.greenBackground,
                                    borderRadius: "50px",
                                    cursor: "pointer",
                                    position: "relative",
                                  }}
                                  onClick={() => {
                                    setChosenChildren(prev =>
                                      chosenChildren.includes(child)
                                        ? prev.filter(item => item !== child)
                                        : chosenChildren.length < 5
                                        ? [...prev, child]
                                        : prev,
                                    );
                                  }}
                                >
                                  {child}
                                  {chosenChildren.includes(child) && (
                                    <CheckCircleRoundedIcon
                                      sx={{ position: "absolute", top: -2, right: -5, width: 20, height: 20 }}
                                    />
                                  )}
                                </Box>
                              </Grow>
                            ))}
                          </Box>
                        );
                      })}
                  </Box>
                </Box>
              )}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "3%",
                  alignItems: "center",
                  justifyContent: currentStep !== 0 ? "space-between" : "flex-end",
                  position: "absolute",
                  right: currentStep === 0 ? 40 : 20,
                  bottom: 0,
                  width: "90%",
                }}
              >
                {currentStep !== 0 && (
                  <Box
                    onClick={() => {
                      setCurrentStep(step => step - 1);
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 400,
                        color: COLORS.primaryDark,
                        cursor: "pointer",
                        ":hover": { textDecoration: "underline" },
                      }}
                    >
                      {t("onboarding_previous_step")}
                    </Typography>
                  </Box>
                )}

                {currentStep === 2 ? (
                  <CustomButton
                    text={t("onboarding_finish")}
                    type="rounded-outlined"
                    endIcon="checkCircle"
                    handleOnClick={() => {
                      formik.handleSubmit();
                    }}
                  />
                ) : (
                  <Box
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 400,
                        color: COLORS.primaryDark,
                        cursor: "pointer",
                        ":hover": { textDecoration: "underline" },
                      }}
                    >
                      {t("onboarding_next_step")}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Fade>
  );
}
export default OnboardingPage;
