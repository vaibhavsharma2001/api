const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user'); // Replace with the correct path to your User model
const bcrypt = require('bcrypt');

const secretKey = process.env.JWT_SECRET || 'secret-key';

// Local Strategy for user login
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, async (username, password, done) => {
  try {
    // Find the user by username in your database
    const user = await User.findOne({ username });

    // If the user is not found or the password is incorrect
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: 'Incorrect username or password' });
    }

    // If the username and password are correct, return the user
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// JWT Strategy for token authentication
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    // Find the user by ID in your database
    const user = await User.findById(payload.sub);

    // If the user is not found
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    // If the user is found, return the user
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

module.exports = passport;
