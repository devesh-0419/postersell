import React, { useEffect, useState } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:4000";
const YourAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${backendUrl}/addresses`, { withCredentials: true })
      .then((res) => {
        console.log("req.data", res.data);
        setAddresses(res.data)
      })
      .catch(() => setError("Failed to fetch addresses"))
      .finally(() => setLoading(false));
  }, []);

  const AddressCard = ({ data }) => (
    <div className="p-4 border rounded mb-3 shadow">
      <p><strong>Name:</strong> {data.firstName} {data.lastName}</p>
      <p><strong>Address:</strong> {data.address}, {data.city}, {data.country} - {data.zip}</p>
    </div>
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Addresses</h2>
      {addresses.length ? (
        addresses.map((addr) => <AddressCard key={addr._id} data={addr} />)
      ) : (
        <p className="text-gray-500">Empty</p>
      )}
    </div>
  );
};

export default YourAddress;
