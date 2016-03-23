function callAnalytics(category, action, label, value, fields) {
  ga('send', 'event', category, action, label, value, fields);
}

module.exports = {
  callAnalytics
};