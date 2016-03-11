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
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('map', sampleJson);
});

app.use(express.static('../dist'));

app.get('/build', function (req, res) {
  res.sendFile( 'map-builder.html', {root: 'views/'});
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

