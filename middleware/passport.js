// passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user'); // 

const secretKey = process.env.JWT_SECRET || 'secret-key';

// Local Strategy for user login
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, async (username, password, done) => {
 
}));

// JWT Strategy for token authentication
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
 
}));

module.exports = passport;
