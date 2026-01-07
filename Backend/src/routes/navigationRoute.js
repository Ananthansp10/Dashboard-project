import express from 'express'
import { addNav, getNav } from '../controllers/navigationController.js'
const router = express.Router()

router.post('/nav',addNav)
router.get('/nav',getNav)

export default router