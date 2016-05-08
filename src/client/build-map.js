const initMap = require('./create-map-logic').initMap;
const getClearTree = require('./create-map-logic').getCleanTree;
const sendTree = require('./service/map-service').sendTree;
const analytics = require('./service/tracking').createMapAnalytics;
const $ = require('jquery');
const alert = require('./service/dialogs').alert;

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
  // var title = $('#map-title').val();
  // var lang = $('[name="lang"]').val();
  // var photoLink = $('#map-photo-url').val();

  var treeObj = {
    data: JSON.stringify(getClearTree()),
    name : $('#map-title').val(),
    lang: $('[name="lang"]').val(),
    styleId: $('#map-style-select').val()
  };
  var photoLink = $('#map-photo-url').val();
  if (photoLink) {
    treeObj.photoLink = photoLink
  }
  
  sendTree(treeObj)
    .done(function(event) {
        alert('Congrats, tree was created!');
        window.location.href = '/'+ event.id;
      }
    ).fail(function (event) {
    alert('There was an error submitting your request :(. Please contact us for support or try again later!');
  });
}

$(function() {
  var $mapTitle = $('#map-title');
  if ($mapTitle.val()) {
    $mapTitle.val('');
  }
  $mapTitle.keyup(() => {
    $('.map-title-preview').text($mapTitle.val());
  });
  $('#map-form').on('submit', submitTree);
  initMap(emptyMapJson);
  $(document).on('map-ready', analytics);
});
