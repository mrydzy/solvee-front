const initMap = require('./create-map-logic').initMap;
const getClearTree = require('./create-map-logic').getCleanTree;
const sendTree = require('./service/map-service').sendTree;
const validateTree = require('./service/map-service').validateTree;
const analytics = require('./service/tracking').createMapAnalytics;
const $ = require('jquery');

var emptyMapJson = {
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
  }]};

function submitTree(e) {
  e.preventDefault();
  console.log('submit!!!');
  var title = $('#map-title').val();
  var lang = $('[name="lang"]').val();
  sendTree(getClearTree(), title, lang);
}

$(function() {
  var $mapTitle = $('#map-title');
  if ($mapTitle.val()) {
    $mapTitle.val('');
  }
  $('#map-form').on('submit', submitTree);
  initMap(emptyMapJson);
  $(document).on('map-ready', analytics);
});
