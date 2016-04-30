require('./map-lib');
require('iframe-resizer').iframeResizerContentWindow;


const $ = require('jquery');
const analytics = require('./service/tracking').showMapAnalytics;
const deleteTree = require('./service/map-service').deleteTree;
const confirm = require('./service/dialogs').confirm;

$(function() {
  var path = window.location.pathname;
  path = path.substring(path.lastIndexOf('/'));
  var id = parseInt(path.substring(1));
  analytics(id);
  $('#delete-map').click(() => {
    confirm('Are you sure you want to delete this tree?')
      .then(() => deleteTree(id))
      .done(() => window.location.href = '/maps/list');
  });

  $('#embed').click(() => {
    $('.embed-code').toggleClass('active');
  });

  $('.embed-code textarea').focus(e => {
    e.currentTarget.select();
  });
});

