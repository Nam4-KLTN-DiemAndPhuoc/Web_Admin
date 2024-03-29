import axiosClient from "./axiosClient";

const productApi = {
  getAll: (page) => {
    const url = `product-service/product/order/desc?page=${page}&limit=5`;
    return axiosClient.get(url);
  },
  getProductsDelete: (page) => {
    const url = `product-service/admin/product-delete?page=${page}&limit=5`;
    return axiosClient.get(url);
  },
  getProductById: (id) => {
    const url = `product-service/admin/${id}`;
    return axiosClient.get(url);
  },
  getImagesByProductId: (id) => {
    const url = `product-service/image/product/${id}`;
    return axiosClient.get(url);
  },
  addProduct: (params) => {
    const url = `product-service/admin/product/add`;
    return axiosClient.post(url, params);
  },
  deleteProduct: (params) => {
    const { id, userId } = params;
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
  getSupplierById: (id) => {
    const url = `supplier-service/supplier/${id}`;
    return axiosClient.get(url);
  },
  searchSupplier: (p) => {
    const url = `supplier-service/supplier/search?key=${p.key}&city=${p.city}&district=${p.district}&ward=${p.ward}`;
    return axiosClient.get(url);
  },
  updateSupplier: (params) => {
    const url = `supplier-service/admin/update`;
    return axiosClient.post(url, params);
  },
  deleteSupplier: (id) => {
    const url = `supplier-service/admin/delete/${id}`;
    return axiosClient.post(url);
  },
  getAttribute: (id) => {
    const url = `product-service/attribute/product/${id}`;
    return axiosClient.get(url);
  },
  addListImage: (params) => {
    const url = `product-service/image`;
    return axiosClient.post(url, params);
  },
  addCategory: (params) => {
    const url = `category-service/admin/add`;
    return axiosClient.post(url, params);
  },
  addSupplier: (params) => {
    const url = `supplier-service/admin/add`;
    return axiosClient.post(url, params);
  },
  findByCategoryAndSupplier: (params) => {
    const url = `product-service/product/category/${params.idCategory}/supplier/${params.idSupplier}?page=${params.page}&limit=5`;
    return axiosClient.get(url);
  },
  findByCategoryAndSupplierDeleted: (params) => {
    const url = `product-service/product/category-deleted/${params.idCategory}/supplier-deleted/${params.idSupplier}?page=${params.page}&limit=5`;
    return axiosClient.get(url);
  },
  findByCategoryAndSupplierAndName: (params) => {
    
    const url = `product-service/product/category/${params.idCategory}/supplier/${params.idSupplier}/name?name=${params.name}&page=${params.page}&limit=5`;
    return axiosClient.get(url);
  },
  findByCategoryAndSupplierAndNameDeleted: (params) => {
    
    const url = `product-service/product/deleted-category/${params.idCategory}/deleted-supplier/${params.idSupplier}/name?name=${params.name}&page=${params.page}&limit=5`;
    return axiosClient.get(url);
  },
  findByCategoryAndName: (params) => {
    const url = `product-service/product/category/${params.idCategory}/${params.name}?page=${params.page}&limit=5`;
    return axiosClient.get(url);
  },
  findByCategoryAndNameDeleted: (params) => {
    const url = `product-service/product/deleted-category/${params.idCategory}/${params.name}?page=${params.page}&limit=5`;
    return axiosClient.get(url);
  },
  findBySupplierAndName: (params) => {
    const url = `product-service/product/supplier/${params.idSupplier}/${params.name}?page=${params.page}&limit=5`;
    return axiosClient.get(url);
  },
  findBySupplierAndNameDeleted: (params) => {
    const url = `product-service/product/deleted-supplier/${params.idSupplier}/${params.name}?page=${params.page}&limit=5`;
    return axiosClient.get(url);
  },
  findByCategory: (params) => {
    const url = `product-service/product/category/${params.idCategory}?page=${params.page}&limit=5`;
    return axiosClient.get(url);
  },
  findByCategoryDeleted: (params) => {
    const url = `product-service/product/category-deleted/${params.idCategory}?page=${params.page}&limit=5`;
    return axiosClient.get(url);
  },
  findBySupplier: (params) => {
    const url = `product-service/product/supplier/${params.idSupplier}?page=${params.page}&limit=5`;
    return axiosClient.get(url);
  },
  findBySupplierDeleted: (params) => {
    const url = `product-service/product/supplier-deleted/${params.idSupplier}?page=${params.page}&limit=5`;
    return axiosClient.get(url);
  },
  findByName: (params) => {
    const url = `product-service/product/search/?name=${params.name}&page=${params.page}&limit=5`;
    return axiosClient.get(url);
  },
  findByNameDeleted: (params) => {
    const url = `product-service/product/search-deleted/?name=${params.name}&page=${params.page}&limit=5`;
    return axiosClient.get(url);
  },
  updateProduct: (params) => {
    const url = `product-service/admin/product/update`;
    return axiosClient.post(url, params);
  },
  updateAttribute: (params) => {
    const url = `product-service/admin/attribute/update`;
    return axiosClient.post(url, params);
  },
  deleteImage: (id) => {
    const url = `product-service/image/delete/${id}`;
    return axiosClient.post(url);
  },
  deleteS3: (params) => {
    const url = `user-service/auth/deleteS3`;
    return axiosClient.post(url, params);
  },
};

export default productApi;
