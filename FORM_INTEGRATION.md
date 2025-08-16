# AV-Inputs - Form Integration Guide

## Overview

All AV-Inputs components are designed to work as native form inputs, supporting standard HTML input properties, events, and form validation. They can be used seamlessly in any HTML form with proper form association and validation.

## Form Association

All components support `formAssociated: true`, making them fully compatible with HTML forms:

```html
<form id="myForm">
  <input-barcode 
    name="productCode" 
    required 
    pattern="[0-9]{13}"
    minlength="8"
    placeholder="Scan product barcode">
  </input-barcode>
  
  <input-scan-reader 
    name="employeeId" 
    required 
    minlength="5"
    placeholder="Scan employee badge">
  </input-scan-reader>
  
  <input-file-from-webcam 
    name="employeePhoto" 
    required 
    accept="image/*"
    placeholder="Take employee photo">
  </input-file-from-webcam>
  
  <input-face-api-webcam 
    name="faceData" 
    required 
    placeholder="Face recognition data">
  </input-face-api-webcam>
  
  <button type="submit">Submit</button>
</form>
```

## Standard Input Properties

### Common Properties (All Components)

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Form field name for submission |
| `value` | string | Current input value |
| `disabled` | boolean | Disable the input |
| `readonly` | boolean | Make input read-only |
| `required` | boolean | Field is required for validation |
| `placeholder` | string | Placeholder text |
| `pattern` | string | Regex pattern for validation |
| `minlength` | number | Minimum input length |
| `maxlength` | number | Maximum input length |
| `validationMessage` | string | Custom validation message |
| `autofocus` | boolean | Auto-focus on load |
| `tabindex` | number | Tab order |
| `ariaLabel` | string | Accessibility label |
| `ariaDescribedby` | string | Accessibility description |

### Component-Specific Properties

#### input-barcode

- **Value Format**: Raw scanned text
- **Validation**: Supports pattern matching for specific barcode formats

#### input-scan-reader

- **Value Format**: Raw scanned text
- **Validation**: Intelligent timeout handling, minimum length validation

#### input-file-from-webcam

- **Value Format**: Base64 data URL of captured image
- **Additional Properties**: `accept` (file type validation)
- **Validation**: File type validation against accept attribute

#### input-face-api-webcam

- **Value Format**: JSON string containing face detection data
- **Validation**: Face detection confidence thresholds

## Standard Input Events

All components emit standard HTML input events:

```javascript
// Standard form events
component.addEventListener('inputChange', (e) => {
  console.log('Input changed:', e.target.value);
});

component.addEventListener('valueChange', (e) => {
  console.log('Value committed:', e.target.value);
});

component.addEventListener('focusGained', (e) => {
  console.log('Component focused');
});

component.addEventListener('focusLost', (e) => {
  console.log('Component lost focus');
});

component.addEventListener('validationFailed', (e) => {
  console.log('Validation failed');
});

// Component-specific events
component.addEventListener('scan', (e) => {
  console.log('Barcode scanned:', e.detail);
});

component.addEventListener('pictureTaken', (e) => {
  console.log('Photo captured:', e.detail);
});

component.addEventListener('faceDetected', (e) => {
  console.log('Face detected:', e.detail);
});
```

## Form Validation

### Built-in Validation

```html
<!-- Required field validation -->
<input-barcode name="productCode" required></input-barcode>

<!-- Pattern validation for specific format -->
<input-scan-reader 
  name="employeeId" 
  pattern="[A-Z]{2}[0-9]{6}"
  validationMessage="Employee ID must be 2 letters followed by 6 numbers">
</input-scan-reader>

<!-- Length validation -->
<input-barcode 
  name="serialNumber" 
  minlength="8" 
  maxlength="20">
</input-barcode>

<!-- File type validation -->
<input-file-from-webcam 
  name="profilePic" 
  accept="image/jpeg,image/png"
  required>
</input-file-from-webcam>
```

### Custom Validation

```javascript
const barcodeInput = document.querySelector('input-barcode');

// Check validity programmatically
const isValid = await barcodeInput.checkValidity();

// Set custom validation
if (!isValidProductCode(barcodeInput.value)) {
  barcodeInput.setCustomValidity('Invalid product code format');
} else {
  barcodeInput.setCustomValidity(''); // Clear custom validity
}
```

