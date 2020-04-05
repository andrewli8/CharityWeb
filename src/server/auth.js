const secrets = require('./secrets.json');
const passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: secrets.google-client-id,
    clientSecret: secrets.google-client-secret,
    callbackURL: "http://localhost:1919/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));