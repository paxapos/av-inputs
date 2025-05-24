import { Config } from '@stencil/core';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { JsonDocs } from '@stencil/core/internal';
import nodePolyfills from 'rollup-plugin-node-polyfills'; // Change this line

export const config: Config = {
  namespace: 'av-inputs',
  plugins: [ // Add the plugins array here
    nodePolyfills(), // Add the polyfills plugin
  ],
  testing: {
    setupFilesAfterEnv: ['<rootDir>/jest-setup.js']
  },
  outputTargets: [

    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-custom',
      generator: (docs: JsonDocs) => {
        // Custom logic goes here
      }
    },
    {
      type: 'docs-readme',
      strict: true
    },
    {
      type: 'www',
      copy: [
        { src: 'input_file_from_webcam.html', dest: 'input_file_from_webcam.html' },
        { src: 'input_face_api.html', dest: 'input_face_api.html' },
        { src: 'input_scan_reader.html', dest: 'input_scan_reader.html' },
        { src: 'input_barcode.html', dest: 'input_barcode.html' },
      ],
      serviceWorker: null, // disable service workers
    },
    angularOutputTarget({
      componentCorePackage: 'av-inputs',
      directivesProxyFile: 'angular/components.ts',
      //directivesArrayFile: 'dist/angular/index.ts'
    }),
  ],
};
