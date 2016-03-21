function log() {
  var args = Array.prototype.slice.call(arguments);
  console.log.apply(console, args);
}

module.exports = {
  log
};
