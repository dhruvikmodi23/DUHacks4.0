import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const eventSchema = new Schema(
    {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Ngo",
            
        },
        status:{
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
        } // TODO: date
        
    },
    {
        timestamps: true
    }
)




export const Event = mongoose.model('Event',eventSchema)