import { CustomOption } from "models/baseModels";
import { FormDTO, FormLayoutDTO, FormResponseDTO } from "models/form";
import { COLORS } from "styles";

export const genderOptions: CustomOption[] = [
  { title: "Male", value: 0 },
  { title: "Female", value: 1 },
];

export const formTypeOptions: CustomOption[] = [
  { title: "Food", value: 0 },
  { title: "Fashion", value: 1 },
  { title: "Drinks", value: 2 },
  { title: "Handmade", value: 3 },
];

export const testOptions: CustomOption[] = [
  {
    title: "Favorite",
    value: 0,
    icon: "starOutlined",
    checkedIcon: "star",
    color: "#f2ac85",
    checkedColor: "#f2ac85",
    disableRipple: true,
  },
  { title: "Bookmark", value: 1, icon: "bookmarkOutlined", checkedIcon: "bookmark", disableRipple: true },
  { title: "Normal", value: 2 },
];

export const orderStatusList: CustomOption[] = [
  { title: "", value: "", color: COLORS.lightText },
  { title: "Pending", value: "PENDING", color: COLORS.lightText },
  { title: "Preparing", value: "PREPARING", color: COLORS.orange, backgroundColor: COLORS.orangeBackground },
  { title: "On the way", value: "ON_THE_WAY", color: COLORS.blue, backgroundColor: COLORS.blueBackground },
  { title: "Completed", value: "COMPLETED", color: COLORS.green, backgroundColor: COLORS.greenBackground },
  { title: "Cancelled", value: "CANCELLED", color: COLORS.red, backgroundColor: COLORS.redBackground },
];

export const tinhThanhVN: CustomOption[] = [
  {
    title: "Tỉnh/Thành phố",
    value: "default",
  },
  {
    title: "Thành phố Hồ Chí Minh",
    value: "TPHCM",
  },
  {
    title: "Hà Nội",
    value: "HN",
  },
];

export const quanHuyenVN: CustomOption[] = [
  {
    title: "Quận/Huyện",
    value: "default",
  },
  {
    title: "Quận 1",
    value: "Q1",
    parentValue: "TPHCM",
  },
  {
    title: "Quận 2",
    value: "Q2",
    parentValue: "TPHCM",
  },
  {
    title: "Quận 3",
    value: "Q3",
    parentValue: "TPHCM",
  },
  {
    title: "Quận 4",
    value: "Q4",
    parentValue: "TPHCM",
  },
  {
    title: "Quận 5",
    value: "Q5",
    parentValue: "TPHCM",
  },
  {
    title: "Quận 6",
    value: "Q6",
    parentValue: "TPHCM",
  },
  {
    title: "Quận 7",
    value: "Q7",
    parentValue: "TPHCM",
  },
  {
    title: "Quận 8",
    value: "Q8",
    parentValue: "TPHCM",
  },
  {
    title: "Quận 9",
    value: "Q9",
    parentValue: "TPHCM",
  },
  {
    title: "Quận 10",
    value: "Q10",
    parentValue: "TPHCM",
  },
  {
    title: "Quận 11",
    value: "Q11",
    parentValue: "TPHCM",
  },
  {
    title: "Quận 12",
    value: "Q12",
    parentValue: "TPHCM",
  },
];

export const phuongXaVN: CustomOption[] = [
  {
    title: "Phường/Xã",
    value: "default",
  },
  {
    title: "Phường 1",
    value: "P1",
    parentValue: "Q4",
  },
  {
    title: "Phường 2",
    value: "P2",
    parentValue: "Q4",
  },
  {
    title: "Phường 3",
    value: "P4",
    parentValue: "Q4",
  },
  {
    title: "Phường 4",
    value: "P4",
    parentValue: "TPHCM_Q4",
  },
  {
    title: "Phường 5",
    value: "P5",
    parentValue: "Q4",
  },
  {
    title: "Phường 6",
    value: "P6",
    parentValue: "Q4",
  },
  {
    title: "Phường 7",
    value: "P7",
    parentValue: "Q4",
  },
  {
    title: "Phường 8",
    value: "P8",
    parentValue: "Q4",
  },
  {
    title: "Phường 9",
    value: "P9",
    parentValue: "Q4",
  },
  {
    title: "Phường 10",
    value: "P10",
    parentValue: "Q4",
  },
  {
    title: "Phường 11",
    value: "P11",
    parentValue: "Q4",
  },
  {
    title: "Phường 12",
    value: "P12",
    parentValue: "Q4",
  },
  {
    title: "Phường 13",
    value: "P13",
    parentValue: "Q4",
  },
  {
    title: "Phường 14",
    value: "P14",
    parentValue: "Q4",
  },
  {
    title: "Phường 15",
    value: "P15",
    parentValue: "Q4",
  },
];
