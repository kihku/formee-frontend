import AXIOS_INSTANCE from "apis/axiosClient";
import { BaseService, DataResponse } from "apis/baseService";
import { FormDTO } from "models/form";

export class FormService extends BaseService {
  url = "/api/forms";

  createForm = async (order: FormDTO): Promise<DataResponse<any>> => {
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

  getFormById = async (formId: string): Promise<DataResponse<FormDTO>> => {
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

  getRecentForms = async (userId: string): Promise<any> => {
    let data: any = {};
    await AXIOS_INSTANCE.get(`${this.url}/recent/${userId}`, this.getRequestHeaders())
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
