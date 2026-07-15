import { Conversation } from "../models/conversationModel.js";
import  {Message} from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { MESSAGE_CATEGORIES, MAX_GUESS_ATTEMPTS, buildGuessOptions } from "../utils/messageCategories.js";

// strips the real text/category from a hidden, unrevealed message when the
// viewer is the receiver, so the answer never reaches their network tab
const maskMessageForViewer = (messageDoc, viewerId) => {
    const message = messageDoc.toObject ? messageDoc.toObject() : messageDoc;
    const isReceiver = String(message.receiverId) === String(viewerId);

    if (message.isHidden && !message.revealed && isReceiver) {
        return {
            ...message,
            message: null,
            category: null,
            options: buildGuessOptions(message.category),
        };
    }
    return message;
};

export const sendMessage = async(req , res)=>{
    try{
        const senderId= req.id;
        const receiverId= req.params.id;
        const {message, isHidden, category} = req.body;

        if(isHidden && !MESSAGE_CATEGORIES.includes(category)){
            return res.status(400).json({message:"Invalid category for hidden message"});
        }

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
            isHidden: !!isHidden,
            category: isHidden ? category : undefined,
        });


        if(newMessage){
            gotConversation.messages.push(newMessage._id);
        };

        await gotConversation.save();

        // emit the new message to the receiver in real time
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", maskMessageForViewer(newMessage, receiverId));
        }

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
        const otherUserId = req.params.id;
        const viewerId = req.id;
        const conversation = await Conversation.findOne({
            participants:{$all :[viewerId, otherUserId]}
        }).populate("messages");

        const messages = (conversation?.messages || []).map((m) => maskMessageForViewer(m, viewerId));

        return res.status(200).json(messages);
    }catch(error){
        console.log(error);
    }
}

// guess the category of a hidden message

export const guessMessage = async(req,res)=>{
    try{
        const viewerId = req.id;
        const { id: messageId } = req.params;
        const { category } = req.body;

        const message = await Message.findById(messageId);
        if(!message){
            return res.status(404).json({message:"Message not found"});
        }
        if(String(message.receiverId) !== String(viewerId)){
            return res.status(403).json({message:"Not allowed to guess this message"});
        }
        if(!message.isHidden || message.revealed){
            return res.status(400).json({message:"Message is not a pending hidden message"});
        }

        const isCorrect = message.category === category;
        const firstTry = message.attempts === 0;

        let autoRevealed = false;
        if(isCorrect){
            message.revealed = true;
        } else {
            message.attempts += 1;
            autoRevealed = message.attempts >= MAX_GUESS_ATTEMPTS;
            if(autoRevealed){
                message.revealed = true;
            }
        }
        await message.save();

        // let the sender know about every guess attempt, right or wrong
        const senderSocketId = getReceiverSocketId(String(message.senderId));
        if(senderSocketId){
            io.to(senderSocketId).emit("hiddenMessageGuessed", {
                messageId: message._id,
                receiverId: message.receiverId,
                correct: isCorrect,
                firstTry,
                autoRevealed,
                attemptsLeft: Math.max(0, MAX_GUESS_ATTEMPTS - message.attempts),
            });
        }

        if(isCorrect){
            return res.status(200).json({
                correct: true,
                revealed: true,
                message: message.message,
                category: message.category,
            });
        }

        return res.status(200).json({
            correct: false,
            revealed: autoRevealed,
            autoRevealed,
            attemptsLeft: Math.max(0, MAX_GUESS_ATTEMPTS - message.attempts),
            message: autoRevealed ? message.message : undefined,
            category: autoRevealed ? message.category : undefined,
        });
    }catch(error){
        console.log(error);
    }
}