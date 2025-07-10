import React, { useEffect, useState } from 'react';
import  Home from './components/Home/Home';
import  Product  from './components/Product/Product';
import  Auth  from './components/Auth/Auth';
import './App.css';
import { BrowserRouter, Route, Routes,Navigate} from 'react-router-dom';
import {app} from './firebase';
import {onAuthStateChanged,getAuth} from 'firebase/auth'
import Profile from './components/Profile/Profile';
import CheckOut from './components/CheckOut/CheckOut';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectUser, setUser } from './app/userSlice';

const App = () =>{
  const user = useSelector(selectUser);
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/product/:id" element={<Product  />} />
        <Route path="/register" element={user?<Navigate to="/"/>:<Auth name={"Register"} />} />
        <Route path="/login" element={user?<Navigate to="/"/>:<Auth  name={"Login"} />} />
        <Route path="/profile" element={user?<Profile  />:<Navigate to="/"/>} />
        <Route path="/checkout" element={user?<CheckOut  />:<Navigate to="/login"/>} />
        <Route path="/" element={<Home  />} />
      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
