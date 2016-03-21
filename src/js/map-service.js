const $ = require('jquery');

function sendTree(data) {
  send("POST", data);
}

function getTree(treeId) {
  $.get("/trees/" + treeId, function (data) {
    $(".result").html(data);
    alert("Load was performed.");
  });

  send("GET", null, treeId)
}

function send(type, data, success, suffix) {
  $.ajax({
    type: type,
    url: '/trees',
    data: data,
    success: success,
    dataType: 'application/json'
  });
}
