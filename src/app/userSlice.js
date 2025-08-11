// userSlice.js

import { createSlice } from '@reduxjs/toolkit';
import AddressDetail from '../components/checkOut/AddressDetail';


const userSlice = createSlice({
  name: 'user',
  initialState:{
    credential: null,
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
      console.log('action.payload', action.payload)
      const {favoritePosters} =action.payload
        state.credential.favoritePosters= favoritePosters;
    },
    addFavourite:(state,action)=>{
      const {id} = action.payload;
      state.credential.favoritePosters.push(id);
    },
    removeFavourite:(state,action)=>{
      const {id} = action.payload;
      console.log('action.payload', action.payload)
      state.credential.favoritePosters = state.credential.favoritePosters.filter(item => item !== id);
        
    },
    addAddressDetail:(state,action)=>{
      const {deliveryAddress} = action.payload;
      state.credential.deliveryAddresses.push(deliveryAddress);
        
    },
    deleteAddressDetail:(state,action)=>{
      const {id} = action.payload;
      console.log('action.payload', action.payload)
   state.credential.deliveryAddresses.splice(id,1);
        
    }

  },
});

export const { setUser, clearUser,addFavourite, removeFavourite,setFavorite, addAddressDetail,deleteAddressDetail } = userSlice.actions;
export const selectUser = (state)=>state.user.credential;
export default userSlice.reducer;
