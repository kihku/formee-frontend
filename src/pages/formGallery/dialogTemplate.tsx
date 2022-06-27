import { Box, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import CreateFieldsForm from "components/CreateFieldsForm";
import { FormCart } from "components/CreateFieldsForm/FormFields/FormCart";
import { FormSelect } from "components/CreateFieldsForm/FormFields/FormSelect";
import { FormTextField } from "components/CreateFieldsForm/FormFields/FormTextField";
import { CustomButton } from "components/CustomButton";
import { CustomIcon } from "components/CustomIcon";
import { CustomTitle } from "components/CustomTitle";
import { orderStatusList } from "constants/constants";
import { useFormik } from "formik";
import { FormDTO, FormResponseDTO, FormSectionDTO } from "models/form";
import { useTranslation } from "react-i18next";
import { COLORS } from "styles";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TemplateService } from "apis/template/templateService";
import { CustomTextField } from "components/CustomTextField";
import { FormService } from "apis/formService/formService";
import { getCookie } from "utils/cookieUtils";
import { openNotification } from "redux/actions/notification";
import { useDispatch } from "react-redux";
import { FormAddress } from "components/CreateFieldsForm/FormFields/FormAddress";

export interface DialogFormTemplateProps {
  item: FormDTO;
  openDialog: boolean;
  handleCloseDialog: () => void;
}

const DialogFormTemplate = ({ item, openDialog, handleCloseDialog }: DialogFormTemplateProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation(["orders"]);

  const [form, setForm] = useState<FormDTO>({} as FormDTO);
  const [formId, setFormId] = useState<string>("");
  const [fields, setFields] = useState<FormSectionDTO[]>([]);

  const validationSchema = Yup.object().shape({});

  const formNameValidationSchema = Yup.object().shape({
    name: Yup.string().trim().required("Tên form không được bỏ trống"),
  });

  const formik = useFormik({
    initialValues: { uuid: "", response: [] } as any,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  const formNameFormik = useFormik({
    initialValues: { name: "" } as any,
    onSubmit: handleSubmitFormName,
    validationSchema: formNameValidationSchema,
    validateOnChange: true,
  });

  const getFields = () => {
    let result: FormSectionDTO[] = [];
    let cartIndex: any[] = [];
    let index = 0;
    if (form.layoutJson) {
      let layout: any = JSON.parse(String(form.layoutJson));
      layout.sections.forEach((section: any) => {
        let sectionDTO: FormSectionDTO = { title: String(section.title), components: [] };
        section.components.forEach((component: any) => {
          if (component.type === "CART") {
            cartIndex.push(index);
          }
          sectionDTO.components.push({
            index: index,
            disabled: true,
            xs: component.xs,
            type: component.type,
            label: component.title,
            options: component.type === "STATUS" ? orderStatusList : [],
            required: component.validation.some((val: any) => val.type === "REQUIRED"),
            Component:
              component.type === "TEXT"
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
      formik.setFieldValue(
        "response",
        Array.from({ length: index }, (item, index) => (cartIndex.includes(index) ? [] : "")),
      );
    }
    setFields(result);
  };

  function closeDialog() {
    formik.resetForm();
    handleCloseDialog();
  }

  async function handleSubmitForm(values: FormResponseDTO) {
    // console.log("values", values);
  }

  async function handleSubmitFormName(values: FormDTO) {
    createNewForm();
  }

  const getFormTemplate = async (formId: string) => {
    await new TemplateService().getTemplateById(formId).then(response => {
      if (response.result) {
        setForm(response.result);
      }
    });
  };

  const createNewForm = async () => {
    let userId = getCookie("USER_ID");
    await new FormService()
      .createForm({
        userId: userId,
        layoutJson: `{"sections":[{"title":"A. Thông tin người mua","components":[{"title":"Số điện thoại","type":"PHONE","validation":[],"showOnTable":false,"xs":5},{"title":"Tên người mua","type":"TEXT","validation":[{"type":"REQUIRED","errorMessgage":"Tên người mua không được bỏ trống"}],"showOnTable":true,"xs":2.5},{"title":"Địa chỉ giao hàng","type":"ADDRESS","validation":[{"type":"REQUIRED","errorMessgage":"Địa chỉ giao hàng không được bỏ trống"}],"showOnTable":true,"xs":10},{"title":"Ghi chú","type":"TEXT","validation":[],"showOnTable":false,"xs":2.5}]},{"title":"B. Chi tiết đơn hàng","components":[{"title":"Sản phẩm","type":"CART","validation":[],"showOnTable":false,"xs":10}]}]}`,
        templateId: form.uuid,
        name: formNameFormik.values.name,
      } as FormDTO)
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
  };

  useEffect(() => {
    setFormId(item.uuid);
  }, []);

  useEffect(() => {
    formId && getFormTemplate(formId);
  }, [formId]);

  useEffect(() => {
    getFields();
  }, [form]);

  return (
    <Dialog fullWidth maxWidth="sm" open={openDialog} onClose={closeDialog}>
      <DialogTitle>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <CustomTitle text={[{ text: "Tạo form mới", highlight: true }]} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            {/* <Tooltip title={t("template_link")}>
              <IconButton>
                <CustomIcon name="copyLink" color={COLORS.primary} />
              </IconButton>
            </Tooltip> */}
            <IconButton onClick={closeDialog}>
              <CustomIcon name="close" size={30} />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container>
          {/* <Grid item xs={8} sx={{ paddingX: 1.5, paddingTop: 1.5 }}>
            <Box sx={{ width: "100%", maxHeight: 200 }}>
              <img
                src={item.image ? `data:image/png;base64,${item.image}` : "/images/Ramen-amico.svg"}
                alt={item.name}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: 200,
                }}
              />
            </Box>
            <Box sx={{ marginY: 3 }}>
              <CreateFieldsForm enableEditing={false} formik={formik} sections={fields} />
            </Box>
          </Grid> */}
          <Grid
            item
            xs={12}
            sx={{
              // paddingLeft: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                position: "sticky",
                top: 10,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Typography fontSize={35} fontWeight={600}>
                  {item.name}
                </Typography>
                <CustomTextField name="name" placeholder="Nhập tên form" formik={formNameFormik} />
                <CustomButton
                  text={"Tạo form mới"}
                  type={"default"}
                  endIcon={"rightArrow"}
                  style={{ marginY: 1, fontSize: 16, fontWeight: 400 }}
                  handleOnClick={() => {
                    formNameFormik.handleSubmit();
                  }}
                />
                {/* <Divider sx={{ marginY: 1 }} />
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat
                </Typography> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
export default DialogFormTemplate;
