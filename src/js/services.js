function log() {
  var args = Array.prototype.slice.call(arguments);
  console.log.apply(console, args);
}

function myConfirm(dialogText, okFunc, cancelFunc, dialogTitle) {
  $('<div style="padding: 10px; max-width: 500px; word-wrap: break-word;">' + dialogText + '</div>').dialog({
    modal: true,
    resizable: false,
    width: 'auto',
    title: dialogTitle || 'Confirm',
    minHeight: 75,
    buttons: {
      OK: function () {
        if (typeof (okFunc) == 'function') {
          setTimeout(okFunc, 50);
        }
        $(this).dialog('destroy');
      },
      Cancel: function () {
        if (typeof (cancelFunc) == 'function') {
          setTimeout(cancelFunc, 50);
        }
        $(this).dialog('destroy');
      }
    }
  });
}