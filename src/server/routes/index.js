/**
 * Created by mrydzy on 15/03/16.
 */
const express = require('express');
const router = express.Router();


module.exports = (passport) => {
  router.use('/', require('./maps')(passport));
  router.use('/auth', require('./auth')(passport));
  router.use('/users', require('./users')(passport));

  return router;
};