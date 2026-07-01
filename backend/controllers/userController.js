import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
export const register = async(req,res)=>{
    try{
        //fetch all the required element 
        const {fullName, username, password,confirmPassword, gender} = req.body;

        // if not present any field then give error
        if(!fullName || !username || !password || !confirmPassword || !gender){
            return res.status(400).json({message:"All fields are required"})
        }
        
        //hash the password  using bcryptjs beacause hacker get easily access the data when you give easy password 

        const hashedPassword = await bcrypt.hash(password,10);

        // if password dont match
        if(password !==  confirmPassword){
            return res.status(400).json({message:"Password are not matching"});
        }

        //check user already exits or not 
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({message:"User Already Exist , try new Id"});
        }

        // if user does not exist then create the user
        await User.create({
            fullName,
            username,
            password: hashedPassword,
            gender,

        })


        return res.status(200).json({
            message:"profile created successully",
            success: true,
        })

    }
    catch(error){
        console.log(error);
    }
}




// login  logic 

export const login = async(req, res)=>{

    try{
        const {username, password} = req.body;

        // can not login if any is empty
        if(!username || !password){
            return res.status(400).json({
                message:"All fields are requierd"
            });
        }

        // find username 
        const user = await User.findOne({username});

        // if user not found then return not found user 
        if(!user){
            return res.status(400).json({
                message:"Incorrect userame of password",
                success: false,
            })
        };

        //if user exits 

        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect userame of password",
                success: false,
            })
        }


        // if user exist then generate token 

        const tokenData = {
            userId: user._id
        };

        const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY, {expiresIn:'1d'});


        // store the token in cookies 
        return res.status(200).cookie("token",token ,{maxAge: 1*24*60*60*1000 ,httpOnly: true, sameSite:'strict'}).json({
            _id: user._id,
            username:user.username,
            fullName:user.fullName,
            profilePhoto:user.profilePhoto
        })
    }catch(error){
        console.log(error);
    }
}


//logout  logic

export const logout = (req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message: "Logout Successfully."
        })
    }catch(error){
        console.log(error);
    }
}



//how many user are also present 

export const getOtherUsers = async(req,res)=>{
    try{
        const loggedInUserId = req.id;

        const otherUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");

        return res.status(200).json(otherUsers)
    }catch(error){
        console.log(error);
    }
}