export interface HelpItem {
  question: string;
  answer: string[];
  imagePath: string[];
}

export const helpListVi: HelpItem[] = [
  {
    question: "Làm sao để tạo form?",
    answer: ["Từ Trang chủ, chọn Tạo mẫu đơn mới",
    "Điền tất cả thông tin cần thiết bao gồm tên mẫu, ảnh đại diện cho mẫu và miền bổ sung cho mẫu",
    "Chọn nút “Tạo mẫu đơn” và hoàn thành tạo mẫu đơn",
    ],
    imagePath: ["/images/userguide/form1.png","/images/userguide/form2.png"],
  },
  {
    question:"Làm sao để tạo đơn hàng?",
    answer:["Từ “Trang chủ” chọn mẫu đơn bạn muốn tạo đơn hàng từ đó",
    "Bạn sẽ được dẫn đến trang tạo đơn hàng mới, điền hết thông tin cá nhân khách hàng và thông tin đơn hàng để đến bước tiếp theo",
    "Giá đơn hàng sẽ được hiển thị ở cuối trang tạo đơn hàng, chọn “tạo đơn hàng mới” để hoàn thành việc tạo đơn hàng",
    "Trang thông tin tóm tắt hiển thị nội dung đơn hàng vừa tạo sẽ hiện lên sau khi hoàn thành tạo đơn hàng",
    "Bạn có thể xem nhanh đơn hàng tại trang chủ hoặc mục order"],
    imagePath:["/images/userguide/order1.png","/images/userguide/order2.png","/images/userguide/order3.png",
  "/images/userguide/order4.png","/images/userguide/order5.png"],
  },
  {
    question:"Cách tạo và sử dụng tracking link?",
    answer:["Từ trang chủ, chọn đơn hàng mà bạn muốn sao chép đường dẫn",
    "Kéo xuống cuối trang tóm tắt đơn hàng sau đó chọn vào đường dẫn để sao chép",
    "Bây giờ đường dẫn của bạn đã được sao chép, bạn có thể gửi nó cho khách hàng để theo dõi đơn hàng",
    "Bạn có thể sao chép đường dẫn đơn hàng nhanh bằng cách chọn vào biểu tượng đường dẫn ở mục “Hành động” bên trong thanh đơn hàng",
   ],
    imagePath:["/images/userguide/order5.png","/images/userguide/tracking2.png",
  "/images/userguide/tracking3.png"],
  },
  {
    question:"Cách tạo và theo dõi sản phẩm?",
    answer:["Từ “Trang chủ” chọn vào mục Sản phẩm để tới giao diện sản phẩm",
    "Chọn vào biểu tượng “+” bên cạnh loại sản phẩm để thêm loại sản phẩm mới",
    "Điền tên loại sản phẩm, màu thẻ của loại sản phẩm sau đó chọn lưu để hoàn thành",
    "Sau khi có loại sản phẩm cần thiết, chọn “Tạo sản phẩm” phía trên góc phải",
    "Điền những thông tin cần thiết cho sản phẩm sau đó chọn “Lưu”",
    "Bạn đã hoàn thành tạo sản phẩm mới và có thể xem sản phẩm từ giao diện sản phẩm",
   ],
    imagePath:["/images/userguide/product1.png","/images/userguide/product2.png","/images/userguide/product3.png",
    "/images/userguide/product4.png"]
  },
];

export const helpListEng: HelpItem[] = [
  {
    question: "How to create a new form?",
    answer: ["Form Home Page, click on “New form” button",
    "Fill all the required information such as form’s name, form avatar and additional fields",
    "Click on “Create form” and now you have a new form",
    ],
    imagePath: ["/images/userguide/form1.png","/images/userguide/form2.png"],
  },
  {
    question:"How to create a new order?",
    answer:["Form a Home Page, click on a Form that you want to create order using that form",
    "A new order page will be pop up, fill all the customer and order information to process to the next step",
    "The total price will be showed at the bottom of the order page, click on “create new order” button to complete action",
    "There is a pop up to show an overview of the order",
    "You can quick view the new order from home page or in the Order tab"],
    imagePath:["/images/userguide/order1.png","/images/userguide/order2.png","/images/userguide/order3.png",
  "/images/userguide/order4.png","/images/userguide/order5.png"],
  },
  {
    question:"How to create and use an order tracking link?",
    answer:["From Home page, click on the order you want to copy",
    "Scroll to the bottom of the order overview then click on the link to perform a copy action",
    "Now your tracking link are copied, you can send it to your customers",
    "You can also have a quick copy by click on the icon “link” on action field on order bar",
   ],
    imagePath:["/images/userguide/order5.png","/images/userguide/tracking2.png",
   "/images/userguide/tracking3.png"],
  },
  {
    question:"How to create and view your products?",
    answer:["From Home page, click on Product tab to process to the product interface",
    "Click on the “+” button beside the “product type” to add new product type",
    "Fill the product type name and type tag then click “Save” to save",
    "After having product type, click on the “Create product” button on the right corner",
    "Fill all the necessary information of the product then click on “Save” button",
    "You have a new product, now you can view the product list form the product interface",
   ],
    imagePath:["/images/userguide/product1.png","/images/userguide/product2.png","/images/userguide/product3.png",
   "/images/userguide/product4.png"]
  },
];


