require('./map-lib');
require('iframe-resizer').iframeResizerContentWindow;
const $ = require('jquery');
const analytics = require('./service/tracking').showMapAnalytics;
const deleteTree = require('./service/map-service').deleteTree;

$(function() {
  var path = window.location.pathname;
  path = path.substring(path.lastIndexOf('/'));
  var id = parseInt(path.substring(1));
  analytics(id);
  $('#delete-map').on("click", function() {
    deleteTree(id);
  });
  $('#embed').click(() => {
    $('.embed-code').toggleClass('active');
  });
  $('.embed-code textarea').focus(e => {
    e.currentTarget.select();
    $('.embed-tooltip').addClass('active');
  })
});

