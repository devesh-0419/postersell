import React, { useState } from 'react'

const AddressInput = ({type,id,name,placeholder,value,onChange}) => {
  return (
   <>
    <label htmlFor="firstname" className='text-sm font-bold'>
          {name} <sup className='text-red-700'>*</sup>
          <input 
          type={type} 
          className='block my-2 py-2 px-2 w-full rounded-md border-slate-300 border-2 bg-slate-200'
          placeholder={placeholder}
          id={id}
          value={value}
          onChange={onChange}
          />
        </label>
   </>
  )
}

export default AddressInput