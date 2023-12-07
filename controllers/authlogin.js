// controllers/authlogin.js
const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Generate a signed JWT token
      const token = jwt.sign({ id: user._id, username: user.username }, 'your-secret-key');

      return res.json({ token });
    });
  })(req, res, next);
};
