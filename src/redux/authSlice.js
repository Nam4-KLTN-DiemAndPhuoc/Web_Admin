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
      console.log(res);

      await Cookies.set("token", res.token);

      return res;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "refreshToken",
  async (params, thunkAPI) => {
    try {
      const res = await authApi.refreshToken();
      await Cookies.set("token", res.token);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // thay doi state
    logout: async (state, action) => {
      Cookies.remove("token");
    },
    removeErrorMessage: async (state, action) => {
      state.errorMessage=""
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      console.log("pending");
    },
    [login.fulfilled]: (state, action) => {
      console.log("fullfield");
      console.log(action.payload);
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
    
      state.errorMessage = action.payload;
      console.log("reject",  state.errorMessage);
    },

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
export const { logout, removeErrorMessage } = actions;
export default reducer;
