import React,{useEffect, useState} from 'react'
import AuthNav from '../auth/AuthNav'
import AddressDetail from './AddressDetail';
import ReviewYourOrder from './ReviewYourOrder';
import { useDispatch, useSelector } from 'react-redux';
import { setGetTotalAmount } from '../../app/cartSlice';
import OrderSummary from './OrderSummary';
import { selectUser } from '../../app/userSlice';

const CheckOut = () => {

  const dispatch = useDispatch();
  const items = useSelector((state)=>state.cart.cartItems);
  const user = useSelector(selectUser);
  useEffect(()=>{
    dispatch(setGetTotalAmount());
},[items]);

// console.log('items', items);

    
  return (
   <>
   <div>
   <AuthNav/>

   <h1 className='text-center my-4 text-2xl text-primary font-bold'>Secure CheckOut</h1>


  <div className=' mx-4 md:flex md:justify-around'>
    <AddressDetail/>
   {items.length>0&&<ReviewYourOrder/>}
     
    {items.length>0&&<OrderSummary/>}
 
  </div>
   </div>
   
  
   </>
  )
}

export default CheckOut