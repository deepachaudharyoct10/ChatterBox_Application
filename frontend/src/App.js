import "./App.css";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client"
import { setSocket } from "./redux/socketSlice";
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
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(authUser){
      const newSocket= io('http://localhost:8000',{
        query : {
          userId: authUser._id
        }
      });
      dispatch(setSocket(newSocket));
      return ()=> newSocket.close();
    } else if(socket){
      socket.close();
      dispatch(setSocket(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[authUser]);
  return (
    <div className="p-0 sm:p-4 h-screen w-full flex items-center justify-center">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
