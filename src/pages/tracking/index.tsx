/* eslint-disable jsx-a11y/alt-text */
import { Box, Grid, IconButton, InputBase, Menu, MenuItem, Select } from "@mui/material";
import { URL_PROFILE } from "apis/axiosClient";
import { PublicService } from "apis/publicService/publicService";
import CreateFieldsForm from "components/CreateFieldsForm";
import { FormAddress } from "components/CreateFieldsForm/FormFields/FormAddress";
import { FormCart } from "components/CreateFieldsForm/FormFields/FormCart";
import { FormPayment } from "components/CreateFieldsForm/FormFields/FormPayment";
import { FormSection } from "components/CreateFieldsForm/FormFields/FormSection";
import { FormShipping } from "components/CreateFieldsForm/FormFields/FormShipping";
import { FormTextField } from "components/CreateFieldsForm/FormFields/FormTextField";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomButton } from "components/CustomButton";
import { CustomChip } from "components/CustomChip";
import { CustomIcon } from "components/CustomIcon";
import { CustomTitle } from "components/CustomTitle";
import { orderStatusListEng, orderStatusListVi } from "constants/constants";
import { useFormik } from "formik";
import i18n from "i18n";
import { CommentDTO } from "models/comment";
import { FormDTO, FormResponseDTO, FormSectionDTO } from "models/form";
import { HistoryItem } from "pages/orders/components/historyItem";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openNotification } from "redux/actions/notification";
import { COLORS } from "styles";
import CommonUtils from "utils/commonUtils";
import * as Yup from "yup";
import DialogConfirmEditOrder from "./dialogs/confirmEditDialog";
import DialogRequestEditOrder from "./dialogs/requestEditDialog";

