const initMap = require('./create-map-logic').initMap;
const getTree = require('./map-service').getTree;
const getClearTree = require('./create-map-logic').getCleanTree;
const populatePlaceholders = require('./create-map-logic').populatePlaceholders;
const updateTree = require('./map-service').updateTree;
const analytics = require('./../service/analytics').editMapAnalytics;

const $ = require('jquery');

$(function() {
  var path = window.location.pathname;
  path = path.substring(path.lastIndexOf('/'));
  var id = parseInt(path.substring(1));
  analytics(id);
  getTree(path, function(json) {
    var treeWithPlaceholders = populatePlaceholders(JSON.parse(json.data));
    initMap(treeWithPlaceholders);
  });

  function callUpdateTree() {
    var tree = {name: 'some Name', data: JSON.stringify(getClearTree())};
    updateTree(tree, id);
  }

  $('#save-tree-button').click(callUpdateTree);
});