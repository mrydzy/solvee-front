require('../scss/main.scss');
const $ = require('jquery');
const log = require('./services').log;

var mapContainer;
var rowIdRegex;
const nodePrefix = 'node-';
var currentPath;

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
    currentPath = target;
    // $.scrollTo($('#map-bottom'), 500, {offset: (-($(window).height() - 100))});
  });
  $('.map-col').on('mouseenter', highlightPath);
  $('.map-col').on('mouseleave', clearHighlightPath);

}

var activeNodeTracker = [];
var activeLineTracker = [];
var highlightedLineTracker = [];

function removeDeactivationClass(path, index) {
  $('#node-' + path.substring(0, index)).siblings().removeClass('not-selected');
  if (index + 1 < path.length) {
    removeDeactivationClass(path, index + 1);
  }
}

function removeDeactivationFromNodes(oldPath, newPath) {
  var i = 0;
  while ((i < oldPath.length) && (i < newPath.length) && (oldPath.charAt(i) == newPath.charAt(i))) {
    i++;
  }
  if (i < oldPath.length) {
    removeDeactivationClass(oldPath, i + 1);
  }
}

function handleNodes(target) {
  if (currentPath) {
    removeDeactivationFromNodes(currentPath, target);
  }
  currentPath = target;
  removeActiveNodes(); //możliwa optymalizacja - nie czyscic wspolnego drzewa użyć podciągu znalezionego dla siblingsów
  markActivePath(target);
}

function highlightPath(e) {
  var target = e.currentTarget.dataset.target;
  addActiveToLine(target, '-active-highlight', highlightedLineTracker);
}

function clearHighlightPath() {
  for (var i = 0; i < highlightedLineTracker.length; i++ ) {
    $(highlightedLineTracker[i].id).removeClass(highlightedLineTracker[i].activeClass);
  }
  highlightedLineTracker = [];
}

function markActivePath(target) {
  var node = getNode(target);
  addActiveToNode(node, '#' + nodePrefix + target);
  addActiveToLine(target, '-active', activeLineTracker);
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

function markLineActive(id, activeClass, tracker) {
  $(id).addClass(activeClass);
  tracker.push({id: id, activeClass: activeClass});
}

function markSingleLine(currentChoice, rowId, suffix, tracker) {
  switch(currentChoice) {
    case 1:
      markLineActive(bottomLinePrefix + rowId + '-left', 'left' + suffix, tracker);
      markLineActive(topLinePrefix + rowId + '-left', 'left' + suffix, tracker);
      break;
    case 2:
      markLineActive(topLinePrefix + rowId + '-left', 'right' + suffix, tracker);
      markLineActive(bottomLinePrefix + rowId + '-left', 'right' + suffix, tracker);
      break;
    case 3:
      markLineActive(topLinePrefix + rowId + '-right', 'right' + suffix, tracker);
      markLineActive(bottomLinePrefix + rowId + '-right', 'right' + suffix, tracker);
  }
}

function addLinesNotDirectActive(previousChoice, rowId, currentChoice, suffix, tracker) {
  switch (previousChoice) {
    case 1 :
      markLineActive(topLinePrefix + rowId + '-left', 'left' + suffix, tracker);
      if (currentChoice == 2) {
        markLineActive(bottomLinePrefix + rowId + '-left', 'top' + suffix + ' right' + suffix, tracker);
      }
      if (currentChoice == 3) {
        markLineActive(bottomLinePrefix + rowId + '-left', 'top' + suffix, tracker);
        markLineActive(bottomLinePrefix + rowId + '-right', 'top' + suffix + ' right' + suffix, tracker);
      }
      break;
    case 2:
      markLineActive(topLinePrefix + rowId + '-left', 'right' + suffix, tracker);
      if (currentChoice == 1) {
        markLineActive(bottomLinePrefix + rowId + '-left', 'top' + suffix + ' left' + suffix, tracker);
      }
      if (currentChoice == 3) {
        markLineActive(bottomLinePrefix + rowId + '-right', 'top' + suffix + ' right' + suffix, tracker);
      }
      break;
    case 3:
      markLineActive(topLinePrefix + rowId + '-right', 'right' + suffix, tracker);
      if (currentChoice == 1) {
        markLineActive(bottomLinePrefix + rowId + '-left', 'top' + suffix + ' left' + suffix, tracker);
        markLineActive(bottomLinePrefix + rowId + '-right', 'top' + suffix, tracker);
      }
      if (currentChoice == 2) {
        markLineActive(bottomLinePrefix + rowId + '-right', 'top' + suffix, tracker);
        markLineActive(bottomLinePrefix + rowId + '-left', 'right' + suffix, tracker);
      }
      break;
  }
}

function addActiveToLine(path, suffix, tracker) {
  if (path > 3) { //at least second level
    var currentChoice = path % 10;
    var rowId = Math.floor(path / 10);
    var previousChoice = rowId % 10;

    if (previousChoice == currentChoice) {
      markSingleLine(currentChoice, rowId, suffix, tracker);
    } else {
      addLinesNotDirectActive(previousChoice, rowId, currentChoice, suffix, tracker);
    }
  }
}

function removeActiveNodes() {
  for (var i = 0; i < activeNodeTracker.length; i++ ) {
    $(activeNodeTracker[i]).removeClass('active');
  }
  activeNodeTracker = [];
  for (var i = 0; i < activeLineTracker.length; i++ ) {
    $(activeLineTracker[i].id).removeClass(activeLineTracker[i].activeClass);
  }
  activeLineTracker = [];
}

function addActiveToNode(node, nodeId) {
  node.addClass('active');
  node.siblings().addClass('not-selected');
  activeNodeTracker.push(nodeId);
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
