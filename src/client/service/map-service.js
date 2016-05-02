const send = require('./ajax-service').send;
const $ = require('jquery');
// const backendUrl = "http://localhost:3300";
const backendUrl = "http://api-decisions.herokuapp.com";
const alert = require('./dialogs').alert;


function sendTree(data) {
    send("POST", data, "/trees")
      .done(function(event) {
        alert('Congrats, tree was created!');
        window.location.href = '/maps/show/'+ event.id;
      }
    ).fail(function (event) {
      alert('There was an error submitting your request :(. Please contact us for support or try again later!');
    });
}

function getTreeTemplate() {
  return $.get( "/assets/map-template.jade");
}

function updateTree(data, id) {
    send("PUT", data, "/trees/" + id)
      .done(() => {
          alert('Congrats, tree was created!');
          window.location.href = '/maps/show/'+id;
        }
      )
      .fail(function (event) {
        alert('There was an error submitting your request :(. Please contact us for support or try again later!');
    });
}

function getTree(treeId, success) {
  $.getJSON(backendUrl + "/trees" + treeId, success);
}

function deleteTree(treeId) {
  return send("DELETE", {}, '/trees/' + treeId);
}


module.exports = {
  sendTree: sendTree,
  getTree: getTree,
  updateTree: updateTree,
  deleteTree: deleteTree,
  getTreeTemplate: getTreeTemplate
};
