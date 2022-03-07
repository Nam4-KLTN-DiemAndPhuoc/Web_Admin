import axiosClient from "./axiosClient";

const athApi = {
  login: (data) => {
    const url = `user-service/auth/login`;
    return axiosClient.post(url, data);
  },
 
  refreshToken: () => {
    const url = `user-service/auth/refreshToken`;
    return axiosClient.post(url);
  },
};
export default athApi;
