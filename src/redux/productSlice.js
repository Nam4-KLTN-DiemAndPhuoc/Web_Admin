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
  page: 1,
  searchByCastegory: undefined,
  searchBySupplier: undefined,
  
  searchByName: "",
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
      console.log(action.payload)
      state.searchByCastegory = action.payload;
    },
    setSearchBySupplier: (state, action) => {
      console.log(action.payload)

     state.searchBySupplier=action.payload
    },
    setSearchByName: (state, action) => {
      console.log(action.payload)

      state.searchByName = action.payload;
    },
   
  },
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
      console.log(
        current(state.products).filter(
          (p) => p.product.id !== action.payload.id
        )
      );
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
      state.product = action.payload;
    },
    [addProduct.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [addCategory.pending]: (state, action) => {},
    [addCategory.fulfilled]: (state, action) => {
      if (action.payload.data == "") {
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
  },
});

const { reducer, actions } = productSlice;
export const {
  addPage,
  subPage,
  setSearchByCastegory, setSearchByName,setSearchBySupplier
} = productSlice.actions;
export default reducer;
