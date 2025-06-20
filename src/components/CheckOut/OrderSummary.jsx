import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useRazorpay from 'react-razorpay'
import axios from 'axios';
const OrderSummary = () => {
  const items = useSelector((state)=>state.cart.cartItems);
  const subTotal = useSelector((state)=>state.cart.cartTotalAmount);
  const [Razorpay] = useRazorpay();
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const handlePayment = async (params) => {
  //  Create order on your backend
  try {
    const response = await axios.post('http://localhost:4000/create-order', {
      amount: subTotal, // Example amount in paise (50 INR)
      currency: 'INR',
    });
    const { order } = response.data;
    setOrderId(order.id);
    setError(null);
    
    const options = {
      key: "rzp_test_OkvMNDsm80Hz4R", // Enter the Key ID generated from the Dashboard
      amount: subTotal, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "PosterLand",
      description: "Test Transaction",
      image: "/Logo.png",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
  
    const rzp1 = new Razorpay(options);
  
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
  
    rzp1.open();
  }
  catch(error){
    console.error('Error creating order:', error);
    setError('Error creating order. Please try again later.');
 
  }

  };

  return (
    <>
    <div className='my-5 md:w-[30%]'>
      <h1 className='text-xl font-semibold'>Order Summary</h1>

     <div className='my-4'>
{items.map((val,i)=>{
  return <>
  <div key={i} className='flex justify-between'> 
      <h1 className='text-start'>{val.quantity} x {val.title}</h1>
      <h1 className='text-end mx-4'>Rs. {val.quantity*val.price}</h1>

  </div>
  </>
})}

<div className='flex justify-between my-4'>
    <h1 className='font-bold'>SubTotal</h1>
    <h1 className='text-end font-semibold mx-4'>Rs. {subTotal}</h1>

  </div>

  {items.length>0?<div>

<div className='flex justify-between my-4 text-sm'>
    <h1 className=''>Taxes.(18%) </h1>
    <h1 className='text-end  mx-4'>Rs. {subTotal*0.18}</h1>

  </div>
<div className='flex justify-between my-4 text-sm'>
    <h1 className=''>Delivary Charge</h1>
    <h1 className='text-end mx-4'>Rs. {40}</h1>

  </div>

<div className='flex justify-between my-4 bg-slate-400 p-2'>
    <h1 className='font-bold'>Order Total.</h1>
    <h1 className='text-end font-semibold mx-4'>Rs. {(subTotal*1.18)+40}</h1>

  </div>
  <div onClick={handlePayment} className='bg-primary rounded-sm hover:scale-95'>
        <h1 className='font-semibold text-xl text-center text-primary_text p-2'>Pay Now</h1>

      </div>
</div>:<></>}
  
  
      </div>

     
    </div>
    </>
  )
}

export default OrderSummary