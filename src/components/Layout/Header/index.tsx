/* eslint-disable jsx-a11y/alt-text */
import { Box, Grid, Icon, IconButton, InputBase, MenuItem, Select, Tooltip } from "@mui/material";
import { CustomAvatar } from "components/CustomAvatar";
import { CustomChip } from "components/CustomChip";
import { CustomIcon } from "components/CustomIcon";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { COLORS } from "styles";

export const Header = () => {
  const { t, i18n } = useTranslation(["commons"]);
  const navigate = useNavigate();

  const userInfo = JSON.parse(String(localStorage.getItem("USER_DATA")));

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
        xs={8}
        sx={{
          display: "flex",
          paddingLeft: "1vw",
          justifyContent: "start",
          gap: 1.5,
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", marginRight: 2, cursor: "pointer" }}
          onClick={() => {
            navigate("/home");
          }}
        >
          <img src="/images/logo-full.svg" height="35vh" />
        </Box>
        <CustomChip
          clickable
          text={t("header_home")}
          backgroundColor={window.location.href.split("/").at(-1) === "home" ? COLORS.primaryBackground : COLORS.white}
          textColor={window.location.href.split("/").at(-1) === "home" ? COLORS.primary : COLORS.text}
          size={18}
          handleOnClick={() => {
            navigate("/home");
          }}
        />
        <CustomChip
          clickable
          backgroundColor={
            window.location.href.split("/").at(-1) === "orders" ? COLORS.primaryBackground : COLORS.white
          }
          textColor={window.location.href.split("/").at(-1) === "orders" ? COLORS.primary : COLORS.text}
          text={t("header_orders")}
          size={18}
          handleOnClick={() => {
            navigate("/orders");
          }}
        />
        <CustomChip
          clickable
          backgroundColor={
            window.location.href.split("/").at(-1) === "products" ? COLORS.primaryBackground : COLORS.white
          }
          textColor={window.location.href.split("/").at(-1) === "products" ? COLORS.primary : COLORS.text}
          text={t("header_products")}
          size={18}
          handleOnClick={() => {
            navigate("/products");
          }}
        />
        <CustomChip
          clickable
          backgroundColor={
            window.location.href.split("/").at(-1) === "customers" ? COLORS.primaryBackground : COLORS.white
          }
          textColor={window.location.href.split("/").at(-1) === "customers" ? COLORS.primary : COLORS.text}
          text={t("header_customers")}
          size={18}
          handleOnClick={() => {
            navigate("/customers");
          }}
        />
        <CustomChip
          clickable
          backgroundColor={
            window.location.href.split("/").at(-1) === "report" ? COLORS.primaryBackground : COLORS.white
          }
          textColor={window.location.href.split("/").at(-1) === "report" ? COLORS.primary : COLORS.text}
          text={t("header_report")}
          size={18}
          handleOnClick={() => {
            navigate("/report");
          }}
        />
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "end",
          alignItems: "center",
          paddingY: "2vh",
          gap: 0.5,
        }}
      >
        <CustomAvatar image={userInfo.profilePicture} name={userInfo.fullName} />
        {/* <Box>{userInfo.name}</Box> */}
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
        <Tooltip title={t("header_help")}>
          <IconButton
            onClick={() => {
              navigate("/help");
            }}
          >
            <CustomIcon name="about" size={28} />
          </IconButton>
        </Tooltip>
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
              {t("header_language_vi")}
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
              {t("header_language_en")}
            </Box>
          </MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
};
