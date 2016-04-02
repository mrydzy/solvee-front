const express = require('express');
const router = express.Router();
const sign = require('../service/authSign').sign;

module.exports = (passport) => {

  router.get('/login', function(req, res) {
    res.sendFile( 'login.html', {root: req.app.locals.settings.cfg.DIR + '/views/auth'});
  });

  router.get('/facebook', passport.authenticate('facebook', { scope: 'email'}));

  router.get('/success', function (req, res) {
    console.log(req);
    res.cookie('credentials', sign(req.user));
    res.sendFile( 'login-success.html', {root: req.app.locals.settings.cfg.DIR + '/views/auth'});
  });

  router.get('/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/auth/success',
      failureRedirect: '/auth/login?failed=true'
    }));

  return router;
};