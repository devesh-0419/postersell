import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import {ShoppingBagIcon} from '@heroicons/react/24/outline'
import NavBar from '../navBar/NavBar'
import Footer from '../Footer/Footer'
const Product = (props) => {
 const {id} = useParams();

 const [data,setData] = useState(null);

 useEffect(() => {
  axios
    .get(`http://localhost:4000/posters/${id}`)
    .then((response) => {
      setData(response.data);
     
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
},[]);


  return (
   
    <>
    <NavBar/>
    {data?<div className=' bg-primary_text text-primary sm:top-20 '>
     
<div className='m-auto  bg-primary_text  flex flex-col lg:flex-row '>

<div className='m-auto my-10 lg:my-16 bg-primary p-2 '>
  <img src={data.imageUrl} 
  className='w-80 h-96'
  alt="" />
</div>


<div className='m-auto w-[75%] flex flex-col md:w-[50%]'>
  <h1 className='text-2xl whitespace-normal font-semibold'>{data.title}</h1>


  <div className='text-lg m-auto  '>
  <p>{data.description}</p>
</div>
<div className=' text-xl font-semibold my-2'>
  Dimention:- 13X14 inch
</div>
<div className=' text-xl my-3 font-extrabold'>
 Price:- Rs.{data.price}
</div>
<div className='my-10 '>

<div  className="bg-primary px-2.5 m-auto cursor-pointer hover:scale-110 rounded-sm ring-2 ring-primary flex  w-[10rem] lg:m-0">
              <ShoppingBagIcon className="w-8 mr-2 text-primary_text" />
              <h1 className='font-semibold text-primary_text text-lg my-4'>
              Add to Cart

              </h1>
            </div>
</div>
<div className='-my-5 '>

<div className="bg-primary px-2.5 m-auto cursor-pointer hover:scale-110 rounded-sm ring-2 ring-primary flex  w-[10rem] lg:m-0">
              <ShoppingBagIcon className="w-8 mr-2 text-primary_text" />
              <h1 className='font-semibold text-primary_text text-lg my-4'>
             Check Out

              </h1>
            </div>
</div>
</div>

          
</div>





    </div>
    
    
    
    
    :
    <div className='w-full'>
      <p className='m-auto'> Loading.... </p>
    </div>}
    
    <Footer/> 
  </>
  
  );

}


export default Product;
