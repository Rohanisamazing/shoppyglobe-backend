const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

// Import the auth controller functions
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser); //  Added login route

module.exports = router;
