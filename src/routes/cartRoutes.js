const express = require('express');
const { body } = require('express-validator');
const {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem
} = require('../controllers/cartController');
const validate = require('../../middleware/validate');


const { protect } = require('../../middleware/authMiddleware');

const router = express.Router();

//  Protect the route but keep existing validation
router.post(
  '/',
  protect,
  [
    body('productId').notEmpty().withMessage('Product ID is required'),
    body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be greater than zero')
  ],
  validate,
  addToCart
);

router.get('/', protect, getCartItems);

router.put(
  '/:id',
  protect,
  [
    body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be greater than zero')
  ],
  validate,
  updateCartItem
);

router.delete('/:id', protect, deleteCartItem);

module.exports = router;
