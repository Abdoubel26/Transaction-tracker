import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { displayAll, addItem, editItem, deleteItem } from '../controllers/transaction.controller.js'

const router = express.Router()

router.get('/', authMiddleware, displayAll)

router.post('/', addItem)

router.put('/:id', authMiddleware,  editItem)

router.delete('/:id', authMiddleware, deleteItem)

export default router;