import express from 'express'
import {
    loadCheckout,
    updateQuantity,
    deleteCartItem,
    updateDeliveryOption,
    placeOrder
} from '../controllers/checkout.js'

const router = express.Router();

router.get('/', loadCheckout);
router.post('/place-order', placeOrder);
router.patch('/:productId/delivery-option', updateDeliveryOption);
router.patch('/:productId', updateQuantity);
router.delete('/:productId', deleteCartItem);

export default router;