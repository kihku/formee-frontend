import { Avatar, Badge, Box, Menu, MenuItem, styled } from "@mui/material";
import { useState } from "react";

interface CustomAvatarProps {
  image?: string;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#5764BD",
    color: "#5764BD",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
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

export const CustomAvatar = ({ image }: CustomAvatarProps) => {
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
        <MenuItem onClick={e => {}}>{"Đăng xuất"}</MenuItem>
      </Menu>
    </Box>
  );
};
