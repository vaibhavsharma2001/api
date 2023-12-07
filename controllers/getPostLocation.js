

exports.getPostLocation = async (req, res) => {
    const { latitude, longitude } = req.params;
  
    try {
      // Assuming you have a field named geoLocation in your Post model
      const posts = await Post.find({
        geoLocation: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(longitude), parseFloat(latitude)],
            },
            $maxDistance: 10000, // Specify the maximum distance in meters as per your requirement
          },
        },
      });
  
      res.json(posts);
    } catch (error) {
      console.error('Error retrieving posts by location:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };