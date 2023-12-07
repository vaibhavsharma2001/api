// controllers/update.js
exports.updatePost = async (req, res) => {
    const postId = req.params.postId;
    const { title, body } = req.body;
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Check if the user is the creator of the post
      if (post.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized ' });
      }
  
      post.title = title;
      post.body = body;
      await post.save();
  
      res.json({ message: 'Post updated successfully' });
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  };
  