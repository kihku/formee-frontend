import { IconType } from "components/CustomIcon";
import { ReactNode } from "react";

export interface CustomOption {
  title: string;
  value: any;
  icon?: IconType;
  iconColor?: string;
  checkedIcon?: IconType;
  checkedIconColor?: string;
  disableRipple?: boolean;
  component?: ReactNode;
}

export const genderOptions: CustomOption[] = [
  { title: "Male", value: 0 },
  { title: "Female", value: 1 },
];

export const testOptions: CustomOption[] = [
  {
    title: "Favorite",
    value: 0,
    icon: "starOutlined",
    checkedIcon: "star",
    iconColor: "#f2ac85",
    checkedIconColor: "#f2ac85",
    disableRipple: true,
  },
  { title: "Bookmark", value: 1, icon: "bookmarkOutlined", checkedIcon: "bookmark", disableRipple: true },
  { title: "Normal", value: 2 },
];
