import { ChevronUpIcon } from '@heroicons/react/24/solid';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setSortBy } from '../../app/productSlice';


const FilterOptions = () => {
  const dispatch=useDispatch();
  // const navigate = useNavigate();
  const handleSortBy = (e)=>{
   dispatch(setSortBy({sortBy:e.target.dataset.name}));
    // console.log('e', e.target.dataset.name);
// navigate(`?sortby=${e.target.dataset.name}`)
  }

  const sortBy = [{title:"Name (a to z)",name:"name_asc"},{title:"Name (z to a)",name:"name_desc"},{title:"Price (low to high)",name:"price_asc"},{title:"Price (high to low)",name:"price_desc"},{title:"Reset",name:""}];

  return (
   <>
   <div className='bg-primary_text p-2 flex justify-end '>
    <div className='group/sort'>
    <div className='flex group bg-primary_text text-primary/90 py-2 justify-evenly w-36 border-primary/90 border-2 font-bold rounded-sm'>
      <h1>
      Sort By 
      </h1>
        <ChevronUpIcon className="w-5  mx-1  group-hover:rotate-180 transition-transform duration-500" />
    </div>

    <div className='absolute hidden group-hover/sort:block text-primary '>
    {sortBy.map((item,i)=><div
     key={i} 
     className='cursor-pointer w-full py-1 px-2 rounded-sm hover:bg-primary/90 hover:text-primary_text'
     data-name={item.name}
     onClick={handleSortBy}
     >
       {item.title}
      </div>
    )}
     

    </div>
    </div>



   </div>
   </>
  )
}

export default FilterOptions