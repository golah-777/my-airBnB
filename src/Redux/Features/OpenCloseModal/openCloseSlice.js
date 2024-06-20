import { createSlice } from "@reduxjs/toolkit";


export const openCloseSlice = createSlice({
  name:'open_close_modal',
  initialState:{
    openCloseModal:false,
  },
  reducers:{
    open_modal: state =>{
      state.openCloseModal = true
    },
    close_modal: state =>{
      state.openCloseModal = false
    }
  }
})

export const {open_modal , close_modal} = openCloseSlice.actions;

export default openCloseSlice.reducer
