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
  imageBase64: string;
  imageName: string;
  description: string;
  imageList: string;
  type: string;
  inventory: number;
}

export interface CartDTO {
  items: ProductDTO[];
  cartTotal: number;
  discount?: any;
}

export const initProduct: ProductDTO = {
  name: "",
} as ProductDTO;
