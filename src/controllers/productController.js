const Product = require('../models/productModel');

//     Fetch all products
//    GET /products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
};

//     Fetch single product by ID
//    GET /products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error });
  }
};

//     Create new product
//   POST /products
const createProduct = async (req, res) => {
  const { name, price, description, stockQuantity } = req.body;

  if (!name || !price || !description || !stockQuantity) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const product = await Product.create({
      name,
      price,
      description,
      stockQuantity
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error });
  }
};

//     Update product by ID
//    PUT /products/:id
const updateProduct = async (req, res) => {
  const { name, price, description, stockQuantity } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, stockQuantity },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error });
  }
};

//     Delete product by ID
//   DELETE /products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
