import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import orderApi from "../api/orderApi";
import productApi from "../api/productApi";

const initialState = {
  products: [],
  categories: [],
  suppliers: [],
  attributes: [],
  errorMessage: "",
  product: {},
  supplier: {},
  page: 1,
  searchByCastegory: undefined,
  searchBySupplier: undefined,
  searchByName: "",
  isAddAttributed: false,
  images: [],
};

export const getAllProduct = createAsyncThunk(
  "getAllProduct",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.getAll(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllCategory = createAsyncThunk(
  "getAllCategory",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.getAllCategory();
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllSupplier = createAsyncThunk(
  "getAllSupplier",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.getAllSupplier();
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAttribute = createAsyncThunk(
  "getAttribute",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.getAttribute(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addProduct = createAsyncThunk(
  "addProduct",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.addProduct(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addAttribute = createAsyncThunk(
  "addAttribute",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.addAttribute(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.deleteProduct(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addListImage = createAsyncThunk(
  "addListImage",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.addListImage(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addCategory = createAsyncThunk(
  "addCategory",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.addCategory(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addSupplier = createAsyncThunk(
  "addSupplier",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.addSupplier(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const findByCategoryAndSupplier = createAsyncThunk(
  "findByCategoryAndSupplier",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.findByCategoryAndSupplier(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const findByCategoryAndSupplierAndName = createAsyncThunk(
  "findByCategoryAndSupplierAndName",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.findByCategoryAndSupplierAndName(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const findByCategoryAndName = createAsyncThunk(
  "findByCategoryAndName",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.findByCategoryAndName(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const findByCategory = createAsyncThunk(
  "findByCategory",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.findByCategory(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const findBySupplier = createAsyncThunk(
  "findBySupplier",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.findBySupplier(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const findByName = createAsyncThunk(
  "findByName",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.findByName(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const findBySupplierAndName = createAsyncThunk(
  "findBySupplierAndName",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.findBySupplierAndName(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.updateProduct(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getProductById = createAsyncThunk(
  "getProductById",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.getProductById(params);

      return res;
    } catch (error) {

      return rejectWithValue(error.response.data);
    }
  }
);
export const getImagesByProductId = createAsyncThunk(
  "getImagesByProductId",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.getImagesByProductId(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteImage = createAsyncThunk(
  "deleteImage",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.deleteImage(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteS3 = createAsyncThunk(
  "deleteS3",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.deleteS3(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateAttribute = createAsyncThunk(
  "updateAttribute",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.updateAttribute(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateSupplier = createAsyncThunk(
  "updateSupplier",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.updateSupplier(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteSupplier = createAsyncThunk(
  "deleteSupplier",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.deleteSupplier(params);

      return params;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getSupplierById = createAsyncThunk(
  "getSupplierById",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.getSupplierById(params);

      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const searchSupplier = createAsyncThunk(
  "searchSupplier",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.searchSupplier(params);

      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addPage: (state, action) => {
      state.page = state.page + 1;
    },
    subPage: (state, action) => {
      if (state.page > 1) state.page = state.page - 1;
    },
    setSearchByCastegory: (state, action) => {
      state.searchByCastegory = action.payload;
    },
    setSearchBySupplier: (state, action) => {
      state.searchBySupplier = action.payload;
    },
    setSearchByName: (state, action) => {
      state.searchByName = action.payload;
    },
    unAddAttributed: (state, action) => {
      state.isAddAttributed = false;
    },
    setCurrentProduct: (state, action) => {
      state.product = action.payload;
    },
    setCurrentSupplier: (state, action) => {
      state.supplier = action.payload;
    },
  },
  extraReducers: {
    [getAllProduct.pending]: (state, action) => {},
    [getAllProduct.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [getAllProduct.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },

    [deleteProduct.pending]: (state, action) => {},
    [deleteProduct.fulfilled]: (state, action) => {
      state.products = current(state.products).filter(
        (p) => p.product.id != action.payload.id
      );
    },
    [deleteProduct.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [getAllCategory.pending]: (state, action) => {},
    [getAllCategory.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },
    [getAllCategory.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [getAllSupplier.pending]: (state, action) => {},
    [getAllSupplier.fulfilled]: (state, action) => {
      state.suppliers = action.payload;
    },
    [getAllSupplier.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [getAttribute.pending]: (state, action) => {},
    [getAttribute.fulfilled]: (state, action) => {
      state.attributes = action.payload;
    },
    [getAttribute.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [addProduct.pending]: (state, action) => {},
    [addProduct.fulfilled]: (state, action) => {
      state.products.push(action.payload);
      const s=state.products
      state.products=s.reverse()
      state.product=action.payload
    },
    [addProduct.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [addCategory.pending]: (state, action) => {},
    [addCategory.fulfilled]: (state, action) => {
      if (action.payload.data === "") {
        state.errorMessage = "Tên danh mục đã tồn tại!";
      } else {
        state.categories.push(action.payload);
      }
    },
    [addCategory.rejected]: (state, action) => {},
    [addSupplier.pending]: (state, action) => {},
    [addSupplier.fulfilled]: (state, action) => {
      state.suppliers.push(action.payload);
    },
    [addSupplier.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [findByCategoryAndSupplier.pending]: (state, action) => {},
    [findByCategoryAndSupplier.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [findByCategoryAndSupplier.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [findByCategoryAndSupplierAndName.pending]: (state, action) => {},
    [findByCategoryAndSupplierAndName.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [findByCategoryAndSupplierAndName.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [findByCategoryAndName.pending]: (state, action) => {},
    [findByCategoryAndName.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [findByCategoryAndName.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [findByCategory.pending]: (state, action) => {},
    [findByCategory.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [findByCategory.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [findBySupplier.pending]: (state, action) => {},
    [findBySupplier.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [findBySupplier.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [findByName.pending]: (state, action) => {},
    [findByName.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [findByName.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [findBySupplierAndName.pending]: (state, action) => {},
    [findBySupplierAndName.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [findBySupplierAndName.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [addAttribute.pending]: (state, action) => {},
    [addAttribute.fulfilled]: (state, action) => {
      state.isAddAttributed = true;
    },
    [addAttribute.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [updateAttribute.pending]: (state, action) => {},
    [updateAttribute.fulfilled]: (state, action) => {
      state.attributes = action.payload;
    },
    [updateAttribute.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [updateProduct.pending]: (state, action) => {},
    [updateProduct.fulfilled]: (state, action) => {
      const p = state.products.find(
        (product) => product.product.id === action.payload.product.id
      );
      if (p) {
        p.product = action.payload.product;
      }

      state.product = action.payload;
    },
    [updateProduct.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [getProductById.pending]: (state, action) => {},
    [getProductById.fulfilled]: (state, action) => {
      state.product = action.payload;
    },
    [getProductById.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [getImagesByProductId.pending]: (state, action) => {},
    [getImagesByProductId.fulfilled]: (state, action) => {
      state.images = action.payload;
    },
    [getImagesByProductId.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [getSupplierById.pending]: (state, action) => {},
    [getSupplierById.fulfilled]: (state, action) => {
      state.supplier = action.payload;
    },
    [getSupplierById.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [deleteSupplier.pending]: (state, action) => {},
    [deleteSupplier.fulfilled]: (state, action) => {
      state.suppliers = current(state.suppliers).filter(
        (p) => p.id != action.payload
      );
    },
    [deleteSupplier.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [searchSupplier.pending]: (state, action) => {},
    [searchSupplier.fulfilled]: (state, action) => {
      state.suppliers = action.payload
    },
    [searchSupplier.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [updateSupplier.pending]: (state, action) => {},
    [updateSupplier.fulfilled]: (state, action) => {
      state.supplier = {};

      const p = state.suppliers.find((s) => s.id === action.payload.id);
      if (p) {
        p.street = action.payload.street;
        p.wards = action.payload.wards;
        p.supplierName = action.payload.supplierName;
        p.district = action.payload.district;
        p.city = action.payload.city;
        p.phoneNumber = action.payload.phoneNumber;
      }

    },
    [updateSupplier.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

const { reducer, actions } = productSlice;
export const {
  addPage,
  subPage,
  setSearchByCastegory,
  setSearchByName,
  setSearchBySupplier,
  unAddAttributed,
  setCurrentProduct,
  setCurrentSupplier,
} = productSlice.actions;
export default reducer;
