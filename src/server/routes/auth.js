const express = require('express');
const router = express.Router();
const sign = require('../authSign').sign;

module.exports = (passport) => {

  router.get('/login', function(req, res) {
    res.render( 'auth/login', {root: req.app.locals.settings.cfg.DIR + '/views/auth'});
  });

  router.get('/logout', function(req, res) {
    req.logOut();
    res.redirect('/maps/list');
  });

  router.get('/facebook', passport.authenticate('facebook', { scope: 'email'}));

  router.get('/success', function (req, res) {
    res.cookie('credentials', sign(req.user));
    res.render( 'auth/login-success', {root: req.app.locals.settings.cfg.DIR + '/views/auth'});
  });

  router.get('/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/auth/success',
      failureRedirect: '/auth/login?failed=true'
    }));

  return router;
};
