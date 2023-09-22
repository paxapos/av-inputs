'use strict';

const inputFaceApiWebcam_entry = require('./input-face-api-webcam-7c946604.js');
require('./index-86473b3d.js');
require('./camera.service-fdec3dd0.js');

const workerName = 'distance.worker';
const workerMsgId = 'stencil.distance.worker';
const workerPath = /*@__PURE__*/(typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __dirname + '/distance.worker-d28042bf.js').href : new URL('distance.worker-d28042bf.js', document.currentScript && document.currentScript.src || document.baseURI).href);
const blob = new Blob(['importScripts("' + workerPath + '")'], { type: 'text/javascript' });
const url = URL.createObjectURL(blob);
const worker = /*@__PURE__*/inputFaceApiWebcam_entry.createWorker(url, workerName, workerMsgId);
URL.revokeObjectURL(url);

exports.worker = worker;
exports.workerMsgId = workerMsgId;
exports.workerName = workerName;
exports.workerPath = workerPath;

//# sourceMappingURL=distance.worker-e5f57bb8.js.map