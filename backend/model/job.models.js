const mongoose = require("mongoose");
const jobschema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    reequirements:{
        type:String
    },
    salary:{
        type:Number,
        require:true
    },
    location:{
        type:String,
        required:true
    },
    jobtype:{
        type:String,
        required:true
    },
    position:{
        type:Number,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'company',
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        reequired:true
    },
    applications:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Application'
        }
    ]
},{timestamps:true});
export const jobModel = mongoose.model('job', jobschema);
