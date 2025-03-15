const Joi = require('joi');

// Define the schema for the cart items
const cartSchema = Joi.object({
  productId: Joi.string().required().messages({
    'string.empty': 'Product ID cannot be empty',
    'any.required': 'Product ID is required',
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': 'Quantity must be a number',
    'number.min': 'Quantity must be at least 1',
    'any.required': 'Quantity is required',
  }),
});

module.exports = cartSchema;
