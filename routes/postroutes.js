// routes/posts.js

const express = require('express');
const router = express.Router();
const createtController = require('../controllers/createPost');
const getController = require('../controllers/getPost');
const updatetController = require('../controllers/updatePost');
const deleteController = require('../controllers/deletePost');
const getlocationController = require('../controllers/getPostLocation');
const { body } = require('express-validator');
const passport = require('passport');

// Middleware to authenticate requests
const authenticate = passport.authenticate('jwt', { session: false });

// Route to create a new post
router.post('/posts', authenticate, [
  body('title').notEmpty().withMessage('Title is required'),
  body('body').notEmpty().withMessage('Body is required'),
  body('geoLocation').notEmpty().withMessage('Geo location is required'),
], controllers.createPost);

// Route to get a post by ID
router.get('/:postId', authenticate, controllers.getPost);
router.get

// Route to update a post by ID
router.put('/:postId', authenticate, [
  body('title').notEmpty().withMessage('Title is required'),
  body('body').notEmpty().withMessage('Body is required'),
], controllers.updatePost);

// Route to delete a post by ID
router.delete('/:postId', authenticate, controllers.deletePost);
//  route to retrieve posts based on latitude and longitude
router.get('/location/:latitude/:longitude', authenticate, [
    param('latitude').isFloat().withMessage('Latitude must be a valid number'),
    param('longitude').isFloat().withMessage('Longitude must be a valid number'),
  ], postController.getPostsByLocation);
  
module.exports = router;

