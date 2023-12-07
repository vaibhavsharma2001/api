// controllers/dashboardController.js
const Post = require('../models/post');

exports.dashboardController = async (req, res) => {
  try {
    // Assuming user ID is available in req.user.id after authentication
    const userId = req.user.id;

    // Count active posts for the current user
    const activeCount = await Post.countDocuments({ createdBy: userId, active: true });

    // Count inactive posts for the current user
    const inactiveCount = await Post.countDocuments({ createdBy: userId, active: false });

    res.json({ activeCount, inactiveCount });
  } catch (error) {
    console.error('Error getting post count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
