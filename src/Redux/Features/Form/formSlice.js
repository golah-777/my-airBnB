import { createSlice } from "@reduxjs/toolkit";

export const formSilce = createSlice({
  name:"Form_Info",
  initialState:{
    phone: '',
    valid: null,
    showSignUpForm: false,
  },
  reducers:{
    phone_info: (state, action)=>{
      state.phone = action.payload
    },
    phone_valid:(state, action)=> {
      state.valid = action.payload
    },
    sign_Up:(state,action)=>{
      state.showSignUpForm = action.payload
    }
  }
});

export const {phone_info, phone_valid, sign_Up} = formSilce.actions;

export default formSilce.reducer;