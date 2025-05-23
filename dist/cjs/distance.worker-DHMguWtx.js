'use strict';

var inputFaceApiWebcam_entry = require('./input-face-api-webcam-CLsHAdeq.js');
require('./index-zg9izv8n.js');
require('./camera.service-BQZZ7IZj.js');

const workerName = 'distance.worker';
const workerMsgId = 'stencil.distance.worker';
const workerPath = (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__dirname + '/distance.worker-66eWrb3j.js').href : new URL('distance.worker-66eWrb3j.js', document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT' && document.currentScript.src || document.baseURI).href);
exports.worker = void 0;
try {
  // first try directly starting the worker with the URL
  exports.worker = /*@__PURE__*/inputFaceApiWebcam_entry.createWorker(workerPath, workerName, workerMsgId);
} catch(e) {
  // probably a cross-origin issue, try using a Blob instead
  const blob = new Blob(['importScripts("' + workerPath + '")'], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  exports.worker = /*@__PURE__*/inputFaceApiWebcam_entry.createWorker(url, workerName, workerMsgId);
  URL.revokeObjectURL(url);
}

exports.workerMsgId = workerMsgId;
exports.workerName = workerName;
exports.workerPath = workerPath;
//# sourceMappingURL=distance.worker-DHMguWtx.js.map

//# sourceMappingURL=distance.worker-DHMguWtx.js.map