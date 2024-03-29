import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "../api/orderApi";

const initialState = {
  in_progress_order: [],
  orders: [],
  delivered_order: [],
  prepare_to_ship_order: [],
  canceled_order: [],
  orderDetails: [],
  status: "",
  errorMessage: "",
};
export const getByStatus = createAsyncThunk(
  "getByStatus",
  async (params, { rejectWithValue }) => {
    try {
      const res = await orderApi.getByStatus(params);

      return res;
    } catch (error) {
      return rejectWithValue(error.response.statusText);
    }
  }
);
export const getOrderDetailByOrderId = createAsyncThunk(
  "getOrderDetailByOrderId",
  async (params, { rejectWithValue }) => {
    try {
      const res = await orderApi.getOrderDetailByOrderId(params);

      return res;
    } catch (error) {
      return rejectWithValue(error.response.statusText);
    }
  }
);
export const updateStatus = createAsyncThunk(
  "updateStatus",
  async (params, { rejectWithValue }) => {
    try {
      const res = await orderApi.updateStatus(params);

      return res;
    } catch (error) {
      return rejectWithValue(error.response.statusText);
    }
  }
);
export const searchOrder = createAsyncThunk(
  "searchOrder",
  async (params, { rejectWithValue }) => {
    try {
      const res = await orderApi.searchOrder(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.statusText);
    }
  }
);
export const getAllOrder = createAsyncThunk(
  "getAllOrder",
  async (params, { rejectWithValue }) => {
    try {
      const res = await orderApi.getAll(params);

      return res;
    } catch (error) {
      return rejectWithValue(error.response.statusText);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setStatusOrder: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: {
    [getByStatus.pending]: (state, action) => {},
    [getByStatus.fulfilled]: (state, action) => {
      const ods = action.payload;
      if (action.payload[0]?.order.status === "ORDER_IN_PROGRESS") {
        state.in_progress_order = ods.reverse();
      } else if (action.payload[0]?.order.status === "PREPARING_TO_SHIP") {
        state.prepare_to_ship_order = ods.reverse();
      } else if (action.payload[0]?.order.status === "DELIVERED") {
        state.delivered_order = ods.reverse();
      } else if (action.payload[0]?.order.status === "CANCELED") {
        state.canceled_order = ods.reverse();
      }
    },
    [getByStatus.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },

    [getOrderDetailByOrderId.pending]: (state, action) => {},
    [getOrderDetailByOrderId.fulfilled]: (state, action) => {
      state.orderDetails = action.payload;
    },
    [getOrderDetailByOrderId.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },

    [getAllOrder.pending]: (state, action) => {},
    [getAllOrder.fulfilled]: (state, action) => {
      state.orders = action.payload;
    },
    [getAllOrder.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [searchOrder.pending]: (state, action) => {},
    [searchOrder.fulfilled]: (state, action) => {
      const ods = action.payload;

      if (state.status === "ORDER_IN_PROGRESS") {
        state.in_progress_order = ods.reverse();
      } else if (state.status === "PREPARING_TO_SHIP") {
        state.prepare_to_ship_order = ods.reverse();
      } else if (state.status === "DELIVERED") {
        state.delivered_order = ods.reverse();
      } else if (state.status === "CANCELED") {
        state.canceled_order = ods.reverse();
      }
    },
    [searchOrder.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [updateStatus.pending]: (state, action) => {},
    [updateStatus.fulfilled]: (state, action) => {
      if (action.payload.order.status === "PREPARING_TO_SHIP") {
        state.prepare_to_ship_order.push(action.payload);
        const in_progress_ = state.in_progress_order.filter(
          (x) => x.order.id !== action.payload.order.id
        );
        state.in_progress_order = in_progress_;
      } else if (action.payload.order.status === "DELIVERED") {
        state.delivered_order.push(action.payload);

        const prepare_to_ship_ = state.prepare_to_ship_order.filter(
          (x) => x.order.id !== action.payload.order.id
        );
        state.prepare_to_ship_order = prepare_to_ship_;
      } else if (action.payload.order.status === "CANCELED") {
        state.canceled_order.push(action.payload);
        const in_progress = state.in_progress_order.filter(
          (x) => x.order.id !== action.payload.order.id
        );
        state.in_progress_order = in_progress;
        const prepare_to_ship = state.prepare_to_ship_order.filter(
          (x) => x.order.id !== action.payload.order.id
        );
        state.prepare_to_ship_order = prepare_to_ship;
      }

      // state.orderDetails=action.payload
    },
    [updateStatus.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});
const { reducer, actions } = orderSlice;
export const { setStatusOrder } = orderSlice.actions;

export default reducer;
