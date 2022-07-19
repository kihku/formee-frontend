import { COLORS } from "styles";

export interface WelcomeItem {
  title: string;
  content: string[];
  imagePath: string;
  color: string;
}

export const welcomeVi: WelcomeItem[] = [
  {
    title: "Quản lý đơn hàng với biểu mẫu",
    content: ["Tự chọn hình ảnh, màu sắc, phần tử, và nhiều thứ khác", "Lọc và xuất danh sách thành tập tin"],
    imagePath: "/images/welcome/forms.svg",
    color: COLORS.green,
  },
  {
    title: "Quản lý kho hàng",
    content: [
      "Quản lý sản phẩm theo loại",
      "Thống kê sản phẩm bán chạy, tình trạng tồn kho, và nhiều thứ khác",
    ],
    imagePath: "/images/welcome/products.svg",
    color: COLORS.blue,
  },
  {
    title: "Hợp tác với khách hàng",
    content: [
      "Chia sẻ liên kết theo dõi đơn hàng một cách nhanh chóng",
      "Cho phép khách hàng xác nhận hoặc yêu cầu chỉnh sửa đơn hàng",
    ],
    imagePath: "/images/welcome/shipping.svg",
    color: COLORS.red,
  },
  {
    title: "Xem thống kê về mọi mặt",
    content: ["Thống kê tổng quan về đơn hàng, sản phẩm, khách hàng", "Quan sát các xu hướng để phát triển cửa hàng"],
    imagePath: "/images/welcome/statistics.svg",
    color: COLORS.primary,
  },
];

export const welcomeEng: WelcomeItem[] = [
  {
    title: "Manage orders with forms",
    content: ["Customize your own images, colors, components and more", "Filter and export to files"],
    imagePath: "/images/welcome/forms.svg",
    color: COLORS.green,
  },
  {
    title: "Manage product inventory",
    content: ["Manage products by types", "View top-selling products, stock status, and more"],
    imagePath: "/images/welcome/products.svg",
    color: COLORS.blue,
  },
  {
    title: "Collaborate with customers",
    content: ["Quickly share order tracking links for customers", "Let customers confirm or request edits"],
    imagePath: "/images/welcome/shipping.svg",
    color: COLORS.red,
  },
  {
    title: "View reports for everything",
    content: ["See overall statistics for orders, products, and customers", "View trends to grow your business"],
    imagePath: "/images/welcome/statistics.svg",
    color: COLORS.primary,
  },
];
