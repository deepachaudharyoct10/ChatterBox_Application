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
    <div className="w-96 mx-auto">
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
      <h1 className='text-3xl font-bold text-center'>Signup</h1>

      <form action="" onSubmit={onSubmitHandler}>
        <div>
          <label className='label p-2'>
            <span className='text-base label-text'>Full Name</span>
          </label>
          <input value={user.fullName} onChange={(e)=>setUser({...user,fullName:e.target.value})} className="w-full input-bordered h-10 rounded-md" type='text' placeholder='Full Name'></input>
        </div>

        <div>
          <label  className='label p-2'>
            <span className='text-base label-text'>User Name</span>
          </label>
          <input value={user.username}   onChange={(e)=>setUser({...user,username:e.target.value})}  className="w-full input-bordered h-10 rounded-md" type='text' placeholder='User Name'></input>
        </div>


        <div>
          <label className='label p-2'>
            <span className='text-base label-text'>Password</span>
          </label>
          <input value={user.password}  onChange={(e)=>setUser({...user,password:e.target.value})} className="w-full input-bordered h-10 rounded-md" type='password' placeholder='Password'></input>
        </div>

        <div>
          <label className='label p-2'>
            <span className='text-base label-text'>Confirm Password</span>
          </label>
          <input value={user.confirmPassword}  onChange={(e)=>setUser({...user,confirmPassword:e.target.value})} className="w-full input-bordered h-10 rounded-md" type='password' placeholder='Confirm Password'></input>
        </div>
        <div className='flex items-center my-4'>
         <div className='flex items-center' >
         <p>Male</p>
          <input checked ={user.gender === "male" }onChange={()=>handleCheckbox("male")} type="checkbox" defaultChecked className="checkbox mx-2" />
         </div>

         <div className='flex items-center' >
          <p>Female</p>
          <input checked ={user.gender === "female" }onChange={()=>handleCheckbox("female")} value={user.gender}  type="checkbox" defaultChecked className="checkbox mx-2" />
         </div>
       
         </div>
      
         <p className='text-center my-2'>Already Hava an Account? <Link  to="/Login">
      Login
      </Link> </p>
      
      <div>
        <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>
          Signup 
        </button>
      </div>
      </form>
      </div>
     
    </div>
  )
}
export default Signup
