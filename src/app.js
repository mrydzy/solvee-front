'use strict';

const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const clientId = require('./service/constants').clientId;
const clientSecret = require('./service/constants').clientSecret;
passport.use(new FacebookStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: "http://www.localhost:3000/auth/facebook/callback",
    enableProof: true
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    done(null, {id: profile.id, name: profile.displayName});
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

function configure(cfg) {

  app.set('cfg', cfg);

  app.set('views', path.join(cfg.DIR, 'views'));
  app.set('view engine', 'jade');

  app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(require('./routes')(passport));

  app.use(express.static(cfg.DIR));

  return app;
}

module.exports = configure;
