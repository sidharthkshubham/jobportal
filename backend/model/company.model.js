import mongoose, { mongo } from "mongoose";
const companyschema=new mongoose.Schema({
    name:{
        type:String,
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    website:{
        type:String,
        
    },
    location:{
        type:String,
        
    },
    logo:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    }
},{timestamps:true});
export const Company = mongoose.model("Company", companySchema);