import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import orderSlice from "./orderSlice";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authSlice,
  users:userSlice,
  orders:orderSlice
});

const store = configureStore({ reducer: rootReducer });

export default store;
