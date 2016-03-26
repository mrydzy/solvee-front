const initMap = require('./create-map-logic').initMap;
const getClearTree = require('./create-map-logic').getCleanTree;
const sendTree = require('./map-service').sendTree;
const analytics = require('./../service/analytics').createMapAnalytics;
const $ = require('jquery');

var emptyMapJson = {
  title: "",
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

function submitTree() {
  var tree = {name: 'some Name', data: JSON.stringify(getClearTree())};
  sendTree(tree);
}

$(function() {
  $('#save-tree-button').click(submitTree);
  initMap(emptyMapJson);
  analytics();
});