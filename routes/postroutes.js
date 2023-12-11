// routes/posts.js

const express = require('express');
const router = express.Router();
const createController = require('../controllers/createPost');
const getController = require('../controllers/getPost');
const updateController = require('../controllers/updatePost');
const deleteController = require('../controllers/deletePost');
const getlocationController = require('../controllers/getPostLocation');
const { body } = require('express-validator');
const passport = require('passport');
const { param } = require('express-validator');

// Middleware to authenticate requests
const authenticate = passport.authenticate('jwt', { session: false });



// Route to create a new post
router.post('/posts', authenticate, [
  body('title').notEmpty().withMessage('Title is required'),
  body('body').notEmpty().withMessage('Body is required'),
  body('geoLocation').notEmpty().withMessage('Geo location is required'),
], (req, res) => createController.createPost(req, res));

// Route to get a post by ID
router.get('/:postId', authenticate, (req, res) => getController.getPost(req, res));

// Route to update a post by ID
router.put('/:postId', authenticate, [
  body('title').notEmpty().withMessage('Title is required'),
  body('body').notEmpty().withMessage('Body is required'),
], (req, res) => updateController.updatePost(req, res));

// Route to delete a post by ID
router.delete('/:postId', authenticate, (req, res) => deleteController.deletePost(req, res));

// Route to retrieve posts based on latitude and longitude
router.get('/location/:latitude/:longitude', authenticate, [
  param('latitude').isFloat().withMessage('Latitude must be a valid number'),
  param('longitude').isFloat().withMessage('Longitude must be a valid number'),
], (req, res) => getlocationController.getPostsByLocation(req, res));

// Additional routes go here if needed

module.exports = router;


// Route to create a new post
// router.post('/posts', authenticate, [
//   body('title').notEmpty().withMessage('Title is required'),
//   body('body').notEmpty().withMessage('Body is required'),
//   body('geoLocation').notEmpty().withMessage('Geo location is required'),
// ], createController.createPost);

// // Route to get a post by ID
// router.get('/:postId', authenticate, getController.getPost);
// router.get

// // Route to update a post by ID
// router.put('/:postId', authenticate, [
//   body('title').notEmpty().withMessage('Title is required'),
//   body('body').notEmpty().withMessage('Body is required'),
// ], updateController.updatePost);

// // Route to delete a post by ID
// router.delete('/:postId', authenticate, deleteController.deletePost);
// //  route to retrieve posts based on latitude and longitude
// router.get('/location/:latitude/:longitude', authenticate, [
//     param('latitude').isFloat().withMessage('Latitude must be a valid number'),
//     param('longitude').isFloat().withMessage('Longitude must be a valid number'),
//   ], getlocationController .getPostsByLocation);
  

