var iframeResizer = require('iframe-resizer').iframeResizer;

function createIframe() {
  if (!window._mapsCfg) return;
  var d = document;
  var ref = d.getElementById('solvee');
  var iframe = d.createElement('iframe');
  var DEV_URI = 'http://www.localhost:3000/' + window._mapsCfg.mapId + '/embed';
  var PROD_URI = 'http://solvee.click/'+ window._mapsCfg.mapId + '/embed';
  iframe.src = PROD_URI;
  iframe.scrolling = "no";
  iframe.style.border = 'none';
  iframe.style.width = '100%';
  window._myif = iframe;
  ref.parentNode.insertBefore(iframe, ref);
  iframeResizer({
    minHeight: 315,
    checkOrigin: false,
    remoteHost: '*'
  }, iframe);
}
createIframe();
