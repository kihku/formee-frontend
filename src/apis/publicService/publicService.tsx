import { AddressDTO } from "apis/addressService/addressService";
import AXIOS_INSTANCE from "apis/axiosClient";
import { BaseService, DataResponse } from "apis/baseService";
import { CommentDTO } from "models/comment";
import { FormDTO, FormResponseDTO } from "models/form";

export class PublicService extends BaseService {
  url = "/api/public";

  getFormById = async (formId: string): Promise<DataResponse<FormDTO>> => {
    let data: any = {};
    await AXIOS_INSTANCE.get(`${this.url}/forms/${formId}`, this.getRequestHeaders())
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
    await AXIOS_INSTANCE.put(`${this.url}/order/update`, order, this.getRequestHeaders())
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
    await AXIOS_INSTANCE.put(`${this.url}/order/update-status`, order, this.getRequestHeaders())
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
    await AXIOS_INSTANCE.get(`${this.url}/order/response/${orderId}`, this.getRequestHeaders())
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

  createComment = async (comment: CommentDTO): Promise<DataResponse<any>> => {
    let data: any = {};
    await AXIOS_INSTANCE.post(`${this.url}/order/comments/create`, comment, this.getRequestHeaders())
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
    return data;
  };

  getAddressByParentCode = async (parentCode: string): Promise<DataResponse<AddressDTO[]>> => {
    let data: any = {};
    await AXIOS_INSTANCE.get(`${this.url}/address?parentCode=${parentCode}`, this.getRequestHeaders())
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
