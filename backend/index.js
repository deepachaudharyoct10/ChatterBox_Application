import express from "express";
import dotenv from "dotenv";   // import the env
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser"
import cors from "cors";
import messageRoute from "./routes/messageRoute.js"
dotenv.config({});    // call the env 
const app= express();
const PORT = process.env.PORT || 5000;
//middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOption={
    origin:'http://localhost:3000',
    credentials:true
};

app.use(cors(corsOption))
// routes 
//api will //https/localhost/api/v1/user/?
app.use("/api/v1/user",userRoute);
app.use("/api/v1/message",messageRoute)

app.listen(PORT , ()=>{
    connectDB();
    console.log(`Server is running at port ${PORT}`)
})
