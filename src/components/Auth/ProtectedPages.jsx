import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { selectUser } from '../../app/userSlice'
import { Navigate } from 'react-router-dom';
import { usePersistUser } from '../../serverCalls/usePersistUser';

const ProtectedPages = ({children}) => {
  const user = useSelector(selectUser);
  // Check if user is logged in
  const persistUser = usePersistUser();
   useEffect(() => {
   persistUser();
 }, [user]);
  return (
   <>
   {user ? children : <Navigate to="/login" />}
   </>
  )
}

export default ProtectedPages