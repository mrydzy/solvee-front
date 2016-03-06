$('document').ready(function() {
  var mapContainer = $('.map-wrapper');

  $('.map-row').on('click', '.map-col', function (e) {
    var target = e.currentTarget.dataset.target;
    mapContainer.addClass('stage-' + target);
    removeOldNodes(target);
    $.scrollTo($('#map-bottom'), 500, {offset: (-($(window).height() - 100))});
  });


  var rowIdRegex = /\d+/;

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

})