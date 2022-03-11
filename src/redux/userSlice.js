import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userApi from "../api/userApi";
const initialState = {
  users: [],
  token: null,
  errorMessage: "",
};

export const getAll = createAsyncThunk(
  "getAll",
  async (params, { rejectWithValue }) => {
    try {
      const res = await userApi.getAll();
      console.log(res);

      return res;
    } catch (error) {
      console.log("error", error.response);
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (params, { rejectWithValue }) => {
    try {
      const res = await userApi.deleteUser(params);

      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const searchUser = createAsyncThunk(
  "searchUser",
  async (params, { rejectWithValue }) => {
    try {
      const res = await userApi.search(params);
      console.log(res);

      return res;
    } catch (error) {
      console.log("error", error.response);
      return rejectWithValue(error.response.data);
    }
  }
);
const userSlice = createSlice({
  name: "users",
  initialState,

  extraReducers: {
    [getAll.pending]: (state, action) => {
      console.log("pending");
    },
    [getAll.fulfilled]: (state, action) => {
      console.log("fullfield");
      console.log(action.payload);
      state.users = action.payload;
      console.log(state.users);
    },
    [getAll.rejected]: (state, action) => {
      state.errorMessage = action.payload;
      console.log("reject", action.payload);
    },
    [deleteUser.pending]: (state, action) => {
      console.log("pending");
    },
    [deleteUser.fulfilled]: (state, action) => {
      console.log("fullfield");
      const u = state.users.find((user) => user.id == action.payload.id);
      u.deletedAt = action.payload.deletedAt;
    },
    [deleteUser.rejected]: (state, action) => {
      state.errorMessage = action.payload;
      console.log("reject", action.payload);
    },
    [searchUser.pending]: (state, action) => {
      console.log("pending");
    },
    [searchUser.fulfilled]: (state, action) => {
      console.log("fullfield");
      state.users = action.payload;
    },
    [deleteUser.rejected]: (state, action) => {
      state.errorMessage = action.payload;
      console.log("reject", action.payload);
    },
  },
});

const { reducer, actions } = userSlice;
export default reducer;
