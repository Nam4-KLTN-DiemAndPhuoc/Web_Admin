import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import orderSlice from "./orderSlice";
import productSlice from "./productSlice";

import { combineReducers } from "redux";
import modalSlice from "./modalSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  users:userSlice,
  orders:orderSlice,
  products:productSlice,
  modal: modalSlice
});

const store = configureStore({ reducer: rootReducer });

export default store;
