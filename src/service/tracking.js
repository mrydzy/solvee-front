require('./../service/mixpanel');
require('./../service/analytics');
const $ = require('jquery');

function callAnalytics(category, action, label, value, fields) {
  if (ga) {
    ga('send', 'event', category, action, label, value, fields);
  }
}

function callMixPanel(eventName, options) {
  if (mixpanel) {
    mixpanel.track(
      eventName,
      options
    );
  }
}

function showMapAnalytics(mapId) {
  $('.map-row').on('click', '.map-col', function (e) {
    var target = e.currentTarget.dataset.target;
    callAnalytics('map-show' , 'click', 'target');
    callMixPanel('click', {
      'map-id':mapId,
      'clicked-path' : target
    });
  });
}

function createMapAnalytics() {
  $(document).on( "remove-branch", function(event, id) {
    callAnalytics('map-create' , 'remove-branch', id);
  });

  $('.map-row').on('click', '.map-col', function (e) {
    var target = e.currentTarget.dataset.target;
    callAnalytics('map-create' , 'click', 'target');
  });
  $('#save-tree-button').click(function () {
    callAnalytics('map-create' , 'submit');
  });
}

function editMapAnalytics(mapId) {
  $(document).on( "remove-branch", function(event, mapId) {
    callAnalytics('map-editor' , 'remove-branch', mapId);
  });

  $('.map-row').on('click', '.map-col', function (e) {
    var target = e.currentTarget.dataset.target;
    callAnalytics('map-edit' , 'click', 'target');
  });

  $('#save-tree-button').click(function () {
    callAnalytics('map-edit' , 'submit', 'map-' + mapId);
  });
}

module.exports = {
  showMapAnalytics,
  createMapAnalytics,
  editMapAnalytics
};