import React, { useEffect, useState } from 'react'
import AuthNav from '../auth/AuthNav';
import { useSelector } from 'react-redux';
import { selectUser } from '../../app/userSlice';
import axios from 'axios';
import Footer from '../Footer/Footer';
import Head from './Head';
import { Link } from 'react-router-dom';

const Profile = () => {
 
  const user = useSelector(selectUser);
 const profileItems = [{id: 1, name: 'Your Orders', link: '/your-orders',type: 'orders'},
 {id: 2, name: 'Your Favorites', link: '/your-favorites',type: 'favorites'},{id: 3, name: 'Your Address', link: '/your-address',type: 'address'},];

// console.log('user', user)

  const {name,email,photoURL,emailVerified} = user ;
  return (
    <>
    <AuthNav/>
    <div className='bg-primary_text '>
      
    <div className=' flex justify-center'>
      <div className='w-full max-w-6xl lg:w-4/6'>
    <Head user={user}/>
      </div>

    </div>
      <div className=' bg-primary_text '>
      <div className='flex  p-5'>
       {profileItems.map(item=><Link to={item.link} className='' key={item.id}>
       <div className=' text-primary_text mx-3 text-center p-2 rounded-md hover:scale-95 bg-primary ' key={item.id}>
        <h1>
        {item.name}
        </h1>
       </div>
       </Link>
       )}
       </div>
      </div>
   

      
        </div>


     
    <Footer/>
    </>
  )
}

export default Profile