import { CustomOption } from "models/baseModels";
import { FormDTO, FormLayoutDTO, FormResponseDTO } from "models/form";
import { COLORS } from "styles";

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
    color: "#f2ac85",
    checkedColor: "#f2ac85",
    disableRipple: true,
  },
  { title: "Bookmark", value: 1, icon: "bookmarkOutlined", checkedIcon: "bookmark", disableRipple: true },
  { title: "Normal", value: 2 },
];

export const orderStatusList: CustomOption[] = [
  { title: "Pending", value: "PENDING", color: COLORS.lightText },
  { title: "Preparing", value: "PREPARING", color: COLORS.orange, backgroundColor: COLORS.orangeBackground },
  { title: "On the way", value: "ON_THE_WAY", color: COLORS.blue, backgroundColor: COLORS.blueBackground },
  { title: "Completed", value: "COMPLETED", color: COLORS.green, backgroundColor: COLORS.greenBackground },
  { title: "Cancelled", value: "CANCELLED", color: COLORS.red, backgroundColor: COLORS.redBackground },
];

export const exampleLayout: FormLayoutDTO = {
  id: "123",
  components: [
    {
      title: "Customer Name",
      type: "TEXT",
      validation: [{ type: "REQUIRED", errorMessgage: "Customer name must not be empty" }],
      showOnTable: true,
    },
    {
      title: "Contact Number",
      type: "TEXT",
      validation: [],
      showOnTable: false,
    },
    {
      title: "Shipping Address",
      type: "TEXT",
      validation: [{ type: "REQUIRED", errorMessgage: "Shipping address must not be empty" }],
      showOnTable: true,
    },
    {
      title: "Status",
      type: "STATUS",
      validation: [],
      showOnTable: true,
    },
    {
      title: "Order Details",
      type: "CART",
      validation: [],
      showOnTable: false,
    },
  ],
};

export const exampleForm: FormDTO = {
  id: "ABC",
  name: "Form ABC",
  layout: exampleLayout,
};

