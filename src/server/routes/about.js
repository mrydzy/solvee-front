const express = require('express');
const router = express.Router();

module.exports = (passport) => {

  router.get('/about', function(req, res) {
    res.render('about', {});
  });

  router.get('/privacy', function(req, res) {
    res.render('privacy-policy', {});
  });
  return router;

};
