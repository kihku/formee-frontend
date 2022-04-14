import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import { COLORS } from "styles";

export type IconType = "notification" | "settings";

interface IconProps {
  name: IconType;
  size?: number;
  color?: string;
}

// link to mui rounded icons
// https://mui.com/material-ui/material-icons/?theme=Rounded

export const CustomIcon = ({ name, size, color }: IconProps) => {
  const iconSize = size ?? 50;
  const iconColor = color ?? COLORS.lightText;
  const iconStyle = { width: iconSize, height: iconSize, fill: iconColor };

  switch (name) {
    case "notification":
      return <NotificationsRoundedIcon sx={iconStyle} />;
    case "settings":
      return <SettingsIcon sx={iconStyle} />;
  }
};
