const send = require('./ajax-service').send;
const $ = require('jquery');
const backendUrl = "http://localhost:3300";
// const backendUrl = "http://api-decisions.herokuapp.com/trees";


function sendTree(tree, name, lang, photoLink) {
  if (validateTree(tree)) {
    var data = {data: JSON.stringify(tree), name : name, lang: lang};
    if (photoLink) {
      data.photoLink = photoLink
    }
    send("POST", data, "/trees")
      .done(function(event) {
        alert('Congrats, tree was created!');
        window.location.href = '/maps/show/'+ event.id;
      }
    ).fail(function (event) {
      alert('There was an error submitting your request :(. Please contact us for support or try again later!');
    });
  }
}

function getTreeTemplate() {
  return $.get( "/assets/map-template.jade");
}

function updateTree(tree, name, id, lang, photoLink) {
  if (validateTree(tree)) {
    var data = {data: JSON.stringify(tree), name : name, lang: lang};
    if (photoLink) {
      data.photoLink = photoLink
    }
    send("PUT", data, "/trees/" + id)
      .done(function () {
          alert('Congrats, tree was created!');
          window.location.href = '/maps/show/'+id;
        }
      )
      .fail(function (event) {
        alert('There was an error submitting your request :(. Please contact us for support or try again later!');
    });
  }
}

function getTree(treeId, success) {
  $.getJSON(backendUrl + "/trees" + treeId, success);
}


function deleteTree(treeId) {
  send("DELETE", {}, '/trees/' + treeId)
    .done(function (event) {
      window.location.href = '/maps/list';
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
  sendTree: sendTree,
  getTree: getTree,
  updateTree: updateTree,
  validateTree: validateTree,
  deleteTree: deleteTree,
  getTreeTemplate: getTreeTemplate
};
