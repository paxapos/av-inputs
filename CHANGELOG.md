# Changelog

## [2.1.2] - 2025-10-31

### Changes
- fix: add missing components/index.ts and update dependencies to latest versions
- chore: bump version to 2.1.0
- feat: update package version to 2.0.0 and export additional types and interfaces in index.ts
- chore: bump version to 2.0.0
- Implement feature X to enhance user experience and fix bug Y in module Z


## [2.1.0] - 2025-08-22

### Changes
- feat: update package version to 2.0.0 and export additional types and interfaces in index.ts


## [2.0.0] - 2025-08-20

### Changes
- Implement feature X to enhance user experience and fix bug Y in module Z
- Implement feature X to enhance user experience and optimize performance
- feat(input-barcode): update to ZXing library for improved compatibility and add new features
- Merge branch 'main' of github.com:paxapos/av-inputs
- feat: Add modern SVG icons for face detection component


## [1.0.14] - 2025-08-17

### Changes
- Merge branch 'main' of github.com:paxapos/av-inputs
- feat: Enhance webcam component functionality and improve test reliability with environment detection and auto-start prevention


## [1.0.13] - 2025-08-17

### Changes
- fix: Add mutable properties to props across components to eliminate prop mutability warnings and improve test reliability
- Merge branch 'main' of github.com:paxapos/av-inputs
- feat: Add multiple camera modal test page and integrate webcam functionalities


All notable changes to the AV-Inputs library will be documented in this file.

## [2.0.0] - 2025-08-16 - Professional Optimization Release

### 🚀 Major Improvements

#### Performance Optimizations
- **Memory Management**: Added automatic resource cleanup and memory leak prevention
- **Web Workers**: Heavy computations moved to background threads to prevent UI blocking
- **Throttling & Debouncing**: Intelligent event handling to reduce unnecessary processing
- **Error Recovery**: Robust error handling with automatic retry mechanisms

#### Code Quality
- **TypeScript Enhancements**: Improved type safety and better IDE support
- **Professional Documentation**: Comprehensive README files for each component
- **Performance Monitoring**: Built-in performance tracking and optimization utilities
- **Resource Management**: Automatic cleanup of cameras, timers, and event listeners

### 📷 input-barcode Component

#### Enhanced Features
- **Optimized Scanning**: Improved duplicate prevention with 5-second timeout
- **Better Error Handling**: Graceful camera permission and device error recovery
- **Performance Tuning**: Optimized FPS settings and barcode format prioritization
- **Memory Efficiency**: Automatic cleanup on component destruction

#### Breaking Changes
- `facingMode` prop: `'enviroment'` → `'environment'` (fixed typo)
- Added `autoStart` property (default: true)
- Enhanced scanner configuration with `qrbox` and `aspectRatio`

### ⌨️ input-scan-reader Component

#### Enhanced Features
- **Smart Input Detection**: Improved detection of hardware scanner vs manual input
- **Configurable Timeouts**: Customizable timeout duration for incomplete scans
- **Better UX**: Enhanced visual feedback and modal confirmations
- **Input Validation**: Minimum input length validation to prevent false positives

#### New Properties
- `inputTimeout`: Configurable timeout duration (default: 5000ms)
- `minInputLength`: Minimum valid input length (default: 3 characters)

### 🤖 input-face-api-webcam Component

#### Enhanced Features
- **Optimized Detection**: Improved face detection performance with configurable intervals
- **Worker Integration**: Face recognition calculations moved to Web Workers
- **Auto Capture**: Intelligent photo capture based on confidence thresholds
- **Resource Management**: Better camera and canvas resource handling

### 📸 input-file-from-webcam Component

#### Enhanced Features
- **Visibility Detection**: Automatic camera pause when component is hidden
- **Flash Effect**: Enhanced visual feedback for photo capture
- **Error Recovery**: Improved camera error handling and recovery
- **Resource Cleanup**: Automatic camera resource cleanup on component destruction

### 🛠️ Developer Experience

