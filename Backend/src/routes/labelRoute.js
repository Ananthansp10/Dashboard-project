import express from "express";
import { addLabel, getLabels, updateLabel } from "../controllers/labelController.js";

const router = express.Router();

router.get("/", getLabels);
router.post("/add", addLabel);
router.put("/update", updateLabel);

export default router;