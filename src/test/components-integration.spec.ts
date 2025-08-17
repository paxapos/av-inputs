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
        html: `<input-barcode auto-start="false"></input-barcode>`,
      });

      // Check that the component renders with a container div
      expect(page.root).toBeTruthy();
      expect(page.root.querySelector('div')).toBeTruthy();
      expect(page.root.style.width).toBe('400px');
      expect(page.root.style.height).toBe('200px');
    });

    it('should have proper default configuration', async () => {
      const page = await newSpecPage({
        components: [InputBarcode],
        html: `<input-barcode auto-start="false"></input-barcode>`,
      });

      const component = page.rootInstance as InputBarcode;
      expect(component.width).toBe('400px');
      expect(component.height).toBe('200px');
      expect(component.facingMode).toBe('environment');
      expect(component.autoStart).toBe(false);
    });
  });

  describe('InputScanReader', () => {
    it('should render with scanning interface', async () => {
      const page = await newSpecPage({
        components: [InputScanReader],
        html: `<input-scan-reader></input-scan-reader>`,
      });

      // Check basic structure
      expect(page.root).toBeTruthy();
      
      // For shadow DOM components, check if the component instance exists and is properly initialized
      const component = page.rootInstance as InputScanReader;
      expect(component).toBeTruthy();
      
      // Check if the component has the expected default state
      expect(component.placeholder).toBeDefined();
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
        html: `<input-file-from-webcam width="300" height="300" auto-start="false"></input-file-from-webcam>`,
      });

      const component = page.rootInstance as InputFileFromWebcam;
      expect(component.width).toBe(300);
      expect(component.height).toBe(300);
    });

    it('should have proper default settings', async () => {
      const page = await newSpecPage({
        components: [InputFileFromWebcam],
        html: `<input-file-from-webcam auto-start="false"></input-file-from-webcam>`,
      });

      const component = page.rootInstance as InputFileFromWebcam;
      expect(component.autoStart).toBe(false);
      expect(component.imageQuality).toBe(0.85);
      expect(component.flashEffect).toBe(true);
      expect(component.showControls).toBe(true);
    });
  });

  describe('InputFaceApiWebcam', () => {
    it('should render with AI detection interface', async () => {
      const page = await newSpecPage({
        components: [InputFaceApiWebcam],
        html: `<input-face-api-webcam auto-start="false"></input-face-api-webcam>`,
      });

      const component = page.rootInstance as InputFaceApiWebcam;
      expect(component.enableDetection).toBe(true);
      expect(component.scoreThreshold).toBe(0.65);
      expect(component.autoCapture).toBe(true);
      expect(component.autoStart).toBe(false); // Set to false to avoid initialization issues in tests
    });
  });

  describe('Component Methods Integration', () => {
    it('should provide async methods for all components', async () => {
      // Create component instances without auto-start to avoid initialization issues
      const barcodeComponent = new InputBarcode();
      barcodeComponent.autoStart = false;

      const scanComponent = new InputScanReader();

      const webcamComponent = new InputFileFromWebcam();
      webcamComponent.autoStart = false;

      const faceComponent = new InputFaceApiWebcam();
      faceComponent.autoStart = false;

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
