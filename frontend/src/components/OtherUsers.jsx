import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = () => {
      useGetOtherUsers();
      const {otherUsers} = useSelector(store=>store.user)
      const {lastMessageAt} = useSelector(store=>store.notification)
      if(!otherUsers) return;

      const sortedUsers = [...otherUsers].sort((a, b) => {
        const timeA = lastMessageAt[a._id] || 0;
        const timeB = lastMessageAt[b._id] || 0;
        return timeB - timeA;
      });

  return (
    <div className="overflow-auto flex-1">
        {
            sortedUsers?.map((user)=>{
                return(
                    <OtherUser  key={user._id} user={user}></OtherUser>
                )
            })
        }

    </div>
  );
};

export default OtherUsers;
