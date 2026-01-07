import { ERROR_MESSAGE } from "../common/errorMessages.js";
import { STATUS_CODE } from "../common/statusCode.js";
import { SUCCESS_MESSAGE } from "../common/successMessage.js";
import { labelModel } from "../models/labelModel.js";

export const getLabels = async (_req, res) => {
  try {
    const labels = await labelModel.find();
    return res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, labels });
  } catch (error) {
    console.error("getLabels error", error);
    return res
      .status(STATUS_CODE.INTERNAL_ERROR)
      .json({ success: false, message: ERROR_MESSAGE.INTERNAL_ERROR });
  }
};

export const addLabel = async (req, res) => {
  try {
    const { key, title, usedIn } = req.body;
    if (!key || !title || !Array.isArray(usedIn) || !usedIn.length) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ success: false, message: ERROR_MESSAGE.MISSING_FIELD });
    }

    const exists = await labelModel.findOne({ key });
    if (exists) {
      return res
        .status(STATUS_CODE.CONFLICT)
        .json({ success: false, message: ERROR_MESSAGE.LABEL_EXISTS });
    }

    await labelModel.create({ key, title, usedIn });
    return res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, message: SUCCESS_MESSAGE.LABEL_ADDED });
  } catch (error) {
    console.error("addLabel error", error);
    return res
      .status(STATUS_CODE.INTERNAL_ERROR)
      .json({ success: false, message: ERROR_MESSAGE.INTERNAL_ERROR });
  }
};

export const updateLabel = async (req, res) => {
  try {
    const { key, title, usedIn } = req.body;
    if (!key || !title) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ success: false, message: ERROR_MESSAGE.MISSING_FIELD });
    }

    const update = { title };
    if (Array.isArray(usedIn) && usedIn.length) {
      update.usedIn = usedIn;
    }

    const updated = await labelModel.findOneAndUpdate(
      { key },
      { $set: update },
      { new: true }
    );

    if (!updated) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ success: false, message: ERROR_MESSAGE.LABEL_NOT_FOUND });
    }

    return res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, message: SUCCESS_MESSAGE.LABEL_UPDATED, label: updated });
  } catch (error) {
    console.error("updateLabel error", error);
    return res
      .status(STATUS_CODE.INTERNAL_ERROR)
      .json({ success: false, message: ERROR_MESSAGE.INTERNAL_ERROR });
  }
};