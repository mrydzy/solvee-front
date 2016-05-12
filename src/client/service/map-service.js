const send = require('./ajax-service').send;
const $ = require('jquery');
// const backendUrl = "http://localhost:3300";
// const backendUrl = "http://solvee-api-stage.herokuapp.com";
const backendUrl = "http://solvee-api.herokuapp.com";
const alert = require('./dialogs').alert;


function sendTree(data) {
    return send("POST", data, "/trees");
}

function getTreeTemplate() {
  return $.get( "/assets/map-template.jade");
}

function updateTree(data, id) {
    send("PUT", data, "/trees/" + id)
      .done(() => {
          alert('Congrats, tree was created!');
          window.location.href = '/'+id;
        }
      )
      .fail(function (event) {
        alert('There was an error submitting your request :(. Please contact us for support or try again later!');
    });
}

function getTree(treeId) {
  // $.getJSON(backendUrl + "/trees" + treeId, success);
  return send("GET", {}, '/trees' + treeId);
}

function deleteTree(treeId) {
  return send("DELETE", {}, '/trees/' + treeId);
}

function unpublishTree(treeId) {
  return send("PATCH", { published: true }, '/trees/' + treeId);
}


module.exports = {
  sendTree: sendTree,
  getTree: getTree,
  updateTree: updateTree,
  deleteTree: deleteTree,
  unpublishTree: unpublishTree,
  getTreeTemplate: getTreeTemplate
};
