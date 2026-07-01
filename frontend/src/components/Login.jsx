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
    <div className="w-96 mx-auto">
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
      <h1 className='text-3xl font-bold text-center'>Login</h1>

      <form action="" onSubmit={onSubmitHandler}>
       

        <div>
          <label className='label p-2'>
            <span className='text-base label-text'>User Name</span>
          </label>
          <input value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} className="w-full input-bordered h-10 rounded-md" type='text' placeholder='User Name'></input>
        </div>


        <div>
          <label className='label p-2'>
            <span className='text-base label-text'>Password</span>
          </label>
          <input value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} className="w-full input-bordered h-10 rounded-md" type='password' placeholder='Password'></input>
        </div>

       
      
         <p className='text-center my-2'>Don't Hava an Account? <Link  to="/register">
        Signup
      </Link> </p>
      
      <div>
        <button type="submit" className='btn btn-block btn-sm mt-2 border border-slate-700'>
          Login
        </button>
      </div>
      </form>
      </div>
     
    </div>
  )
}
export default Login
