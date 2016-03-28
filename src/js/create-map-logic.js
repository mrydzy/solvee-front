require('../scss/main.scss');
const callAnalytics = require('./../service/tracking').callAnalytics;

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

function handleBlur(event) {
  var value = $.trim($(this).val());
  if (!event.relatedTarget || event.relatedTarget.id !='save-tree-button')  {
    var wrapper = $(this).parent();
    updateNode(this, value, wrapper);
  } else {
    var id = event.currentTarget.id.replace(textIdPrefix, '');
    var current = getCurrentNode(id);
    current.text = value;
  }
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
  $('textarea').on('blur', handleBlur);
  $('.node-remover').click(removeNodeOnClick);
}

function removeNodeOnClick(event) {
  log('removing', this.id);
  var id = this.id.replace('nr-', '');
  var current = getCurrentNode(id);

  var wrapper = $(this.parent).parent();
  confirmRemoveBranch(current, wrapper)
}

function handleTitle(titleInput) {
  //djson.title = titleInput.val();
  var title = titleInput.val();
  document.title = title;
  if (title.length < 1 ) {
    $(titleInput).addClass('error');
  } else {
    $(titleInput).removeClass('error');
  }
}

function initMap(json) {
  djson = json;
  var mapTitleInput = $('#map-title');
  handleTitle(mapTitleInput);
  prepareMap();
  mapTitleInput.change(function() {
    handleTitle($(this));
  });
}

function prepareMap() {
  log("recreating map");
  var compiled = jade.compile(jadeVar)(djson);
  $("#so").html(compiled);
  $('#text-1').attr('required', true);
  initColsActions();
  initMapRows();
  $(document).trigger( "map-ready");
}

function getCleanTree() {
  var clone = JSON.parse(JSON.stringify(djson));
  return clearTree(clone);
}

function cleanNode(node) {
  node.children = filterEmpty(node.children);
  if (node.children.length == 2) {
    distributeTwins(node);
  }
  node.children.forEach(cleanNode);
}

function filterEmpty(array) {
  return array.filter(function(node){return node.text !== ""})
}

function distributeTwins(node) { //if there are just 2 children, 1 should be set!
  if ((node.children[0].id % 10) !== 1) { //with twins, the first one has to be set
    updateId(node.id*10+1, node.children[1], 1);
  }
  if ((node.children[1].id % 10) !== 3) { //with twins, the first one has to be set
    updateId(node.id*10+3, node.children[1], 3);
  }
}

function updateId(newId, node, suffix) {
  node.id = newId;
  for (var i = 0; i < node.children; i++) {
    updateId(newId * 10 + suffix + 1, node.children[i], suffix);
  }
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

