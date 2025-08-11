import { createSlice } from '@reduxjs/toolkit';


const productSlice = createSlice({
    name:'product',
    initialState:{
        products:[],
        sortBy:""
    },
    reducers:{
        initialize:(state,action)=>{
            const temp = action.payload;

            state.products = temp;
            // console.log('posters', state.products);
        },
        setSortBy:(state,action)=>{
            const {sortBy} = action.payload;
            state.sortBy = sortBy;
            // console.log('state.sortBy', state.sortBy);
        }
    }
    
})

export const {initialize,setSortBy} = productSlice.actions;

export default productSlice.reducer;