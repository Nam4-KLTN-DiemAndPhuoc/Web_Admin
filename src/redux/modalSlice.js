import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isOpenSupplier: false,
  isOpenVoucher: false,
  isOpenCategory: false,
  isOpenUpdateProductModal: false,
  isOpenUpdateSupplierModal: false,
  isOpenUpdateAttributeModal:false
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = !state.isOpen;
    },
    openCategoryModal: (state, action) => {
      state.isOpenCategory = !state.isOpenCategory;
    },
    openSupplierModal: (state, action) => {
      state.isOpenSupplier = !state.isOpenSupplier;
    },
    openUpdateProductModal: (state, action) => {
      state.isOpenUpdateProductModal = !state.isOpenUpdateProductModal;
    },
    openUpdateAtrributeModal: (state, action) => {
      state.isOpenUpdateAttributeModal = !state.isOpenUpdateAttributeModal;
      
    },
    openAddVoucherModal: (state, action) => {
      state.isOpenVoucher = !state.isOpenVoucher;
      
    },
    openUpdateSupplierModal: (state, action) => {
      state.isOpenUpdateSupplierModal = !state.isOpenUpdateSupplierModal;
      
    },
  },
});

export const {
  openModal,
  openCategoryModal,
  openSupplierModal,openAddVoucherModal,
  openUpdateProductModal,openUpdateAtrributeModal,openUpdateSupplierModal,
} = modalSlice.actions;
export default modalSlice.reducer;
