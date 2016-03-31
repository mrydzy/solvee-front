var iframeResizer = require('iframe-resizer').iframeResizer;

function createIframe() {
  if (!window._mapsCfg) return;
  var d = document;
  var ref = d.getElementById('solvee');
  var iframe = d.createElement('iframe');
  var DEV_URI = '//localhost:3000/maps/show/' + window._mapsCfg.mapId;
  var PROD_URI = 'solvee.click';
  iframe.src = DEV_URI;
  iframe.scrolling = "no";
  window._myif = iframe;
  ref.parentNode.insertBefore(iframe, ref);
  iframeResizer({
    minHeight: 315,
    checkOrigin: false,
    remoteHost: '*'
  }, iframe);
}
createIframe();