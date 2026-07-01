import React ,{useEffect, useRef} from "react";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";

const Message = ({message}) => {
  const scroll= useRef();
  const {authUser,selectedUser}= useSelector(store=>store.user);
  const isOwnMessage = message?.senderId === authUser?._id;
  useEffect(()=>{

    scroll.current?.scrollIntoView({behavior:"smooth"});
  },[message]);
  return (
    <div ref = {scroll} className={`chat ${isOwnMessage ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <Avatar name={isOwnMessage ? authUser?.fullName : selectedUser?.fullName} size="w-10 h-10" textSize="text-sm" />
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50 text-neutral">12:45</time>
      </div>
      <div className={`chat-bubble ${isOwnMessage ? 'chat-bubble-primary text-white' : 'bg-base-200 text-neutral'}`}>{message?.message}</div>
     
    </div>
  );
};

export default Message;
