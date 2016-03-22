const express = require('express');
const router = express.Router();
const fetch = require('isomorphic-fetch');

const backendUrl = "http://localhost:3300/trees";

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

module.exports = router;