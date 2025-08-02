import React, { useState, useEffect } from 'react';

import  Product  from './Product';
import axios from 'axios';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useSelector,useDispatch } from 'react-redux';
import {initialize} from '../../app/productSlice'
import { selectUser } from '../../app/userSlice';
import { useParams, useSearchParams } from 'react-router-dom';
const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:4000";
const  ProductList = (props)=> {
  const user = useSelector(selectUser);
  const favoritePosters = user ? new Set(user.favoritePosters) : new Set();
  
  console.log('backendUrl', import.meta.env);
  // console.log('favoritePosters', favoritePosters)
  const dispatch = useDispatch();
  const posters = useSelector((state)=>state.product.products);
  const setPosters = (products)=>{
    dispatch(initialize(products));
   
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [pagenumber, setPageNumber] = useState([1, 2]);
 

const {sortby} = useParams();
console.log('sortBy', sortby);
const url = sortby ? `${backendUrl}/posters/?sortby=${sortby}` : `${backendUrl}/posters/`;

  useEffect(() => {
    // console.log("refresh..........");
    
    axios
      .get(url)
      .then((response) => {
        setPosters(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [sortby]);

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
    
      <div className="flex flex-col sm:mx-20 sm:flex-row sm:flex-wrap">
        {posters.map((poster, i) => (
          <Product poster={poster} key={i} user={user} fav={favoritePosters.has(poster._id)} />
        ))}
        <div className="m-auto my-4">
          <ul className="flex flex-row gap-1">
            <li>
              <a
                className={`bg-white px-2 ring-1 ring-black ${currentPage === 1 ? 'bg-opacity-70' : ''}`}
                href="#"
                onClick={() => {
                  pageData(`${backendUrl}/posters/?pageNumber=${currentPage > 1 ? currentPage - 1 : currentPage}`, currentPage > 1 ? currentPage - 1 : currentPage);
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
                    pageData(`${backendUrl}/posters/?pageNumber=${num}`, num);
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
                  pageData(`${backendUrl}/posters/?pageNumber=${currentPage + 1}`, currentPage + 1);
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
