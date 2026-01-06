import { ERROR_MESSAGE } from "../common/errorMessages.js"
import { STATUS_CODE } from "../common/statusCode.js"
import { SUCCESS_MESSAGE } from "../common/successMessage.js"
import { ordersModel } from "../models/ordersModel.js"

export const createOrder = async (req,res) => {
    try {
        const {product,revenue,date} = req.body
        if(!product || !revenue || !date){
            return res.status(STATUS_CODE.BAD_REQUEST).json({success:false,message:ERROR_MESSAGE.MISSING_FIELD})
        }
        await ordersModel.create({
            product:product,
            revenue:revenue,
            date:date
        })
        res.status(STATUS_CODE.SUCCESS).json({success:true,message:SUCCESS_MESSAGE.ORDER_CREATED})
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_ERROR).json({success:false,message:ERROR_MESSAGE.INTERNAL_ERROR})
    }
}