import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementItemQuantity, decrementItemQuantity, setGetTotalAmount, removeItem } from '../../app/cartSlice';

const CartItem = ({val:{imageUrl,price,quantity,title,_id}}) => {
    const dispatch = useDispatch();
    const items = useSelector((state)=>state.cart.cartItems);
    console.log('cart', items.length)
    const incrQuantity = ()=>{
        dispatch(incrementItemQuantity({_id:_id}));
    }
    const decrQuantity = ()=>{
        dispatch(decrementItemQuantity({_id:_id}));
    }
    const delItem=()=>{
        dispatch(removeItem({_id:_id}))
    }

    useEffect(()=>{
        dispatch(setGetTotalAmount());
    },[,quantity,dispatch]);

  return (
   <>
   <div className='flex mx-4 my-5 justify-between'>
    <div className='flex gap-5'>

    <div><img className='w-20' src={imageUrl} alt="" /></div>
    <div className=' '>
    <h1 className='text-sm font-semibold '>{title}</h1>
   
    <div className='flex my-3 bg-primary_light w-fit text-primary_text '>
        <div onClick={decrQuantity} className='border-2 border-black  text-3xl    font-bold'><MinusIcon className='w-6 font-bold'/></div>
        <div className='border-2 border-black font-bold px-2'> {quantity}</div>
        <div onClick={incrQuantity} className='border-2 border-black text-3xl font-bold'><PlusIcon  className='w-6 font-bold'/></div>
    </div>
    </div>
    </div>
   <div className=''>
    <div onClick={delItem} className='my-4 hover:scale-90'>
    <TrashIcon className='w-8 hover:text-red-600 text-slate-400 p-1 bg-slate-200 rounded-lg '/>

    </div>
   <h1 className='font-bold '>Rs. {quantity*price}</h1>
   </div>
   </div>
   </>
  )
}

export default CartItem