const textIdPrefix = 'text-';
const maxChildren = 3;

$(function() {
//consts////////////////////
  const childrenTemplate = [{
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
  }];

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

  var djson2 = {
    title: "New Map",
    options: [{
      id: 1,
      text: "test",
      children: childrenTemplate
    }, {
      id: 2,
      text: "",
      children: []
    }, {
      id: 3,
      text: "",
      children: []
    }]};

  document.title = djson.title;
  //jade compile

  var jadeVar = $("#jadehi").html()
    .replace(/&gt;/g,'>')
    .replace(/&amp;/g,'&');


  //actions/////////////////
  compileJade();


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
      compileJade();
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

  function compileJade() {
    //console.log('jadeVar' + jadeVar);
    console.log(djson);
    var compiled = jade.compile(jadeVar)(djson);
    $("#so").html(compiled);
    $(".map-col:empty").each(function() {
      var textAreaId = textIdPrefix + $(this).attr('data-target');
      return $(this).prepend('<textarea id= ' + textAreaId + ' class="col-input" placeholder="Placeholder. Add text to keep, leave empty to remove.">').addClass('map-placeholder');
    });
    autosize($('textarea'));
    $('textarea').blur(handleBlur);
    initMapRows();
  }

});


