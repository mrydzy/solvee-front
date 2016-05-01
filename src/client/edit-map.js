const initMap = require('./create-map-logic').initMap;
const getTree = require('./service/map-service').getTree;
const getClearTree = require('./create-map-logic').getCleanTree;
const populatePlaceholders = require('./create-map-logic').populatePlaceholders;
const updateTree = require('./service/map-service').updateTree;
const analytics = require('./service/tracking').editMapAnalytics;

const $ = require('jquery');

$(function() {
  var path = window.location.pathname;
  path = path.substring(path.lastIndexOf('/'));
  var id = parseInt(path.substring(1));

  getTree(path, function(json) {
    console.log('json', json);
    var jsonTree = JSON.parse(json.data);
    $('h1').text('Edit ' + json.name);
    window.title = json.name;
    preselectLanguage(json.languageId);
    $('#map-title').val(json.name);
    if (json.photoLink) {
      loadPhoto(json.photoLink);
    }
    var treeWithPlaceholders = populatePlaceholders(jsonTree);
    initMap(treeWithPlaceholders);
  });

  function loadPhoto(photoLink) {
    $('#map-photo-url').val(photoLink);
    $('#map-photo').attr("src", photoLink);
  }

  function preselectLanguage(language) {
    var languageRadioButton = $('[name="lang"]');
    languageRadioButton.filter('[value=' + language + ']').prop('checked', true);
    languageRadioButton.trigger('change');
  }

  function callUpdateTree(e) {
    e.preventDefault();
    var title = $('#map-title').val();
    var lang = $('[name="lang"]').val();
    var photoLink = $('#map-photo-url').val();
    updateTree(getClearTree(), title, id, lang, photoLink);
  }

  const $mapTitle = $('#map-title');
  $mapTitle.keyup(() => {
    $('.map-title-preview').text($mapTitle.val());
  });

  $('#map-form').on('submit', callUpdateTree);
  $(document).on('map-ready', function() {analytics(id);});

});
