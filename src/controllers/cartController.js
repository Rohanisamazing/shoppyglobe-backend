const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

//     Add product to cart
//    POST /cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ success: false, message: 'Product ID and quantity are required' });
  }

  try {
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if product is already in cart
    const existingCartItem = await Cart.findOne({ productId });
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.status(200).json({ success: true, data: existingCartItem });
    }

    // Add new item to cart
    const newCartItem = await Cart.create({
      productId,
      quantity
    });

    res.status(201).json({ success: true, data: newCartItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add product to cart', error: error.message });
  }
};

//     Get all cart items
//    GET /cart
const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate('productId', 'name price'); //  Populate productName and price
    res.status(200).json({ success: true, data: cartItems });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch cart items', error: error.message });
  }
};

//     Update cart item quantity
//   PUT /cart/:id
const updateCartItem = async (req, res) => {
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ success: false, message: 'Quantity must be greater than 0' });
  }

  try {
    // Find and update the cart item
    const cartItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true, runValidators: true }
    );

    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    res.status(200).json({ success: true, data: cartItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update cart item', error: error.message });
  }
};

//    Delete cart item
//    DELETE /cart/:id
const deleteCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    res.status(200).json({ success: true, message: 'Cart item removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to remove cart item', error: error.message });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem
};
