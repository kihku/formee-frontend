import AXIOS_INSTANCE from "apis/axiosClient";
import { BaseService, DataResponse } from "apis/baseService";
import { CustomerDTO, CustomerSearchRequest } from "models/customer";
import { getCookie } from "utils/cookieUtils";

export class CustomerService extends BaseService {
  url = "/api/order/customer";

  getCustomersByUserId = async (userId: string): Promise<DataResponse<CustomerDTO[]>> => {
    let data: any = {};
    await AXIOS_INSTANCE.get(`${this.url}/${userId}`, this.getRequestHeaders())
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
    return data;
  };

  createCustomer = async (customer: CustomerDTO): Promise<DataResponse<any>> => {
    let data: any = {};
    await AXIOS_INSTANCE.post(
      `${this.url}/create`,
      { ...customer, userId: getCookie("USER_ID") },
      this.getRequestHeaders(),
    )
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
    return data;
  };

  updateCustomer = async (customer: CustomerDTO): Promise<DataResponse<any>> => {
    let data: any = {};
    await AXIOS_INSTANCE.post(
      `${this.url}/update`,
      { ...customer, userId: getCookie("USER_ID") },
      this.getRequestHeaders(),
    )
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
    return data;
  };

  filterCustomers = async (request: CustomerSearchRequest): Promise<any> => {
    let data: any = {};
    await AXIOS_INSTANCE.post(`${this.url}/filter`, request, this.getRequestHeaders())
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
    return data;
  };

  deleteById = async (customerId: string): Promise<any> => {
    let data: any = {};
    await AXIOS_INSTANCE.delete(`${this.url}/${customerId}`, this.getRequestHeaders())
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
    return data;
  };
}
