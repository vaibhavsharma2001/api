// controllers/create.js
const Post = require('../models/post');

exports.createPost = async (req, res) => {
  const { title, body, geoLocation } = req.body;

  try {
    // Assuming user ID is available in req.user.id after authentication
    const createdBy = req.user.id;

    const newPost = new Post({ title, body, createdBy, geoLocation });
    await newPost.save();

    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
