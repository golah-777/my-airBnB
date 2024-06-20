import { createSlice } from "@reduxjs/toolkit"; 

export const onAuthStateSlice = createSlice({
  name:"onAuth",
  initialState:{
    onAuth:false
  },
  reducers:{
    loggedIn: state=>{
      state.onAuth = true;
    },
    loggedOut: state=>{
      state.onAuth = false;
    },
  }
});

export const {loggedIn, loggedOut} = onAuthStateSlice.actions;
export default onAuthStateSlice.reducer;