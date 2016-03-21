const express = require('express');
const router = express.Router();
const fetch = require('isomorphic-fetch');

router.get('/:id', function(req, res) {
  const backendUrl = req.app.locals.settings.API_URI;

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
    });

});

router.get('/edit/:id', function(req, res) {
  const backendUrl = req.app.locals.settings.API_URI;
  
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
      res.sendFile( 'map-builder.html', {root: 'views/'});
      //res.render('map', JSON.parse(response.data));
    });

});

module.exports = router;
