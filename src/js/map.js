require('./map-lib');
require('iframe-resizer').iframeResizerContentWindow
const $ = require('jquery');
const analytics = require('./../service/tracking').showMapAnalytics;


$(function() {
  var path = window.location.pathname;
  path = path.substring(path.lastIndexOf('/'));
  var id = parseInt(path.substring(1));
  analytics(id);
  $('#embed').click(function() {
    
  })
});

