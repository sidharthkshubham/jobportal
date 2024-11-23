import mongoose from "mongoose";
const userschema= new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:["student","recruiter"],
        required:true
    },
    profile:{
        bio:{type:String},
        skills:{type:String},
        resume:{type:String},
        resumeoriginalname:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId},
        profilephoto:{type:String,default:""}
    }
},{timestamps:true});
export const UserModel = mongoose.model('user', userschema);
