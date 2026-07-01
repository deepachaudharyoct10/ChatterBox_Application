import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice.js'
import messageReducer from './messageSlice.js'
import socketReducer from './socketSlice.js'
import notificationReducer from './notificationSlice.js'

const store = configureStore({
    reducer:{
        user:userReducer,
        message: messageReducer,
        socket: socketReducer,
        notification: notificationReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export default  store;