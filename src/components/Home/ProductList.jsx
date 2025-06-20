import React, { useState, useEffect } from 'react';

import  Product  from './Product';
import axios from 'axios';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useSelector,useDispatch } from 'react-redux';
import {initialize} from '../../app/productSlice'

const  ProductList = (props)=> {
  const dispatch = useDispatch();
  const posters = useSelector((state)=>state.product.products);
  const setPosters = (products)=>{
    dispatch(initialize(products));
   
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [pagenumber, setPageNumber] = useState([1, 2]);

  useEffect(() => {
    // console.log("refresh..........");
    
    axios
      .get("http://localhost:4000/posters")
      .then((response) => {
        setPosters(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const pageData = (address, page) => {
    axios
      .get(address)
      .then((response) => {
        setPosters(response.data);
        setCurrentPage(page);
        setPageNumber([page, page + 1]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="bg-primary_text">
      <div className='absolute m-2 bg-slate-50 p-2 border-slate-300 border-2'>
        <h1 className='font-semibold'>Filter</h1>
        <div className=''>
          <h1 className=''>Price</h1>
          <div>
          <input type="radio" name="price" id="highTOLow"/>
          <label  for="highTOLow">High To Low</label>
            
          </div>
          <div>
          <input type="radio" name="price" id="lowToHigh" />
          <label for="lowToHigh">Low To High</label>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:mx-44 sm:flex-row sm:flex-wrap">
        {posters.map((poster, i) => (
          <Product poster={poster} key={i} />
        ))}
        <div className="m-auto my-4">
          <ul className="flex flex-row gap-1">
            <li>
              <a
                className={`bg-white px-2 ring-1 ring-black ${currentPage === 1 ? 'bg-opacity-70' : ''}`}
                href="#"
                onClick={() => {
                  pageData(`http://localhost:4000/posters/?pageNumber=${currentPage > 1 ? currentPage - 1 : currentPage}`, currentPage > 1 ? currentPage - 1 : currentPage);
                }}
              >
                Previous
              </a>
            </li>
            {pagenumber.map((num, i) => (
              <li key={i}>
                <a
                  className={`px-2 ring-1 ring-black ${num === currentPage ? 'bg-primary text-primary_text' : 'bg-white'}`}
                  href="#"
                  onClick={() => {
                    pageData(`http://localhost:4000/posters/?pageNumber=${num}`, num);
                  }}
                >
                  {num}
                </a>
              </li>
            ))}
            <li>
              <a
                className="bg-white px-2 ring-1 ring-black"
                href="#"
                onClick={() => {
                  pageData(`http://localhost:4000/posters/?pageNumber=${currentPage + 1}`, currentPage + 1);
                }}
              >
                Next
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
