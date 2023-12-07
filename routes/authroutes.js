// routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authlogin');
const authController = require('../controllers/authregister');

// Route for user registration
router.post('/register', [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ], authController.register);

// Route for user login
router.post('/login', controllers.authlogin);

module.exports = router;
