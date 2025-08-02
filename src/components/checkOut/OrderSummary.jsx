import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useRazorpay from 'react-razorpay';
import axios from 'axios';
import { selectUser } from '../../app/userSlice';
import { clearCart } from '../../app/cartSlice';
const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:4000";
const OrderSummary = () => {
 const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const items = useSelector((state) => state.cart.cartItems);
  const subTotal = useSelector((state) => state.cart.cartTotalAmount);
  const [Razorpay] = useRazorpay();
  const [error, setError] = useState(null);

  const tax = +(subTotal * 0.18).toFixed(2);
  const delivery = 40;
  const totalPrice = +(subTotal + tax + delivery).toFixed(2);

  const buildOrderItems = () =>
    items.map((item) => ({
      product: item._id,
      name: item.title,
      quantity: item.quantity,
      price: item.price,
      image: item.imageUrl,
    }));

  const createOrder = async () => {
   const defaultAddress = user.deliveryAddresses[0]; // Ensure it's safe
console.log('defaultAddress', user)
const shippingAddress = defaultAddress
  ? {
      fullName: `${defaultAddress.firstName} ${defaultAddress.lastName}`,
      address: `${defaultAddress.street}, ${defaultAddress.state}`,
      city: defaultAddress.city,
      zip: defaultAddress.zip,
      country: defaultAddress.country,
    }
  : null;
console.log('shippingAddress', shippingAddress);
try {
   const res = await axios.post(
      `${backendUrl}/addorder`,
      {
        orderItems: buildOrderItems(),
        shippingAddress,
        paymentMethod: "Razorpay",
        totalPrice,
      },
      { withCredentials: true }
    );
    console.log('res', res)
    return res.data;
} catch (error) {
  console.error('Error creating order:', error);
  setError('Failed to create order. Please try again.');
}
   

  };

  const launchRazorpay = (razorpayOrder, orderId) => {
    const options = {
      key: "rzp_test_OkvMNDsm80Hz4R",
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: "PosterLand",
      description: "Payment for Order",
      image: "/Logo.png",
      order_id: razorpayOrder.id,
      handler: function (response) {
        alert("Payment Success: " + response.razorpay_payment_id);

        dispatch(clearCart());
        setError(null); // Clear cart after successful payment
        // You can send this to server for verification
      },
      prefill: {
        name: "Demo User",
        email: "demo@example.com",
        contact: "9999999999",
      },
      notes: {
        orderId,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new Razorpay(options);
    rzp.on("payment.failed", (res) => {
      alert("Payment failed: " + res.error.description);
    });

    rzp.open();
  };

  const handlePayment = async () => {
    try {
      const { razorpayOrder, order } = await createOrder();
      launchRazorpay(razorpayOrder, order._id);
      console.log('razorpayOrder', razorpayOrder);
      console.log('order', order);
    } catch (err) {
      console.error(err);
      setError("Payment setup failed. Please try again.");
    }
  };

  return (
    <div className="my-5 md:w-[30%]">
      <h1 className="text-xl font-semibold">Order Summary</h1>
      <div className="my-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>{item.quantity} x {item.title}</span>
            <span className="mx-4">Rs. {item.quantity * item.price}</span>
          </div>
        ))}

        {items.length > 0 && (
          <>
            <SummaryRow label="SubTotal" value={subTotal} bold />
            <SummaryRow label="Taxes (18%)" value={tax} />
            <SummaryRow label="Delivery" value={delivery} />
            <SummaryRow label="Total" value={totalPrice} bold highlight />

            <div
              onClick={handlePayment}
              className="bg-primary rounded-sm hover:scale-95 cursor-pointer mt-4"
            >
              <h1 className="font-semibold text-xl text-center text-primary_text p-2">
                Pay Now
              </h1>
            </div>
          </>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

const SummaryRow = ({ label, value, bold = false, highlight = false }) => {
  const labelClass = bold ? 'font-bold' : '';
  const valueClass = bold ? 'font-semibold' : '';
  const containerClass = highlight
    ? 'flex justify-between my-4 bg-slate-400 p-2'
    : 'flex justify-between my-4 text-sm';

  return (
    <div className={containerClass}>
      <span className={`${labelClass}`}>{label}</span>
      <span className={`mx-4 ${valueClass}`}>Rs. {value}</span>
    </div>
  );
};

export default OrderSummary;
