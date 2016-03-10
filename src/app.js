'use strict';

const express = require('express');
const app = express();

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

var mapInit = {
  title: "New Map",
  options: [{
  id: 1,
  text: "",
  children: []
}, {
  id: 2,
  text: "",
  children: []
}, {
  id: 3,
  text: "",
  children: []
}]}


app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('map', sampleJson);
});

app.get('/create', function (req, res) {
  res.render('map-builder', mapInit);
});

app.use(express.static('../dist'));


app.get('/test', function (req, res) {
  res.sendFile( 'jade-test.html', {root: '../dist'});
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