### Form Submission

```javascript
const form = document.getElementById('myForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(form);
  
  // Access component values
  const productCode = formData.get('productCode');
  const employeePhoto = formData.get('employeePhoto'); // Base64 image
  const faceData = JSON.parse(formData.get('faceData')); // Face detection data
  
  // Validate all components
  const components = form.querySelectorAll('input-barcode, input-scan-reader, input-file-from-webcam, input-face-api-webcam');
  let isFormValid = true;
  
  for (const component of components) {
    const isValid = await component.checkValidity();
    if (!isValid) {
      isFormValid = false;
      console.log(`${component.name} is invalid`);
    }
  }
  
  if (isFormValid) {
    // Submit form data
    submitFormData(formData);
  }
});
```

## Programmatic Control

### Setting Values

```javascript
// Set values programmatically
await barcodeInput.setFormValue('123456789');
await photoInput.setFormValue('data:image/jpeg;base64,/9j/4AAQ...');

// Get current values
const currentValue = await barcodeInput.getFormValue();
```

### Focus Management

```javascript
// Focus components (starts camera/scanner)
await barcodeInput.setFocus();
await scannerInput.setFocus();

// Blur components (stops camera/scanner)
await barcodeInput.setBlur();
await scannerInput.setBlur();
```

## Accessibility

All components support WAI-ARIA attributes:

```html
<input-barcode 
  name="productCode"
  aria-label="Product barcode scanner"
  aria-describedby="barcode-help"
  tabindex="1">
</input-barcode>

<div id="barcode-help">
  Point camera at barcode to scan automatically
</div>
```

## CSS Styling

Components can be styled as regular form inputs:

```css
input-barcode,
input-scan-reader,
input-file-from-webcam,
input-face-api-webcam {
  display: block;
  margin: 10px 0;
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 10px;
}

input-barcode:focus,
input-scan-reader:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

input-barcode:invalid,
input-scan-reader:invalid {
  border-color: #dc3545;
}

input-barcode[disabled],
input-scan-reader[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
```

## Best Practices

### 1. Form Validation

- Always use appropriate validation attributes
- Provide clear validation messages
- Test form submission with invalid data

### 2. User Experience

- Use appropriate placeholders
- Provide clear instructions
- Handle loading and error states

### 3. Accessibility

- Include proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers

### 4. Performance

- Use `autofocus` sparingly
- Clean up resources properly
- Monitor memory usage for camera components

### 5. Error Handling

- Handle camera permission denials gracefully
- Provide fallback options for unsupported devices
- Show clear error messages to users

## Examples

### Employee Check-in Form

```html
<form id="checkinForm">
  <h2>Employee Check-in</h2>
  
  <label for="employeeId">Employee ID:</label>
  <input-scan-reader 
    id="employeeId"
    name="employeeId" 
    required 
    pattern="[A-Z]{2}[0-9]{6}"
    placeholder="Scan employee badge"
    aria-describedby="employee-help">
  </input-scan-reader>
  <small id="employee-help">Scan your employee badge or enter manually</small>
  
  <label for="employeePhoto">Photo:</label>
  <input-file-from-webcam 
    id="employeePhoto"
    name="employeePhoto" 
    required 
    accept="image/*"
    placeholder="Take photo"
    aria-describedby="photo-help">
  </input-file-from-webcam>
  <small id="photo-help">Take a current photo for attendance record</small>
  
  <button type="submit">Check In</button>
</form>
```

### Inventory Management Form

```html
<form id="inventoryForm">
  <h2>Product Inventory</h2>
  
  <label for="productBarcode">Product Code:</label>
  <input-barcode 
    id="productBarcode"
    name="productBarcode" 
    required 
    minlength="8"
    maxlength="20"
    placeholder="Scan product barcode">
  </input-barcode>
  
  <label for="quantity">Quantity:</label>
  <input type="number" name="quantity" required min="1">
  
  <label for="location">Location:</label>
  <input type="text" name="location" required>
  
  <button type="submit">Update Inventory</button>
</form>
```

This comprehensive form integration makes AV-Inputs components drop-in replacements for standard HTML inputs, with the added power of camera, barcode scanning, and AI capabilities.
