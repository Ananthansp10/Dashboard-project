import mongoose from "mongoose";

const navigationSchema = new mongoose.Schema({
    nav:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    }
})

export const navigationModel = mongoose.model("navs",navigationSchema)