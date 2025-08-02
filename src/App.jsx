import React, { useEffect, useState } from 'react';
import  Home from './components/Home/Home';
import  Product  from './components/Product/Product';
import  Auth  from './components/Auth/Auth';
import './App.css';
import { BrowserRouter, Route, Routes,Navigate} from 'react-router-dom';
import Profile from './components/profile/Profile';
import CheckOut from './components/checkOut/CheckOut';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectUser, setFavorite, setUser } from './app/userSlice';
import axios from 'axios';
import YourOrder from './components/profile/YourOrder';
import YourFavourites from './components/profile/YourFavourites';
import YourAddress from './components/profile/YourAddress';

const App = () =>{
  const user = useSelector(selectUser);
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/product/:id" element={<Product  />} />
        <Route path="/register" element={user?<Navigate to="/"/>:<Auth name={"Register"} />} />
        <Route path="/login" element={user?<Navigate to="/"/>:<Auth  name={"Login"} />} />
        <Route path="/profile" element={user?<Profile  />:<Navigate to="/"/>} />
        <Route path="/your-orders" element={user?<YourOrder user={user} type={"order"} />:<Navigate to="/"/>} />
        <Route path="/your-favorites" element={user?<YourFavourites user={user} type={"favorites"} />:<Navigate to="/"/>} />
        <Route path="/your-address" element={user?<YourAddress user={user} type={"address"} />:<Navigate to="/"/>} />
        <Route path="/checkout" element={user?<CheckOut  />:<Navigate to="/login"/>} />
        <Route path="/" element={<Home  />} />
      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
