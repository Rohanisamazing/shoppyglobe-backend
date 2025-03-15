const mongoose = require('mongoose'); 

// Define the schema for the cart items
const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
