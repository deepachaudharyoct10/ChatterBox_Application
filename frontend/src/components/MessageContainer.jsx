import React, { useEffect } from "react";
import { BiArrowBack, BiMessageRoundedDots } from "react-icons/bi";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import Avatar from "./Avatar";

const MessageContainer = () => {
  const { selectedUser ,authUser} = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => dispatch(setSelectedUser(null));
  }, [dispatch]);
  return (
    <>
      {selectedUser !== null ? (
        <div className="flex-1 min-w-0 flex flex-col bg-base-100">
          <div className="flex gap-2 items-center bg-primary text-white px-4 py-2 mb-2">
            <button className="sm:hidden btn btn-ghost btn-sm text-white" onClick={() => dispatch(setSelectedUser(null))}>
              <BiArrowBack className="w-5 h-5" />
            </button>
            <div className="avatar online">
              <Avatar name={selectedUser?.fullName} />
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
        <div className="hidden sm:flex flex-1 min-w-0 flex-col justify-center items-center bg-base-100 gap-3">
          <BiMessageRoundedDots className="w-16 h-16 text-primary" />
          <h1 className="text-4xl font-bold text-neutral text-center px-4">Welcome, {authUser?.fullName}</h1>
          <p className="text-2xl text-neutral/60 text-center px-4">Let's Chat! Pick someone to start a conversation.</p>
        </div>

      )}
    </>
  );
};
export default MessageContainer;
