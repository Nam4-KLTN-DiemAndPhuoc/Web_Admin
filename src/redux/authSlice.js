import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../api/authApi";
import Cookies from "js-cookie";
const initialState = {
  user: null,
  token: null,
  errorMessage: "",
};

export const login = createAsyncThunk(
  "login",
  async (params, { rejectWithValue }) => {
    try {
      const res = await authApi.login(params);

      await Cookies.set("token", res.token);

      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "refreshToken",
  async (params, { rejectWithValue }) => {
    try {
      const res = await authApi.refreshToken();

      await Cookies.set("token", res.token);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const logout = createAsyncThunk("logout", async (params, thunkAPI) => {
  try {
    await Cookies.remove("token");
  } catch (error) {
    console.log(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: {
    [login.pending]: (state, action) => {
    },
    [login.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    // logout
    [logout.pending]: (state, action) => {},
    [logout.fulfilled]: (state, action) => {
      state.token = null;
      state.user = null;
    },
    [logout.rejected]: (state, action) => {},
    // refreshToken
    [refreshToken.pending]: (state, action) => {},
    [refreshToken.fulfilled]: (state, action) => {
      if (state.token) {
        state.token = action.payload.token;
        state.user = action.payload.user;
      }
    },
    [refreshToken.rejected]: (state, action) => {
      console.log("Token hết hạn vui lòng đăng nhập lại");
    },
  },
});

const { reducer, actions } = authSlice;
export default reducer;
