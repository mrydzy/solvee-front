function log() {
  var args = Array.prototype.slice.call(arguments);
  console.log.apply(console, args);
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function setCookie(key, value) {
  var expires = new Date();
  expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000));
  document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

module.exports = {
  log: log,
  readCookie: readCookie,
  setCookie: setCookie
};
