import React, { useState, useEffect } from "react";
import NavBar from "./AuthNav";
import { Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../app/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:4000";

const Register = ({ name }) => {
  const [visPass, setVisPass] = useState(false);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [authStatus, setAuthStatus] = useState("");
  const navigate = useNavigate();
  const toggleVisPass = () => {
    setVisPass(!visPass);
  };

  const dispatch = useDispatch();
 
  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/register`, {
        displayName,
        email,
        password,
        username:email
      },{withCredentials:true});

      console.log('response', response);
      navigate('/');
      // setAuthStatus('User created and logged in!');
    } catch (error) {
      console.error('Error creating user:', error);
      setAuthStatus(
        error.response?.data?.message || 'Failed to create user. Try again.'
      );
    }
    finally{
      setDisplayName("");
      setEmail("");
      setPassword("");
      
    }
  };


  
  const handleLoginUser = async (e) => {
    e.preventDefault();
console.log('e', e)
    try {
      const response = await axios.post(`${backendUrl}/login`, {
        identifier:email,
        password,
      },{withCredentials:true});

      console.log('response', response);
       navigate('/');
      // setAuthStatus('User logged in!');


    } catch (error) {
      console.error('Login error:', error.response?.data?.message);
      setAuthStatus( error.response?.data?.message || 'Failed to LogIn. Try again.');
    }
    finally{
       setEmail("");
      setPassword("");
      
    }
  };
  return (
    <>
      <NavBar />
      <div className="">
        <div className=" my-16 mx-12 sm:mx-16 md:mx-28">
          <h1 className=" text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
            {name}
          </h1>
          <h1 className="text-sm font-medium text-primary_light">
            Welcome To Poster-Land
          </h1>
        </div>

        <div className="mx-10 sm:mx-20 sm:w-[70%] md:mx-44 md:w-[50%]">
          <form action="">
            {name === "Register" ? (
              <label className=" font-semibold text-xl" htmlFor="">
                Name
                <input
                  className="w-full my-1 p-1 focus:outline-none block bg-[#f0f0f0]"
                  type="text"
                  placeholder="Enter Your Name"
                  value={displayName}
                  onChange={e => { setDisplayName(e.target.value) }}
                />
              </label>
            ) : (
              <></>
            )}
            <label className=" font-semibold text-xl" htmlFor="email">
              Email
              <input
                className="w-full my-1 p-1 focus:outline-none block bg-[#f0f0f0]"
                id="email"
                type="text"
                placeholder="Enter Your Email"
                value={email}
                onChange={e => { setEmail(e.target.value) }} />
            </label>
            <label className=" font-semibold text-xl" htmlFor="password" >
              Password
              <input
                className="w-full my-1 p-1 focus:outline-none block bg-[#f0f0f0]"
                id="password"
                type={visPass ? "text" : "password"}
                placeholder="Enter Pas***rd"
                value={password}
                onChange={e => { setPassword(e.target.value) }} />
              <div className="ml-[92%] -mt-8 mb-5" onClick={toggleVisPass}>
                {visPass ? (
                  <EyeIcon className="w-5" />
                ) : (
                  <EyeSlashIcon className="w-5" />
                )}
              </div>
            </label>

            <button
              className="my-4 bg-primary text-primary_text p-2 px-3 rounded-sm text-md font-semibold hover:scale-105"
              type="button"
              onClick={name === 'Register' ? handleCreateUser  : handleLoginUser}
            >
              {name}
            </button>
          </form>
          {<div className="block text-sm text-red-700 hover:underline">
            {authStatus}
          </div>}
          {name === "Register" ? (
            <Link
              to="/login"
              className="block text-xs text-primary hover:underline"
              href="/login"
            >
              Already have an account login?
            </Link>
          ) : (
            <Link
              to="/register"
              className="block text-xs text-primary hover:underline"
              href="/login"
            >
              Have you Register?
            </Link>
          )}

          {/* <div className="font-bold text-xl my-4 border-2 border-black inline-block p-2 hover:scale-95 ">
            <button type="button" onClick={signInWithGoogle}>
              SignIn With Google
            </button>

          </div> */}
        </div>
      </div>
    </>
  );
};

export default Register;
