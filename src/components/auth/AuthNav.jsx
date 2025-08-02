import React, { useEffect, useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import {Link} from 'react-router-dom'
import { usePersistUser } from '../../serverCalls/usePersistUser';
import { useSelector } from 'react-redux';
import { selectUser } from '../../app/userSlice';

const NavBar = (props) => {

 const user = useSelector(selectUser);

  return (
    <>
      <header className="sticky top-0 left-0 bg-primary text-[#f2f1d3] h-16 w-full sm:h-16 z-20">
        <nav className="flex flex-col justify-between sm:flex-row h-32 sm:h-20">
          <div className="flex justify-between">
            <Link to="/" className='h-8'>
            <img src="/Logo1.png" className="h-8 m-4 sm:my-5" alt="" />
            </Link>
        
          </div>
         
        </nav>
      </header>
    </>
  );
}

export default NavBar;
