export interface ProductDTO {
  productId: string;
  productName: string;
  unitPrice: number;
  quantity?: number;
}

export interface CartDTO {
  items: ProductDTO[];
  cartTotal: number;
  discount?: any;
}