export const exampleResponses: FormResponseDTO[] = [
  {
    id: "5BLIRI9RZH",
    formId: "ABC",
    createdDate: new Date(),
    response: [
      "Trần Bảo Long",
      "+84564243269",
      "227 Nguyễn Văn Cừ, P.4, Q.5, TPHCM",
      "PENDING",
      [
        { productName: "Chocolate Mousse", unitPrice: 45000, quantity: 1 },
        { productName: "Tiramisu", unitPrice: 40000, quantity: 2 },
      ],
    ],
  },
  {
    id: "KTBUEHU2FI",
    formId: "ABC",
    createdDate: new Date(),
    response: [
      "Võ Thanh Vũ",
      "+84555562671",
      "280 An Dương Vương, P.4, Q.5, TPHCM",
      "PREPARING",
      [
        { productName: "Chocolate Mousse", unitPrice: 45000, quantity: 1 },
        { productName: "Tiramisu", unitPrice: 40000, quantity: 2 },
      ],
    ],
  },
  {
    id: "3J3S2CDF61",
    formId: "ABC",
    createdDate: new Date(),
    response: [
      "Ngô Bích Hà",
      "+84355571387",
      "20 Lý Tự Trọng, P.Bến Nghé, Q.1, TPHCM",
      "ON_THE_WAY",
      [
        { productName: "Chocolate Mousse", unitPrice: 45000, quantity: 1 },
        { productName: "Tiramisu", unitPrice: 40000, quantity: 2 },
      ],
    ],
  },
  {
    id: "K8S63YIN77",
    formId: "ABC",
    createdDate: new Date(),
    response: [
      "Lê Nhã Hương",
      "+84355542737",
      "649 Hoàng Văn Thụ, P.4, Q.Tân Bình, TPHCM",
      "COMPLETED",
      [
        { productName: "Chocolate Mousse", unitPrice: 45000, quantity: 1 },
        { productName: "Tiramisu", unitPrice: 40000, quantity: 2 },
      ],
    ],
  },
  {
    id: "1E4JAOCISC",
    formId: "ABC",
    createdDate: new Date(),
    response: [
      "Lương Quốc Mạnh",
      "+84855571621",
      "235 Nguyễn Văn Cừ, P.Nguyễn Cư Trinh, Q.1, TPHCM",
      "CANCELLED",
      [
        { productName: "Chocolate Mousse", unitPrice: 45000, quantity: 1 },
        { productName: "Tiramisu", unitPrice: 40000, quantity: 2 },
      ],
    ],
  },
  // {
  //   id: "V7OL6C3DCU",
  //   customerName: "Nguyễn Trọng Dũng",
  //   phoneNumber: "+84555511395",
  //   total: "936.500đ",
  //   createdDate: new Date(),
  //   status: "Completed",
  //   statusColor: COLORS.green,
  //   statusBackgroundColor: COLORS.greenBackground,
  // },
  // {
  //   id: "ZQ84510D2C",
  //   customerName: "Vũ Thanh Ngân",
  //   phoneNumber: "+84555546989",
  //   total: "492.000đ",
  //   createdDate: new Date(),
  //   status: "Cancelled",
  //   statusColor: COLORS.red,
  //   statusBackgroundColor: COLORS.redBackground,
  // },
  // {
  //   id: "SJO8SJ2O09",
  //   customerName: "Hoàng Ngọc Loan",
  //   phoneNumber: "+84210192830",
  //   total: "275.000đ",
  //   createdDate: new Date(),
  //   status: "On the way",
  //   statusColor: COLORS.blue,
  //   statusBackgroundColor: COLORS.blueBackground,
  // },
  // {
  //   id: "5BLIRI9RZH",
  //   customerName: "Trần Bảo Long",
  //   phoneNumber: "+84564243269",
  //   total: "270.000đ",
  //   createdDate: new Date(),
  //   status: "Pending",
  //   statusColor: COLORS.primary,
  //   statusBackgroundColor: COLORS.primaryBackground,
  // },
  // {
  //   id: "KTBUEHU2FI",
  //   customerName: "Võ Thanh Vũ",
  //   phoneNumber: "+84555562671",
  //   total: "300.000đ",
  //   createdDate: new Date(),
  //   status: "Pending",
  //   statusColor: COLORS.primary,
  //   statusBackgroundColor: COLORS.primaryBackground,
  // },
  // {
  //   id: "3J3S2CDF61",
  //   customerName: "Ngô Bích Hà",
  //   phoneNumber: "+84355571387",
  //   total: "120.000đ",
  //   createdDate: new Date(),
  //   status: "Preparing",
  //   statusColor: COLORS.orange,
  //   statusBackgroundColor: COLORS.orangeBackground,
  // },
  // {
  //   id: "K8S63YIN77",
  //   customerName: "Lê Nhã Hương",
  //   phoneNumber: "+84355542737",
  //   total: "50.000đ",
  //   createdDate: new Date(),
  //   status: "On the way",
  //   statusColor: COLORS.blue,
  //   statusBackgroundColor: COLORS.blueBackground,
  // },
  // {
  //   id: "1E4JAOCISC",
  //   customerName: "Lương Quốc Mạnh",
  //   phoneNumber: "+84855571621",
  //   total: "1.398.000đ",
  //   createdDate: new Date(),
  //   status: "Completed",
  //   statusColor: COLORS.green,
  //   statusBackgroundColor: COLORS.greenBackground,
  // },
  // {
  //   id: "V7OL6C3DCU",
  //   customerName: "Nguyễn Trọng Dũng",
  //   phoneNumber: "+84555511395",
  //   total: "936.500đ",
  //   createdDate: new Date(),
  //   status: "Completed",
  //   statusColor: COLORS.green,
  //   statusBackgroundColor: COLORS.greenBackground,
  // },
];
