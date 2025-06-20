// userSlice.js

import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'user',
  initialState:{
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      console.log('state.user', state.user)
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state)=>state.user.user;
export default userSlice.reducer;
