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

      return res;
    } catch (error) {
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

      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const userSlice = createSlice({
  name: "users",
  initialState,

  extraReducers: {
    [getAll.pending]: (state, action) => {
    },
    [getAll.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
    [getAll.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [deleteUser.pending]: (state, action) => {
    },
    [deleteUser.fulfilled]: (state, action) => {
      const u = state.users.find((user) => user.id == action.payload.id);
      u.deletedAt = action.payload.deletedAt;
    },
    [deleteUser.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [searchUser.pending]: (state, action) => {
    },
    [searchUser.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
    [deleteUser.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;
export default reducer;
