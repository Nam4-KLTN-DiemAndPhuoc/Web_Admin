import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen:false,
  isAddAttributed:false,

};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (state, action) => {
      state.isOpen=! state.isOpen
    },
    isAddAttributed: (state, action) => {
      state.isAddAttributed= true
    },
    unAddAttributed: (state, action) => {
      state.isAddAttributed= false
    },
  },
});

export const { openDialog,isAddAttributed ,unAddAttributed} = dialogSlice.actions;
export default dialogSlice.reducer;
