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
  addListImage: (params) => {
    const url = `product-service/image`;
    return axiosClient.post(url,params);
  },
  addCategory: (params) => {
    const url = `category-service/admin/add`;
    return axiosClient.post(url,params);
  },
  addSupplier: (params) => {
    const url = `supplier-service/admin/add`;
    return axiosClient.post(url,params);
  },
  findByCategoryAndSupplier: (params) => {
    const url = `product-service/product/category/${params.idCategory}/supplier/${params.idSupplier}?page=${params.page}&limit=5`;
    return axiosClient.get(url);
  },
  findByCategoryAndSupplierAndName: (params) => {
    const url = `product-service/product/category/${params.idCategory}/supplier/${params.idSupplier}/name?name=${params.name}&page=${params.page}&limit=5`;
    return axiosClient.get(url);
  },
};

export default productApi;
