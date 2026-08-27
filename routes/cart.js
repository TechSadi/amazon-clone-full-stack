import express from 'express';
import {
    addToCart,
    loadCart,
    updateQuantity,
    deleteCartItem
} from '../controllers/cart.js';

const router = express.Router();

router.get('/', loadCart);
router.post('/:productId', addToCart);
router.patch('/:productId', updateQuantity);
router.delete('/:productId', deleteCartItem);

export default router;