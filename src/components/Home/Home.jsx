import React, { useEffect } from 'react';
import  ProductList  from './ProductList';
import  NavBar  from '../navBar/NavBar';
import Footer from '../footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setFavorite, setUser } from '../../app/userSlice';
import axios from 'axios';

const Home=()=> {
  const user = useSelector(selectUser);
  const favoritePosters= useSelector((state)=>state.user.favoritePosters)
  const dispatch = useDispatch();
  useEffect(()=>{
    const persistUser= async ()=>{
      try {
        if(!user){
          const userData = await axios.get('http://localhost:4000/userdata',{withCredentials:true});
          console.log('userData', userData);
         dispatch(setUser(userData.data));
  
        
        }
      } catch (error) {
        console.error(error);
      }
    }
   persistUser();
   if(user)dispatch(setFavorite(user.favoritePosters))
  },[])
  return (
    <>
      <NavBar  />
      <ProductList  />
      <Footer/>
    </>
  );
}

export default Home;
