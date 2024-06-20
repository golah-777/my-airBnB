import { createSlice } from "@reduxjs/toolkit";

export const authSignUpSlice= createSlice({
  name: "authSignUp",
  initialState: {
    names:"",
    email: "",
    password: "",
    loading:null
  },
  reducers: {
    user_name: (state, action) => {
      state.loading = true;
      state.names = action.payload;
    },
    user_email: (state, action) => {
      state.loading = true;
      state.email = action.payload;
    },
    user_password: (state, action) => {
      state.loading = true;
      state.password = action.payload;
    },
    user_signup_request: (state) => {
      state.loading = true;
    },
    user_signup_success: (state) => {
      state.loading = false;
    },
    user_signup_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  user_name,
  user_email,
  user_password,
  user_signup_request,
  user_signup_success,
  user_signup_fail
} = authSignUpSlice.actions;

export default authSignUpSlice.reducer;
