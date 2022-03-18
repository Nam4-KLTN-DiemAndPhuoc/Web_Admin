import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "../api/orderApi";
import productApi from "../api/productApi";

const initialState = {
  products: [],
  categories: [],
  suppliers: [],
  attributes: [],
  errorMessage: "",
  product: {},
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
const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: {
    [getAllProduct.pending]: (state, action) => {},
    [getAllProduct.fulfilled]: (state, action) => {
      state.products = action.payload;
      console.log(state.products);
    },
    [getAllProduct.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },

    [deleteProduct.pending]: (state, action) => {},
    [deleteProduct.fulfilled]: (state, action) => {
      const u = state.products.find((p) => p.product.id == action.payload.id);

      console.log(u);
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
      console.log(action.payload);
      state.products.push(action.payload);
      state.product = action.payload;
    },
    [addProduct.rejected]: (state, action) => {
      state.errorMessage = action.payload;
      console.log(action.payload);
    },
    [addAttribute.pending]: (state, action) => {},
    [addAttribute.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [addAttribute.rejected]: (state, action) => {
      console.log(action.payload);
    },
  },
});

const { reducer, actions } = productSlice;
export default reducer;
