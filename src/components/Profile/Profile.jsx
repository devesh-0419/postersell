import React from 'react'
import NavBar from '../navBar/NavBar';
import { useSelector } from 'react-redux';
import { selectUser } from '../../app/userSlice';

const Profile = () => {

  const user = useSelector(selectUser);

  return (
    <>
    
    
    <div>{user}</div>
    </>
  )
}

export default Profile