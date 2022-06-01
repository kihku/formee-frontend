export interface ProductDTO {
  uuid: string;
  formId?: string;
  userId?: string;
  name: string;
  productPrice: number;
  quantity: number;
  selected?: boolean;
}

export interface CartDTO {
  items: ProductDTO[];
  cartTotal: number;
  discount?: any;
}
