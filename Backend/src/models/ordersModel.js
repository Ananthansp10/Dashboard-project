import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
    product:{
        type:String,
        required:true
    },
    revenue:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true
    }
})

export const ordersModel = mongoose.model("orders",ordersSchema)