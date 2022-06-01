import AXIOS_INSTANCE from "apis/axiosClient";
import { BaseService, DataResponse } from "apis/baseService";

export class UserService extends BaseService {
  url = "/api/authentication";

  login = async (idToken: string): Promise<DataResponse<any>> => {
    let data: any = {};
    await AXIOS_INSTANCE.post(
      `${this.url}/login`,
      {},
      {
        headers: {
          token: idToken,
          "Content-Type": "application/json",
        },
      },
    ).catch(error => {
      console.log(error);
      return Promise.reject(error);
    });
    return data;
  };
}
