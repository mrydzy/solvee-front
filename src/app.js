'use strict';

const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
var cookieParser = require('cookie-parser');


const clientId = require('./client/service/constants').clientId;
const clientSecret = require('./client/service/constants').clientSecret;
passport.use(new FacebookStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: "http://www.localhost:3000/auth/facebook/callback",
    enableProof: true,
    profileFields: ['id', 'displayName', 'emails']
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, {id: profile.id, name: profile.displayName, email: profile.emails[0].value});
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

  app.set('views', path.join(`${__dirname}`, 'views'));
  app.set('view engine', 'jade');

  app.use(cookieParser('4l4m4'));

  app.use(session({ secret: '4l4m4', resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function(req, res, next) {
    res.locals.url = req.url;
    next();
  });

  // app.use(function(req, res, next) {
  //   console.log('-- session --');
  //   console.dir(req.session);
  //   console.log('-------------');
  //   console.log('-- cookies --');
  //   console.dir(req.cookies);
  //   console.log('-------------');
  //   console.log('-- signed cookies --');
  //   console.dir(req.signedCookies);
  //   console.log('-------------');
  //   next()
  // });

  app.use(express.static(cfg.DIR));

  app.use(require('./server/routes')(passport));

  return app;
}

module.exports = configure;
