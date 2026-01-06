import express from 'express'
import { addLabel } from '../controllers/labelController.js'
const router = express.Router()

router.post('/label',addLabel)

export default router