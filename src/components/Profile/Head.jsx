import React from 'react'

const Head = ({user:{name,photoURL,email}}) => {
  return (
   <>
    <div className='bg-primary_text p-2 w-full'>
      <div className='sm:h-60 h-44  m-3 rounded-md bg-primary_light/90 flex items-center md:flex-row md:justify-around md:gap-6 flex-col  '>
       <div className=' h-1/2 mt-4 rounded-full overflow-hidden '>
        <img 
        className='object-cover w-full h-full'
        src={photoURL||'/profileImage.png'} 
        alt="displaypicture"
        onLoad={()=> console.log('Loding DP')}
        />
       </div>
       <div className='my-4 text-center'>
        <h1 className='text-xl font-bold text-primary_text'>{name}</h1>
        <p className='text-xs italic  text-primary_text/70'>Email: {email}</p>
       </div>
        
      </div>
    </div>
   </>
  )
}

export default Head