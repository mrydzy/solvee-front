'use strict';

const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const cookieParser = require('cookie-parser');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

const clientId = require('./client/service/constants').clientId;
const clientSecret = require('./client/service/constants').clientSecret;

function getSessionOptions() {
  const sessionOptionsDefaults = {
    secret: process.env.SESSION_SECRET,
    resave: true,
    cookie: {
      maxAge: process.env.SESSION_MAX_AGE
    },
    rolling: true,
    name: 'SolveeFront'
  };

  if (process.env.REDIS_URL) {
    const redisClient = redis.createClient({url: process.env.REDIS_URL});
    return Object.assign(sessionOptionsDefaults, {
      store: new RedisStore({
        client: redisClient,
        ttl: sessionOptionsDefaults.cookie.maxAge
      })
    });
  } else { // Use file store on local environment
    console.log('WARNING: No REDIS_URL env var found. Using file session storage.');
    const FileStore = require('session-file-store')(session);
    return Object.assign(sessionOptionsDefaults, {
      store: new FileStore({
        path: '/tmp/sessions',
        ttl: sessionOptionsDefaults.cookie.maxAge
      })
    });
  }
}


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

  app.use(cookieParser(process.env.SESSION_SECRET));

  app.use(session(getSessionOptions()));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function(req, res, next) {
    res.locals.url = req.url;
    next();
  });

  app.use(express.static(cfg.DIR));

  app.use(require('./server/routes')(passport));

  return app;
}

module.exports = configure;
