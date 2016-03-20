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
    myConfirm('You are about to remove option\'s branch', function () {
        removeBranch(current, wrapper);
        prepareMap();
      }, function () {
        prepareMap();
      },
      'Are you sure?'
    );
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
      if (current.children.length < 1) {
        current.children = generateChildren(id);
      }
      prepareMap();
    } else { //textarea ie empty
        confirmRemoveBranch(current, wrapper);
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


  function prepareMap() {
    log("recreating map");
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


