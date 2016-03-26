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
    callMixPanel('remove-branch-on-creation', {
      'branch' : id
    });
  });

  $('.map-row').on('click', '.map-col', function (e) {
    var target = e.currentTarget.dataset.target;
    callAnalytics('map-create' , 'click', target);
    callMixPanel('click-on-creation', {
      'clicked-path' : target
    });
  });
  $('#map-form').on('submit', function () {
    callAnalytics('map-create' , 'submit');
    //mixpanel.track_forms("Create tree");
    callMixPanel('submit-on-save', {
    });
  });
}

function editMapAnalytics(mapId) {
  $(document).on( "remove-branch", function(event, mapId) {
    callAnalytics('map-editor' , 'remove-branch', mapId);
    callMixPanel('remove-branch-on-edit', {
      'map-id': mapId
    });
  });

  $('.map-row').on('click', '.map-col', function (e) {
    var target = e.currentTarget.dataset.target;
    callAnalytics('map-edit' , 'click', 'target');
    callMixPanel('click-on-edit', {
      'map-id': mapId,
      'branch' : target
    });
  });

  $('#map-form').on('submit', function () {
    callAnalytics('map-edit' , 'submit', 'map-' + mapId);
    callMixPanel('submit-on-edit', {
      'map-id': mapId
    });
    //mixpanel.track_forms("Edit tree", { 'map-id' : mapId});
  });
}

module.exports = {
  showMapAnalytics,
  createMapAnalytics,
  editMapAnalytics
};