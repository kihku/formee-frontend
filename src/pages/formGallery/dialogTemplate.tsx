import { Box, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import CreateFieldsForm, { CreateFieldsFormProps } from "components/CreateFieldsForm";
import { FormCart } from "components/CreateFieldsForm/FormFields/FormCart";
import { FormSelect } from "components/CreateFieldsForm/FormFields/FormSelect";
import { FormTextField } from "components/CreateFieldsForm/FormFields/FormTextField";
import { CustomButton } from "components/CustomButton";
import { CustomIcon } from "components/CustomIcon";
import { CustomTitle } from "components/CustomTitle";
import { orderStatusList } from "constants/constants";
import { useFormik } from "formik";
import { FormDTO, FormResponseDTO } from "models/form";
import { useTranslation } from "react-i18next";
import { COLORS } from "styles";
import * as Yup from "yup";
import { CustomChip } from "components/CustomChip";
import { useNavigate } from "react-router-dom";

export interface DialogFormTemplateProps {
  item: FormDTO;
  openDialog: boolean;
  handleCloseDialog: () => void;
}

const DialogFormTemplate = ({ item, openDialog, handleCloseDialog }: DialogFormTemplateProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation(["orders"]);

  const validationSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: {
      id: "",
      formId: "",
      createdDate: new Date(),
      response: ["", "", "", "PENDING", []],
    } as FormResponseDTO,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  const getFields = (): CreateFieldsFormProps<any, any>[] => {
    let result: CreateFieldsFormProps<any, any>[] = [];
    item.layout.sections.forEach(section => {
      section.components.forEach((component, index) => {
        result.push({
          disabled: true,
          index: index,
          type: component.type,
          label: component.title,
          options: component.type === "STATUS" ? orderStatusList : [],
          required: component.validation.some(val => val.type === "REQUIRED"),
          Component:
            component.type === "TEXT"
              ? FormTextField
              : component.type === "STATUS"
              ? FormSelect
              : component.type === "CART"
              ? FormCart
              : undefined,
        });
      });
    });
    return result;
  };

  const fields: CreateFieldsFormProps<any, any>[] = getFields();

  function closeDialog() {
    formik.resetForm();
    handleCloseDialog();
  }

  async function handleSubmitForm(values: FormResponseDTO) {
    console.log("values", values);
  }

  return (
    <Dialog fullWidth maxWidth="xl" open={openDialog} onClose={closeDialog}>
      <DialogTitle>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <CustomTitle
              text={[
                { text: "Gallery", highlight: false },
                { text: "/", highlight: false },
                { text: item.name, highlight: true },
              ]}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Tooltip title={t("template_link")}>
              <IconButton>
                <CustomIcon name="copyLink" color={COLORS.primary} />
              </IconButton>
            </Tooltip>
            <IconButton onClick={closeDialog}>
              <CustomIcon name="close" size={30} />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container>
          <Grid item xs={8} sx={{ paddingX: 1.5, paddingTop: 1.5 }}>
            <Box sx={{ width: "100%", maxHeight: 200 }}>
              <img
                src={"/images/Ramen-amico.svg"}
                alt="Template"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: 200,
                  // border: `1.5px solid ${COLORS.primary}`,
                  // borderRadius: 15,
                }}
              />
            </Box>

            <Box sx={{ marginY: 3 }}>
              <CreateFieldsForm enableEditing={false} formik={formik} fields={fields} sections={item.layout.sections} />
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              paddingLeft: 3,
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
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography fontSize={35} fontWeight={600}>
                  {item.name}
                </Typography>
                <Box
                  sx={{
                    marginY: 2,
                    gap: 1,
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  {item.tags &&
                    item.tags.map((tag, key) => {
                      return (
                        <CustomChip
                          key={key}
                          text={tag}
                          textColor={tag === "New" ? COLORS.orange : COLORS.green}
                          backgroundColor={tag === "New" ? COLORS.orangeBackground : COLORS.greenBackground}
                        />
                      );
                    })}
                </Box>
                <CustomButton
                  text={"Use this template"}
                  type={"default"}
                  endIcon={"rightArrow"}
                  style={{ marginY: 1, fontSize: 16, fontWeight: 400 }}
                  handleOnClick={() => {
                    navigate("/form/create");
                  }}
                />
                <Divider sx={{ marginY: 2 }} />
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
export default DialogFormTemplate;
