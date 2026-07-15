import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { BsIncognito } from "react-icons/bs";
import axios from "axios"
import toast from 'react-hot-toast'
import {useDispatch, useSelector} from 'react-redux'
import { setMessages } from '../redux/messageSlice';
import { updateLastMessageTime } from '../redux/notificationSlice';
import { BASE_URL } from '../utils/constants';
import { MESSAGE_CATEGORIES } from '../utils/messageCategories';
const SendInput = () => {

  const [message, setMessage] = useState("")
  const [isHidden, setIsHidden] = useState(false)
  const [category, setCategory] = useState("")
  const dispatch = useDispatch();

  const {selectedUser}= useSelector(store=>store.user);
  const {messages} = useSelector(store=>store.message)
  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    if(isHidden && !category){
      toast.error("Pick a category for the hidden message");
      return;
    }
    try{
      const res= await axios.post(`${BASE_URL}/api/v1/message/send/${selectedUser?._id}` ,{ message, isHidden, category},
        {
        headers:{'content_Type':'application/json'}
      ,
      withCredentials: true
        }
  );
      console.log(res);
      dispatch(setMessages([...messages, res?.data?.newMessage]));
      dispatch(updateLastMessageTime({ userId: selectedUser?._id, timestamp: Date.now() }));
    }catch(error){
    console.log(error);
    }
    setMessage("");
    setIsHidden(false);
    setCategory("");
  }
  return (
    <form onSubmit ={onSubmitHandler} className='px-4 my-3'>
        {isHidden && (
          <div className='flex items-center gap-2 mb-2'>
            <select
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              className='select select-bordered select-sm bg-base-100 flex-1'
            >
              <option value="" disabled>Choose a category...</option>
              {MESSAGE_CATEGORIES.map((c)=>(
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        )}
        <div className='w-full relative'>
        <input value ={message} onChange={(e)=>setMessage(e.target.value)} className='border text-sm rounded-lg block w-full bg-base-100 border-base-300 text-neutral p-3 pr-16 focus:outline-none focus:border-primary' type = 'text' placeholder={isHidden ? 'Type your hidden message..' : 'Send a Message..'}>
        </input>
        <button
          type="button"
          title="Send Hidden Message"
          onClick={()=>setIsHidden((prev)=>!prev)}
          className={`absolute flex items-center inset-y-0 right-8 p-2 ${isHidden ? 'text-primary' : 'text-neutral/50'}`}
        >
          <BsIncognito />
        </button>
        <button type ="submit" className='absolute flex items-center inset-y-0 right-0 p-2 text-primary'>
        <IoSend />
        </button>
        </div>
    </form>
  )
}

export default SendInput