function OrderTrackingPage() {
  const { t } = useTranslation(["commons", "tracking"]);
  const currentLanguage = String(localStorage.getItem("i18nextLng"));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState<FormDTO>({} as FormDTO);
  const [formResponse, setFormResponse] = useState<FormResponseDTO>({} as FormResponseDTO);
  const [formId, setFormId] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");
  const [fields, setFields] = useState<FormSectionDTO[]>([]);
  const [openRequestDialog, setOpenRequestDialog] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [enableEditing, setEnableEditing] = useState<boolean>(false);
  const [anchorElQR, setAnchorElQR] = useState<null | HTMLElement>(null);

  const openMenuQR = Boolean(anchorElQR);

  const handleOpenMenuQR = (event: React.MouseEvent<any>) => {
    setAnchorElQR(event.currentTarget);
  };

  const handleCloseMenuQR = () => {
    setAnchorElQR(null);
  };

  const validationSchema = Yup.object().shape({});

  const handleSubmitForm = async (values: any) => {
    await new PublicService().updateOrder({ ...values, response: JSON.stringify(values.response) }).then(response => {
      if (Number(response.code) === 200) {
        setEnableEditing(!enableEditing);
        dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
        getOrderResponse(orderId);
      }
    });
  };

  const changeLanguage = (language: "en" | "vi") => {
    i18n.changeLanguage(language);
  };

  const formik = useFormik({
    initialValues: { uuid: "", response: [] } as any,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  const getFields = () => {
    let result: FormSectionDTO[] = [];
    let index = 0;
    if (form.layoutJson) {
      let layout: any = JSON.parse(String(form.layoutJson));
      layout.sections.forEach((section: any) => {
        let sectionDTO: FormSectionDTO = { title: String(section.title), components: [] };
        section.components.forEach((component: any) => {
          sectionDTO.components.push({
            index: index,
            disabled: true,
            isEditing: false,
            show: component.type !== "STATUS",
            xs: component.xs,
            type: component.type,
            label: component.title,
            options: [],
            required: component.validation.some((val: any) => val.type === "REQUIRED"),
            Component:
              component.type === "TEXT" || component.type === "PHONE"
                ? FormTextField
                : component.type === "SHIPPING"
                ? FormShipping
                : component.type === "CART"
                ? FormCart
                : component.type === "ADDRESS"
                ? FormAddress
                : component.type === "PAYMENT"
                ? FormPayment
                : undefined,
          });
          index++;
        });
        result.push(sectionDTO);
      });
    }
    setFields(result);
  };

  const getForm = async (formId: string) => {
    await new PublicService().getFormById(formId).then(response => {
      if (response.result) {
        setForm(response.result);
      }
    });
  };

  const getOrderResponse = async (orderId: string) => {
    await new PublicService()
      .getOrderById(orderId)
      .then(response => {
        if (response.result) {
          setFormResponse({ ...response.result, response: JSON.parse(response.result.response) });
          formik.setValues({ ...response.result, response: JSON.parse(response.result.response) });
          setFormId(response.result.formId);
          setConfirmed(response.result.status === "CONFIRMED");
        }
      })
      .catch(e => {
        navigate("/error");
      });
  };

  const handleChangeStatus = async (status: string) => {
    await new PublicService().updateOrderStatus({ uuid: orderId, status: status }).then(response => {
      if (Number(response.code) === 200) {
        setEnableEditing(false);
        setConfirmed(true);
        dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
        getOrderResponse(orderId);
      }
    });
  };

  const handleAddComment = async (comment: CommentDTO) => {
    await new PublicService().createComment(comment);
  };

  useEffect(() => {
    CommonUtils.setPageTitle(currentLanguage === "en" ? "Order tracking" : "Theo dõi đơn hàng");
    if (window.location.href) {
      let encodedId: string = String(window.location.href.split("/").at(-1));
      let decodedId: string = CommonUtils.decodeUUID(encodedId);
      // console.log(encodedId, decodedId);
      setOrderId(decodedId);
      getOrderResponse(decodedId);
    }
  }, []);

  useEffect(() => {
    formId && getForm(formId);
  }, [formId]);

  useEffect(() => {
    getFields();
  }, [form]);

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sx={{ padding: 5 }}>
          <Grid item xs={12} sx={{ fontWeight: 800, fontSize: "25px", marginBottom: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  flexDirection: {
                    xs: "column",
                    md: "row",
                  },
                }}
              >
                <CustomTitle
                  text={[
                    { text: t("tracking:tracking_title"), highlight: false },
                    { text: "/", highlight: false },
                    { text: String(formResponse.orderName), highlight: true },
                  ]}
                />
                <CustomChip
                  text={
                    (currentLanguage === "en" ? orderStatusListEng : orderStatusListVi).find(
                      item => item.value === formResponse.status,
                    )?.title
                  }
                  backgroundColor={
                    (currentLanguage === "en" ? orderStatusListEng : orderStatusListVi).find(
                      item => item.value === formResponse.status,
                    )?.backgroundColor
                  }
                  textColor={
                    (currentLanguage === "en" ? orderStatusListEng : orderStatusListVi).find(
                      item => item.value === formResponse.status,
                    )?.color
                  }
                />
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Box>
              <Select sx={{ marginLeft: 2 }} input={<InputBase value={String(localStorage.getItem("i18nextLng"))} />}>
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
            </Box>

            <IconButton
              onClick={e => {
                handleOpenMenuQR(e);
              }}
            >
              <CustomIcon name="qrCode" />
            </IconButton>
            <Menu
              anchorEl={anchorElQR}
              open={openMenuQR}
              onClose={handleCloseMenuQR}
              onClick={handleCloseMenuQR}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box sx={{ paddingY: 1, paddingX: 2 }}>
                <QRCodeCanvas fgColor={COLORS.text} value={`${URL_PROFILE.WEB}${window.location.pathname}`} />
              </Box>
            </Menu>
            {/* <QRCodeCanvas fgColor={COLORS.text} value={`${URL_PROFILE.WEB}${window.location.pathname}`} /> */}
          </Grid>
          <Grid container>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
              <CustomBackgroundCard sizeX="80vw" sizeY="auto">
                <CreateFieldsForm
                  disabled={!enableEditing}
                  disabledForm={true}
                  enableEditing={false}
                  formik={formik}
                  sections={fields}
                />
                <Grid item xs={12} sx={{ marginBottom: 3 }}>
                  <FormSection index={2} title={t("tracking:tracking_history")} color={COLORS.red} />
                  {formResponse.comments?.map(comment => {
                    return (
                      <HistoryItem
                        item={comment}
                        language={currentLanguage}
                        direction={comment.createdBy === String(form.createdBy) ? "left" : "right"}
                      />
                    );
                  })}
                </Grid>
                {!confirmed && (formResponse.status === "PENDING" || formResponse.status === "REQUESTED") && (
                  <Box sx={{ display: "flex", gap: 1.5, justifyContent: "flex-end" }}>
                    {
                      <CustomButton
                        text={
                          enableEditing
                            ? t("commons:button_save")
                            : `${
                                form.responsePermission === "OwnerOnly"
                                  ? t("tracking:tracking_request")
                                  : t("tracking:tracking_edit")
                              }`
                        }
                        type={enableEditing ? "rounded" : "rounded-outlined"}
                        startIcon={enableEditing ? "checkCircle" : "edit"}
                        color={enableEditing ? COLORS.white : COLORS.primary}
                        handleOnClick={() => {
                          // check permission
                          if (form.responsePermission === "AllowAll") {
                            // check if there is a user token
                            enableEditing ? setOpenConfirmDialog(true) : setEnableEditing(true);
                            // else go to login page
                          } else {
                            // OwnerOnly: open request edit dialog
                            setOpenRequestDialog(true);
                          }
                        }}
                      />
                    }
                    {enableEditing && (
                      <CustomButton
                        text={t("commons:button_cancel")}
                        type="rounded-outlined"
                        startIcon="cancelCircle"
                        color={COLORS.primary}
                        handleOnClick={() => {
                          setEnableEditing(false);
                        }}
                      />
                    )}
                    {!enableEditing && (
                      <CustomButton
                        text={t("commons:button_confirm")}
                        type="rounded"
                        startIcon="checkCircle"
                        color={COLORS.white}
                        handleOnClick={() => {
                          handleChangeStatus("CONFIRMED");
                        }}
                      />
                    )}
                  </Box>
                )}
              </CustomBackgroundCard>
            </Grid>
          </Grid>
        </Grid>
        {openRequestDialog && (
          <DialogRequestEditOrder
            orderId={formResponse.uuid}
            openDialog={openRequestDialog}
            handleCloseDialog={(result: CommentDTO) => {
              setOpenRequestDialog(false);
              getOrderResponse(orderId);
            }}
          />
        )}
        {openConfirmDialog && (
          <DialogConfirmEditOrder
            orderId={formResponse.uuid}
            openDialog={openConfirmDialog}
            handleSubmitDialog={(comment: CommentDTO) => {
              handleAddComment(comment).then(() => {
                formik.handleSubmit();
              });
            }}
            handleCloseDialog={() => {
              setOpenConfirmDialog(false);
            }}
          />
        )}
      </Grid>
    </Box>
  );
}
export default OrderTrackingPage;
