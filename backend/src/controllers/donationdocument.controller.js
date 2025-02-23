import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {Donationdocument} from "../models/donationdocument.model.js"
import {Donationreq} from "../models/donationreq.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import mongoose from "mongoose"
//import { sendEmail } from "../utils/Nodemailer.js"
import { User } from "../models/user.model.js"

const applyToDonation = asyncHandler(async (req, res) => {

    const { donationreqId,quantity,category, title, desc, ngoId } = req.body
    console.log(donationreqId);
    console.log(req.body);

    console.log("chodu acting here" );
    console.log("firse chodu acting ");
    
    
    
    
    
    
    // if(!donationreqId){
    //     throw new ApiError(400, "donationreqId is required")
    // }

    const donationreq = await Donationreq.findById(donationreqId)

    // if(!donationreq){
    //     throw new ApiError(400,"donationreq not found")
    // }

    const existingApplication = await Donationdocument.findOne({
        donationreqId : donationreqId,
        donorId : req.user._id
    })

    // if(existingApplication){
    //     throw new ApiError(400,"already Donated to this post")
    // }

    const newApplication = await Donationdocument.create({
        donationreqId : donationreqId,
        donorId : req.user._id,
        quantity,
        category,
        title,
        desc,
        ngoId

    })

    const user = await User.findById(req.user._id);
    // if (!user) {
    //     return res.status(404).json({ success: false, message: "User not found" });
    // }

    // const emailSubject = `Applied to ${job.title}`;
    // const emailText =
    //    ` ${user.username} applied For ${job.title} 
    //    Location : ${job.location} 
    //    Type : ${job.type} 
    //    Overview : ${job.overview} 
    //    Responsibility : ${job.responsiblity} 
    //    Requirment : ${job.requirment} 
    //    SALARY : ${job.salary}`

    // await sendEmail(user.email, emailSubject, emailText);

    // console.log("email sent!");

    res
    .status(200)
    .json(new ApiResponse(200,newApplication,"Donated to post successfully"))

})

// const getApplicant = asyncHandler(async (req, res) => {

//     const { jobId } = req.body
//     console.log(req.body);
//     const JobId = jobId
    
//     const applicantForJobs = await Applications.aggregate([
//         {
//             $match : { job : new mongoose.Types.ObjectId(JobId)}
//         },
//         {   
//             $lookup : {
//                 from : "users",
//                 localField : "applicant",
//                 foreignField : "_id",
//                 as : "applicantDetails"
//             },
//         },
//         {
//             $unwind : "$applicantDetails"
//         },
//         {
//             $project:{
//                 _id : 1,
//                 "applicantDetails._id" : 1,
//                 "applicantDetails.username" : 1,
//                 "applicantDetails.email" : 1,
//                 "applicantDetails.fullname" : 1,
//                 "status" : 1,
//             },
//         },
//     ])
//     //console.log(applicantForJobs);
//     console.log("status ++"+applicantForJobs.status);
    

//     return res
//     .status(200)
//     .json(new ApiResponse(200, applicantForJobs, "Applicants Retrive Sucessfully"))
// })

// const getJob = asyncHandler(async (req, res) => {

//     const  userId  = req.user._id
    
//     const jobsOfApplicant = await Applications.aggregate([
//         {
//             $match : { applicant : new mongoose.Types.ObjectId(userId)}
//         },
//         {   
//             $lookup : {
//                 from : "jobs",
//                 localField : "job",
//                 foreignField : "_id",
//                 as : "jobDetails"
//             },
//         },
//         {
//             $unwind : "$jobDetails"
//         },
//         {
//             $project:{
//                 _id : 1, // id of document which stores in MongoDB with jobId and userId
//                 "jobDetails._id" : 1,
//                 "jobDetails.title" : 1,
//                 "jobDetails.location" : 1,
//                 "jobDetails.overview" : 1,
//                 "jobDetails.status" :1,
//                 status:1
//             },
//         },
//     ])
//     console.log(jobsOfApplicant);

//     return res
//     .status(200)
//     .json(new ApiResponse(200, jobsOfApplicant, "Jobs Retrive Sucessfully"))
// })

// const getJobPostedByRecruiter = asyncHandler(async (req, res) => {

//     const  userId  = req.user._id
    
//     const jobsPosted = await Applications.aggregate([
//         {
//             $match : { applicant : new mongoose.Types.ObjectId(userId)}
//         },
//         {   
//             $lookup : {
//                 from : "jobs",
//                 localField : "job",
//                 foreignField : "_id",
//                 as : "jobDetails"
//             },
//         },
//         {
//             $unwind : "$jobDetails"
//         },
//         {
//             $project:{
//                 _id : 1, // id of document which stores in MongoDB with jobId and userId
//                 "jobDetails._id" : 1,
//                 "jobDetails.title" : 1,
//                 "jobDetails.location" : 1,
//                 "jobDetails.overview" : 1,
//             },
//         },
//     ])
//     console.log(jobsOfApplicant);

//     return res
//     .status(200)
//     .json(new ApiResponse(200, jobsOfApplicant, "Jobs Retrive Sucessfully"))
// })

// const changeDonationState = asyncHandler(async(req, res) => {
//     const { jobId, userId, status } = req.body;
//     console.log(jobId, userId, status);
    

//     // Update the status in the database
//     const updatedApplication = await Applications.findOneAndUpdate(
//         { job: jobId, applicant: userId }, // Find the matching application
//         { $set: { status: status } }, // Update the status
//         { new: true } // Return the updated document
//     );

//     const user = await User.findById(userId);
//     if (!user) {
//         return res.status(404).json({ success: false, message: "User not found" });
//     }

//     const emailSubject = `Application ${status}`;
//     const emailText =
//         status === "Accepted"
//         ? `Congratulations! Your job application has been accepted.`
//         : `We regret to inform you that your job application has been rejected.`;

//     await sendEmail(user.email, emailSubject, emailText);

//     console.log("email sent!");
    

//     if (!updatedApplication) {
//         return res.status(404).json(new ApiResponse(404, null, "Application not found"));
//     }

//     return res
//         .status(200)
//         .json(new ApiResponse(200, updatedApplication, "Status updated successfully"));
// });



export {
    applyToDonation,
}

