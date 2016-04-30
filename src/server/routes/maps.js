const express = require('express');
const router = express.Router();
const fetch = require('isomorphic-fetch');
const authUrl = require('../../client/service/constants').authUrl;
const decodeUser = require('../authSign').readJWT;
const jwtSign = require('../authSign').sign;

module.exports = (passport) => {

  router.get('/users/:id', function(req, res) {
    var backendUrl = req.app.locals.settings.cfg.API_URI + "/users/" + req.params.id + '/trees';
    fetch(backendUrl)
      .then(function(response) {
        if (response.status >= 400) {
          res.status(500).send('Error - check the requested language');
          throw new Error("Bad response from server", response);
        }
        return response.json();
      })
      .then(function(response) {
        res.render('list-maps', { mapList: response, currentUser: req.user});
      })
      .catch(e => res.send(e));
  });

  router.get('/current',
    require('connect-ensure-login').ensureLoggedIn(authUrl),
      (req, res) => {
          var backendUrl = req.app.locals.settings.cfg.API_URI + "/trees/current";
          fetch(backendUrl, {
            headers: {
              Authorization: `Bearer ${jwtSign(req.user)}`
            }
          })
          .then(function(response) {
            if (response.status >= 400) {
              res.status(500).send('Error - please try again later');
              throw new Error("Bad response from server", response);
            }
            return response.json();
          })
          .then(function(response) {
            res.render('list-maps', { mapList: response, currentUser: req.user});
          })
          .catch(e => res.send(e));
  });

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
        res.render('list-maps', { mapList: response, lang: req.params.lang, currentUser: req.user});
      })
      .catch(e => res.send(e));
  });

  function isOwner(cookie, userFacebookId) {
    const credentialsIndex = cookie.indexOf('credentials');
    if (credentialsIndex > -1) {
      var credentials = cookie.substring((credentialsIndex + 12), cookie.indexOf(';', credentialsIndex));
      if (userFacebookId === decodeUser(credentials).facebookId) {
        return true;
      }
    }
    return false;
  }

  router.get('/show/:id', function(req, res) {
    const backendUrl = req.app.locals.settings.cfg.API_URI + "/trees";
    var treeId = req.params.id;

    fetch(backendUrl + '/' + treeId)
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server", response);
        }
        return response.json();
      })
      .then(function(response) {
        const parsedMap = JSON.parse(response.data);
        res.render('map', {
          map: parsedMap,
          name : response.name,
          id : response.id,
          username: response.User.name,
          isOwner: isOwner(req.headers.cookie, response.User.facebookId),
          userId: response.User.id,
          currentUser: req.user,
          mapCoverUrl: '//placekitten.com/800/600'
        });
      })
      .catch(e => res.json(e));

  });

  router.get('/build',
    require('connect-ensure-login').ensureLoggedIn(authUrl),
    (req, res) => {
      res.render( 'map-builder', {currentUser: req.user});
    });

  router.get('/build/:id',
    require('connect-ensure-login').ensureLoggedIn(authUrl),
      (req, res) => {
        res.render( 'map-editor', {currentUser: req.user});
      }
  );

  return router;

};
