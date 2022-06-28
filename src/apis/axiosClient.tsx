import axios from "axios";
import { getCookie } from "utils/cookieUtils";

export const URL_PROFILE = {
  DEV: "http://localhost:8080", // local
  PRO: "https://api.formee.website", // server
  WEB: "https://formee.website"
};

const AXIOS_INSTANCE = axios.create({
  baseURL: URL_PROFILE.PRO,
  timeout: 10000 * 120,
  headers: {
    "Content-Type": "application/json",
  },
});

AXIOS_INSTANCE.interceptors.request.use(
  config => {
    const token = getCookie("USER_TOKEN");
    if (token) {
      if (config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
        config.headers["Accept-Language"] = String(localStorage.getItem("i18nextLng"));
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
