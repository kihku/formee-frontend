import AXIOS_INSTANCE from "apis/axiosClient";
import { BaseService, DataResponse } from "apis/baseService";
import { ProductDTO, ProductSearchRequest, ProductTypeDTO } from "models/product";
import { getCookie } from "utils/cookieUtils";

export class ProductService extends BaseService {
  url = "/api/product";

  createProduct = async (product: ProductDTO): Promise<DataResponse<any>> => {
    let data: any = {};
    await AXIOS_INSTANCE.post(
      `${this.url}/create`,
      { ...product, userId: getCookie("USER_ID") },
      this.getRequestHeaders(),
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

  getProductsByFormId = async (formId: string): Promise<DataResponse<ProductDTO[]>> => {
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

  deleteById = async (productId: string): Promise<any> => {
    let data: any = {};
    await AXIOS_INSTANCE.delete(`${this.url}/${productId}`, this.getRequestHeaders())
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
    return data;
  };

  getProductsByUser = async (): Promise<DataResponse<ProductDTO[]>> => {
    let data: any = {};
    await AXIOS_INSTANCE.get(`${this.url}/inventory`, this.getRequestHeaders())
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
    return data;
  };

  filterProducts = async (request: ProductSearchRequest): Promise<any> => {
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

  getAllTypes = async (): Promise<DataResponse<ProductTypeDTO[]>> => {
    let data: any = {};
    await AXIOS_INSTANCE.get(`${this.url}/type`, this.getRequestHeaders())
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
    return data;
  };

  createProductType = async (type: ProductTypeDTO): Promise<DataResponse<any>> => {
    let data: any = {};
    await AXIOS_INSTANCE.post(`${this.url}/type/create`, type, this.getRequestHeaders())
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
    return data;
  };

  createMultipleProductTypes = async (types: string[]): Promise<DataResponse<any>> => {
    let data: any = {};
    await AXIOS_INSTANCE.post(`${this.url}/type/create-multiple`, types, this.getRequestHeaders())
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
    return data;
  };

  deleteTypeById = async (typeId: string): Promise<any> => {
    let data: any = {};
    await AXIOS_INSTANCE.delete(`${this.url}/type/${typeId}`, this.getRequestHeaders())
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
    return data;
  };

  uploadImageToServer = async (fileList: File[], productId: string): Promise<DataResponse<any>> => {
    let data: any = {};
    const formData = new FormData();
    fileList.map((file, key) => {
      return formData.append("files[]", file);
    });
    await AXIOS_INSTANCE.post(`${this.url}/${productId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
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
}
