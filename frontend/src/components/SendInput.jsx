import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import axios from "axios"
import {useDispatch, useSelector} from 'react-redux'
import { setMessages } from '../redux/messageSlice';
const SendInput = () => {
 
  const [message, setMessage] = useState("")
  const dispatch = useDispatch();
  
  const {selectedUser}= useSelector(store=>store.user);
  const {messages} = useSelector(store=>store.message)
  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    try{
      const res= await axios.post(`http://localhost:8000/api/v1/message/send/${selectedUser?._id}` ,{ message}, 
        {
        headers:{'content_Type':'application/json'}
      ,
      withCredentials: true
        }
  );
      console.log(res);
      dispatch(setMessages([...messages, res?.data?.newMessage]));
    }catch(error){
    console.log(error);
    }
    setMessage("");
  }
  return (
    <form onSubmit ={onSubmitHandler} className='px-4 my-3'>
        <div className='w-full relative'>
        <input value ={message} onChange={(e)=>setMessage(e.target.value)} className='border text-sm rounded-lg block w-full bg-pink-400  border-pink-500 text-black  p-3' type = 'text' placeholder='Send a Message..'>
        </input>
        <button type ="submit" className='absolute flex items-center inset-y-0 right-0 p-2'>
        <IoSend />
        </button>
        </div>
    </form>
  )
}

export default SendInput