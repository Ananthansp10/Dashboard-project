import { ERROR_MESSAGE } from "../common/errorMessages.js"
import { STATUS_CODE } from "../common/statusCode.js"
import { SUCCESS_MESSAGE } from "../common/successMessage.js"
import { navigationModel } from "../models/navigationModel.js"

export const addNav = async (req,res) => {
    try {
        const {nav,title} = req.body
        if(!nav || !title){
            return res.status(STATUS_CODE.BAD_REQUEST).json({success:false,message:ERROR_MESSAGE.MISSING_FIELD})
        }
        await navigationModel.create({
            nav:nav,
            title:title
        })
        res.status(STATUS_CODE.SUCCESS).json({success:true,message:SUCCESS_MESSAGE.NAV_ADDED})
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_ERROR).json({success:false,message:ERROR_MESSAGE.INTERNAL_ERROR})
    }
}

export const getNav = async (req,res) => {
    try {
        const nav = await navigationModel.find()
        res.status(STATUS_CODE.SUCCESS).json({success:true,nav})
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_ERROR).json({success:false,message:ERROR_MESSAGE.INTERNAL_ERROR})
    }
}