import axiosClient from "./axiosClient";

const userApi = {
  getAll: () => {
    const url = `user-service/admin`;
    return axiosClient.get(url);
  },
  deleteUser: (id) => {
    const url = `user-service/admin/delete/${id}`;
    return axiosClient.post(url);
  },
  search: (value) => {
    const url = `user-service/admin/search/?value=${value}`;
    return axiosClient.get(url);
  },

};
export default userApi;
