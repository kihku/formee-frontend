import axios from "axios";

export const URL_PROFILE = {
  DEV: "http://localhost:8088", // local
  PROD: "http://127.0.0.1:8088", // server
};

axios.defaults.baseURL = URL_PROFILE.DEV;

const AXIOS_INSTANCE = axios.create({
  baseURL: URL_PROFILE.DEV,
  timeout: 10000 * 120,
  headers: {
    "Content-Type": "application/json",
  },
});

AXIOS_INSTANCE.interceptors.request.use(
  config => {
    console.log("config", config);
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
