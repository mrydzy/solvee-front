const $ = require('jquery');
const backendUrl = "http://localhost:3300/trees";


function sendTree(data) {
  send("POST", data, function(){}, "");
}

function updateTree(data, id) {
  send("PUT", data, function(){}, "/" + id);
}

function getTree(treeId, success) {
  $.getJSON(backendUrl + treeId, success);
}

function send(type, data, success, suffix) {
  $.ajax({
    type: type,
    url: backendUrl + suffix,
    data: data,
    success: success,
    dataType: 'application/json'
  });
}

module.exports = {
  sendTree, getTree, updateTree
};
