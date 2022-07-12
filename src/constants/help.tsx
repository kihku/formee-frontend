export interface HelpItem {
  question: string;
  answer: string[];
  imagePath: string;
}

export const helpListVi: HelpItem[] = [
  {
    question: "Làm sao để tạo form?",
    answer: ["Từ Trang chủ, chọn Tạo mẫu đơn mới"],
    imagePath: "/images/loginBG.svg",
  },
];

export const helpListEng: HelpItem[] = [
  {
    question: "How to create a new form?",
    answer: ["Form Home Page, click on 'Create new form' button"],
    imagePath: "/images/loginBG.svg",
  },
];
