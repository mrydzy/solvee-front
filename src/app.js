'use strict';

const express = require('express');
const app = express();

function configure(cfg) {
  app.set('cfg', cfg);

  app.set('views', cfg.DIR);
  app.set('view engine', 'jade');

  app.use(require('./routes'));

  app.use(express.static(cfg.DIR));

  app.get('/build', function (req, res) {
    res.sendFile( 'map-builder.html', {root: cfg.DIR + '/views'});
  });
  return app;
}

module.exports = configure;
