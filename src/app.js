'use strict';

const express = require('express');
const app = express();

app.set('view engine', 'jade');

app.use(require('./routes'));

app.use(express.static('../dist'));

app.get('/build', function (req, res) {
  res.sendFile( 'map-builder.html', {root: 'views/'});
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

