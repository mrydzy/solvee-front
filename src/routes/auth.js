const express = require('express');
const router = express.Router();

const backendUrl = "http://localhost:3300";

module.exports = (passport) => {

  router.get('/login', function(req, res) {
    res.sendFile( 'login.html', {root: req.app.locals.settings.cfg.DIR + '/views'});
  });

  router.get('/facebook', passport.authenticate('facebook'));

  router.get('/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/maps/build',
      failureRedirect: '/auth/login'
    }));

  return router;
};