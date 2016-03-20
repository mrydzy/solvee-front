const express = require('express');
const router = express.Router();
const fetch = require('isomorphic-fetch');

const backendUrl = "http://localhost:3300/trees";
const sampleJson = {
  title: "Some title",
  options: [{
    id: 1,
    text: "sialala czy nie sialala",
    children:
      [
        {
          id: 11,
          text: "pierwsze lewe pokolenie",
          children: [{
            id: 111,
            text: "Jak to zadziała",
            children: []
          }, {
            id: 112,
            text: "To będzie grubo",
            children: []
          }]
        }]
  }, {
    id: 2,
    text: "druga opcja",
    children: [ {
      id: 21,
      text: "pierwsze pokolenie",
      children: []
    }, {
      id: 22,
      text: "pierwsze pokolenie 1",
      children: [{
        id: 221,
        text: "drugie single",
        children: []
      }]
    }
      , {
        id: 23,
        text: "pierwsze pokolenie 2",
        children: []
      }
    ]
  },
    {
      id: 3,
      text: "nie puste",
      children: [
        {
          id: 31,
          text: "1puste123",
          children: []
        }
      ]
    }
  ]
}


router.get('/:id', function(req, res) {
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

module.exports = router;