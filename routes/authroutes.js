// routes/auth.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const authloginControl= require('../controllers/authlogin');
const authRegisterControl= require('../controllers/authregister');
const bcrypt=require("bcrypt");
// Route for user registration
router.post('/register', [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ], authRegisterControl.register);

// Route for user login
router.post('/login',function(req, res){
  authloginControl.login
} );
// app.post('/user/all', function(req, res){
//   Controller.Create
// });
module.exports = router;
