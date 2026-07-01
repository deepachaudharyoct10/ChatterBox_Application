import "./App.css";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client"
const router = createBrowserRouter([
  {
    path: "/",
    element:<HomePage></HomePage>
  },

  {
    path: "/register",
    element:<Signup></Signup>
  },

  {
    path: "/login",
    element:<Login></Login>
  },
])


function App() {
  const {authUser}=  useSelector(store=>store.user);
  const [socket, setSocket]= useState(null);
  useEffect(()=>{
    if(authUser){
      const socket= io('http://localhost:3000',{
        query : {
          userId: authUser._id
        }
      });
      setSocket(socket);
    }
  },[authUser]);
  return (
    <div className="p-4 h-screen
     flex items-center justify-center">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
