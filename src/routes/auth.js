const express = require('express');
const router = express.Router();
const clientId = require('../js/constants').clientId;
const clientSecret = require('../js/constants').clientSecret;

const backendUrl = "http://localhost:3300";

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: "http://www.localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, {id: profile.id, name: profile.displayName});
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


router.get('/login', function(req, res) {
  res.sendFile( 'login.html', {root: req.app.locals.settings.cfg.DIR + '/views'});
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/maps/build',
    failureRedirect: '/login' }));


module.exports = router;