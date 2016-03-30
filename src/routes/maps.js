const express = require('express');
const router = express.Router();
const fetch = require('isomorphic-fetch');
const authUrl = require('../service/constants').authUrl;

module.exports = (passport) => {

  router.get('/', function(req, res) {
    res.sendFile( 'maps-browser.html', {root: req.app.get('cfg').DIR + '/views'});
  });


  router.get('/show/:id', function(req, res) {
    const backendUrl = req.app.locals.settings.cfg.API_URI;

    var treeId = req.params.id;

    fetch(backendUrl + '/' + treeId)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
          res.send(500);
        }
        return response.json();
      })
      .then(function(response) {
        res.render('map', { map: JSON.parse(response.data), name : response.name, id : response.id});
      })
      .catch(e => res.send(e));

  });

  router.get('/build',
    require('connect-ensure-login').ensureLoggedIn(authUrl),
    (req, res) => {
      res.sendFile( 'map-builder.html', {root: req.app.get('cfg').DIR + '/views'});
    });

  router.get('/build/:id',
    require('connect-ensure-login').ensureLoggedIn(authUrl),
      (req, res) => {
        res.sendFile( 'map-editor.html', {root: req.app.get('cfg').DIR + '/views'});
      }
  );

  return router;

};
