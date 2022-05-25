import AXIOS_INSTANCE from "apis/axiosClient";
import { BaseService, DataResponse } from "apis/baseService";
import { FormDTO } from "models/form";

export class TemplateService extends BaseService {
  url = "/api/template";

  getTemplateGallery = async (): Promise<any> => {
    let data: any = {};
    await AXIOS_INSTANCE.get(`${this.url}/gallery`, this.getRequestHeaders())
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
    return data;
  };

  getRecentTemplates = async (username: string): Promise<any> => {
    let data: any = {};
    await AXIOS_INSTANCE.get(`${this.url}/recent/${username}`, this.getRequestHeaders())
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
    return data;
  };

  getTemplateById = async (formId: string): Promise<DataResponse<FormDTO>> => {
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
}
