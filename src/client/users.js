const $ = require('jquery');
const send = require('./service/ajax-service').send;

const alert = require('./service/dialogs').alert;

$(function() {
 $('#user-form').on('submit', () => {
    saveUser({
      name: $('#name').val(),
      email: $('#email').val()
    })
 })
});

function saveUser(user) {
  send('PUT', user, '/users').done(function () {
      alert('Congrats, tree was created!');
      window.location.href = '/maps/show/'+id;
    }
    )
    .fail(function (event) {
      alert('There was an error submitting your request :(. Please contact us for support or try again later!');
    });;
}
