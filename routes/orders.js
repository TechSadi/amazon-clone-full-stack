import express from 'express'
import { loadOrders } from '../controllers/orders.js';

const router = express.Router();

router.get('/', loadOrders);

export default router
