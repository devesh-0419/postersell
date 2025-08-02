import React, { useEffect, useState } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:4000";
const YourFavourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${backendUrl}/favourites`, { withCredentials: true })
      .then((res) => {
        console.log("first", res.data);
        setFavourites(res.data);
      })
      .catch(() => setError("Failed to fetch favourites"))
      .finally(() => setLoading(false));
  }, []);

  const FavouriteCard = ({ data }) => (
    <div className="p-4 border rounded mb-3 shadow">
      <p><strong>Product:</strong> {data.title}</p>
      <p><strong>Price:</strong> ₹{data.price}</p>
    </div>
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Favourites</h2>
      {favourites.length ? (
        favourites.map((f) => <FavouriteCard key={f._id} data={f} />)
      ) : (
        <p className="text-gray-500">Empty</p>
      )}
    </div>
  );
};

export default YourFavourites;
