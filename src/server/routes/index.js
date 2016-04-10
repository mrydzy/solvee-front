/**
 * Created by mrydzy on 15/03/16.
 */
const express = require('express');
const router = express.Router();


module.exports = (passport) => {
  router.use('/maps', require('./maps')(passport));
  router.use('/auth', require('./auth')(passport));

  return router;
};