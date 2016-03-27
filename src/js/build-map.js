const initMap = require('./create-map-logic').initMap;
const getClearTree = require('./create-map-logic').getCleanTree;
const sendTree = require('./map-service').sendTree;
const validateTree = require('./map-service').validateTree;
const analytics = require('./../service/tracking').createMapAnalytics;
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
  var title = $('#map-title').val();
  sendTree(getClearTree(), title);
}

$(function() {
  $('#map-title').val('');
  $('#map-form').on('submit', submitTree);
  initMap(emptyMapJson);
  $(document).on('map-ready', analytics);
});