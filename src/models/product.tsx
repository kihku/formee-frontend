export interface ProductDTO {
  uuid: string;
  formId?: string;
  userId?: string;
  name: string;
  productPrice: number;
  quantity: number;
  selected?: boolean;
  createdDate: Date;
  image: File;
  imageBase64: string;
}

export interface CartDTO {
  items: ProductDTO[];
  cartTotal: number;
  discount?: any;
}

export const initProduct: ProductDTO = {
  name: "",
  productPrice: 0,
} as ProductDTO;
