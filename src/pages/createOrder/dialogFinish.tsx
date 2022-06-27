import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Link,
  Tooltip,
} from "@mui/material";
import { CustomTextField } from "components/CustomTextField";
import { CustomTitle } from "components/CustomTitle";
import { useFormik } from "formik";
import { FormDTO, FormResponseDTO, FormSectionDTO } from "models/form";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { CustomIcon } from "components/CustomIcon";
import { COLORS } from "styles";
import CreateFieldsForm, { CreateFieldsFormProps } from "components/CreateFieldsForm";
import { CustomButton } from "components/CustomButton";
import { OrderService } from "apis/orderService/orderService";
import CommonUtils from "utils/commonUtils";
import { openNotification } from "redux/actions/notification";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FormService } from "apis/formService/formService";
import { orderStatusList } from "constants/constants";
import { FormTextField } from "components/CreateFieldsForm/FormFields/FormTextField";
import { FormSelect } from "components/CreateFieldsForm/FormFields/FormSelect";
import { FormCart } from "components/CreateFieldsForm/FormFields/FormCart";
import { FormAddress } from "components/CreateFieldsForm/FormFields/FormAddress";
import { URL_PROFILE } from "apis/axiosClient";

export interface DialogFinishOrderProps {
  orderName: string;
  responseId: string;
  openDialog: boolean;
  handleCloseDialog: () => void;
}

const DialogFinishOrder = ({ responseId, openDialog, handleCloseDialog, orderName }: DialogFinishOrderProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(["orders"]);

  function closeDialog() {
    handleCloseDialog();
  }

  const [form, setForm] = useState<FormDTO>({} as FormDTO);
  const [formResponse, setFormResponse] = useState<FormResponseDTO>({} as FormResponseDTO);
  const [formId, setFormId] = useState<string>("");
  const [fields, setFields] = useState<FormSectionDTO[]>([]);

  const validationSchema = Yup.object().shape({});

  const handleSubmitForm = async (values: any) => {};

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
            xs: component.xs,
            type: component.type,
            label: component.title,
            options: component.type === "STATUS" ? orderStatusList : [],
            required: component.validation.some((val: any) => val.type === "REQUIRED"),
            Component:
              component.type === "TEXT" || component.type === "PHONE"
                ? FormTextField
                : component.type === "STATUS"
                ? FormSelect
                : component.type === "CART"
                ? FormCart
                : component.type === "ADDRESS"
                ? FormAddress
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
    await new FormService().getFormById(formId).then(response => {
      if (response.result) {
        setForm(response.result);
      }
    });
  };

  const getOrderResponse = async (orderId: string) => {
    await new OrderService()
      .getOrderById(orderId)
      .then(response => {
        if (response.result) {
          console.log(response.result);
          setFormResponse({ ...response.result, response: JSON.parse(response.result.response) });
          formik.setValues({ ...response.result, response: JSON.parse(response.result.response) });
          setFormId(response.result.formId);
        }
      })
      .catch(e => {
        navigate("/error");
      });
  };

  useEffect(() => {
    getOrderResponse(responseId);
  }, []);

  useEffect(() => {
    formId && getForm(formId);
  }, [formId]);

  useEffect(() => {
    getFields();
  }, [form]);

  return (
    <Dialog fullWidth maxWidth="lg" open={openDialog} onClose={closeDialog}>
      <DialogTitle>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <CustomTitle text={[{ text: orderName, highlight: true }]} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <IconButton onClick={closeDialog}>
              <CustomIcon name="close" size={30} />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container sx={{ padding: 1 }}>
          <Grid item xs={12} sx={{ paddingX: 1.5, paddingTop: 2.5 }}>
            <CreateFieldsForm enableEditing={false} disabled formik={formik} sections={fields} />
          </Grid>
          <Grid item xs={12} sx={{ paddingX: 1.5, paddingTop: 2.5 }}>
            <Divider sx={{ width: "100%", borderBottomWidth: "2px" }} />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              {"Theo dõi đơn hàng tại:"}
              <Box sx={{ textDecoration: "underline", color: COLORS.primary, cursor: "pointer" }}>
                <Link
                  href={`/tracking/${CommonUtils.encodeUUID(responseId)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${URL_PROFILE.PRO}/tracking/${CommonUtils.encodeUUID(responseId)}`}
                </Link>
                <Tooltip title="Sao chép liên kết">
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${URL_PROFILE.PRO}/tracking/${CommonUtils.encodeUUID(responseId)}`,
                      );
                      dispatch(
                        openNotification({
                          open: true,
                          content: "Đường dẫn liên kết đã được sao chép",
                          severity: "success",
                        }),
                      );
                    }}
                  >
                    <CustomIcon name="duplicate" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ display: "flex", gap: 1.5, paddingTop: 2, marginBottom: 1 }}>
              <CustomButton
                text="Chỉnh sửa đơn hàng"
                type="rounded-outlined"
                startIcon="edit"
                handleOnClick={() => {
                  navigate("/order/edit", {
                    state: {
                      orderId: responseId,
                    },
                  });
                }}
              />
              <CustomButton
                text="Quản lý đơn hàng"
                type="rounded-outlined"
                startIcon="manage"
                handleOnClick={() => {
                  navigate("/orders");
                }}
              />
              <CustomButton
                text="Trở về Trang chủ"
                type="rounded-outlined"
                startIcon="home"
                handleOnClick={() => {
                  navigate("/home");
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
export default DialogFinishOrder;
