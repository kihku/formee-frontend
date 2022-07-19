export interface CustomerDTO {
  uuid: string;
  userId: string;
  phone: string;
  name: string;
  address: string;
  totalOrders: number;
  fullAddress?: string;
}

export interface CustomerSearchRequest {
  keywords: string;
  pageNumber: number;
  pageSize: number;
}

export const initCustomer: CustomerDTO = {
  phone: "",
  name: "",
  address: "",
  totalOrders: 0,
} as CustomerDTO;

export const initCustomerRequest: CustomerSearchRequest = {
  keywords: "",
  pageNumber: 0,
  pageSize: 10,
};
