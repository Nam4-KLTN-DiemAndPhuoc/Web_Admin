import axiosClient from "./axiosClient";

const productApi = {
  getAll: (page) => {
    const url = `product-service/product?page=${page}&limit=5`;
    return axiosClient.get(url);
  },
  addProduct: (params) => {
    const url = `product-service/admin/product/add`;
    return axiosClient.post(url, params);
  },
  deleteProduct: (params) => {
    const { id, userId } = params;
    console.log(params)
    const url = `product-service/admin/product/delete/${id}`;
    return axiosClient.post(url, userId);
  },

  addAttribute: (params) => {
    const url = `product-service/admin/attribute/add`;
    return axiosClient.post(url, params);
  },
  getAllCategory: () => {
    const url = `category-service/category`;
    return axiosClient.get(url);
  },
  getProductByCategory: (id) => {
    const url = `category-service/category`;
    return axiosClient.get(url);
  },
  getAllSupplier: () => {
    const url = `supplier-service/supplier`;
    return axiosClient.get(url);
  },
  getAttribute: (id) => {
    const url = `product-service/attribute/product/${id}`;
    return axiosClient.get(url);
  },
};

export default productApi;
