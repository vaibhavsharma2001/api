// routes/dashboard.js
// dashboardRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Post = require('./post');

// Middleware to authenticate the user
const authenticateUser = passport.authenticate('jwt', { session: false });

// Show count of active and inactive posts
router.get('/dashboard', authenticateUser, async (req, res) => {
    const activeCount = await Post.countDocuments({ createdBy: req.user._id, active: true });
    const inactiveCount = await Post.countDocuments({ createdBy: req.user._id, active: false });
    res.json({ activeCount, inactiveCount });
});

module.exports = router;

module.exports = router;
