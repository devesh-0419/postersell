import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import {useDispatch,useSelector} from 'react-redux'
import {increment,decrement,setVal} from '../../app/cartSlice'
import {addFavourite,removeFavourite, selectUser} from '../../app/userSlice'
const Product= (props) => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const favoritePosters= useSelector((state)=>state.user.favoritePosters)
  
  
  const onAddToCart = ()=>{
    const quantity=1;
    const item = {_id,quantity,imageUrl,title,price};
    dispatch(increment(item));

    
  }

  
  const [fav, setFav] = useState(false);
  const { imageUrl, price, title, _id } = props.poster;


 useEffect(()=>{
  if(user){
    if(fav==true)dispatch(addFavourite({id:_id}));
    else dispatch(removeFavourite({id:_id}));
   
  }
 },[fav])
  

  const toggleFav = () => {
    setFav(!fav);
    console.log('favoritePosters', favoritePosters);  
  };

  return (
    <>
     <div className='w-full lg:w-[50%]'>

        <div className="group flex flex-row py-4 bg-primary_text hover:bg-white">
          <div className="mx-5 w-48 h-[15rem] ring-black ring-2 ring-opacity-10">
            <div className="m-auto h-48 w-36 overscroll-contain">
              <img src={imageUrl} className="h-48 w-32 my-5 m-auto" alt="" />
            </div>
          </div>

          <HeartIcon
            onClick={toggleFav}
            className={`w-8 p-1 absolute ml-[11rem] my-2 z-10  ${
              fav ? 'text-red-600' : 'text-slate-600'
            }`}
            />

          <div className="my-2 flex flex-col justify-around m-auto">
            <div>
            <Link to={`/product/${_id}`} className=" z-0">
              <h1 className="w-36 font-bold text-base whitespace-normal hover:underline">{title}</h1>
              </Link>
              <p className="text-sm">13 inch X 12 inch</p>
            </div>
            <div>
              <span className="text-sm font-semibold">Rs.{price}</span>
            </div>
          
            <div className="bg-primary p-1 px-2.5 font-semibold cursor-pointer hover:scale-110 rounded-sm ring-2 ring-primary_text flex text-primary_text text-sm w-[8rem]"
            onClick={onAddToCart}
            >
              <ShoppingBagIcon className="w-4 mr-2" />
              Add to Cart
            </div>
          </div>
        </div>
   
            </div>
    </>
  );
}

export default Product;
