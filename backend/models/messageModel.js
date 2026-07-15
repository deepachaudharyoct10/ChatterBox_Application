import mongoose from "mongoose";
const messageModel = new mongoose.Schema({
    senderId: {
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    }
    , 
    receiverId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    message:{
        type: String,
        required: true
    },
    isHidden:{
        type: Boolean,
        default: false
    },
    category:{
        type: String,
    },
    revealed:{
        type: Boolean,
        default: false
    },
    attempts:{
        type: Number,
        default: 0
    }
},{timestamps: true});

export const Message  = mongoose.model("Message", messageModel)