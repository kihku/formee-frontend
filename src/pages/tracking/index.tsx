import { Box, Grid } from "@mui/material";
import { PublicService } from "apis/publicService/publicService";
import CreateFieldsForm from "components/CreateFieldsForm";
import { FormAddress } from "components/CreateFieldsForm/FormFields/FormAddress";
import { FormCart } from "components/CreateFieldsForm/FormFields/FormCart";
import { FormPayment } from "components/CreateFieldsForm/FormFields/FormPayment";
import { FormSection } from "components/CreateFieldsForm/FormFields/FormSection";
import { FormSelect } from "components/CreateFieldsForm/FormFields/FormSelect";
import { FormShipping } from "components/CreateFieldsForm/FormFields/FormShipping";
import { FormTextField } from "components/CreateFieldsForm/FormFields/FormTextField";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomButton } from "components/CustomButton";
import { CustomChip } from "components/CustomChip";
import { CustomTitle } from "components/CustomTitle";
import { orderStatusListEng, orderStatusListVi } from "constants/constants";
import { useFormik } from "formik";
import { CommentDTO } from "models/comment";
import { FormDTO, FormResponseDTO, FormSectionDTO } from "models/form";
import { HistoryItem } from "pages/orders/components/historyItem";
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
  const { t } = useTranslation(["forms", "buttons", "orders"]);
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
    if (window.location.href) {
      let encodedId: string = String(window.location.href.split("/").at(-1));
      let decodedId: string = CommonUtils.decodeUUID(encodedId);
      console.log(encodedId, decodedId);
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
          <Grid item xs={12} sx={{ fontWeight: 800, fontSize: "25px", marginBottom: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <CustomTitle
                  text={[
                    { text: "Theo dõi đơn hàng", highlight: false },
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
                  <FormSection index={2} title={"Lịch sử"} color={COLORS.red} />
                  {formResponse.comments?.map(comment => {
                    return (
                      <HistoryItem
                        item={comment}
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
                            ? "Lưu thay đổi"
                            : `${form.responsePermission === "OwnerOnly" ? "Yêu cầu chỉnh" : "Chỉnh"} sửa`
                        }
                        type="rounded-outlined"
                        startIcon={enableEditing ? "checkCircle" : "edit"}
                        color={COLORS.primary}
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
                        text="Huỷ"
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
                        text="Xác nhận"
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
