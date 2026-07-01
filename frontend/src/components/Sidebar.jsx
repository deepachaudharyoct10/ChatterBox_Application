import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setAuthUser, setOtherUsers } from "../redux/userSlice";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { otherUsers, selectedUser } = useSelector((store) => store.user);
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`, { withCredentials: true });
      dispatch(setAuthUser(null));
      navigate("/Login");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error("User not found");
    }
  };
  return (
    <div
      className={`${
        selectedUser ? "hidden sm:flex" : "flex"
      } w-full sm:w-72 shrink-0 border-r border-base-300 bg-base-200/60 p-4 flex-col`}
    >
      <h1 className="text-xl font-extrabold text-primary tracking-wide mb-3">ChatterBox</h1>
      <form
        onSubmit={searchSubmitHandler}
        action=""
        className="flex items-center gap-2"
      >
        <input
          val={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="input input-bordered bg-base-100 rounded-md w-full focus:outline-none"
          placeholder="Search...."
        ></input>
        <button type="submit" className="btn btn-primary text-white">
          <BiSearchAlt2 className="w-6 h-6 outline-none" />
        </button>
      </form>

      <div className="divider px-3"></div>

      <OtherUsers></OtherUsers>
      <div className="mt-2">
        <button onClick={logoutHandler} className="btn btn-sm btn-outline btn-neutral w-full sm:w-auto">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
