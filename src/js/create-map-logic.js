require('../scss/main.scss');
const callAnalytics = require('./../service/analytics').callAnalytics;

const $ = require('jquery');
const jade = require('jade');
const autosize = require('autosize');

const log = require('./services').log;
const mapUtils = require('./map-lib');
const initMapRows = mapUtils.initMapRows;
const textIdPrefix = 'text-';
const maxChildren = require('./../service/constants').maxChildren;
const maxDepth = require('./../service/constants').maxDepth;

var jadeVar;var djson = {};

$(function() {
  jadeVar = $("#jadehi").html()
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
});

function handleBlur() {
  log('blur', $(this));
  var wrapper = $(this).parent();
  var value = $.trim($(this).val());
  updateNode(this, value, wrapper);
}

function getCurrentNode(id) {
  var current = djson.options[id.charAt(0) - 1]
  log("mining for current", current, id);
  for (var i = 1; i < id.length; i++ ) {
    current = current.children[id.charAt(i) - 1];
    log(current);
  }
  return current;
}

function removeBranch(current, wrapper) {
  current.text = "";
  current.children = [];
  wrapper.addClass('map-placeholder');
}

function confirmRemoveBranch(current, wrapper) {
  var confirmRemove = window.confirm('Are you sure you want to remove option\'s branch');
  if (confirmRemove) {
      removeBranch(current, wrapper);
      prepareMap();
    $(document).trigger( "remove-branch", [ 'remove-' + current.id ] );
  } else {
    prepareMap();
  }
}

function updateNode(area, value, wrapper) {
  var id = area.id.replace(textIdPrefix, '');
  var current = getCurrentNode(id);

  if (value == current.text) {
    log("nothing was modified");
    return;
  }

  log("updating", current, value);
  if (value) { //textarea is not empty
    wrapper.removeClass('map-placeholder');
    current.text = value;
    if (current.children.length < 1 && id.toString().length < maxDepth) {
      current.children = generateChildren(id);
    }
    prepareMap();
  } else { //textarea ie empty
      confirmRemoveBranch(current, wrapper);
  }
}

function getChild(id) {
  return {
    id: id,
    text: "",
    children: []
  }
}

function generateChildren(id) {
  var children = [];
  for (var i=1; i <= maxChildren; i++) {
    var currentId = parseInt(id + i);
    children.push(getChild(currentId));
  }
  return children;
}

function initColsActions() {
  $(".col-input:empty").each(function() {
    return $(this.parentNode).addClass('map-placeholder');
  });
  autosize($('textarea'));
  $('textarea').blur(handleBlur);
  $('.node-remover').click(removeNodeOnClick);
}

function removeNodeOnClick(event) {
  log('removing', this.id);
  var id = this.id.replace('nr-', '');
  var current = getCurrentNode(id);

  var wrapper = $(this.parent).parent();
  confirmRemoveBranch(current, wrapper)
}

function initMap(json) {
  djson = json;
  document.title = djson.title;
  $(this).val(djson.title);
  prepareMap();
  $('#map-title').change(function() {
    log('changing title');
    djson.title = $(this).val();
    document.title = djson.title;
  });
}

function prepareMap() {
  log("recreating map");
  var compiled = jade.compile(jadeVar)(djson);
  $("#so").html(compiled);
  initColsActions();
  initMapRows();
}

function getCleanTree() {
  var clone = JSON.parse(JSON.stringify(djson));
  return clearTree(clone);
}

function cleanNode(node) {
  node.children = filterEmpty(node.children);
  node.children.forEach(cleanNode);
}

function filterEmpty(array) {
  return array.filter(function(node){return node.text !== ""})
}

function clearTree(json) {
  json.options = filterEmpty(json.options);
  json.options.forEach(cleanNode);
  return json;
}

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

function addPlaceholders(array, prefix) {
  var i = 1;
  while (array.length <= maxChildren && i <= maxChildren) {
     if (array.length < i || array[i-1].id != prefix + i) {
       array.insert(i-1, getChild(parseInt(prefix + i)));
     } else {
       addPlaceholders(array[i-1].children, prefix + i);
     }
    i++;
  }
}

function populatePlaceholders(json) {
  addPlaceholders(json.options, '');
  return json;
}

module.exports = {
  initMap,
  getCleanTree,
  populatePlaceholders
};

