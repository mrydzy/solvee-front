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
  const $shouldPublishNode = $('[name="shouldPublish"]');
  const shouldPublish = $shouldPublishNode.val();

  e.preventDefault();

  let treeObj = {
    data: JSON.stringify(getClearTree()),
    name : $('#map-title').val(),
    lang: $('[name="lang"]').val(),
    styleId: $('#map-style-select').val()
  };

  if (shouldPublish === true) {
    treeObj.published = true;
    $shouldPublishNode.val(false);
  }

  var photoLink = $('#map-photo-url').val();
  if (photoLink) {
    treeObj.photoLink = photoLink
  }

  sendTree(treeObj)
    .done(event => {
      alert('Congrats, tree was created!');
      window.location.href = '/'+ event.id;
    })
    .fail(() => {
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
  $('.save-publish-button').click(() => $('[name="shouldPublish"]').val(true));
  initMap(emptyMapJson);
  $(document).on('map-ready', analytics);
});
