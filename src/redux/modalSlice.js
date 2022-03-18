import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isOpenSupplier:false,
  isOpenCategory:false,
};


const modalSlice = createSlice({
    name:"modal",
    initialState,
    reducers:{
      openModal:(state, action)=>{state.isOpen=!state.isOpen},
      openCategoryModal:(state,action)=>{state.isOpenCategory=! state.isOpenCategory},
      openSupplierModal:(state,action)=>{state.isOpenSupplier=! state.isOpenSupplier},

    }
    
})

export const {openModal,openCategoryModal,openSupplierModal}= modalSlice.actions
export default modalSlice.reducer;