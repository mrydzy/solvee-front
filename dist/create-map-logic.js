$('document').ready(function() {
  $(".map-col:empty").each(function() {
    var textAreaId = 'text' + $(this).attr('data-target');
    return $(this).prepend('<textarea id= ' + textAreaId + ' class="col-input" placeholder="Placeholder. Add text to keep, leave empty to remove.">').addClass('map-placeholder');
  });
  autosize($('textarea'));
  $('textarea').blur(function() {
    console.log('lost focus', $(this).parent());
    var wrapper = $(this).parent();
    if ($.trim($(this).val())) { //textarea is not empty
      wrapper.removeClass('map-placeholder');
    } else {//textarea is empty
      wrapper.addClass('map-placeholder');
    }
  });



});


