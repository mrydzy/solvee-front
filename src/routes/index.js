/**
 * Created by mrydzy on 15/03/16.
 */
const express = require('express');
const router = express.Router();

router.use('/maps', require('./maps'));

router.use('/api/maps', require('./api'));

router.use('/auth', require('./auth'));

module.exports = router;