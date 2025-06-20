import { createSlice } from '@reduxjs/toolkit';


const productSlice = createSlice({
    name:'product',
    initialState:{
        products:[],
    },
    reducers:{
        initialize:(state,action)=>{
            const temp = action.payload;

            state.products = temp;
            console.log('posters', state.products);
        }
    }
    
})

export const {initialize} = productSlice.actions;

export default productSlice.reducer;