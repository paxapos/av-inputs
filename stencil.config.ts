import { Config } from '@stencil/core';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { JsonDocs } from '@stencil/core/internal';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export const config: Config = {
  namespace: 'av-inputs',
  plugins: [
    nodePolyfills(),
  ],
  rollupPlugins: {
    after: []
  },
  buildEs5: 'prod',
  extras: {
    enableImportInjection: true
  },
  devServer: {
    reloadStrategy: 'pageReload',
    port: 3334,
    openBrowser: false
  },
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
        { src: 'face-detection-example.html', dest: 'face-detection-example.html' },
        { src: 'assets/**/*', dest: 'assets/' },
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
