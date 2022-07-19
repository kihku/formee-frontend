/* eslint-disable jsx-a11y/alt-text */
import { Box, Dialog, DialogContent, DialogTitle, FormHelperText, Grid, IconButton, InputLabel } from "@mui/material";
import { FormService } from "apis/formService/formService";
import { CustomButton } from "components/CustomButton";
import { CustomCheckbox } from "components/CustomCheckbox";
import { CustomFormCardPreview } from "components/CustomFormCard/preview";
import { CustomIcon } from "components/CustomIcon";
import { StyledInput } from "components/CustomTextField";
import { CustomTitle } from "components/CustomTitle";
import {
  componentOptionsEng,
  componentOptionsVi,
  defaultColorList,
  defaultFormLayoutEng,
  defaultFormLayoutVi,
  defaultImageList,
} from "constants/constants";
import { useFormik } from "formik";
import { FormDTO, initFormDTOEng, initFormDTOVi } from "models/form";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openNotification } from "redux/actions/notification";
import * as Yup from "yup";

export interface DialogAddFormProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
}

const DialogAddForm = ({ openDialog, handleCloseDialog }: DialogAddFormProps) => {
  const { t } = useTranslation(["home", "messages"]);
  const currentLanguage = String(localStorage.getItem("i18nextLng"));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [chosenImage, setChosenImage] = useState<string>("default");
  const [chosenColor, setChosenColor] = useState<string>("purple");
  const [chosenComponents, setChosenComponents] = useState<string[]>([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required(t("messages:messages_empty_form_name")),
  });

  const formik = useFormik({
    initialValues: currentLanguage === "en" ? initFormDTOEng : initFormDTOVi,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  function closeDialog() {
    formik.resetForm();
    handleCloseDialog();
  }

  async function handleSubmitForm(values: FormDTO) {
    await new FormService()
      .createForm({
        ...values,
        color: defaultColorList.find(item => item.title === chosenColor)?.value,
        imagePath: `/images/default/${chosenColor}/${chosenImage}.svg`,
        layoutJson: JSON.stringify(
          chosenComponents.length > 0
            ? {
                sections: [
                  ...(currentLanguage === "en" ? defaultFormLayoutEng.sections : defaultFormLayoutVi.sections),
                  currentLanguage === "en"
                    ? {
                        title: "C. Additional information",
                        components: chosenComponents.map(component => {
                          switch (component) {
                            case "SHIPPING":
                              return {
                                title: "Shipping information",
                                type: "SHIPPING",
                                validation: [],
                                showOnTable: false,
                                xs: 10,
                              };
                            case "PAYMENT":
                              return {
                                title: "Payment information",
                                type: "PAYMENT",
                                validation: [],
                                showOnTable: false,
                                xs: 10,
                              };
                          }
                        }),
                      }
                    : {
                        title: "C. Thông tin khác",
                        components: chosenComponents.map(component => {
                          switch (component) {
                            case "SHIPPING":
                              return {
                                title: "Thông tin giao hàng",
                                type: "SHIPPING",
                                validation: [],
                                showOnTable: false,
                                xs: 10,
                              };
                            case "PAYMENT":
                              return {
                                title: "Thông tin thanh toán",
                                type: "PAYMENT",
                                validation: [],
                                showOnTable: false,
                                xs: 10,
                              };
                          }
                        }),
                      },
                ],
              }
            : currentLanguage === "en"
            ? defaultFormLayoutEng
            : defaultFormLayoutVi,
        ),
      })
      .then(response => {
        if (response.result) {
          dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
          navigate("/order/create", {
            state: {
              formId: response.result.uuid,
            },
          });
        }
      })
      .catch(e => {
        dispatch(openNotification({ open: true, content: e.message, severity: "error" }));
      });
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Dialog fullWidth maxWidth="md" open={openDialog} onClose={closeDialog}>
      <DialogTitle>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <CustomTitle text={[{ text: t("home_order_create"), highlight: true }]} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <IconButton onClick={closeDialog}>
              <CustomIcon name="close" size={30} />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container>
          <Grid item xs={6} sx={{ paddingX: 2, paddingTop: 1.5 }}>
            <Box sx={{ width: "100%" }}>
              <img
                src={`/images/default/${chosenColor}/${chosenImage}.svg`}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  borderRadius: 25,
                  border: "2.5px solid " + defaultColorList.find(item => item.title === chosenColor)?.value,
                }}
              />
            </Box>
            <Box sx={{ marginY: 2 }}>
              <Carousel ssr responsive={responsive}>
                {defaultImageList.map(image => {
                  return (
                    <CustomFormCardPreview
                      image={image.value}
                      color={chosenColor}
                      chosen={chosenImage === image.value}
                      handleOnClick={() => {
                        setChosenImage(image.value);
                      }}
                    />
                  );
                })}
              </Carousel>
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              paddingRight: 2,
              paddingLeft: 4,
              paddingTop: 1.5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              {/* name */}
              <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                {t("home_order_create_name")}
              </InputLabel>
              <StyledInput
                fullWidth
                value={formik.values.name}
                onChange={e => {
                  formik.setFieldValue("name", e.target.value);
                }}
                sx={{ marginY: 1 }}
              />
              <FormHelperText
                sx={{
                  color: "red",
                }}
              >
                {formik.errors["name"] && formik.errors["name"]}
              </FormHelperText>

              {/* color */}
              <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500, marginY: 2 }}>
                {t("home_order_create_color")}
              </InputLabel>
              <Box sx={{ display: "flex", flexDirction: "row", gap: 2, marginY: 1 }}>
                {defaultColorList.map(color => {
                  return (
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        backgroundColor: `${color.value}`,
                        borderRadius: 50,
                        cursor: "pointer",
                        outline:
                          defaultColorList.find(item => item.title === chosenColor)?.value === color.value
                            ? `${color.value} solid 2px`
                            : "",
                        outlineOffset:
                          defaultColorList.find(item => item.title === chosenColor)?.value === color.value ? 4 : 0,
                      }}
                      onClick={() => {
                        //   formik.setFieldValue("color", color.value);
                        setChosenColor(color.title);
                      }}
                    />
                  );
                })}
              </Box>

              {/* optional components */}
              <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500, marginTop: 3 }}>
                {t("home_order_create_optional")}
              </InputLabel>
              <Box>
                <CustomCheckbox
                  size={20}
                  options={
                    String(localStorage.getItem("i18nextLng")) === "en" ? componentOptionsEng : componentOptionsVi
                  }
                  chosenValues={chosenComponents}
                  handleOnChange={e => {
                    if (e.target.checked) {
                      setChosenComponents(prev => [...prev, e.target.value]);
                    } else {
                      setChosenComponents(prev => prev.filter(item => item !== e.target.value));
                    }
                  }}
                />
              </Box>
            </Box>

            {/* submit */}
            <Box sx={{ marginBottom: 1, display: "flex", justifyContent: "flex-end" }}>
              <CustomButton
                text={t("home_order_create_button")}
                type={"rounded"}
                endIcon={"rightArrow"}
                style={{
                  marginY: 1,
                  fontSize: 16,
                  fontWeight: 400,
                  paddingY: 1,
                }}
                handleOnClick={() => {
                  formik.handleSubmit();
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
export default DialogAddForm;
