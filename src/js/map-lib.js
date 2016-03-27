require('../scss/main.scss');
const $ = require('jquery');

var mapContainer;
var rowIdRegex;

$('document').ready(function() {
  mapContainer = $('.map-wrapper');
  rowIdRegex = /\d+/;

  initMapRows();
});

function initMapRows() {
  $('.map-row').on('click', '.map-col', function (e) {
    var target = e.currentTarget.dataset.target;
    $(e.currentTarget).addClass('active');
    mapContainer.addClass('stage-' + target);
    removeOldNodes(target);
    // $.scrollTo($('#map-bottom'), 500, {offset: (-($(window).height() - 100))});
  });
  $('.map-col').on('hover', highlightPath)
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
