import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import orderSlice from "./orderSlice";
import productSlice from "./productSlice";
import supplierSlice from "./supplierSlice";

import { combineReducers } from "redux";
import modalSlice from "./modalSlice";
import dialogSlice from "./dialogSlice";
import voucherSlice from "./voucherSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  users: userSlice,
  orders: orderSlice,
  products: productSlice,
  suppliers: supplierSlice,
  modal: modalSlice,
  dialog: dialogSlice,
  vouchers: voucherSlice,
});

const store = configureStore({ reducer: rootReducer });

export default store;
