const textIdPrefix = 'text-';
const maxChildren = 3;

var djson = {
  title: "New Map",
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

$(function() {

  document.title = djson.title;
  var jadeVar = $("#jadehi").html()
    .replace(/&gt;/g,'>')
    .replace(/&amp;/g,'&');

  //actions/////////////////
  prepareMap();

  //functions//////////////
  function handleBlur() {
    var wrapper = $(this).parent();
    var value = $.trim($(this).val());
    if (value) { //textarea is not empty
      wrapper.removeClass('map-placeholder');
      updateNode(this, value)
    } else {//textarea is empty
      wrapper.addClass('map-placeholder');
    }
  }

  function updateNode(area, value) {
    var id = area.id.replace(textIdPrefix, '');
    var current = djson.options[id.charAt(0) - 1]
    for (var i = 1; i < id.length; i++ ) {
      current = current.children[id.charAt(i) - 1];
    }
    current.text = value;
    if (current.children.length < 1) {
      current.children = generateChildren(id);
      prepareMap();
    }
  }

  function generateChildren(id) {
    var children = [];
    for (var i=1; i <= maxChildren; i++) {
      var currentId = parseInt(id + i);
      children.push({
        id: currentId,
        text: "",
        children: []
      });
    }
    return children;
  }

  function initColsActions() {
    $(".map-col:empty").each(function() {
      var textAreaId = textIdPrefix + $(this).attr('data-target');
      return $(this).prepend('<textarea id= ' + textAreaId + ' class="col-input" placeholder="Placeholder. Add text to keep, leave empty to remove.">').addClass('map-placeholder');
    });
    autosize($('textarea'));
    $('textarea').blur(handleBlur);
  }

  function prepareMap() {
    var compiled = jade.compile(jadeVar)(djson);
    $("#so").html(compiled);
    initColsActions();
    initMapRows();
  }
});

function submitTree() {
  console.log(djson);
  var clone = JSON.parse(JSON.stringify(djson)); //Object.assign({}, djson);
  var cleanTree = clearTree(clone);
  saveTree(cleanTree);
}

function cleanNode(node) {
  //console.log('clean', node);
  node.children = filterEmpty(node.children);
  node.children.forEach(cleanNode);
}

function filterEmpty(array) {
  return array.filter(function(node){return node.text !== ""})
}

function clearTree(json) {
  json.options = filterEmpty(json.options);
  json.options.forEach(cleanNode)
  return json;
}

function saveTree(cleanTree) {
  var tree = {name: 'some Name', data: JSON.stringify(cleanTree)};

  sendTree(tree);
}


