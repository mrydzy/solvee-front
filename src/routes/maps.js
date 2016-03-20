const express = require('express');
var rest = require('restler');
const router = express.Router();

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
  rest.get(backendUrl + '/' + treeId).on('complete', function(result) {
    if (result instanceof Error) {
      console.log('Error:', result.message);
      this.retry(5000); // try again after 5 sec
    } else {
      console.log(result);
      res.render('map', JSON.parse(result.data));
    }
  });
});

module.exports = router;