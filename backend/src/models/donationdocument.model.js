import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const donationdocumentSchema = new Schema(
    {
        donorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
            
        },
        ngoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Ngo",
            required: true,
            
        },
        donationreqId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Donationreq",
            //required: true,
            
        },
        status:{
            type: String, 
            //required: true
        },
        quantity: {
            type: String,
            //required: true 
        },
        category: { 
            type: String, 
            //required: true 
        },
        title:{
            type: String, 
        },
        desc:{
            type: String, 
        }
        
    },
    {
        timestamps: true
    }
)


// userSchema.pre("save",async function (next) {
//     if(!this.isModified("password")){
//         return next()
//     }
//     this.password = await bcrypt.hash(this.password, 10)
//     next()
// })

// userSchema.methods.isPasswordCorrect = async function(password){
//    return await bcrypt.compare(password,this.password)
// }

// userSchema.methods.generateAccessToken = function(){
//     return jwt.sign({
//         _id: this._id,
//         email: this.email,
//         username: this.username,
//         fullname: this.fullname
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//         expiresIn:process.env.ACCESS_TOKEN_EXPIRY
//     }
// )
// }
// userSchema.methods.generateRefreshToken = function(){
//     return jwt.sign({
//         _id: this._id,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//         expiresIn:process.env.REFRESH_TOKEN_EXPIRY
//     }
// )
// }

export const Donationdocument = mongoose.model('Donationdocument',donationdocumentSchema)