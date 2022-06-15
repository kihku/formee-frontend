import AXIOS_INSTANCE from "apis/axiosClient";
import { BaseService, DataResponse } from "apis/baseService";
import { CustomerDTO } from "models/customer";

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
}
