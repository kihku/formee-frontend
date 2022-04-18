import { Box, Button, Grid, IconButton, Tab, Tabs } from "@mui/material";
import { COLORS } from "styles";
import CircleIcon from "@mui/icons-material/Circle";
import { CustomIcon } from "components/CustomIcon";
import { CustomButton } from "components/CustomButton";
import { useState } from "react";
import { CustomAvatar } from "components/CustomAvatar";
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import { useNavigate } from "react-router-dom";
import { CustomChip } from "components/CustomChip";

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const navigate = useNavigate();

  const avatarURL = useSelector((state: RootState) => {
    console.log("use selector called");
    return state.globalAvatar.value;
  });

  console.log(window.location.href);

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
        backgroundColor: COLORS.background,
        boxShadow: " rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
      }}
    >
      <Grid item xs={2}>
        Logo
      </Grid>
      <Grid
        item
        xs={8}
        sx={{
          display: "flex",
          paddingLeft: "5vh",
          justifyContent: "start",
          gap: 1,
        }}
      >
        <CustomChip
          clickable
          text="Home"
          backgroundColor={window.location.href === "http://localhost:3000/" ? "#eeefff" : "#f7f8fc"}
          textColor={window.location.href === "http://localhost:3000/" ? COLORS.primary : COLORS.text}
          size={16}
          handleOnClick={() => {
            navigate("/");
          }}
        />
        <CustomChip
          clickable
          backgroundColor={window.location.href === "http://localhost:3000/orders" ? "#eeefff" : "#f7f8fc"}
          textColor={window.location.href === "http://localhost:3000/orders" ? COLORS.primary : COLORS.text}
          text="Orders"
          size={16}
          handleOnClick={() => {
            navigate("/orders");
          }}
        />
        <CustomChip
          clickable
          backgroundColor={window.location.href === "http://localhost:3000/report" ? "#eeefff" : "#f7f8fc"}
          textColor={window.location.href === "http://localhost:3000/report" ? COLORS.primary : COLORS.text}
          text="Report"
          size={16}
          handleOnClick={() => {
            navigate("/report");
          }}
        />
        <CustomChip
          clickable
          backgroundColor={window.location.href === "http://localhost:3000/components" ? "#eeefff" : "#f7f8fc"}
          textColor={window.location.href === "http://localhost:3000/components" ? COLORS.primary : COLORS.text}
          text="Components"
          size={16}
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
        <IconButton
          sx={{ marginRight: "10px" }}
          onClick={() => {
            navigate("/settings");
          }}
        >
          <CustomIcon name="settings" size={25} />
        </IconButton>
        <IconButton>
          <CustomIcon name="notification" size={28} />
        </IconButton>
        <IconButton>
          <CustomIcon name="about" size={28} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
