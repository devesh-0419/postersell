import React from 'react'
import {Link} from 'react-router-dom'
import ExtraFooter from './ExtraFooter'
function Footer() {
const footerElemet = [
  {Name:"About",
  content:[{Name:"Contact Us",
             link:""},{Name:"About Us",
             link:""},{Name:"Careers",
             link:""},]

  },
  {Name:"Help",
  content:[{Name:"Payment",
             link:""},{Name:"Shipping",
             link:""},{Name:"Cancellation & Return",
             link:""},]

  },
  {Name:"Social",
  content:[{Name:"Instagram",
             link:""},{Name:"Youtube",
             link:""},{Name:"Twitter",
             link:""},]

  },

]
  return (
    <>
    <div className='text-primary_text bg-primary'>
<div className='flex flex-col md:flex-row gap-2 md:justify-around'>
{footerElemet.map((ele,i)=>{
  return <div key={i} className='m-4'>
   <div className=''>
           <h1 className='font-extrabold opacity-50'>{ele.Name}</h1>

           {ele.content.map((val,i)=>{
            return <Link to={val.link} key={i}>
            <div className='font-medium text-xs hover:underline'>
              {val.Name}
            </div>
            
            </Link> 
           })}

  </div>
  </div>
})}
</div>
    </div>

    <ExtraFooter/>
    </>
  )
}

export default Footer