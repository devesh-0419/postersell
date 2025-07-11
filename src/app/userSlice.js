// userSlice.js

import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'user',
  initialState:{
    credential: null,
    favoritePosters:[]
  },
  reducers: {
    setUser: (state, action) => {
      state.credential = action.payload;
      console.log('state.user', state.credential)
    },
    clearUser: (state) => {
      state.credential = null;
    },
    setFavorite:(state,action)=>{
      const {favoritePosters} =action.payload
        state.favoritePosters= favoritePosters;
    },
    addFavourite:(state,action)=>{
      const {id} = action.payload;
      state.favoritePosters.push(id);
    },
    removeFavourite:(state,action)=>{
      const {id} = action.payload;
      state.favoritePosters = state.favoritePosters.filter(item => item !== id);
        
    }
  },
});

export const { setUser, clearUser,addFavourite, removeFavourite,setFavorite } = userSlice.actions;
export const selectUser = (state)=>state.user.credential;
export default userSlice.reducer;
