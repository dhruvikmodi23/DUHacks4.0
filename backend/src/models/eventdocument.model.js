import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const eventdocumentSchema = new Schema(
    {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Ngo",
            
        },
        volunteerId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
        
    },
    {
        timestamps: true
    }
)




export const Eventdocument = mongoose.model('Eventdocument',eventdocumentSchema)