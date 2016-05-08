const express = require('express');
const router = express.Router();

module.exports = (passport) => {

  router.get('/about', function(req, res) {
    res.render('about', {});
  });

  return router;

};
