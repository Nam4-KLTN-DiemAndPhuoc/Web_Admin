import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isOpenSupplier: false,
  isOpenCategory: false,
  isOpenUpdateProductModal: false,
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
  },
});

export const {
  openModal,
  openCategoryModal,
  openSupplierModal,
  openUpdateProductModal,openUpdateAtrributeModal
} = modalSlice.actions;
export default modalSlice.reducer;
