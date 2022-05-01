import axiosClient from "./axiosClient";

const supplierApi = {
  getAll: (page) => {
    const url = `supplier-service/supplier`;
    return axiosClient.get(url);
  },
};

export default supplierApi;
