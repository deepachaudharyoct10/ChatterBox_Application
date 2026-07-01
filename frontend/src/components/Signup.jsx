import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Signup = () => {

  const [user, setUser]= useState({
    fullName: "",
    username:"",
    password:"",
    confirmPassword:"",
    gender:"",
  })
  const navigate = useNavigate();
  const handleCheckbox = (gender)=>{
    setUser({...user, gender});
  }
  const onSubmitHandler = async (e)=>{
    e.preventDefault();
 
    try{
      const res= await axios.post(`http://localhost:8000/api/v1/user/register`,user,{
        headers:{
          'Content-type':'application/json'
        },
        withCredentials:true
      });
      if(res.data.success){
        navigate("/Login");
        toast.success(res.data.message);
      }

      console.log("resis",res);

    }catch(error){
      toast.error(error.response.data.message)
      console.log(error);
    }
    setUser({
      fullName: "",
    username:"",
    password:"",
    confirmPassword:"",
    gender:"",
    })
  }
  return (
    <div className="w-full max-w-sm mx-auto px-4 sm:px-0">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-primary tracking-wide">ChatterBox</h1>
        <p className="text-neutral/60 text-sm mt-1">Let's Chat</p>
      </div>
      <div className='w-full p-6 rounded-lg shadow-xl bg-base-100 border border-base-300'>
      <h1 className='text-3xl font-bold text-center text-neutral'>Signup</h1>

      <form action="" onSubmit={onSubmitHandler}>
        <div>
          <label className='label p-2'>
            <span className='text-base label-text text-neutral'>Full Name</span>
          </label>
          <input value={user.fullName} onChange={(e)=>setUser({...user,fullName:e.target.value})} className="w-full input input-bordered bg-base-200/50 h-10 rounded-md focus:outline-none focus:border-primary" type='text' placeholder='Full Name'></input>
        </div>

        <div>
          <label  className='label p-2'>
            <span className='text-base label-text text-neutral'>User Name</span>
          </label>
          <input value={user.username}   onChange={(e)=>setUser({...user,username:e.target.value})}  className="w-full input input-bordered bg-base-200/50 h-10 rounded-md focus:outline-none focus:border-primary" type='text' placeholder='User Name'></input>
        </div>


        <div>
          <label className='label p-2'>
            <span className='text-base label-text text-neutral'>Password</span>
          </label>
          <input value={user.password}  onChange={(e)=>setUser({...user,password:e.target.value})} className="w-full input input-bordered bg-base-200/50 h-10 rounded-md focus:outline-none focus:border-primary" type='password' placeholder='Password'></input>
        </div>

        <div>
          <label className='label p-2'>
            <span className='text-base label-text text-neutral'>Confirm Password</span>
          </label>
          <input value={user.confirmPassword}  onChange={(e)=>setUser({...user,confirmPassword:e.target.value})} className="w-full input input-bordered bg-base-200/50 h-10 rounded-md focus:outline-none focus:border-primary" type='password' placeholder='Confirm Password'></input>
        </div>
        <div className='flex flex-wrap items-center gap-4 my-4'>
         <div className='flex items-center text-neutral' >
         <p>Male</p>
          <input checked ={user.gender === "male" }onChange={()=>handleCheckbox("male")} type="checkbox" defaultChecked className="checkbox checkbox-primary mx-2" />
         </div>

         <div className='flex items-center text-neutral' >
          <p>Female</p>
          <input checked ={user.gender === "female" }onChange={()=>handleCheckbox("female")} value={user.gender}  type="checkbox" defaultChecked className="checkbox checkbox-primary mx-2" />
         </div>

         </div>

         <p className='text-center my-2 text-neutral'>Already Hava an Account? <Link  to="/Login" className="text-primary font-semibold">
      Login
      </Link> </p>

      <div>
        <button type='submit' className='btn btn-primary btn-block btn-sm mt-2 text-white hover:brightness-110 transition'>
          Signup
        </button>
      </div>
      </form>
      </div>

    </div>
  )
}
export default Signup
