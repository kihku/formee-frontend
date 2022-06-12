import AXIOS_INSTANCE from "apis/axiosClient";
import { BaseService, DataResponse } from "apis/baseService";
import { FormDTO, FormResponseDTO } from "models/form";

export class OrderService extends BaseService {
  url = "/api/order";

  createOrder = async (order: any): Promise<DataResponse<any>> => {
    let data: any = {};
    await AXIOS_INSTANCE.post(`${this.url}/create`, order, this.getRequestHeaders())
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
    return data;
  };

  getOrdersByFormId = async (formId: string): Promise<DataResponse<FormResponseDTO[]>> => {
    let data: any = {};
    await AXIOS_INSTANCE.get(`${this.url}/${formId}`, this.getRequestHeaders())
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
    return data;
  };

  getOrderById = async (orderId: string): Promise<DataResponse<FormResponseDTO>> => {
    let data: any = {};
    await AXIOS_INSTANCE.get(`${this.url}/response/${orderId}`, this.getRequestHeaders())
      .then(response => {
        if (response.status === 200) {
          data = response.data;
        }
        else {
          throw new Error("");
        }
      })
      .catch(error => {
        // console.log(error);
        return Promise.reject(error);
      });
    return data;
  };
}
