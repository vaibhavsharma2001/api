// controllers/delete.js
exports.deletePost = async (req, res) => {
    const postId = req.params.postId;
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Check if the user is the creator of the post
      if (post.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized to delete this post' });
      }
  
      await post.remove();
  
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  