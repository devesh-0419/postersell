import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:4000";
export const addToCart = async (userId, productId, quantity) => {
    try {
      const response = await axios.post(`${backendUrl}/api/cart/addToCart`, {
        userId,
        productId,
        quantity
      });
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error('Error adding item to cart:', error); // Handle error
    }
  };
  