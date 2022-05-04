import { Avatar, Box, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Tooltip } from "@mui/material";
import { CustomTextField } from "components/CustomTextField";
import { CustomTitle } from "components/CustomTitle";
import { useFormik } from "formik";
import { CommentDTO, FormDTO, FormResponseDTO } from "models/form";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { CustomIcon } from "components/CustomIcon";
import { COLORS } from "styles";
import CreateFieldsForm, { CreateFieldsFormProps } from "components/CreateFieldsForm";
import { FormTextField } from "components/CreateFieldsForm/FormFields/FormTextField";
import { FormSelect } from "components/CreateFieldsForm/FormFields/FormSelect";
import { orderStatusList } from "constants/constants";
import { FormCart } from "components/CreateFieldsForm/FormFields/FormCart";
import { HistoryItem } from "../components/historyItem";

export interface DialogOrderDetailsProps {
  form: FormDTO;
  response: FormResponseDTO;
  openDialog: boolean;
  handleCloseDialog: () => void;
}

const DialogOrderDetails = (props: DialogOrderDetailsProps) => {
  const { t } = useTranslation(["orders"]);
  // const [isEditing, setIsEditing] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: props.response,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  const getFields = (): CreateFieldsFormProps<any, any>[] => {
    let result: CreateFieldsFormProps<any, any>[] = [];
    props.form.layout.sections.forEach(section => {
      section.components.forEach((component, index) => {
        result.push({
          // disabled: !isEditing,
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
    // formik.resetForm();
    props.handleCloseDialog();
  }

  async function handleSubmitForm(values: FormResponseDTO) {
    console.log("values", values);
    // closeDialog();
  }

  return (
    <Dialog fullWidth maxWidth="lg" open={props.openDialog} onClose={closeDialog}>
      <DialogTitle>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <CustomTitle
              text={[
                { text: props.form.name, highlight: false },
                { text: "/", highlight: false },
                { text: t("order") + " #" + props.response.id, highlight: true },
              ]}
            />
            {/* <Tooltip title={t("order_edit")}>
              <IconButton
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                <CustomIcon name="edit" />
              </IconButton>
            </Tooltip> */}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Tooltip title={t("order_download")}>
              <IconButton>
                <CustomIcon name="download" color={COLORS.primary} />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("order_link")}>
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
          <Grid item xs={9} sx={{ paddingX: 1.5, paddingTop: 1.5 }}>
            <CreateFieldsForm
              enableEditing={false}
              formik={formik}
              fields={fields}
              sections={props.form.layout.sections}
            />
          </Grid>
          <Divider />
          <Grid
            item
            xs={3}
            sx={{
              paddingLeft: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Box sx={{ fontWeight: 600, fontSize: 20, paddingY: 1.5 }}>History</Box>
              <Box>
                <HistoryItem
                  direction="left"
                  comments={[
                    {
                      content: "Order created.",
                      createdBy: "TD",
                      createDate: new Date("5/2/2022"),
                      isDefault: true,
                    } as CommentDTO,
                    {
                      content: "Confirm order?",
                      createdBy: "TD",
                      createDate: new Date("5/2/2022"),
                      isDefault: true,
                    } as CommentDTO,
                  ]}
                />
                <HistoryItem
                  direction="right"
                  comments={[
                    {
                      content: "Order confirmed.",
                      createdBy: "AZ",
                      createDate: new Date("5/3/2022"),
                      isDefault: true,
                    } as CommentDTO,
                    {
                      content: "Please call me before shipping.",
                      createdBy: "AZ",
                      createDate: new Date("5/3/2022"),
                      isDefault: false,
                    } as CommentDTO,
                  ]}
                />
              </Box>
            </Box>
            <Box
              sx={{
                paddingRight: 1,
                paddingTop: 2,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Avatar sx={{ backgroundColor: COLORS.primaryLight, marginRight: 2 }}>{"TD"}</Avatar>
              <CustomTextField multiline />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
export default DialogOrderDetails;
