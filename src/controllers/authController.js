const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

//     Register a new user
//    POST /api/auth/register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log('Registering user:', { name, email, password }); // ✅ Debug log

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email); // ✅ Debug log
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({ name, email, password });

    console.log('User created:', user); //  Debug log

    res.status(201).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('Registration failed:', error); //  Show full error log
    res.status(500).json({ 
      success: false, 
      message: 'Registration failed', 
      error: error.message || error 
    });
  }
};

//     Login user & get token
//    POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Logging in user:', { email, password }); // Debug log

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      console.log('User logged in:', user); //  Debug log
      res.status(200).json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      console.log('Invalid email or password'); //  Debug log
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login failed:', error); // Show full error log
    res.status(500).json({ 
      success: false, 
      message: 'Login failed', 
      error: error.message || error 
    });
  }
};

//     Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

module.exports = { registerUser, loginUser };
