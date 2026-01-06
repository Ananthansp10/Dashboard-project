import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './src/config/databaseConfig.js'
import labelRouter from '../Backend/src/routes/labelRoute.js'
import navigationRouter from '../Backend/src/routes/navigationRoute.js'
import orderRouter from '../Backend/src/routes/orderRoute.js'

dotenv.config()

connectDb()

const app =express()
const port = process.env.PORT

app.use(express.json())

app.use('/api/label',labelRouter)
app.use('/api/navigation',navigationRouter)
app.use('/api/order',orderRouter)

app.listen(port,()=>{
    console.log("Server started on port : ", port)
})