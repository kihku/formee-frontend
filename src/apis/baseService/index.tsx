import axios from "axios";

export const URL_PROFILE = {
  DEV: "http://localhost:8088", // local
  PRODUCTION: "http://127.0.0.1:8088", // server
};

export const ENV_ENDPOINT = URL_PROFILE.DEV;

axios.defaults.baseURL = ENV_ENDPOINT;
