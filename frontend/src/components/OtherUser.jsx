import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {setSelectedUser} from '../redux/userSlice'
import { clearUnreadMessages } from '../redux/notificationSlice'
import Avatar from './Avatar'
 const OtherUser = ({user}) => {
  const dispatch = useDispatch();
  const {selectedUser}= useSelector(store=>store.user);
  const unreadCount = useSelector(store=>store.notification.unreadMessages[user?._id]) || 0;
    const selectedUserHandler = (user)=>{
      // console.log(user);
      dispatch(setSelectedUser(user));
      dispatch(clearUnreadMessages(user._id));
    }
  return (
    <>
      <div onClick={()=>selectedUserHandler(user)} className={`${selectedUser?._id === user?._id ? 'bg-primary text-white' : 'hover:bg-primary/10 text-neutral'} flex gap-2 items-center rounded-md p-2 cursor-pointer transition-colors`}>
        <div className="avatar online relative">
          <Avatar name={user?.fullName} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-error text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              +{unreadCount}
            </span>
          )}
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between gap-2">
          <p className="truncate">{user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  )
}

export default OtherUser
