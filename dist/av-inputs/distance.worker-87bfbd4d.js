import { c as createWorker } from './input-face-api-webcam-80e2a4d3.js';
import './index-e4228ea4.js';
import './camera.service-263a32a0.js';

const workerName = 'distance.worker';
const workerMsgId = 'stencil.distance.worker';
const workerPath = /*@__PURE__*/new URL('distance.worker-2be63b2f.js', import.meta.url).href;
const blob = new Blob(['importScripts("' + workerPath + '")'], { type: 'text/javascript' });
const url = URL.createObjectURL(blob);
const worker = /*@__PURE__*/createWorker(url, workerName, workerMsgId);
URL.revokeObjectURL(url);

export { worker, workerMsgId, workerName, workerPath };

//# sourceMappingURL=distance.worker-87bfbd4d.js.map