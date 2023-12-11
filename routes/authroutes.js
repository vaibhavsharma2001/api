// routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const authlogs = require('../controllers/authlogin');
const authregs = require('../controllers/authregister');

// Route for user registration
router.post('/register', [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ], authregs.authregister);

// Route for user login
router.post('/login', authlogs.authlogin);

module.exports = router;
