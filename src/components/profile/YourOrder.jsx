import AuthNav from '../auth/AuthNav'
import React, { useEffect, useState } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:4000";
const YourOrder = ({user,type}) => {
const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backendUrl}/orders`, { withCredentials: true });
        setOrders(res.data);
      } catch (err) {
        setError("Failed to fetch orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderOrder = (order) => (
    <div key={order._id} className="p-4 border rounded mb-4">
      <p className="font-semibold">Order ID: {order._id}</p>
      <p>Status: {order.orderStatus}</p>
      <p>Total: ₹{order.totalPrice}</p>
      <p>Payment: {order.isPaid ? "Paid" : "Not Paid"}</p>
      <p>Shipping To: {order.shippingAddress.fullName}, {order.shippingAddress.city}</p>
      <p>Date: {new Date(order.createdAt).toLocaleString()}</p>

      <div className="mt-2">
        <p className="font-medium">Items:</p>
        <ul className="list-disc ml-6">
          {order.orderItems.map((item, idx) => (
            <li key={idx}>
              {item.name} - {item.quantity} x ₹{item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (

    <>
    <AuthNav />
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Active Orders</h3>
            {orders.active.length > 0 ? (
              orders.active.map(renderOrder)
            ) : (
              <p className="text-gray-500">Empty</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Order History</h3>
            {orders.history.length > 0 ? (
              orders.history.map(renderOrder)
            ) : (
              <p className="text-gray-500">Empty</p>
            )}
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default YourOrder;