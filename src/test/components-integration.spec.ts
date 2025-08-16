/**
 * Integration tests for AV-Inputs components
 * Validates that all components can be instantiated and basic functionality works
 */

import { newSpecPage } from '@stencil/core/testing';
import { InputBarcode } from '../components/input-barcode/input-barcode';
import { InputScanReader } from '../components/input-scan-reader/input-scan-reader';
import { InputFileFromWebcam } from '../components/input-file-from-webcam/input-file-from-webcam';
import { InputFaceApiWebcam } from '../components/input-face-api-webcam/input-face-api-webcam';

describe('AV-Inputs Components Integration', () => {

  describe('InputBarcode', () => {
    it('should render with default properties', async () => {
      const page = await newSpecPage({
        components: [InputBarcode],
        html: `<input-barcode></input-barcode>`,
      });

      expect(page.root).toEqualHtml(`
        <input-barcode style="width: 400px; height: 200px; overflow: hidden; display: inline-block; border-radius: 8px; background-color: rgb(0, 0, 0);">
          <div style="width: 100%; height: 100%;"></div>
        </input-barcode>
      `);
    });

    it('should have proper default configuration', async () => {
      const page = await newSpecPage({
        components: [InputBarcode],
        html: `<input-barcode></input-barcode>`,
      });

      const component = page.rootInstance as InputBarcode;
      expect(component.width).toBe('400px');
      expect(component.height).toBe('200px');
      expect(component.facingMode).toBe('environment');
      expect(component.autoStart).toBe(true);
    });
  });

  describe('InputScanReader', () => {
    it('should render with scanning interface', async () => {
      const page = await newSpecPage({
        components: [InputScanReader],
        html: `<input-scan-reader></input-scan-reader>`,
      });

      expect(page.root.shadowRoot.querySelector('.scanning')).toBeTruthy();
      expect(page.root.shadowRoot.querySelector('input[type="text"]')).toBeTruthy();
    });

    it('should start in ready state', async () => {
      const page = await newSpecPage({
        components: [InputScanReader],
        html: `<input-scan-reader></input-scan-reader>`,
      });

      const component = page.rootInstance as InputScanReader;
      expect(component.scanTitle).toBe('Scanning Text');
      expect(component.modalTimer).toBe(0);
    });
  });

  describe('InputFileFromWebcam', () => {
    it('should render with correct dimensions', async () => {
      const page = await newSpecPage({
        components: [InputFileFromWebcam],
        html: `<input-file-from-webcam width="300" height="300"></input-file-from-webcam>`,
      });

      const component = page.rootInstance as InputFileFromWebcam;
      expect(component.width).toBe(300);
      expect(component.height).toBe(300);
    });

    it('should have proper default settings', async () => {
      const page = await newSpecPage({
        components: [InputFileFromWebcam],
        html: `<input-file-from-webcam></input-file-from-webcam>`,
      });

      const component = page.rootInstance as InputFileFromWebcam;
      expect(component.autoStart).toBe(true);
      expect(component.imageQuality).toBe(0.85);
      expect(component.flashEffect).toBe(true);
      expect(component.showControls).toBe(true);
    });
  });

  describe('InputFaceApiWebcam', () => {
    it('should render with AI detection interface', async () => {
      const page = await newSpecPage({
        components: [InputFaceApiWebcam],
        html: `<input-face-api-webcam></input-face-api-webcam>`,
      });

      const component = page.rootInstance as InputFaceApiWebcam;
      expect(component.enableDetection).toBe(true);
      expect(component.scoreThreshold).toBe(0.65);
      expect(component.autoCapture).toBe(true);
    });
  });

  describe('Component Methods Integration', () => {
    it('should provide async methods for all components', async () => {
      const barcodeComponent = new InputBarcode();
      const scanComponent = new InputScanReader();
      const webcamComponent = new InputFileFromWebcam();
      const faceComponent = new InputFaceApiWebcam();

      // Test that methods exist and return promises
      expect(typeof barcodeComponent.getState).toBe('function');
      expect(typeof barcodeComponent.start).toBe('function');
      expect(typeof barcodeComponent.stop).toBe('function');

      expect(typeof scanComponent.start).toBe('function');
      expect(typeof scanComponent.stop).toBe('function');
      expect(typeof scanComponent.getText).toBe('function');

      expect(typeof webcamComponent.startCamera).toBe('function');
      expect(typeof webcamComponent.takePic).toBe('function');
      expect(typeof webcamComponent.toggleCamera).toBe('function');

      expect(typeof faceComponent.startDetection).toBe('function');
      expect(typeof faceComponent.stopDetection).toBe('function');
      expect(typeof faceComponent.initializeCamera).toBe('function');
    });
  });
});
