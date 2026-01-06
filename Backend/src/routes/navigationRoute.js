import express from 'express'
import { addNav } from '../controllers/navigationController.js'
const router = express.Router()

router.post('/nav',addNav)

export default router