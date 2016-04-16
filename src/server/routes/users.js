const express = require('express');
const router = express.Router();
const fetch = require('isomorphic-fetch');
const authUrl = require('../../client/service/constants').authUrl;
const jwtSign = require('../authSign').sign;

module.exports = (passport) => {

  router.get('/', require('connect-ensure-login').ensureLoggedIn(authUrl),
    (req, res) => {
    var backendUrl = req.app.locals.settings.cfg.API_URI + "/users";

      fetch(backendUrl, {
        headers: {
          Authorization: `Bearer ${jwtSign(req.user)}`
        }
      })
      .then(function(response) {
        if (response.status >= 400) {
          res.status(500).send('Error response from the server');
          throw new Error("Bad response from server", response);
        }
        return response.json();
      })
      .then(function(response) {
        res.render('edit-user', { user: response, currentUser: req.user});
      })
      .catch(e => res.send(e));
  });


  return router;

};
