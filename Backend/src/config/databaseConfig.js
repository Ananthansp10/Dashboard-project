import mongoose from "mongoose";

export const connectDb = () => {
    try {
        const url = process.env.MONGO_URL
        mongoose.connect(url).then(()=>{
            console.log("Database connected successfully")
        }).catch((error)=>{
            console.log("Database not connected",error)
        })
    } catch (error) {
        console.log(error)
    }
}