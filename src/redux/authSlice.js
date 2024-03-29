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
      if (res.user.role.name === "ROLE_ADMIN") {
        await Cookies.set("token", res.token);
      }
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
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeErrMessage: (state, action) => {
      state.errorMessage = "";
    },
  },

  extraReducers: {
    [login.pending]: (state, action) => {},
    [login.fulfilled]: (state, action) => {
      if (action.payload.user.role.name === "ROLE_ADMIN") {
        state.token = action.payload.token;
        state.user = action.payload.user;
      } else {
        state.errorMessage = "Bạn không có quyền truy cập trang web này !";
      }
    },
    [login.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    // logout
    [logout.pending]: (state, action) => {},
    [logout.fulfilled]: (state, action) => {
      state.token = null;
      state.user = null;
      state.errorMessage = "";
    },
    [logout.rejected]: (state, action) => {},
    // refreshToken
    [refreshToken.pending]: (state, action) => {},
    [refreshToken.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    [refreshToken.rejected]: (state, action) => {
    },
  },
});
export const { removeErrMessage } = authSlice.actions;

const { reducer, actions } = authSlice;
export default reducer;
