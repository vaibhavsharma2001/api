// controllers/get.js
exports.getPost = async (req, res) => {
    const postId = req.params.postId;
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.json(post);
    } catch (error) {
      console.error('Error retrieving post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  