import { c as createWorker } from './input-face-api-webcam-1cd04a0b.js';
import './index-9a369ae4.js';
import './camera.service-263a32a0.js';

const workerName = 'distance.worker';
const workerMsgId = 'stencil.distance.worker';
const workerPath = /*@__PURE__*/new URL('distance.worker-2be63b2f.js', import.meta.url).href;
const blob = new Blob(['importScripts("' + workerPath + '")'], { type: 'text/javascript' });
const url = URL.createObjectURL(blob);
const worker = /*@__PURE__*/createWorker(url, workerName, workerMsgId);
URL.revokeObjectURL(url);

export { worker, workerMsgId, workerName, workerPath };

//# sourceMappingURL=distance.worker-4c5188aa.js.map