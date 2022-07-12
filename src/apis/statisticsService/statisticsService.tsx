import AXIOS_INSTANCE from "apis/axiosClient";
import { BaseService, DataResponse } from "apis/baseService";
import { StatisticsDTO } from "models/statistics";

export class StatisticsService extends BaseService {
  url = "/api/statistics";

  getAllStatistics = async (periodType: string): Promise<DataResponse<StatisticsDTO[]>> => {
    let data: any = {};
    await AXIOS_INSTANCE.get(`${this.url}?type=${periodType}`, this.getRequestHeaders())
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
