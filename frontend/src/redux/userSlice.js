import {createSlice} from "@reduxjs/toolkit";

const storedAuthUser = localStorage.getItem("authUser");

const userSlice = createSlice({
    name:"user",
    initialState:{
        authUser: storedAuthUser ? JSON.parse(storedAuthUser) : null,
        otherUsers: null,
        selectedUser:null,
    },
    reducers:{
        setAuthUser:(state, action)=>{
            state.authUser= action.payload;
            if(action.payload){
                localStorage.setItem("authUser", JSON.stringify(action.payload));
            } else {
                localStorage.removeItem("authUser");
            }
        },
        setOtherUsers:(state,action)=>{
            state.otherUsers= action.payload;
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser= action.payload;
        }
    }
});

export const {setOtherUsers, setAuthUser,setSelectedUser}= userSlice.actions;

export default userSlice.reducer;