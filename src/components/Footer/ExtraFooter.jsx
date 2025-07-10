import React from 'react'
import { Link } from 'react-router-dom'



const ExtraFooter = () => {
    const content = [{name:"Become A Seller",
                       link:""},
                       {name:"Advertise",
                       link:""},
                       {name:"Help Center",
                       link:""},]
  return (
    <>
    
    <div className='bg-primary my-[0.04rem] text-primary_text text-lg flex flex-col md:flex-row md:justify-around'>
        {content.map((item,i)=>{
            return <Link key={i} to={item.link} className=''>
                <div className='m-4'>
             {item.name}

                </div>
            </Link>
        })}

        <div className='mx-4 text-sm mt-10'>
            &copy; {new Date().getFullYear()} Devesh Swarnkar
        </div>
    </div>
    </>
  )
}

export default ExtraFooter