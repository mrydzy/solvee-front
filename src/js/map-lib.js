require('../scss/main.scss');
const $ = require('jquery');

var mapContainer;
var rowIdRegex;
const nodePrefix = 'node-';

$('document').ready(function() {
  mapContainer = $('.map-wrapper');
  rowIdRegex = /\d+/;

  initMapRows();
});

function initMapRows() {
  $('.map-row').on('click', '.map-col', function (e) {
    var target = e.currentTarget.dataset.target;
    handleNodes(target);
    mapContainer.addClass('stage-' + target);
    removeOldNodes(target);
    // $.scrollTo($('#map-bottom'), 500, {offset: (-($(window).height() - 100))});
  });
  //$('.map-col').on('hover', highlightPath)
}

var activeNode = [];
var activeLine = [];

function handleNodes(target) {
  //TODO: optymalizacja - znalezc wspolny podciag i nie czyscic wspolnego drzewa
  removeActiveNodes();
  markActivePath(target);
}

function markActivePath(target) {
  var node = getNode(target);
  var levelChildrenCount = node.data('siblings');
  addActiveToNode(node, '#' + nodePrefix + target);
  addActiveToLine(target, levelChildrenCount);
  target = Math.floor(target / 10);
  if (target > 0 ) {
    markActivePath(target);
  }
}

function getNode(path) {
  return $('#' + nodePrefix + path);
}

function markLinesForTwins(currentChoice, lineIdPrefix) {
  switch(currentChoice) {
    case 1:
      console.log('adding', lineIdPrefix + '-left');
      $(lineIdPrefix + '-left').addClass('left-active');
      break;
    case 2:
      console.log('adding', lineIdPrefix + '-right');
      $(lineIdPrefix + '-right').addClass('right-active');
  }
}

function markLinesForTriplets(currentChoice, lineIdPrefix) {
  switch(currentChoice) {
    case 1:
      console.log('adding', lineIdPrefix + '-left');
      $(lineIdPrefix + '-left').addClass('left-active');
      break;
    case 2:
      console.log('adding', lineIdPrefix + '-left');
      $(lineIdPrefix + '-left').addClass('right-active');
      break;
    case 3:
      console.log('adding', lineIdPrefix + '-right');
      $(lineIdPrefix + '-right').addClass('right-active');
  }
}

function addActiveToLine(path, levelChildrenCount) {
  if (path > 3) { //at least second level

    var currentChoice = path % 10;
    var lineIdPrefix = '#bottom-' + Math.floor(path / 10);
    //if it's a single kid it's handled by default

    if (levelChildrenCount == 2) {
      markLinesForTwins(currentChoice, lineIdPrefix);
    } else {
      markLinesForTriplets(currentChoice, lineIdPrefix);
    }
  }
}



function removeActiveNodes() {
  for (var i = 0; i < activeNode.length; i++ ) {
    $(activeNode[i]).removeClass('active');
  }
}

function addActiveToNode(node, nodeId) {
  node.addClass('active');
  activeNode.push(nodeId);
}

function removeOldNodes(target) {
  var classes = mapContainer[0].classList;
  var classesNumber = classes.length;
  for (var i = 0; i < classesNumber; i++) {
    if (isOldNode(classes[i], i, target)) {
      mapContainer.removeClass(classes[i]);
      classesNumber--;
      i--;
    }
  }
}

function isOldNode(currentClass, currentIteration, target) {
  var rowId = rowIdRegex.exec(currentClass);
  if (rowId !== null && target.substring(0, currentIteration) !== (rowId + "")) {
    return true;
  }
  return false;
}

module.exports = {
  initMapRows,
  isOldNode,
  removeOldNodes
};
