import { Box, Button, Grid, IconButton, Tab, Tabs } from "@mui/material";
import { COLORS } from "styles";
import CircleIcon from "@mui/icons-material/Circle";
import { CustomIcon } from "components/CustomIcon";
import { CustomButton } from "components/CustomButton";
import { useState } from "react";

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const [testHeader, setTestHeader] = useState<string>("");

  return (
    <Grid
      container
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingX: "2vh",
        maxHeight: "8vh",
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
          justifyContent: "start"
        }}
      >
        Navigation
        {/* <Tabs
          value={testHeader}
          onChange={(e, value) => {
            setTestHeader(value);
          }}
        >
          <Tab
            disableRipple
            label={
              <Box
                sx={{
                  paddingX: 2,
                  borderRadius: 10,
                  backgroundColor: "#eeefff",
                }}
              >
                Home
              </Box>
            }
            sx={{
              ".MuiTabs-indicator": {
                display: "none",
              },
            }}
          />
          <Tab label="Orders" />
          <Tab label="Report" />
          <Tab label="Subscription" />
        </Tabs> */}
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
        {/* avatar here */}
        <CircleIcon sx={{ fill: COLORS.primary, width: "40px", height: "40px" }} />
        <IconButton>
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
