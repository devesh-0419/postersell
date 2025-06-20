import React, { useState } from 'react'

const AddressDetail = () => {


    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [phone,setPhone] = useState('');
    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const [country,setCountry] = useState('');
    const [zip,setZip] = useState('');
  return (
    <>
    <div className='md:w-[40%]'>
      <h1 className='font-semibold text-xl'>Delivery Address</h1>
      <form action="" className='md:[&>*]:mx-1 [&>*]:block [&>*]:mx-5 [&>*]:my-5'>
        <label htmlFor="firstname" className='text-sm font-bold'>
          First Name <sup className='text-red-700'>*</sup>
          <input 
          type="text" 
          className='block my-2 py-2 px-2 w-full rounded-md border-slate-300 border-2 bg-slate-200'
          placeholder='Enter Your First Name'
          id='firstname'
          value={fname}
          onChange={e=>{setFname(e.target.value)}}

          />
        </label>
        <label htmlFor="lastname" className='text-sm font-bold'>
          Last Name <sup>*</sup>
          <input 
          type="text" 
          className='block my-2 py-2 px-2 w-full rounded-md border-slate-300 border-2 bg-slate-200'
          placeholder='Enter Your Last Name'
          id='lastname'
          value={lname}
          onChange={e=>{setLname(e.target.value)}}

          />
        </label>
        <label htmlFor="phone" className='text-sm font-bold'>
          Phone Number <sup>*</sup>
          <input 
          type="text" 
          className='block my-2 py-2 px-2 w-full rounded-md border-slate-300 border-2 bg-slate-200'
          placeholder='Enter Your Phone Number'
          id='phone'
          value={phone}
          onChange={e=>{setPhone(e.target.value)}}

          />
        </label>
        <label htmlFor="address" className='text-sm font-bold'>
          Address <sup>*</sup>
          <input 
          type="text" 
          className='block my-2 py-2 px-2 w-full rounded-md border-slate-300 border-2 bg-slate-200'
          placeholder='Address/ street/ House No.'
          id='address'
          value={address}
          onChange={e=>{setPhone(e.target.value)}}

          />
        </label>
        <label htmlFor="city" className='text-sm font-bold'>
          City/Town <sup>*</sup>
          <input 
          type="text" 
          className='block my-2 py-2 px-2 w-full rounded-md border-slate-300 border-2 bg-slate-200'
          placeholder='Enter Your City'
          id='city'
          value={city}
          onChange={e=>{setPhone(e.target.value)}}

          />
        </label>
        <label htmlFor="state" className='text-sm font-bold'>
          State <sup>*</sup>
          <input 
          type="text" 
          className='block my-2 py-2 px-2 w-full rounded-md border-slate-300 border-2 bg-slate-200'
          placeholder='Enter Your Phone Number'
          id='state'
          value={state}
          onChange={e=>{setPhone(e.target.value)}}

          />
        </label>
        <label htmlFor="zip" className='text-sm font-bold'>
          Zip Code <sup>*</sup>
          <input 
          type="text" 
          className='block my-2 py-2 px-2 w-full rounded-md border-slate-300 border-2 bg-slate-200'
          placeholder='Enter Your Phone Number'
          id='zip'
          value={zip}
          onChange={e=>{setPhone(e.target.value)}}

          />
        </label>
        <label htmlFor="country" className='text-sm font-bold'>
          Country <sup>*</sup>
          <input 
          type="text" 
          className='block my-2 py-2 px-2 w-full rounded-md border-slate-300 border-2 bg-slate-200'
          placeholder='Enter Your Phone Number'
          id='country'
          value={country}
          onChange={e=>{setPhone(e.target.value)}}

          />
        </label>
        <div className='p-2'>

        <button type='button' className='text-primary_text bg-primary p-2 rounded-lg text-xl font-bold'>Save</button>
        </div>
      </form>
    </div>
    
    </>
  )
}

export default AddressDetail