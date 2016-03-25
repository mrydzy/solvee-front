const express = require('express');
const router = express.Router();
const sign = require('../service/authJWT').sign;

const backendUrl = "http://localhost:3300";

module.exports = (passport) => {

  router.get('/login', function(req, res) {
    res.sendFile( 'login.html', {root: req.app.locals.settings.cfg.DIR + '/views/auth'});
  });

  router.get('/facebook', passport.authenticate('facebook'));

  router.get('/success', function (req, res) {
    res.cookie('credentials', sign(req.user));
    res.sendFile( 'login-success.html', {root: req.app.locals.settings.cfg.DIR + '/views/auth'});
  });

  router.get('/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/auth/success',
      failureRedirect: '/auth/login'
    }));

  return router;
};