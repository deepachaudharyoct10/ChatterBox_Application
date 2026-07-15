import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:"message",
    initialState:{
        messages: null,
    },
    reducers:{
        setMessages:(state,action)=>{
            state.messages = action.payload;
        },
        updateMessage:(state,action)=>{
            const updated = action.payload;
            state.messages = state.messages?.map((m) => m._id === updated._id ? { ...m, ...updated } : m);
        }
    }

})

export const {setMessages, updateMessage}= messageSlice.actions;

export default messageSlice.reducer;