# ShoppyGlobe Backend

ShoppyGlobe is a backend project built with Node.js, Express.js, and MongoDB.

## 🚀 Features
- User Authentication (JWT-based)
- Product Management (CRUD)
- Cart Management (CRUD)
- Protected Routes

## 📥 Installation

- git clone https://github.com/YOUR-USERNAME/shoppyglobe-backend.git
- cd shoppyglobe-backend
- npm install
  
## Install Dependencies
- npm install react-router-dom redux react-redux @reduxjs/toolkit axios react-icons

## Install Redux Toolkit
- npm install @reduxjs/toolkit react-redux
- npm install express mongoose cors dotenv

## Nodemon → Automatically restarts the server on code changes
- npm install --save-dev nodemon

## Install express-validator:
- npm install express-validator

## Install Dependencies
- npm install bcryptjs jsonwebtoken
- bcryptjs → To hash passwords securely.
jsonwebtoken → To create and validate JWT tokens.

## TO RUN PROJECT 
- npx nodemon server.js

## How to Generate a JWT_SECRET
type in terminal 
- " node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
- Example Output:
  
1f3c8d5e8f15e4a67d5bfc5b91224c59d3d8ff3f2a5a6375f2b5fbd46e7e33e9

##  Add It to .env File
Open the .env file.
Replace your_jwt_secret with the generated key:

MONGO_URI=mongodb://127.0.0.1:27017/shoppyglobe
JWT_SECRET=1f3c8d5e8f15e4a67d5bfc5b91224c59d3d8ff3f2a5a6375f2b5fbd46e7e33e9





