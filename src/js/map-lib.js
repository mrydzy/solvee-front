require('../scss/main.scss');
const $ = require('jquery');
const log = require('./services').log;

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
  //możliwa optymalizacja - znalezc wspolny podciag i nie czyscic wspolnego drzewa (czy to się opłaca?)
  removeActiveNodes();
  markActivePath(target);
}

function markActivePath(target) {
  var node = getNode(target);
  addActiveToNode(node, '#' + nodePrefix + target);
  addActiveToLine(target);
  target = Math.floor(target / 10);
  if (target > 0 ) {
    markActivePath(target);
  }
}

function getNode(path) {
  return $('#' + nodePrefix + path);
}

const bottomLinePrefix = '#bottom-';
const topLinePrefix = '#top-';

function markLineActive(id, activeClass) {
  log('adding to', id, ' class ', activeClass);
  $(id).addClass(activeClass);
  activeLine.push({id: id, activeClass: activeClass});
}

function markSingleLine(currentChoice, rowId) {
  switch(currentChoice) {
    case 1:
      markLineActive(bottomLinePrefix + rowId + '-left', 'left-active');
      markLineActive(topLinePrefix + rowId + '-left', 'left-active');
      break;
    case 2:
      markLineActive(topLinePrefix + rowId + '-left', 'right-active');
      markLineActive(bottomLinePrefix + rowId + '-left', 'right-active');
      break;
    case 3:
      markLineActive(topLinePrefix + rowId + '-right', 'right-active');
      markLineActive(bottomLinePrefix + rowId + '-right', 'right-active');
  }
}

function addLinesNotDirectActive(previousChoice, rowId, currentChoice) {
  switch (previousChoice) {
    case 1 :
      markLineActive(topLinePrefix + rowId + '-left', 'left-active');
      if (currentChoice == 2) {
        markLineActive(bottomLinePrefix + rowId + '-left', 'top-active right-active');
      }
      if (currentChoice == 3) {
        markLineActive(bottomLinePrefix + rowId + '-left', 'top-active');
        markLineActive(bottomLinePrefix + rowId + '-right', 'top-active right-active');
      }
      break;
    case 2:
      markLineActive(topLinePrefix + rowId + '-left', 'right-active');
      if (currentChoice == 1) {
        markLineActive(bottomLinePrefix + rowId + '-left', 'top-active left-active');
      }
      if (currentChoice == 3) {
        markLineActive(bottomLinePrefix + rowId + '-right', 'top-active right-active');
      }
      break;
    case 3:
      markLineActive(topLinePrefix + rowId + '-right', 'right-active');
      if (currentChoice == 1) {
        markLineActive(bottomLinePrefix + rowId + '-left', 'top-active left-active');
        markLineActive(bottomLinePrefix + rowId + '-right', 'top-active');
      }
      if (currentChoice == 2) {
        markLineActive(bottomLinePrefix + rowId + '-right', 'top-active');
        markLineActive(bottomLinePrefix + rowId + '-left', 'right-active');
      }
      break;
  }
}

function addActiveToLine(path) {
  if (path > 3) { //at least second level

    var currentChoice = path % 10;
    var rowId = Math.floor(path / 10);
    var previousChoice = rowId % 10;

    if (previousChoice == currentChoice) {
      markSingleLine(currentChoice, rowId);
    } else {
      addLinesNotDirectActive(previousChoice, rowId, currentChoice);
    }

  }
}

function removeActiveNodes() {
  for (var i = 0; i < activeNode.length; i++ ) {
    $(activeNode[i]).removeClass('active');
  }
  for (var i = 0; i < activeLine.length; i++ ) {
    $(activeLine[i].id).removeClass(activeLine[i].activeClass);
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
