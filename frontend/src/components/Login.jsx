import React from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import toast from "react-hot-toast"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../redux/userSlice'
const Login = () => {

    const [user, setUser]= useState({
        username:"",
       password:"",
        
     
      })
      const dispatch = useDispatch()
      const navigate = useNavigate();
      const onSubmitHandler =async(e)=>{
        e.preventDefault();
        try{
            const res= await axios.post(`http://localhost:8000/api/v1/user/login`,user,{
              headers:{
                'Content-type':'application/json'
              },
              withCredentials:true
            });
         
              navigate("/");
             
              // console.log(res.data);
              dispatch(setAuthUser(res.data));
        
      
          }catch(error){
            toast.error(error.response.data.message)
            console.log(error);
          }
        setUser({
       username:"",
        password:"",

  
        })
      }
  return (
    <div className="w-full max-w-sm mx-auto px-4 sm:px-0">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-primary tracking-wide">ChatterBox</h1>
        <p className="text-neutral/60 text-sm mt-1">Let's Chat</p>
      </div>
      <div className='w-full p-6 rounded-lg shadow-xl bg-base-100 border border-base-300'>
      <h1 className='text-3xl font-bold text-center text-neutral'>Login</h1>

      <form action="" onSubmit={onSubmitHandler}>


        <div>
          <label className='label p-2'>
            <span className='text-base label-text text-neutral'>User Name</span>
          </label>
          <input value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} className="w-full input input-bordered bg-base-200/50 h-10 rounded-md focus:outline-none focus:border-primary" type='text' placeholder='User Name'></input>
        </div>


        <div>
          <label className='label p-2'>
            <span className='text-base label-text text-neutral'>Password</span>
          </label>
          <input value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} className="w-full input input-bordered bg-base-200/50 h-10 rounded-md focus:outline-none focus:border-primary" type='password' placeholder='Password'></input>
        </div>



         <p className='text-center my-2 text-neutral'>Don't Hava an Account? <Link  to="/register" className="text-primary font-semibold">
        Signup
      </Link> </p>

      <div>
        <button type="submit" className='btn btn-primary btn-block btn-sm mt-2 text-white hover:brightness-110 transition'>
          Login
        </button>
      </div>
      </form>
      </div>

    </div>
  )
}
export default Login
