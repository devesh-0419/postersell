import React from 'react'
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

const ReviewYourOrder = () => {

    const item = useSelector(state=>state.cart.cartItems);
    const subTotal = useSelector((state)=>state.cart.cartTotalAmount);
  return (
    <>
       <div className='md:w-[30%]'>
      <h1 className='font-semibold text-xl'>Review Your Order</h1>
      <div className=''>
        {item.map((val,i)=>{
          return <CartItem key={i} val={val}/>
        })}
      </div>
  <div className='flex justify-between'>
    <h1 className='font-bold'>SubTotal</h1>
    <h1 className='text-end font-semibold mx-4'>Rs. {subTotal}</h1>

  </div>
    </div>
    </>
  )
}

export default ReviewYourOrder