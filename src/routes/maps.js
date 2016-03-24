const express = require('express');
const router = express.Router();
const fetch = require('isomorphic-fetch');

module.exports = (passport) => {

  router.get('/show/:id', function(req, res) {
    const backendUrl = req.app.locals.settings.cfg.API_URI;

    var treeId = req.params.id;

    fetch(backendUrl + '/' + treeId)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(response) {
        console.log(response.data);
        res.render('map', JSON.parse(response.data));
      })
      .catch(e => res.send(e));

  });

  router.get('/build',
    require('connect-ensure-login').ensureLoggedIn(),
    (req, res) => {
      res.sendFile( 'map-builder.html', {root: req.app.locals.settings.cfg.DIR + '/views'});
    });

  router.get('/build/:id', function(req, res) {
    require('connect-ensure-login').ensureLoggedIn(),
      (req, res) => {
        res.sendFile( 'map-editor.html', {root: req.app.locals.settings.cfg.DIR + '/views'});
      };
  });

  return router;

};
