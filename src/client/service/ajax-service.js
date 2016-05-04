const readCookie = require('./services').readCookie;
const backendUrl = "http://solvee-api.herokuapp.com";
// const backendUrl = "http://localhost:3300";
const $ = require('jquery');

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
    dataType: 'json'
  });
}

module.exports = {
  send: send
};