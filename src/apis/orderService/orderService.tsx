import AXIOS_INSTANCE from "apis/axiosClient";
import { BaseService, DataResponse } from "apis/baseService";
import { FormOrderSearchRequest, FormResponseDTO } from "models/form";

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

  updateOrder = async (order: any): Promise<DataResponse<any>> => {
    let data: any = {};
    await AXIOS_INSTANCE.put(`${this.url}/update`, order, this.getRequestHeaders())
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
    return data;
  };

  updateOrderStatus = async (order: any): Promise<DataResponse<any>> => {
    let data: any = {};
    await AXIOS_INSTANCE.put(`${this.url}/update-status`, order, this.getRequestHeaders())
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
    return data;
  };

  filterOrders = async (request: FormOrderSearchRequest): Promise<any> => {
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

  exportOrders = async (request: FormOrderSearchRequest): Promise<any> => {
    let data: any = {};
    await AXIOS_INSTANCE.post(`${this.url}/export`, request, {
      responseType: "blob",
    })
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
    return data;
  };

  exportInvoice = async (orderId: string, encoded: string): Promise<any> => {
    let data: any = {};
    await AXIOS_INSTANCE.post(
      `${this.url}/export-invoice`,
      { originalId: orderId, encodedId: encoded },
      {
        responseType: "blob",
      },
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

  getRecentOrders = async (): Promise<DataResponse<FormResponseDTO[]>> => {
    let data: any = {};
    await AXIOS_INSTANCE.get(`${this.url}/recent`, this.getRequestHeaders())
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
      });
    return data;
  };

  getOrderById = async (orderId: string): Promise<DataResponse<FormResponseDTO>> => {
    let data: any = {};
    await AXIOS_INSTANCE.get(`${this.url}/response/${orderId}`, this.getRequestHeaders())
      .then(response => {
        if (response.status === 200) {
          data = response.data;
        } else {
          throw new Error("");
        }
      })
      .catch(error => {
        // console.log(error);
        return Promise.reject(error);
      });
    return data;
  };

  duplicateOrder = async (orderId: string): Promise<DataResponse<FormResponseDTO>> => {
    let data: any = {};
    await AXIOS_INSTANCE.get(`${this.url}/duplicate/${orderId}`, this.getRequestHeaders())
      .then(response => {
        if (response.status === 200) {
          data = response.data;
        } else {
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
