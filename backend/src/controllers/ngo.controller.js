import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {Ngo} from "../models/ngo.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"



export const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const ngo = await Ngo.findById(userId)
        const accessToken = ngo.generateAccessToken()
        const refreshToken = ngo.generateRefreshToken()

        ngo.refreshToken = refreshToken
        await ngo.save({validateBeforeSave:false})

        return {accessToken,refreshToken}


    } catch (error) {
        throw new ApiError(500,error+" : something went wrong while generating Access and Refresh tokens")
    }
} 


const registerNgo = asyncHandler( async (req, res) => {
    const {username, email, password, location, bio } = req.body
    console.log(req.body)
    console.log(email);
   
    

    if(
        [username,email,password,location, bio].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400,"all fields are requried")
    }
    
    const existedUser = await Ngo.findOne({
        $or: [{email},{username}]
    })

    if(existedUser){
        throw new ApiError(400,"user already exist")
    }
    console.log("errrrrrrorrrr!!!!!!");
    console.log(username);
    console.log(email);
    console.log(password);
    
    

    
    


    const ngo = await Ngo.create({
        username,
        email,
        password,
        location,
        bio,
       
    })

    if(!ngo){
        console.log("nothing ");
        
    }
    

    const createdNgo = await Ngo.findById(ngo._id).select(
        "-password -refreshToken"
    )

    if(!createdNgo){
        throw new ApiError(500,"something went wrong while registering ngo")
    }

    return res.status(200).json(
        new ApiResponse(200, createdNgo, "ngo registerd successfully")
    )
})

const loginNgo = asyncHandler( async(req, res) => {
    const {email, username, password} = req.body

    console.log(req.body);
    

    if(!(email || username)){
        throw new ApiError(400,"email or username is requried")
    }

    const ngo = await Ngo.findOne({
        $or: [{username},{email}]
    })

    if(!ngo){
        throw new ApiError(404,"ngo does not exist")
    }

    const isPasswordValid = await ngo.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401,"password incorrect")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(ngo._id)

    const loggedInNgo = await Ngo.findById(ngo._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    console.log(ngo);
    

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                ngo: loggedInNgo, accessToken, refreshToken
            },
            "ngo logged In successfully"
        )
    )
})


const logoutNgo = asyncHandler(async (req, res) => {

    await Ngo.findByIdAndUpdate(
        req.ngo._id,
        {
            $set:{
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(
                200,
                {},
                "ngo loged out"
            ))
})

const refreshAccessToken = asyncHandler(async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken

    if(!incomingRefreshToken){
        new ApiError(401,"unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const ngo = await Ngo.findById(decodedToken._id)
    
        if(!ngo){
            new ApiError(401,"Invalid Refresh Token")
        }
    
        if(incomingRefreshToken !== ngo?.refreshToken){
            new ApiError(401,"Refresh Token is expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(ngo._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {accessToken, newRefreshToken},
                "Access Token Refreshed "
            )
        )
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid Refresh Token")
    }
})

const changePassword = asyncHandler(async (req, res) => {
    const ngo = await Ngo.findById(req.ngo._id)
    const {password} = req.body
    ngo.password = password
    await ngo.save({validateBeforeSave:false})
    const changedNgo = await ngo.findById(req.ngo._id)
    res
    .status(200)
    .json(new ApiResponse(
        200,
        {
            password
        },
        "password changed"
    ))

})

const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.ngo,
        "User fetched successfully"
    ))
})

const updateAccountDetails = asyncHandler(async(req, res) => {
    const {username, email, location, bio} = req.body

    if (!username || !email || !location || !bio) {
        throw new ApiError(400, "All fields are required")
    }

    const ngo = await Ngo.findByIdAndUpdate(
        req.ngo?._id,
        {
            $set: {
                username,
                email: email,
                location,
                bio
            }
        },
        {new: true}
        
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, ngo, "Account details updated successfully"))
});

const viewProfile = asyncHandler(async(req, res) => {
    const {email, username} = req.body

    console.log(req.body);
    

    if(!(email || username)){
        throw new ApiError(400,"email or username is requried")
    }

    const ngo = await Ngo.findOne({
        $or: [{username},{email}]
    })

    if(!ngo){
        throw new ApiError(404,"ngo does not exist")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                ngo,
            },
            "ngo sent successfully"
        )
    )

})


// const forgotPassword = asyncHandler(async (req, res) => {
//     const {email, newPassword} = req.body

//     if(!email){
//         throw new ApiError(400,"email is requried")
//     }

//     const user = await User.findOne(email)

//     if(!user){
//         throw new ApiError(404,"user does not exist")
//     }

// })

export {
    registerNgo,
    loginNgo,
    logoutNgo,
    refreshAccessToken,
    changePassword,
    getCurrentUser,
    updateAccountDetails,
    viewProfile
}