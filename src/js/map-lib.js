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
  $('.map-col').on('hover', highlightPath)
}

var active = [];

function handleNodes(target) {
  //TODO: ptymalizacja - znalezc wspolny podciag i nie czyscic wspolnego drzewa
  removeActiveNodes();
  markActiveNodes(target);
}

function markActiveNodes(target) {
  addActive(target);
  target = Math.floor(target / 10);
  if (target > 0 ) {
    markActiveNodes(target);
  }
}

function removeActiveNodes() {
  for (var i = 0; i < active.length; i++ ) {
    $(active[i]).removeClass('active');
  }
}

function addActive(id) {
  var nodeId = '#' + nodePrefix + id;
  $(nodeId).addClass('active');
  active.push(nodeId);
}

function highlightPath(e) {
  var $target = $(e.currentTarget);
  $target.parents('.row-wrapper')
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
