import express from "express";
import {
  addTable,
  getTableData,
  updateTableData,
} from "../controllers/tableController.js";

const router = express.Router();

router.get("/:tableName", getTableData);
router.post("/add", addTable);
router.put("/update", updateTableData);

export default router;
