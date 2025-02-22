import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const ngoSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: false,
            trim: true,
            index: true
        },
        password:{
            type: String, //becrypt
            required: true
        },
        refreshToken:{
            type: String,
        },
        location:{
            type: String,
        },
        bio:{
            type: String,
        }
    },
    {
        timestamps: true
    }
)


ngoSchema.pre("save",async function (next) {
    if(!this.isModified("password")){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

ngoSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password)
}

ngoSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
ngoSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const Ngo = mongoose.model('Ngo',ngoSchema)