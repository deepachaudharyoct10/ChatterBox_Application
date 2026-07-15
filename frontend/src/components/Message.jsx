import React ,{useEffect, useRef} from "react";
import { useSelector } from "react-redux";
import { BsIncognito } from "react-icons/bs";
import Avatar from "./Avatar";
import HiddenMessageCard from "./HiddenMessageCard";

const Message = ({message}) => {
  const scroll= useRef();
  const {authUser,selectedUser}= useSelector(store=>store.user);
  const isOwnMessage = message?.senderId === authUser?._id;
  const showGuessCard = message?.isHidden && !message?.revealed && !isOwnMessage;
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
      {showGuessCard ? (
        <HiddenMessageCard message={message} />
      ) : (
        <div className={`chat-bubble ${isOwnMessage ? 'chat-bubble-primary text-white' : 'bg-base-200 text-neutral'}`}>
          {message?.isHidden && (
            <span className="inline-flex items-center gap-1 text-xs opacity-70 mr-1">
              <BsIncognito />
            </span>
          )}
          {message?.message}
        </div>
      )}

    </div>
  );
};

export default Message;
