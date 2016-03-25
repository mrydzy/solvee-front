const $ = require('jquery');
const readCookie = require('./services').readCookie;
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

function addCredentials(headers) {
  var credentials = readCookie('credentials');
  if (credentials) {
    headers.Authorization = "Bearer " + credentials;
  }
  return headers;
}

function getHeaders() {
  var headers = {};
  addCredentials(headers);
  console.log('using headers', headers);
  return headers;
}

function send(type, data, success, suffix) {
  $.ajax({
    type: type,
    url: backendUrl + suffix,
    data: data,
    success: success,
    headers: getHeaders(),
    dataType: 'application/json'
  });
}

module.exports = {
  sendTree, getTree, updateTree
};
