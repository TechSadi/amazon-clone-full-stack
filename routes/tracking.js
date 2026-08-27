import express from 'express';
import { loadOrderTracking } from '../controllers/tracking.js'

const router = express.Router();

router.get('/:orderId/:productId', loadOrderTracking);

export default router;