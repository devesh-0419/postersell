import React, { useEffect } from 'react';
import  ProductList  from './ProductList';
import  NavBar  from '../navBar/NavBar';
import Footer from '../footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setFavorite, setUser } from '../../app/userSlice';
import axios from 'axios';
import FilterOptions from './FilterOptions';
import { usePersistUser } from '../../serverCalls/usePersistUser';


const Home=()=> {
  const persistUser = usePersistUser();
  const user = useSelector(selectUser);
  const favoritePosters= useSelector((state)=>state.user.favoritePosters)
  const dispatch = useDispatch();
  useEffect(()=>{

   persistUser();

   if(user)dispatch(setFavorite({favoritePosters:user.favoritePosters}))
  },[user])
  return (
    <>
      <NavBar  />
      <FilterOptions/>
      <ProductList  />
      <Footer/>
    </>
  );
}

export default Home;
