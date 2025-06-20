import React,{useEffect, useState} from 'react'
import AuthNav from '../Auth/AuthNav'
import AddressDetail from './AddressDetail';
import ReviewYourOrder from './ReviewYourOrder';
import { useDispatch, useSelector } from 'react-redux';
import { setGetTotalAmount } from '../../app/cartSlice';
import OrderSummary from './OrderSummary';

const CheckOut = () => {

  const dispatch = useDispatch();
  const items = useSelector((state)=>state.cart.cartItems);
  useEffect(()=>{
    dispatch(setGetTotalAmount());
},[items]);



    
  return (
   <>
   <div>
   <AuthNav/>

   <h1 className='text-center my-4 text-2xl text-primary font-bold'>Secure CheckOut</h1>


  <div className=' mx-4 md:flex md:justify-stretch'>
    <AddressDetail/>

    <ReviewYourOrder/>
     
     <OrderSummary/>
 
  </div>
   </div>
   
  
   </>
  )
}

export default CheckOut