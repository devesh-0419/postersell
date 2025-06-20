// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice= createSlice({
  name: 'cart',
  initialState: {
    value: 0,
    cartItems:[],
    cartTotalAmount:0,
    cartTotalItem:0,

  },
  reducers: {
    increment: (state,action) => {
      const itemToIncrement = action.payload;
  const index = state.cartItems.findIndex(item=>item._id===itemToIncrement._id)
      // Check if the item is not already present
      if (index<0) {
        // Increment the count and add the item to the array
      
        console.log('itemToIncrement', itemToIncrement);
        state.value += 1;
        state.cartItems.push(itemToIncrement);
       
      }
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setVal: (state,action)=>{
        state.value= action.payload;
    },
    incrementItemQuantity:(state,action)=>{
        const index = state.cartItems.findIndex((item)=>item._id===action.payload._id);
        let quantity =  state.cartItems[index].quantity;

        if(index>=0&&quantity<21){
          state.cartItems[index].quantity+=1;
        }
    },
    decrementItemQuantity:(state,action)=>{
      const index = state.cartItems.findIndex((item)=>item._id===action.payload._id);
let quantity =  state.cartItems[index].quantity;

      if(index>=0&&quantity>1){
        state.cartItems[index].quantity-=1;
      }
  },
  removeItem:(state,action)=>{
    const temp = state.cartItems.filter(item=>item._id!==action.payload._id);

    state.cartItems=temp;
    state.value-=1;


  },
  setGetTotalAmount:(state,action)=>{
        const totalAmount = state.cartItems.reduce((totalAmount,val)=>totalAmount+(val.price*val.quantity),0);
        state.cartTotalAmount=totalAmount;
  }
   

    // You can add more complex logic or other actions here
  },
});

export const { increment, decrement, setVal,incrementItemQuantity, decrementItemQuantity,setGetTotalAmount,removeItem } = cartSlice.actions;
export default cartSlice.reducer;
