import AXIOS_INSTANCE from "apis/axiosClient";
import { BaseService, DataResponse } from "apis/baseService";
import { UserDTO } from "models/user";

export class UserService extends BaseService {
  urlAuth = "/api/authentication";

  urlUser = "/api/user";

  login = async (idToken: string): Promise<any> => {
    let data: any = {};
    await AXIOS_INSTANCE.post(
      `${this.urlAuth}/login`,
      {},
      {
        headers: {
          token: idToken,
          "Content-Type": "application/json",
        },
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

  getProfile = async (userId: string): Promise<DataResponse<UserDTO>> => {
    let data: any = {};
    await AXIOS_INSTANCE.get(`${this.urlUser}/profile/${userId}`, this.getRequestHeaders())
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
    return data;
  };

  updateProfile = async (user: UserDTO): Promise<DataResponse<any>> => {
    let data: any = {};
    await AXIOS_INSTANCE.put(`${this.urlUser}/profile`, user, this.getRequestHeaders())
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
