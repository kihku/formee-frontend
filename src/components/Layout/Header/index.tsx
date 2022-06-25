/* eslint-disable jsx-a11y/alt-text */
import { Box, Grid, Icon, IconButton, InputBase, MenuItem, Select, Tooltip } from "@mui/material";
import { CustomAvatar } from "components/CustomAvatar";
import { CustomChip } from "components/CustomChip";
import { CustomIcon } from "components/CustomIcon";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/reducers/rootReducer";
import { COLORS } from "styles";

export const Header = () => {
  const { t, i18n } = useTranslation(["commons"]);
  const navigate = useNavigate();

  const userInfo = useSelector((state: RootState) => {
    // console.log("use selector called");
    return state.userInfo;
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
        xs={8}
        sx={{
          display: "flex",
          paddingLeft: "5vh",
          justifyContent: "start",
          gap: 1.5,
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", marginRight: 5 }}
          onClick={() => {
            navigate("/home");
          }}
        >
          <Icon sx={{ transform: "scale(1.8)", cursor: "pointer" }}>
            <img src="/images/logo.svg" height="100%" />
          </Icon>
        </Box>
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
            window.location.href === "http://localhost:3000/products" ? COLORS.primaryBackground : COLORS.white
          }
          textColor={window.location.href === "http://localhost:3000/products" ? COLORS.primary : COLORS.text}
          text={"Sản phẩm"}
          size={18}
          handleOnClick={() => {
            navigate("/products");
          }}
        />
        {/* <CustomChip
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
        /> */}
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "end",
          alignItems: "center",
          // maxHeight: "8vh",
          paddingY: "2vh",
          gap: 0.5,
        }}
      >
        <CustomAvatar image={userInfo.image} />
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
              navigate("/error"); //test
            }}
          >
            <CustomIcon name="about" size={28} />
          </IconButton>
        </Tooltip>
        <Select
          sx={{ marginLeft: 2 }}
          input={<InputBase value={String(localStorage.getItem("i18nextLng"))} />}
          onChange={event => {}}
        >
          <MenuItem
            value={"vi"}
            onClick={() => {
              changeLanguage("vi");
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
              Tiếng Việt
            </Box>
          </MenuItem>
          <MenuItem
            value={"en"}
            onClick={() => {
              changeLanguage("en");
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
              English
            </Box>
          </MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
};
