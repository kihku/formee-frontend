import AXIOS_INSTANCE from "apis/axiosClient";
import { BaseService, DataResponse } from "apis/baseService";
import { CustomerDTO } from "models/customer";

export interface AddressDTO {
  code: string;
  name_: string;
  type_: string;
  parentCode: string;
}

export class AddressService extends BaseService {
  url = "/api/address";

  getAddressByParentCode = async (parentCode: string): Promise<DataResponse<AddressDTO[]>> => {
    let data: any = {};
    await AXIOS_INSTANCE.get(`${this.url}?parentCode=${parentCode}`, this.getRequestHeaders())
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
