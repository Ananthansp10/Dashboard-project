import mongoose from "mongoose";

const labelSchema = new mongoose.Schema({
    label:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    usedIn:[
        {
            type:String,
            required:true
        }
    ]
})

export const labelModel = mongoose.model("labels",labelSchema)