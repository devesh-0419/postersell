import React from 'react';
import  ProductList  from './ProductList';
import  NavBar  from '../navBar/NavBar';
import Footer from '../Footer/Footer';
import { useSelector } from 'react-redux';
import { selectUser } from '../../app/userSlice';

const Home=()=> {
  const user = useSelector(selectUser);
 console.log('user inside home', user)
  return (
    <>
      <NavBar  />
      <ProductList  />
      <Footer/>
    </>
  );
}

export default Home;
