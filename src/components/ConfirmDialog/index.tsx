import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CustomButton } from "components/CustomButton";
import { useTranslation } from "react-i18next";

export interface ConfirmationDialogProps {
  id: string;
  keepMounted: boolean;
  value?: string;
  open: boolean;
  onClose: (isOk?: boolean, isClose?: boolean) => void;
  title: string;
  content: React.ReactNode;
}

export const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const { onClose, open, ...other } = props;
  const { t } = useTranslation(["commons"]);

  const handleCancel = (isClose: boolean) => {
    onClose(false, isClose);
  };

  const handleOk = () => {
    onClose(true);
  };

  return (
    <Dialog
      disableEscapeKeyDown
      fullWidth
      maxWidth="sm"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle>{other.title}</DialogTitle>
      <DialogContent dividers>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {other.content}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            paddingX: "10px",
            marginBottom: 1,
            marginTop: 2,
            justifyContent: "flex-end",
          }}
        >
          <CustomButton text={t("button_confirm")} type="rounded" startIcon="checkCircle" handleOnClick={handleOk} />
          <CustomButton
            text={t("button_cancel")}
            type="rounded-outlined"
            startIcon="cancelCircle"
            handleOnClick={() => {
              handleCancel(false);
            }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};
