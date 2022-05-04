import { Grid, IconButton, Tooltip } from "@mui/material";
import { COLORS } from "styles";
import { CustomIcon } from "components/CustomIcon";
import { CustomAvatar } from "components/CustomAvatar";
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import { useNavigate } from "react-router-dom";
import { CustomChip } from "components/CustomChip";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t, i18n } = useTranslation(["commons"]);
  const navigate = useNavigate();

  const avatarURL = useSelector((state: RootState) => {
    // console.log("use selector called");
    return state.globalAvatar.value;
  });

  const changeLanguage = (language: "en" | "vi") => {
    i18n.changeLanguage(language);
  };

  return (
    <Grid
      container
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingX: 4,
        paddingY: 0.5,
        backgroundColor: COLORS.white,
        boxShadow: " rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
      }}
    >
      <Grid
        item
        xs={2}
        sx={{ cursor: "pointer" }}
        onClick={() => {
          changeLanguage(i18n.language === "en" ? "vi" : "en");
        }}
      >
        Logo / Change language
      </Grid>
      <Grid
        item
        xs={8}
        sx={{
          display: "flex",
          paddingLeft: "5vh",
          justifyContent: "start",
          gap: 1.5,
        }}
      >
        <CustomChip
          clickable
          text={t("header_home")}
          backgroundColor={
            window.location.href === "http://localhost:3000/home" ? COLORS.primaryBackground : COLORS.white
          }
          textColor={window.location.href === "http://localhost:3000/home" ? COLORS.primary : COLORS.text}
          size={18}
          handleOnClick={() => {
            navigate("/home");
          }}
        />
        <CustomChip
          clickable
          text={t("header_form")}
          backgroundColor={
            window.location.href === "http://localhost:3000/form/create" ? COLORS.primaryBackground : COLORS.white
          }
          textColor={window.location.href === "http://localhost:3000/form/create" ? COLORS.primary : COLORS.text}
          size={18}
          handleOnClick={() => {
            navigate("/form/create");
          }}
        />
        <CustomChip
          clickable
          backgroundColor={
            window.location.href === "http://localhost:3000/orders" ? COLORS.primaryBackground : COLORS.white
          }
          textColor={window.location.href === "http://localhost:3000/orders" ? COLORS.primary : COLORS.text}
          text={t("header_orders")}
          size={18}
          handleOnClick={() => {
            navigate("/orders");
          }}
        />
        <CustomChip
          clickable
          backgroundColor={
            window.location.href === "http://localhost:3000/report" ? COLORS.primaryBackground : COLORS.white
          }
          textColor={window.location.href === "http://localhost:3000/report" ? COLORS.primary : COLORS.text}
          text={t("header_report")}
          size={18}
          handleOnClick={() => {
            navigate("/report");
          }}
        />
        <CustomChip
          clickable
          backgroundColor={
            window.location.href === "http://localhost:3000/components" ? COLORS.primaryBackground : COLORS.white
          }
          textColor={window.location.href === "http://localhost:3000/components" ? COLORS.primary : COLORS.text}
          text={t("header_components")}
          size={18}
          handleOnClick={() => {
            navigate("/components");
          }}
        />
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "end",
          alignItems: "center",
          maxHeight: "8vh",
          paddingY: "3vh",
          gap: 0.5,
        }}
      >
        <CustomAvatar image={avatarURL} />
        <Tooltip title={t("header_settings")}>
          <IconButton
            sx={{ marginRight: "10px" }}
            onClick={() => {
              navigate("/settings");
            }}
          >
            <CustomIcon name="settings" size={25} />
          </IconButton>
        </Tooltip>
        <Tooltip title={t("header_notifications")}>
          <IconButton>
            <CustomIcon name="notification" size={28} />
          </IconButton>
        </Tooltip>
        <Tooltip title={t("header_help")}>
          <IconButton
            onClick={() => {
              navigate("/error"); //test
            }}
          >
            <CustomIcon name="about" size={28} />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};
