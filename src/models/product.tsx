import { productTypeColors } from "constants/constants";

export interface ProductDTO {
  uuid: string;
  formId?: string;
  userId?: string;
  name: string;
  productPrice: number;
  costPrice: number;
  quantity: number;
  selected?: boolean;
  createdDate: Date;
  image: File;
  // imageBase64: string;
  imageName: string;
  description: string;
  imageList: string;
  typeId: string;
  inventory: number;
  sales?: number;
}

export interface CartDTO {
  items: ProductDTO[];
  cartTotal: number;
  discount?: any;
}

export interface ProductSearchRequest {
  keywords: string;
  typeId: string;
  pageNumber: number;
  pageSize: number;
}

export interface ProductTypeDTO {
  uuid: string;
  name: string;
  color: string;
  backgroundColor: string;
}

export const initProduct: ProductDTO = {
  name: "",
} as ProductDTO;

export const initProductType: ProductTypeDTO = {
  name: "",
  color: productTypeColors[0].title,
  backgroundColor: productTypeColors[0].value,
} as ProductTypeDTO;

export const initProductRequest: ProductSearchRequest = {
  keywords: "",
  typeId: "",
  pageNumber: 0,
  pageSize: 10,
};
