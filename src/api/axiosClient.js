import axios from "axios";
import queryString from "query-string";
import Cookies from "js-cookie"
const REACT_APP_API_URL = "http://localhost:9191/api/";

const axiosClient = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = await Cookies.get("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
  Cookies.remove("token")
    throw error;
  }
);
export default axiosClient;
