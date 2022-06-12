import AXIOS_INSTANCE from "apis/axiosClient";
import { BaseService, DataResponse } from "apis/baseService";
import { CommentDTO } from "models/comment";

export class CommentService extends BaseService {
  url = "/api/order/comments";

  createComment = async (comment: CommentDTO): Promise<DataResponse<any>> => {
    let data: any = {};
    await AXIOS_INSTANCE.post(`${this.url}/create`, comment, this.getRequestHeaders())
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
    return data;
  };

  //   getFormById = async (formId: string): Promise<DataResponse<FormDTO>> => {
  //     let data: any = {};
  //     await AXIOS_INSTANCE.get(`${this.url}/${formId}`, this.getRequestHeaders())
  //       .then(response => {
  //         data = response.data;
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         return Promise.reject(error);
  //       });
  //     return data;
  //   };
}
