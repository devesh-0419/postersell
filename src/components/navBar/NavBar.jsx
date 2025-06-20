import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialize } from "../../app/productSlice";
import axios from "axios";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ChevronUpIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebase";
import { clearUser, selectUser } from "../../app/userSlice";

const NavBar = () => {
  const auth = getAuth(app);
  const user = useSelector(selectUser);
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [result, setResult] = useState([
    "Movies",
    "Action",
    "Comedy",
    "Romantic",
  ]);

  useEffect(() => {
    // console.log('search', search)
    const handler = setTimeout(() => setDebounced(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    console.log("debounced", debounced);
    // if (!debounced) {
    //   setResult([]);
    //   return;
    // }

    axios
      .get(`http://localhost:4000/posters/search?val=${debounced}`)
      .then((response) => {
        setResult(response.data);
        console.log("Result: ", response.data);
      })
      .catch((err) => {
        // console.log('search', search)
        // console.log('debounced', debounced)
        console.error("Search failed", err.message);
        setResult([]);
      });
  }, [debounced]);

  const counter = useSelector((state) => state.cart.value);

  const [sideNav, setSideNav] = useState(false);
  // const category = ["Movies", "Action", "Comedy", "Romantic"];

  const navLi = [
    { name: "Register", link: "/register" },
    { name: "Login", link: "/login" },
    { name: "Become a Seller", link: "/becomeaseller" },
    { name: "Contact", link: "/contact" },
  ];

  const account =
    user === null
      ? [
          { name: "Register", link: "/register" },
          { name: "Login", link: "/login" },
        ]
      : [
          { name: "Profile", link: "/profile" },
          { name: "LogOut", link: "" },
        ];

  const dispatch = useDispatch();
  const handleEnter = (e) => {
    if ((e.key = "Enter")) {
      const setPosters = (products) => {
        dispatch(initialize(products));
      };

      setPosters(result);
    }
  };

  const handleClickSearchOption = (e,item) =>{
    e.preventDefault();
    setSearch(item.title);
    const setPosters = (products) => {
        dispatch(initialize(products));
      };

      setPosters(result);

  }

  const logOutHandler = () => {
    console.log("user", user);
    dispatch(clearUser());
    console.log("user", user);
    signOut(auth);
    console.log("user", user);
  };

  const toggleNav = () => {
    setSideNav(!sideNav);
    console.log("nav", sideNav);
  };

  return (
    <>
      <header className="sticky top-0 left-0 bg-primary text-[#f2f1d3] h-32 w-full sm:h-20 z-20">
        <nav className="flex flex-col justify-between sm:flex-row h-32 sm:h-20">
          <div className="flex justify-between">
            <Link to="/" className="h-8">
              <img src="Logo1.png" className="h-8 m-4 sm:my-5" alt="" />
            </Link>
            <div className="cursor-pointer sm:hidden" onClick={toggleNav}>
              <Bars3Icon className="w-8 h-8 text-primary_text m-4 hover:scale-110" />
            </div>
          </div>
          {sideNav && (
            <div className={`${sideNav ? "" : "hidden"}`}>
              <div className="absolute right-0 left-0 top-0 bottom-0 h-[100vh] bg-slate-900  opacity-50"></div>
              <div className="absolute right-0 left-[40vw] top-0 bottom-0 h-[100vh] bg-primary z-50 opacity-100 ">
                <div>
                  <ChevronDoubleRightIcon
                    className="w-7 m-4 hover:scale-125"
                    onClick={toggleNav}
                  />
                </div>
                <div className="flex flex-col absolute right-0 w-full border-y-2 my-10">
                  {navLi.map((li, i) => {
                    return (
                      <Link
                        to={li.link}
                        key={i}
                        href="#"
                        className="my-2 text-end hover:bg-primary_light font-semibold text-lg"
                      >
                        <h1 className="mx-3 hover:scale-105">{li.name}</h1>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          <div className="group h-18">
            <div className="bg-[#f2f1d3] mx-5 rounded-lg h-12 flex sm:h-10 sm:my-4">
              <MagnifyingGlassIcon className="w-6 cursor-pointer text-black mx-4 my-3 sm:my-2 sm:mx-2" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleEnter}
                className="w-[25rem]  text-black bg-transparent border-none shadow-none focus:outline-none text-base sm:w-72 md:w-96 lg:w-[30rem]"
              />
            </div>
            <div className="hidden group-hover:block  relative  left-10 top-0.5 z-20">
              <div className="flex flex-col bg-[#f2f1d3] rounded-md w-[25rem] sm:w-72 md:w-96 lg:w-[30rem]">
                {result.map((item, i) => {
                  return (
                    <a
                      key={i}
                      href="#"
                      onClick={e=> handleClickSearchOption(e,item)}
                      className="px-2 py-1 text-primary  hover:bg-[#b6b6b6]  rounded-md"
                    >
                      {item.title}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 my-0.5  h-[4.5rem]">
            <div className="hidden my-5 lg:block group hover:scale-105 ">
              <div className="lg:flex">
                <h1 className="text-xl">Category</h1>
                <ChevronUpIcon className="w-5 mx-1  group-hover:rotate-180 transition-transform duration-500" />
              </div>
              <div className="hidden group-hover:block  relative  z-20 ">
                <div className="flex flex-col text-end   bg-[#266867] rounded-md">
                  {result.map((item, i) => {
                    return (
                      <a
                        key={i}
                        href="#"
                        className="px-2 py-1  hover:bg-[#218583]  rounded-md"
                      >
                        {item.title}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="hidden xl:block my-5 mx-3 hover:scale-105 cursor-pointer">
              <h1 className="text-xl">Become a Seller</h1>
            </div>
            <Link to={"/checkout"}>
              <div className="absolute top-4 right-16 sm:my-5 sm:ml-5 hover:scale-105 sm:static">
                <ShoppingCartIcon className="sm:w-8 sm:h-8 w-7" />
                <span className="relative sm:bottom-10 sm:left-5 bottom-9 left-4 text-slate-950 font-bold bg-white rounded-lg sm:px-1.5 px-1  sm:text-sm text-xs">
                  {counter}
                </span>
              </div>
            </Link>
            <div className="hidden md:flex md:flex-col sm:block group">
              <div className="my-5 mx-5   hover:scale-105  md:flex md:border rounded-md md:px-1">
                <UserCircleIcon className="w-8 h-8 md:w-7" />
                <div className="hidden md:block my-1 mx-1 text-sm">Account</div>
              </div>
              <div className="hidden group-hover:block  relative bottom-3 right-2 z-20">
                <div className="flex flex-col text-end   bg-[#266867] rounded-md">
                  {account.map((item, i) => {
                    return (
                      <Link
                        to={item.link}
                        key={i}
                        onClick={item.name === "LogOut" ? logOutHandler : ""}
                        href="#"
                        className="px-2 py-1  hover:bg-[#218583]  rounded-md"
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
