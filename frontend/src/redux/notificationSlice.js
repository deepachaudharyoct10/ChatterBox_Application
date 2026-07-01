import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        unreadMessages: {},
        lastMessageAt: {},
    },
    reducers: {
        addUnreadMessage: (state, action) => {
            const senderId = action.payload;
            state.unreadMessages[senderId] = (state.unreadMessages[senderId] || 0) + 1;
        },
        clearUnreadMessages: (state, action) => {
            delete state.unreadMessages[action.payload];
        },
        updateLastMessageTime: (state, action) => {
            const { userId, timestamp } = action.payload;
            state.lastMessageAt[userId] = timestamp;
        },
    },
});

export const { addUnreadMessage, clearUnreadMessages, updateLastMessageTime } = notificationSlice.actions;

export default notificationSlice.reducer;
