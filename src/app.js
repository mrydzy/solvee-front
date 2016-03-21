'use strict';

const express = require('express');
const path = require('path');
const app = express();

function configure(cfg) {
  app.set('cfg', cfg);

  app.set('views', path.join(cfg.DIR, 'views'));
  app.set('view engine', 'jade');

  app.use(require('./routes'));

  app.use(express.static(cfg.DIR));

  app.get('/build', function (req, res) {
    res.sendFile( 'map-builder.html', {root: cfg.DIR + '/views'});
  });
  return app;
}

module.exports = configure;
