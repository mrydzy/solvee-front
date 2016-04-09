const express = require('express');
const router = express.Router();
const fetch = require('isomorphic-fetch');
const authUrl = require('../client/service/constants').authUrl;

module.exports = (passport) => {

  router.get('/list/:lang?', function(req, res) {
    const backendSuffix = req.params.lang ? '/'+ encodeURIComponent(req.params.lang) + '/lang' : '';
    var backendUrl = req.app.locals.settings.cfg.API_URI + "/trees" + backendSuffix;
    fetch(backendUrl)
      .then(function(response) {
        if (response.status >= 400) {
          res.status(500).send('Error - check the requested language');
          throw new Error("Bad response from server", response);
        }
        return response.json();
      })
      .then(function(response) {
        res.render('list-maps', { mapList: response, lang: req.params.lang});
      })
      .catch(e => res.send(e));
  });

  router.get('/show/:id', function(req, res) {
    const backendUrl = req.app.locals.settings.cfg.API_URI + "/trees";

    var treeId = req.params.id;

    fetch(backendUrl + '/' + treeId)
      .then(function(response) {
        if (response.status >= 400) {
          res.status(500).send('Unexpected Error');
          throw new Error("Bad response from server", response);
        }
        return response.json();
      })
      .then(function(response) {
        console.log(response);
        res.render('map', { map: JSON.parse(response.data), name : response.name, id : response.id, username: response.User.name});
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
