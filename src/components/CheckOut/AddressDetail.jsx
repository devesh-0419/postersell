import React, { useState } from 'react'
import AddressInput from './AddressInput';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addAddressDetail, deleteAddressDetail, selectUser } from '../../app/userSlice';
import { toast } from 'react-toastify';
const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:4000";
const AddressDetail = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log('user in AddressDetail', user)
const [addAddress,setAddAddress] = useState((user.deliveryAddresses.length>0)?true:false);
const [formData,setFormData]=useState({
                                          firstName:'',
                                          lastName:'',
                                          phone:'',
                                          street:'' ,
                                          city:'' ,
                                          state:'' ,
                                          zip: '',
                                          country:'',
                                                  });
  
const handleChange = (field) => (e) => {
   e.preventDefault();
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

const handleAddressDelete =  (i) => async (e) =>{
  e.preventDefault();
  try {
    console.log('Submitted Data:', formData);
    const response = await axios.delete(`${backendUrl}/user/address/${i}`,{withCredentials:true});

     ((val)=>{
     dispatch(deleteAddressDetail({id:val}));
    })(i);

    

  } catch (error) {
    console.log('error', error);
    toast.error('Failed to delete address');
  }
  
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    console.log('Submitted Data:', formData);
    const response = await axios.post(`${backendUrl}/user/address`, { deliveryAddress: formData }, { withCredentials: true });
    console.log('response ', response);

    const setDeliveryAddress = (val)=>{
     dispatch(addAddressDetail({deliveryAddress:val}));
    }

    setDeliveryAddress(formData);
    setAddAddress(true);

  } catch (error) {
    console.log('error', error);
    toast.error(error.response?.data?.message || 'Failed to add address');
  }
  finally{
const resetState = 
Object.keys(formData).reduce((acc, key) => {
    acc[key]= '';
    return acc;
  }, {});
  setFormData(prev=>prev=resetState);
}
  
  };

console.log('user.deliveryAddresses', user.deliveryAddresses.length)
  return (
    <>
    <div className='md:w-[33%]'>
    <div>
      
      <h1 className='font-semibold text-xl'>Delivery Address</h1>
      
     {user.deliveryAddresses.length==0||!addAddress?<form action="" onSubmit={handleSubmit} className='md:[&>*]:mx-1 [&>*]:block [&>*]:mx-5 [&>*]:my-5'>
        {Object.keys(formData).map((item,i)=><AddressInput key={i} id={item} placeholder={`Enter your ${item}..`} name={item.toUpperCase()} value={formData[item]} onChange={handleChange(item)} />)}
        <div className='p-2'>
        <button type='submit' className='text-primary_text bg-primary p-2 rounded-lg text-xl font-bold'>Save</button>
        </div>
      </form>:<div className='flex'>{user.deliveryAddresses.map((item,i)=>
         <div key={i} className='m-2 ' >
        <div className='bg-slate-400 inline-block p-5 text-xs overflow-auto whitespace-pre-wrap break-all rounded-md relative '>
          <button 
          type='button' 
          className=' absolute top-2 right-2 px-2 py-1 rounded-full bg-primary text-xs text-primary_text hover:scale-95'
          onClick={handleAddressDelete(i)}
          ><h1>X</h1></button>
       <h1>{`${item.firstName} ${item.lastName}`}</h1>
       <p>{`${item.phone} `}</p>
       <p>{`${item.street} `}</p>
       <p>{` ${item.city} `}</p>
       <p>{` ${item.state} , ${item.country} `}</p>
       <p>{` ${item.zip}`}</p>
        </div>
       
      </div>)}
      
      </div>
      }
    </div>
   {(addAddress&&user.deliveryAddresses.length!=0)&&
   <button type='button' className='bg-primary_light text-primary_text py-2 px-3 rounded-lg border-black border-2 font-bold '
   onClick={e=>setAddAddress(false)}
   >New</button>}
   </div>
    </>
  )
}

export default AddressDetail