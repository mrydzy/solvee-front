const initMap = require('./create-map-logic').initMap;
const getTree = require('./map-service').getTree;
const getClearTree = require('./create-map-logic').getCleanTree;
const updateTree = require('./map-service').updateTree;
const $ = require('jquery');

$(function() {
  var path = window.location.pathname;
  path = path.substring(path.lastIndexOf('/'));
  var id = parseInt(path.substring(1));
  getTree(path, function(json) {
    initMap(JSON.parse(json.data));
  });

  function callUpdateTree() {
    var tree = {name: 'some Name', data: JSON.stringify(getClearTree())};
    updateTree(tree, id);
  }

  $('#save-tree-button').click(callUpdateTree);
});