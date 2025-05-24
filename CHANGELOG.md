# Changelog

## [1.0.12] - 2025-05-24

### Changes
- refactor: improve camera handling and testing setup for input components
- refactor: remove obsolete test for input-face-api-webcam and enhance input-file-from-webcam and input-scan-reader tests
- fix: add 'dist/' to .gitignore to prevent build artifacts from being tracked
- Remove unused camera, face detection, text handling, and utility type definitions to clean up the codebase.
- feat: add custom elements loader and text processing utilities


All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Enhanced face detection with automatic photo capture
- Video readiness validation to prevent MediaPipe ROI errors
- Comprehensive debugging and diagnostic tools
- Modern UI with animations and state indicators
- Performance monitoring and throttling mechanisms

### Changed
- Improved FaceAPI service with better error handling
- Enhanced component initialization with proper video validation
- Reduced default confidence threshold for better detection

### Fixed
- MediaPipe ROI error by ensuring video element readiness
- TypeScript compilation errors
- Camera service syntax issues

## [1.0.11] - Previous Release

### Added
- Initial face detection functionality
- Webcam input components
- Barcode scanning capabilities
- File input from webcam features
