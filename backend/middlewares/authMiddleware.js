import User from "../models/userModel.js";
import AsyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";
const authenticate=AsyncHandler(async(req,res,next)=>{
    let token;
    token=req.cookies.jwt
   
    if(token){
        try{
            let decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select("-password")
            next()
        }catch(err){
            res.status(401)
            throw new Error('Not authorized,token failed')
        }
    }else{
        res.status(401)
        throw new Error('Not authorized,no token')
    }
})
const authAdmin=AsyncHandler(async(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401).send('Not authorized as admin')
    }
})
export {authAdmin,authenticate}