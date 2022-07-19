/* eslint-disable jsx-a11y/alt-text */
import { Box, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Typography } from "@mui/material";
import { CustomButton } from "components/CustomButton";
import { CustomIcon } from "components/CustomIcon";
import { CustomTitle } from "components/CustomTitle";
import { welcomeEng, welcomeVi } from "constants/welcome";
import { useTranslation } from "react-i18next";
import { COLORS } from "styles";

export interface DialogWelcomeProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleOpenNewForm: () => void;
}

const DialogWelcome = ({ openDialog, handleCloseDialog, handleOpenNewForm }: DialogWelcomeProps) => {
  const { t } = useTranslation(["home", "messages"]);
  const currentLanguage = String(localStorage.getItem("i18nextLng"));

  function closeDialog() {
    handleCloseDialog();
  }

  return (
    <Dialog fullWidth maxWidth="xl" open={openDialog} onClose={closeDialog}>
      <DialogTitle>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <CustomTitle text={[{ text: t("home_user_guide_title"), highlight: true }]} />
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
          <Grid item xs={12} sx={{ paddingX: 5, paddingTop: 5, display: "flex", justifyContent: "center", gap: 5 }}>
            {(currentLanguage === "en" ? welcomeEng : welcomeVi).map((item, index) => (
              <Box sx={{ width: "300px" }}>
                <img
                  style={{
                    zIndex: 99,
                    width: "100%",
                    objectFit: "contain",
                  }}
                  src={item.imagePath}
                />
                <Box sx={{ fontSize: "20px", fontWeight: 600, color: COLORS.text, marginBottom: 2, marginTop: 1 }}>
                  {item.title}
                </Box>
                {item.content.map(ans => (
                  <Box sx={{ paddingY: 0.75, display: "flex", gap: 2 }}>
                    <Divider
                      flexItem
                      orientation="vertical"
                      sx={{ borderRightWidth: "3px", borderColor: item.color }}
                    />
                    {ans}
                  </Box>
                ))}
              </Box>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                marginBottom: 1,
                marginTop: 2,
                paddingRight: 5,
                gap: 3,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Box onClick={closeDialog}>
                <Typography
                  sx={{
                    fontWeight: 400,
                    color: COLORS.lightText,
                    cursor: "pointer",
                    ":hover": { textDecoration: "underline" },
                  }}
                >
                  {currentLanguage === "en" ? "Skip for now" : "Bỏ qua"}
                </Typography>
              </Box>
              <CustomButton
                text={currentLanguage === "en" ? "Create your first form" : "Tạo mẫu đơn đầu tiên của bạn"}
                type={"rounded"}
                endIcon={"rightArrow"}
                style={{
                  marginY: 1,
                  fontSize: 16,
                  fontWeight: 400,
                  paddingY: 1,
                }}
                handleOnClick={handleOpenNewForm}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
export default DialogWelcome;
