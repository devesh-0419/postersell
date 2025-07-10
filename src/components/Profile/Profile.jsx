import React, { useEffect, useState } from 'react'
import NavBar from '../navBar/NavBar';
import { useSelector } from 'react-redux';
import { selectUser } from '../../app/userSlice';
import axios from 'axios';
import Footer from '../Footer/Footer';

const Profile = () => {

  const user = useSelector(selectUser);


  const {displayName,email,photoURL,emailVerified} = user ;
  return (
    <>
    {/* <NavBar/> */}
    <div className='bg-primary_text p-2 w-full'>
      <div className='h-60 m-3 rounded-md bg-primary_light/90 flex'>
       <div>
        <img 
        src={photoURL} 
        alt="displaypicture"
        onLoad={()=> console.log('Loding DP')}
        />
       </div>
       <div>
        
       </div>
        
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Profile