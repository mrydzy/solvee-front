require('./map-lib');
const $ = require('jquery');
const analytics = require('./../service/analytics').showMapAnalytics;

$(function() {
  analytics();
});

