// const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user'); 

const secretKey = process.env.JWT_SECRET || 'secret-key';

// Local Strategy for user login
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, async (username, password, done) => {
  try {
    // Find the user in your database based on the provided username
    const user = await User.findOne({ username });

    // If the user is not found or the password is incorrect, return false
    if (!user || !user.validPassword(password)) {
      return done(null, false, { message: 'Invalid username or password' });
    }

    // If the user and password are valid, return the user object
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
    // Find the user in your database based on the user ID in the JWT payload
    const user = await User.findById(payload.sub);

    // If the user is not found, return false
    if (!user) {
      return done(null, false);
    }

    // If the user is found, return the user object
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

module.exports = passport;
;
