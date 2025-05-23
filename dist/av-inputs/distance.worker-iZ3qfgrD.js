import { c as createWorker } from './input-face-api-webcam-DL1VsBMj.js';
import './index-D0R_KwCh.js';
import './camera.service-EIF4KpJN.js';

const workerName = 'distance.worker';
const workerMsgId = 'stencil.distance.worker';
const workerPath = new URL('distance.worker-66eWrb3j.js', import.meta.url).href;
let worker;
try {
  // first try directly starting the worker with the URL
  worker = /*@__PURE__*/createWorker(workerPath, workerName, workerMsgId);
} catch(e) {
  // probably a cross-origin issue, try using a Blob instead
  const blob = new Blob(['importScripts("' + workerPath + '")'], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  worker = /*@__PURE__*/createWorker(url, workerName, workerMsgId);
  URL.revokeObjectURL(url);
}

export { worker, workerMsgId, workerName, workerPath };
//# sourceMappingURL=distance.worker-iZ3qfgrD.js.map

//# sourceMappingURL=distance.worker-iZ3qfgrD.js.map