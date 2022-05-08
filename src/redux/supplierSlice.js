import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import supplierApi from "../api/supplierApi";

const initialState = {
  suppliers: [],
  errorMessage: "",
  supplier: {},
  page: 1,
  
};

export const getSuppliers = createAsyncThunk(
  "getSuppliers",
  async (params, { rejectWithValue }) => {
    try {
      const res = await supplierApi.getAll(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const supplierSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [getSuppliers.pending]: (state, action) => {},
    [getSuppliers.fulfilled]: (state, action) => {
      state.suppliers = action.payload;
    },
    [getSuppliers.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },

  },
});

const { reducer, actions } = supplierSlice;
export const {
 
} = supplierSlice.actions;
export default reducer;
