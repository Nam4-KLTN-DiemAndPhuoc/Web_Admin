import axiosClient from "./axiosClient";

const voucherApi = {
  getAllVoucher: () => {
    const url = `voucher-service/admin`;
    return axiosClient.get(url);
  },
  deleteVoucher: (id) => {
    const url = `voucher-service/admin/delete/${id}`;
    return axiosClient.post(url);
  },
  addVoucher: (params) => {
    const url = `voucher-service/admin`;
    return axiosClient.post(url,params);
  },
  searchVoucher: (value) => {
    const url = `voucher-service/admin/search?code=${value}`;
    return axiosClient.get(url);
  },

};
export default voucherApi;
