import axiosClient from "./axiosClient";

const orderApi = {
  getAll: () => {
    const url = `order-service/admin/list`;
    return axiosClient.get(url);
  },
  getByStatus: (status) => {
    const url = `order-service/admin/status?status=${status}`;
    return axiosClient.get(url);
  },
  searchOrder: (params) => {
    const url = `order-service/admin/search?code=${params.codeOrder}&status=${params.status}&methodPayment=${params.paymentMethod}`;
    console.log("url", url);
    return axiosClient.get(url);
  },
  getOrderDetailByOrderId: (id) => {
    const url = `order-service/order-detail/order/${id}`;
    return axiosClient.get(url);
  },
  updateStatus: (params) => {
    const url = `order-service/admin/update/${params.id}?status=${params.status}`;
    return axiosClient.post(url);
  },
};
export default orderApi;