#### New Utilities
- **Performance Monitor**: Real-time performance tracking and optimization hints
- **Resource Manager**: Centralized resource cleanup and memory management
- **Error Handler**: Automatic retry mechanisms with exponential backoff
- **Memory Monitor**: Memory usage tracking with threshold warnings

#### Documentation
- Comprehensive README for each component explaining use cases and differences
- Professional JSDoc comments throughout codebase
- Integration test suite for component validation
- Performance optimization guidelines

### Previous Versions
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

# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2024-01-15

### Added

#### Professional Code Optimization
- **Performance Monitoring**: Added comprehensive performance utilities for tracking component lifecycle, memory usage, and camera operations
- **Resource Management**: Implemented proper cleanup for camera streams, detection loops, and event listeners
- **Error Handling**: Enhanced error handling with categorized error types and graceful fallbacks
- **Memory Optimization**: Added memory usage monitoring and automatic cleanup for long-running operations

#### Form Input Integration  
- **Standard HTML Input Properties**: All components now support standard form input attributes:
  - `name`, `value`, `disabled`, `readonly`, `required`, `placeholder`
  - `pattern`, `minlength`, `maxlength`, `validationMessage`
  - `autofocus`, `tabindex`, `ariaLabel`, `ariaDescribedby`
- **Form Association**: Added `formAssociated: true` for proper HTML form integration
- **Standard Form Events**: Implemented standard input events:
  - `input`, `change`, `focus`, `blur`, `invalid`
- **Form Validation**: Built-in validation with custom validation support
- **Form Methods**: Added methods for programmatic control:
  - `getFormValue()`, `setFormValue()`, `checkValidity()`
  - `getValidationMessage()`, `setCustomValidity()`
  - `setFocus()`, `setBlur()`

#### Component-Specific Improvements

**input-barcode**
- Enhanced QR/barcode scanning with performance monitoring
- Intelligent timeout handling and retry mechanisms
- Form validation for barcode format patterns
- Improved camera state management

**input-scan-reader**
- Professional keyboard input handling with debouncing
- Hardware scanner integration improvements
- Enhanced text validation and processing
- Timeout-based scanning with configurable delays

**input-face-api-webcam**
- AI-powered face detection with MediaPipe/TensorFlow.js integration
- Auto-capture functionality with confidence thresholds
- Web Workers for performance optimization
- Face landmark detection and recognition capabilities
- Form integration with JSON face data format

**input-file-from-webcam**
- Professional photo capture with camera controls
- Base64 image encoding for form submission
- File type validation (accept attribute support)
- Flash effects and improved UI feedback

#### Documentation Enhancements
- **Component READMEs**: Comprehensive documentation for each component
- **Form Integration Guide**: Complete guide for using components as form inputs
- **API Documentation**: Detailed property and method documentation
- **Usage Examples**: Real-world integration examples and best practices
- **Performance Guidelines**: Optimization recommendations and monitoring

#### Testing & Quality
- **Integration Tests**: Added comprehensive component integration tests
- **Performance Tests**: Automated performance monitoring and benchmarks
- **Form Validation Tests**: Test suites for form input behavior
- **TypeScript Improvements**: Enhanced type safety and error handling

### Changed
- Refactored all components for professional code standards
- Improved TypeScript type definitions and interfaces
- Enhanced accessibility with proper ARIA attributes
- Optimized bundle size and loading performance
- Updated dependencies to latest stable versions

### Technical Details
- **StencilJS**: Web Components with TypeScript
- **MediaPipe/TensorFlow.js**: AI face detection and recognition
- **html5-qrcode**: Camera-based barcode scanning
- **Camera API**: WebRTC integration for webcam access
- **Form Association**: HTML form integration with validation

### Migration Notes
- All components are now backward compatible
- New form input properties are optional
- Existing event handlers continue to work
- Added new standard form events for enhanced integration

---

## [1.0.11] - Previous Release

### Features
- Basic webcam input components
- Barcode and QR code scanning
- File capture from webcam
- Face API integration
- Angular component library support

### Components
- `input-barcode`: Camera-based barcode scanning
- `input-scan-reader`: Hardware scanner input
- `input-face-api-webcam`: Face detection and recognition
- `input-file-from-webcam`: Photo capture from webcam
