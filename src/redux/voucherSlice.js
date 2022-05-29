import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import voucherApi from "../api/voucherApi";

const initialState = {
  vouchers: [],
  errorMessage: "",
};

export const getAllVoucher = createAsyncThunk(
  "getAllVoucher",
  async (params, { rejectWithValue }) => {
    try {
      const res = await voucherApi.getAllVoucher();

      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteVoucher = createAsyncThunk(
  "deleteVoucher",
  async (params, { rejectWithValue }) => {
    try {
      const res = await voucherApi.deleteVoucher(params);

      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const searchVoucher = createAsyncThunk(
  "searchVoucher",
  async (params, { rejectWithValue }) => {
    try {
      const res = await voucherApi.searchVoucher(params);

      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addVoucher = createAsyncThunk(
  "addVoucher",
  async (params, { rejectWithValue }) => {
    try {
      const res = await voucherApi.addVoucher(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const voucherSlice = createSlice({
  name: "vouchers",
  initialState,

  extraReducers: {
    [getAllVoucher.pending]: (state, action) => {},
    [getAllVoucher.fulfilled]: (state, action) => {
      const s = action.payload;
      state.vouchers = s.reverse();
    },
    [getAllVoucher.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [deleteVoucher.pending]: (state, action) => {},
    [deleteVoucher.fulfilled]: (state, action) => {
      const u = state.vouchers.find((user) => user.id == action.payload.id);
      u.deleteAt = action.payload.deleteAt;
    },
    [deleteVoucher.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [searchVoucher.pending]: (state, action) => {},
    [searchVoucher.fulfilled]: (state, action) => {
      state.vouchers = action.payload;
    },
    [searchVoucher.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [addVoucher.pending]: (state, action) => {},
    [addVoucher.fulfilled]: (state, action) => {
      const arr = state.vouchers.reverse();
      arr.push(action.payload);
      state.vouchers = arr.reverse();
    },
    [addVoucher.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

const { reducer, actions } = voucherSlice;
export default reducer;
