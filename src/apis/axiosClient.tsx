import axios from "axios";
import { getCookie } from "utils/cookieUtils";

export const URL_PROFILE = {
  DEV: "http://localhost:8080", // local
  PRO: "http://103.101.162.22:8080", // server
};

const AXIOS_INSTANCE = axios.create({
  baseURL: URL_PROFILE.DEV,
  timeout: 10000 * 120,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": String(localStorage.getItem("i18nextLng")),
    // "Access-Control-Allow-Origin": "*",
  },
});

AXIOS_INSTANCE.interceptors.request.use(
  config => {
    const token = getCookie("USER_TOKEN");
    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => {},
);

AXIOS_INSTANCE.interceptors.response.use(
  response => {
    if (!response.data) {
      return Promise.reject({ message: "An error occured" });
    }
    return response;
  },
  error => {
    if (!error.response) {
      return Promise.reject({ message: "An error occured" });
    }
    return error.response;
  },
);

export default AXIOS_INSTANCE;
