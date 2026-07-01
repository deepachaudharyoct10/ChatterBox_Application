import { Conversation } from "../models/conversationModel.js";
import  {Message} from "../models/messageModel.js";

export const sendMessage = async(req , res)=>{
    try{
        const senderId= req.id;
        const receiverId= req.params.id;
        const {message} = req.body;

        // find the participant for chatting

        let gotConversation = await Conversation.findOne({
            participants:{$all : [senderId, receiverId]},
        });

        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants:[senderId, receiverId]
            })
        };


        const newMessage = await Message.create({
            senderId, 
            receiverId,
            message,
        });


        if(newMessage){
            gotConversation.messages.push(newMessage._id);
        };

        await gotConversation.save();

        // soket IO;

        return res.status(201).json({
            newMessage
        })

    }catch(error){
        console.log(error);
    }
}


// get message 

export const getMessage = async(req,res)=>{
    try{
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants:{$all :[senderId, receiverId]}
        }).populate("messages");

        return res.status(200).json(conversation?.messages);

        console.log(conversation.messages)
    }catch(error){
        console.log(error);
    }
}