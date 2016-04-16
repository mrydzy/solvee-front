const $ = require('jquery');
const backendUrl = 'http://localhost:3300/users';
const send = require('./service/ajax-service').send;

$(() => {
 $('#user-form').on('submit', () => {
    saveUser({
      name: $('#name').val(),
      email: $('#email').val()
    })
 })
});

function saveUser(user) {x
  send('PUT', user, '/users').done(function () {
      alert('Congrats, tree was created!');
      window.location.href = '/maps/show/'+id;
    }
    )
    .fail(function (event) {
      alert('There was an error submitting your request :(. Please contact us for support or try again later!');
    });;
}
