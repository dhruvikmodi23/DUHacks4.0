import { Ngo } from "../models/ngo.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"




export const verifyJWTNGO = asyncHandler(async (req, _, next) => { // "_" if req,res any of this is unused
    try {
        let token = req.cookies?.accessToken
        if(!token){
            token = req.headers.authorization?.split(" ")[1];
        }
        console.log(token);
        
    
        if(!token){
            throw new ApiError(401,"unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await Ngo.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            throw new ApiError(401,"Invalid Access Token")
        }
    
        req.ngo = user
        next()


    } catch (error) {
        throw new ApiError(401,error.message || "invalid access token message from catch block for ngo")
    }
})