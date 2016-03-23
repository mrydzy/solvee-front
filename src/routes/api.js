const express = require('express');
const router = express.Router();
const fetch = require('isomorphic-fetch');

const backendUrl = "http://localhost:3300";

//router.get('/:id', function(req, res) {
//  var treeId = req.params.id;
//  fetch(backendUrl + '/' + treeId)
//    .then(function(response) {
//      if (response.status >= 400) {
//        throw new Error("Bad response from server");
//      }
//      return response.json();
//    })
//    .then(function(response) {
//      console.log(response.data);
//      res.send(JSON.parse(response.data));
//    });
//
//});


router.get('/login', function(req, res) {
  res.sendFile( 'login.html', {root: req.app.locals.settings.cfg.DIR + '/views'});

});

router.get('/auth', function(req, res) {
  //res.send("xXXXX");
  console.log('authenticate');
  fetch(backendUrl + '/login/facebook' )
    .then(function(response) {
      console.log('resp', response);
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(response) {
      console.log(response.data);
      res.send("xXXXX");
    });

});

module.exports = router;