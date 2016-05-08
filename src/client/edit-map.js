const initMap = require('./create-map-logic').initMap;
const getTree = require('./service/map-service').getTree;
const getClearTree = require('./create-map-logic').getCleanTree;
const populatePlaceholders = require('./create-map-logic').populatePlaceholders;
const updateTree = require('./service/map-service').updateTree;
const unpublishTree = require('./service/map-service').unpublishTree;
const analytics = require('./service/tracking').editMapAnalytics;
const confirm = require('./service/dialogs').confirm;

const $ = require('jquery');

$(function() {
  var path = window.location.pathname;
  path = path.substring(path.lastIndexOf('/'));
  var id = parseInt(path.substring(1));

  getTree(path, function(json) {
    var jsonTree = JSON.parse(json.data);
    preselectLanguage(json.languageId);
    setTitle(json.name);
    preselectStyle(json.Style.id);
    if (json.photoLink) {
      loadPhoto(json.photoLink);
    }
    var treeWithPlaceholders = populatePlaceholders(jsonTree);
    initMap(treeWithPlaceholders, json);
  });

  function setTitle(title) {
    $('#map-title').val(title);
    window.title = title;
    $('h1').text('Edit ' + title);
  }

  function loadPhoto(imageUrl) {
    $('#map-photo-url').val(imageUrl);
    $('#map-photo-preview').css("background-image",`url(${imageUrl})`);
  }

  function preselectStyle(styleId) {
    $(`#map-style-select option[value=${styleId}]`).attr('selected','selected');
    const currentStyle = $('#map-style-select').find('option:selected').text() || '';
    $('.map-wrapper')
      .removeClass('pink autumn solvee dark')
      .addClass(currentStyle.toLowerCase());
  }

  function preselectLanguage(language) {
    var languageRadioButton = $('[name="lang"]');
    languageRadioButton.filter('[value=' + language + ']').prop('checked', true);
    languageRadioButton.trigger('change');
  }

  function callUpdateTree(e) {
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

    updateTree(treeObj, id);
  }

  function handleUnpublishClick() {
    confirm('Are you sure you want to unpublish?')
      .then(() => unpublishTree(id))
      .then(() => location.reload());
  }

  const $mapTitle = $('#map-title');

  $mapTitle.keyup(() => {
    $('.map-title-preview').text($mapTitle.val());
  });
  $('.unpublish-button').click(handleUnpublishClick);
  $('.save-publish-button').click(() => $('[name="shouldPublish"]').val(true));
  $('#map-form').on('submit', callUpdateTree);
  $(document).on('map-ready', function() {analytics(id);});

});
