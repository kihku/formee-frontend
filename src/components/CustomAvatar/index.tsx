import { Avatar, Badge, Box, Divider, Grid, Menu, MenuItem, styled } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "styles";
import { setCookie } from "utils/cookieUtils";

interface CustomAvatarProps {
  image?: string;
  name: string;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: -0.9,
      left: -1.1,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export const CustomAvatar = ({ image, name }: CustomAvatarProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenuStatus = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <StyledBadge
        overlap="circular"
        sx={{ cursor: "pointer" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        onClick={handleOpenMenu}
      >
        <Avatar src={image} imgProps={{ referrerPolicy: "no-referrer" }} sx={{ width: 35, height: 35 }} />
      </StyledBadge>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={openMenuStatus}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            maxWidth: "15vw",
            paddingX: 2,
            paddingY: 1,
            color: COLORS.primary,
            fontWeight: 500,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {name}
        </Box>
        <Box sx={{ maxWidth: "15vw", paddingX: 2, paddingY: 0.5 }}>
          <Divider />
        </Box>

        <MenuItem onClick={e => {}} sx={{ maxWidth: "15vw", paddingX: 2, display: "flex", justifyContent: "flex-end" }}>
          {"Chỉnh sửa hồ sơ"}
        </MenuItem>

        <MenuItem onClick={e => {}} sx={{ maxWidth: "15vw", paddingX: 2, display: "flex", justifyContent: "flex-end" }}>
          {"Liên hệ"}
        </MenuItem>

        <MenuItem
          sx={{ maxWidth: "15vw", paddingX: 2, display: "flex", justifyContent: "flex-end" }}
          onClick={e => {
            setCookie("USER_ID", "");
            setCookie("USER_TOKEN", "");
            localStorage.setItem("USER_DATA", "{}");
            getAuth().signOut(); // firebase
            navigate("/login");
          }}
        >
          {"Đăng xuất"}
        </MenuItem>
      </Menu>
    </Box>
  );
};
