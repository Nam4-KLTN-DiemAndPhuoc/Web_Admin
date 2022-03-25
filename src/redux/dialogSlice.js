import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (state, action) => {
      state.isOpen = !state.isOpen;
    },
    
  },
});

export const { openDialog, } =
  dialogSlice.actions;
export default dialogSlice.reducer;
