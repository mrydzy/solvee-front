const backendUrl = 'http://localhost:3300/trees'

function sendTree(data) {
  send("POST", data);
}

function getTree(treeId) {
  $.get( "trees/" + treeId, function( data ) {
    $( ".result" ).html( data );
    alert( "Load was performed." );
  });

  send("GET", null ,treeId)
}

function send(type, data, success, suffix) {
  $.ajax({
    type: type,
    url: backendUrl,
    data: data,
    success: success,
    dataType: 'application/json'
  });
}