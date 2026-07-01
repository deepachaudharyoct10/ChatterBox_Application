import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  const { selectedUser ,authUser} = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => dispatch(setSelectedUser(null));
  }, []);
  return (
    <>
      {selectedUser !== null ? (
        <div className="md:min-w-[550px] flex flex-col">
          <div className="flex gap-2 items-center bg-pink-400 text-black px-4 py-2 mb-2">
            <div className="avatar online">
              <div className="w-12 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="noImage"></img>
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex justify-between  gap-2 ">
                <p>{selectedUser?.fullName}</p>
              </div>
            </div>
          </div>
          <Messages></Messages>
          <SendInput></SendInput>
        </div>
      ) : (
        <div className="md:min-w-[550px] flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-white"> Welcome {authUser?.fullName}</h1>
           <h1 className="text-2xl  text-white"> ! Let's Start Conversation </h1>
        </div>
       
      )}
    </>
  );
};
export default MessageContainer;
