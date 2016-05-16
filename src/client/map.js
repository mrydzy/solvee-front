require('./map-lib');
require('iframe-resizer').iframeResizerContentWindow;


const $ = require('jquery');
const analytics = require('./service/tracking').showMapAnalytics;
const deleteTree = require('./service/map-service').deleteTree;
const confirm = require('./service/dialogs').confirm;
const alert = require('./service/dialogs').alert;
const publish = require('./service/map-service').publishTree;
const resultModal = require('./service/dialogs').mapResult;

$(function() {
  var path = window.location.pathname;
  path = path.substring(path.lastIndexOf('/'));
  var id = parseInt(path.substring(1));
  analytics(id);

  

  $('.only-child').click((e) => {
    const result = $(e.currentTarget).clone();
    result.removeClass('map-col');
    resultModal(result);
  });

  $('#delete-map').click(() => {
    confirm('Are you sure you want to delete this tree?')
      .then(() => deleteTree(id))
      .then(() => window.location.href = '/');
  });

  $('#embed').click(() => {
    $('.embed-code').toggleClass('active');
  });

  $('#publish-map').click(() => {
    publish(id).then(() => {
      alert('Map was published!');
    }).then(() => {
      location.reload();
    });
  });

  $('.embed-code textarea').focus(e => {
    e.currentTarget.select();
  });
});

