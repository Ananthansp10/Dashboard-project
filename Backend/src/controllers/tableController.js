import { ERROR_MESSAGE } from "../common/errorMessages.js";
import { STATUS_CODE } from "../common/statusCode.js";
import { SUCCESS_MESSAGE } from "../common/successMessage.js";
import { tableDataModel } from "../models/tableDataModel.js";

export const getTableData = async (req, res) => {
  try {
    const { tableName } = req.params;
    const table = await tableDataModel.findOne({ tableName });
    if (!table) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ success: false, message: ERROR_MESSAGE.TABLE_NOT_FOUND });
    }
    return res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, table });
  } catch (error) {
    console.error("getTableData error", error);
    return res
      .status(STATUS_CODE.INTERNAL_ERROR)
      .json({ success: false, message: ERROR_MESSAGE.INTERNAL_ERROR });
  }
};

export const addTable = async (req, res) => {
  try {
    const { tableName, columns, rows } = req.body;
    if (!tableName || !Array.isArray(columns) || !columns.length || !Array.isArray(rows)) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ success: false, message: ERROR_MESSAGE.MISSING_FIELD });
    }

    const exists = await tableDataModel.findOne({ tableName });
    if (exists) {
      return res
        .status(STATUS_CODE.CONFLICT)
        .json({ success: false, message: ERROR_MESSAGE.TABLE_EXISTS });
    }

    const table = await tableDataModel.create({ tableName, columns, rows });
    return res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, message: SUCCESS_MESSAGE.TABLE_CREATED, table });
  } catch (error) {
    console.error("addTable error", error);
    return res
      .status(STATUS_CODE.INTERNAL_ERROR)
      .json({ success: false, message: ERROR_MESSAGE.INTERNAL_ERROR });
  }
};

export const updateTableData = async (req, res) => {
  try {
    const { tableName, rows } = req.body;
    if (!tableName || !Array.isArray(rows)) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ success: false, message: ERROR_MESSAGE.MISSING_FIELD });
    }

    const updated = await tableDataModel.findOneAndUpdate(
      { tableName },
      { rows },
      { new: true }
    );

    if (!updated) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ success: false, message: ERROR_MESSAGE.TABLE_NOT_FOUND });
    }

    return res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, message: SUCCESS_MESSAGE.TABLE_UPDATED, table: updated });
  } catch (error) {
    console.error("updateTableData error", error);
    return res
      .status(STATUS_CODE.INTERNAL_ERROR)
      .json({ success: false, message: ERROR_MESSAGE.INTERNAL_ERROR });
  }
};
