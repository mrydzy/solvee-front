const $ = require('jquery');
const readCookie = require('./services').readCookie;
const backendUrl = "http://localhost:3300/trees";


function sendTree(tree, name) {
  if (validateTree(tree)) {
    var data = {data: JSON.stringify(tree), name : name};
    send("POST", data, "")
      .done(function(event) {
        window.location.href = '/maps/show/'+ event.id;
      }
    ).fail(function (event) {
      alert('There was an error submitting your request :(. Please contact us for support or try again later!');
    });
  }
}

function updateTree(tree, name, id) {
  if (validateTree(tree)) {
    var data = {data: JSON.stringify(tree), name : name};
    send("PUT", data, "/" + id)
    .done(function () {
        window.location.href = '/maps/show/'+id;
      }
    ).fail(function (event) {
        alert('There was an error submitting your request :(. Please contact us for support or try again later!');
    });;
  }
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
  headers = addCredentials(headers);
  return headers;
}

function send(type, data, suffix) {
  return $.ajax({
    type: type,
    url: backendUrl + suffix,
    data: data,
    headers: getHeaders(),
    dataType: 'text json'
  });
}

function validateTree(tree) {
  if (tree.options.length < 1) {
    throw 'hey, create some selection there!';
    return false;
  }
  return true;
}

module.exports = {
  sendTree, getTree, updateTree, validateTree
};
