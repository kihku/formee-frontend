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
  { title: "Chờ xác nhận", value: "PENDING", color: COLORS.lightText },
  { title: "Đang chuẩn bị", value: "PREPARING", color: COLORS.orange, backgroundColor: COLORS.orangeBackground },
  { title: "Đang giao hàng", value: "ON_THE_WAY", color: COLORS.blue, backgroundColor: COLORS.blueBackground },
  { title: "Hoàn thành", value: "COMPLETED", color: COLORS.green, backgroundColor: COLORS.greenBackground },
  { title: "Đã huỷ", value: "CANCELLED", color: COLORS.red, backgroundColor: COLORS.redBackground },
  { title: "Đã xác nhận", value: "CONFIRMED", color: COLORS.primaryLight, backgroundColor: COLORS.primaryBackground },
  { title: "Chờ chỉnh sửa", value: "REQUESTED", color: COLORS.yellow, backgroundColor: COLORS.yellowBackground },
];

export const editStatusList: CustomOption[] = [
  { title: "Đang chuẩn bị", value: "PREPARING", color: COLORS.orange, backgroundColor: COLORS.orangeBackground },
  { title: "Đang giao hàng", value: "ON_THE_WAY", color: COLORS.blue, backgroundColor: COLORS.blueBackground },
  { title: "Hoàn thành", value: "COMPLETED", color: COLORS.green, backgroundColor: COLORS.greenBackground },
  { title: "Huỷ", value: "CANCELLED", color: COLORS.red, backgroundColor: COLORS.redBackground },
];

export const productTypeList: CustomOption[] = [
  { title: "Thời trang", value: "CLOTHES" },
  { title: "Mỹ phẩm", value: "COSMETICS" },
  { title: "Thực phẩm", value: "FOOD" },
  { title: "Trang sức", value: "JEWELRY" },
  { title: "Y tế", value: "HEALTH" },
  { title: "Điện tử", value: "ELECTRONICS" },
  { title: "Dịch vụ", value: "SERVICE" },
  { title: "Sách báo", value: "BOOKS" },
];
