import jwt from "jsonwebtoken"
const isAuthenticated = async(req,res,next)=>{
    try
    
    {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"User not authenticated"
        })
    };

    // verify token 
    const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY);
    console.log(decode);
    //if error in decode 
    if(!decode){
        return res.status(401).json({
            message:"Invalid token"
        })
    };

    //in decode string we get some data

    req.id=  decode.userId;
    // console.log(token);
    next();
    }catch(error){
        console.log(error);
    }
};

export default isAuthenticated;