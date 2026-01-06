import { ERROR_MESSAGE } from "../common/errorMessages.js"
import { STATUS_CODE } from "../common/statusCode.js"
import { SUCCESS_MESSAGE } from "../common/successMessage.js"
import { labelModel } from "../models/labelModel.js"

export const addLabel = async (req,res) => {
    try {
        const {label,title,usedIn} = req.body
        if(!label || !title || !usedIn){
            return res.status(STATUS_CODE.BAD_REQUEST).json({success:false,message:ERROR_MESSAGE.MISSING_FIELD})
        }
        await labelModel.create({
            label:label,
            title:title,
            usedIn:usedIn
        })
        return res.status(STATUS_CODE.SUCCESS).json({success:true,message:SUCCESS_MESSAGE.LABEL_ADDED})
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_ERROR).json({success:false,message:ERROR_MESSAGE.INTERNAL_ERROR})
    }
}