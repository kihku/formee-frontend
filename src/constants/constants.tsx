import { CustomOption } from "models/baseModels";
import { COLORS } from "styles";

export const componentOptionsVi: CustomOption[] = [
  { title: "Thông tin giao hàng", value: "SHIPPING" },
  { title: "Hình thức thanh toán", value: "PAYMENT" },
];

export const componentOptionsEng: CustomOption[] = [
  { title: "Delivery information", value: "SHIPPING" },
  { title: "Payment information", value: "PAYMENT" },
];

export const defaultImageList: CustomOption[] = [
  { title: "Default", value: "default" },
  { title: "Food", value: "food" },
  { title: "Clothes", value: "clothes" },
  { title: "Drinks", value: "drinks" },
  { title: "Fruits", value: "fruits" },
];

export const defaultColorList: CustomOption[] = [
  { title: "purple", value: COLORS.primary },
  { title: "blue", value: COLORS.blue },
  { title: "green", value: COLORS.green },
  { title: "orange", value: COLORS.orange },
  { title: "yellow", value: COLORS.yellow },
  { title: "red", value: COLORS.red },
  { title: "gray", value: COLORS.lightText },
];

export const orderStatusListVi: CustomOption[] = [
  { title: "", value: "", color: COLORS.lightText },
  { title: "Chờ xác nhận", value: "PENDING", color: COLORS.lightText },
  { title: "Đang chuẩn bị", value: "PREPARING", color: COLORS.orange, backgroundColor: COLORS.orangeBackground },
  { title: "Đang giao hàng", value: "ON_THE_WAY", color: COLORS.blue, backgroundColor: COLORS.blueBackground },
  { title: "Hoàn thành", value: "COMPLETED", color: COLORS.green, backgroundColor: COLORS.greenBackground },
  { title: "Đã huỷ", value: "CANCELLED", color: COLORS.red, backgroundColor: COLORS.redBackground },
  { title: "Đã xác nhận", value: "CONFIRMED", color: COLORS.primaryLight, backgroundColor: COLORS.primaryBackground },
  { title: "Chờ chỉnh sửa", value: "REQUESTED", color: COLORS.yellow, backgroundColor: COLORS.yellowBackground },
];

export const orderStatusListEng: CustomOption[] = [
  { title: "", value: "", color: COLORS.lightText },
  { title: "Pending", value: "PENDING", color: COLORS.lightText },
  { title: "Preparing", value: "PREPARING", color: COLORS.orange, backgroundColor: COLORS.orangeBackground },
  { title: "On the way", value: "ON_THE_WAY", color: COLORS.blue, backgroundColor: COLORS.blueBackground },
  { title: "Completed", value: "COMPLETED", color: COLORS.green, backgroundColor: COLORS.greenBackground },
  { title: "Cancelled", value: "CANCELLED", color: COLORS.red, backgroundColor: COLORS.redBackground },
  { title: "Confirmed", value: "CONFIRMED", color: COLORS.primaryLight, backgroundColor: COLORS.primaryBackground },
  { title: "Requested", value: "REQUESTED", color: COLORS.yellow, backgroundColor: COLORS.yellowBackground },
];

export const editStatusListVi: CustomOption[] = [
  { title: "Đang chuẩn bị", value: "PREPARING", color: COLORS.orange, backgroundColor: COLORS.orangeBackground },
  { title: "Đang giao hàng", value: "ON_THE_WAY", color: COLORS.blue, backgroundColor: COLORS.blueBackground },
  { title: "Hoàn thành", value: "COMPLETED", color: COLORS.green, backgroundColor: COLORS.greenBackground },
];

export const editStatusListEng: CustomOption[] = [
  { title: "Preparing", value: "PREPARING", color: COLORS.orange, backgroundColor: COLORS.orangeBackground },
  { title: "On the way", value: "ON_THE_WAY", color: COLORS.blue, backgroundColor: COLORS.blueBackground },
  { title: "Completed", value: "COMPLETED", color: COLORS.green, backgroundColor: COLORS.greenBackground },
];

export const productTypeColors: CustomOption[] = [
  { title: COLORS.primaryLight, value: COLORS.primaryBackground },
  { title: COLORS.blue, value: COLORS.blueBackground },
  { title: COLORS.green, value: COLORS.greenBackground },
  { title: COLORS.orange, value: COLORS.orangeBackground },
  { title: COLORS.yellow, value: COLORS.yellowBackground },
  { title: COLORS.red, value: COLORS.redBackground },
  { title: COLORS.lightText, value: COLORS.grayBackground },
];

export const shippingServicesEng: CustomOption[] = [
  { title: "Choose shipping service", value: "" },
  { title: "Giao hàng nhanh", value: "GHN" },
  { title: "Giao hàng tiết kiệm", value: "GHTK" },
  { title: "Ninja Van", value: "NJV" },
  { title: "J&T Express", value: "JT" },
  { title: "BEST Express", value: "BEST" },
  { title: "VNPost", value: "VNPOST" },
  { title: "Viettel Post", value: "VIETTEL" },
];

export const shippingServicesVi: CustomOption[] = [
  { title: "Chọn đơn vị vận chuyển", value: "" },
  { title: "Giao hàng nhanh", value: "GHN" },
  { title: "Giao hàng tiết kiệm", value: "GHTK" },
  { title: "Ninja Van", value: "NJV" },
  { title: "J&T Express", value: "JT" },
  { title: "BEST Express", value: "BEST" },
  { title: "VNPost", value: "VNPOST" },
  { title: "Viettel Post", value: "VIETTEL" },
];

export const paymentMethodsVi: CustomOption[] = [
  { title: "Chọn phương thức thanh toán", value: "" },
  { title: "Thanh toán trả trước", value: "PRE_PAID" },
  { title: "Thanh toán khi nhận hàng", value: "COD" },
];

export const paymentMethodsEng: CustomOption[] = [
  { title: "Choose payment method", value: "" },
  { title: "Pre-paid", value: "PRE_PAID" },
  { title: "Cash On Delivery", value: "COD" },
];

export const defaultFormLayoutVi: any = {
  sections: [
    {
      title: "A. Thông tin người mua",
      components: [
        { title: "Số điện thoại", type: "PHONE", validation: [], showOnTable: false, xs: 5 },
        {
          title: "Tên người mua",
          type: "TEXT",
          validation: [],
          showOnTable: true,
          xs: 2.5,
        },
        {
          title: "Địa chỉ giao hàng",
          type: "ADDRESS",
          validation: [],
          showOnTable: true,
          xs: 10,
        },
        { title: "Ghi chú", type: "TEXT", validation: [], showOnTable: false, xs: 2.5 },
      ],
    },
    {
      title: "B. Chi tiết đơn hàng",
      components: [{ title: "Sản phẩm", type: "CART", validation: [], showOnTable: false, xs: 10 }],
    },
  ],
};

export const defaultFormLayoutEng: any = {
  sections: [
    {
      title: "A. Customer information",
      components: [
        { title: "Phone number", type: "PHONE", validation: [], showOnTable: false, xs: 5 },
        {
          title: "Customer name",
          type: "TEXT",
          validation: [],
          showOnTable: true,
          xs: 2.5,
        },
        {
          title: "Shipping address",
          type: "ADDRESS",
          validation: [],
          showOnTable: true,
          xs: 10,
        },
        { title: "Notes", type: "TEXT", validation: [], showOnTable: false, xs: 2.5 },
      ],
    },
    {
      title: "B. Order information",
      components: [{ title: "Products", type: "CART", validation: [], showOnTable: false, xs: 10 }],
    },
  ],
};

export const monthListVi = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

export const monthListEng = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
