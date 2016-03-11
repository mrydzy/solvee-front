$(function() {
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
  document.title = djson.title;
  //jade compile

  var jadeVar = $("#jadehi").html()
    .replace(/&gt;/g,'>')
    .replace(/&amp;/g,'&');

  var compiled = jade.compile(jadeVar)(djson);

  $("#so").html(compiled);

  $(".map-col:empty").each(function() {
    var textAreaId = 'text' + $(this).attr('data-target');
    return $(this).prepend('<textarea id= ' + textAreaId + ' class="col-input" placeholder="Placeholder. Add text to keep, leave empty to remove.">').addClass('map-placeholder');
  });
  autosize($('textarea'));

  function handleBlur() {
    console.log('lost focus', $(this).parent());
    var wrapper = $(this).parent();
    if ($.trim($(this).val())) { //textarea is not empty
      wrapper.removeClass('map-placeholder');
    } else {//textarea is empty
      wrapper.addClass('map-placeholder');
    }
  }

  $('textarea').blur(handleBlur);
});


