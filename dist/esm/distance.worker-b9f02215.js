import { c as createWorker } from './input-face-api-webcam-30cf491f.js';
import './index-a881ea83.js';
import './camera.service-263a32a0.js';

const workerName = 'distance.worker';
const workerMsgId = 'stencil.distance.worker';
const workerPath = /*@__PURE__*/new URL('distance.worker-d28042bf.js', import.meta.url).href;
const blob = new Blob(['importScripts("' + workerPath + '")'], { type: 'text/javascript' });
const url = URL.createObjectURL(blob);
const worker = /*@__PURE__*/createWorker(url, workerName, workerMsgId);
URL.revokeObjectURL(url);

export { worker, workerMsgId, workerName, workerPath };

//# sourceMappingURL=distance.worker-b9f02215.js.map