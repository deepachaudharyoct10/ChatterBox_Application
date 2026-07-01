import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { addUnreadMessage, updateLastMessageTime } from "../redux/notificationSlice";

const useGetRealTimeMessage = () => {
    const { socket } = useSelector(store => store.socket);
    const { messages } = useSelector(store => store.message);
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            if (newMessage.senderId === selectedUser?._id) {
                dispatch(setMessages(messages ? [...messages, newMessage] : [newMessage]));
            } else {
                dispatch(addUnreadMessage(newMessage.senderId));
            }
            dispatch(updateLastMessageTime({ userId: newMessage.senderId, timestamp: Date.now() }));
        };

        socket.on("newMessage", handleNewMessage);

        return () => socket.off("newMessage", handleNewMessage);
    }, [socket, messages, selectedUser, dispatch]);
};

export default useGetRealTimeMessage;
