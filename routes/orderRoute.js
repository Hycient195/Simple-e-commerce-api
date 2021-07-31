import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {addOrder, getOrders, getOrderById, deleteOrder} from '../controllers/orderController.js'

const router = express.Router()

router.route('/')
    .get(protect, getOrders)

router.route('/')
    .post(protect, addOrder)

router.route('/:id')
    .get(protect, getOrderById)
    .delete(protect, deleteOrder)

export default router