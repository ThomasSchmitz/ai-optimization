# Security & Testing Implementation

This document describes the security hardening, accessibility improvements, and testing infrastructure implemented for the AI GEO website.

## Table of Contents

- [Security Improvements](#security-improvements)
- [Accessibility Enhancements](#accessibility-enhancements)
- [Testing Infrastructure](#testing-infrastructure)
- [Installation](#installation)
- [Usage](#usage)
- [Running Tests](#running-tests)

---

## Security Improvements

### 1. XSS Protection

**New Utility:** `assets/js/utils/security.js`

Provides comprehensive XSS protection through:

- **HTML Sanitization**: Strips dangerous HTML/JavaScript from user input
- **URL Validation**: Prevents `javascript:` and `data:` protocol attacks
- **Safe DOM Manipulation**: Helper functions for safe innerHTML usage

**Example Usage:**
```javascript
const Security = window.AI_GEO.Security;

// Sanitize user input
const safeHTML = Security.sanitizeHTML(userInput);

// Validate URLs
if (Security.validateURL(link)) {
    // Safe to use
}

// Escape HTML entities
const safeText = Security.escapeHTML(userInput);
```

### 2. Error Handling

**New Utility:** `assets/js/utils/error-handler.js`

Centralized error handling with:

- User-friendly error notifications
- Console logging in development mode
- Graceful error recovery
- Loading state management

**Example Usage:**
```javascript
const ErrorHandler = window.AI_GEO.ErrorHandler;

try {
    // Some operation
} catch (error) {
    ErrorHandler.handle(error, 'context-name', true);
}

// Show notifications
ErrorHandler.show('Operation successful!', 'success');
```

### 3. Input Validation

All user inputs are now validated and sanitized:

- Search queries are escaped before display
- URLs are validated before navigation
- Form inputs are sanitized
- Fetched content is validated for content-type

### 4. Updated Files

The following files have been updated with security improvements:

- **assets/js/includes.js**: Added content-type validation, HTML sanitization
- **assets/js/search.js**: Added input sanitization, URL validation
- **assets/js/script.js**: Improved error handling

---

## Accessibility Enhancements

### 1. Keyboard Navigation

**New Utility:** `assets/js/utils/accessibility.js`

Provides:

- Keyboard support for dropdowns (Enter, Space, Escape, Arrow keys)
- Focus trapping for modals
- Skip to main content link
- Screen reader announcements

**Example Usage:**
```javascript
const A11y = window.AI_GEO.A11y;

// Make element keyboard accessible
A11y.makeKeyboardAccessible(element, (e) => {
    // Handle Enter/Space key
});

// Announce to screen readers
A11y.announce('Search results updated', 'polite');

// Add skip link
A11y.addSkipLink();
```

### 2. ARIA Improvements

- Added `aria-expanded` to dropdown toggles
- Added `aria-current="page"` to active navigation items
- Added `aria-live` regions for dynamic content
- Added `aria-label` to interactive elements

### 3. Focus Management

- Visible focus indicators on all interactive elements
- Focus trap for modals/dialogs
- Skip to main content link

### 4. Touch Targets

- Ensured minimum 44x44px touch target size on mobile
- Improved button sizing and spacing

### 5. Color Contrast

- All text meets WCAG 2.1 AA standards
- High contrast mode support
- Light/dark mode both accessible

---

## Performance Improvements

**New Utility:** `assets/js/utils/performance.js`

Provides:

- **Debouncing**: Delays function execution until user stops typing
- **Throttling**: Limits function execution rate (e.g., scroll handlers)
- **Lazy Loading**: Loads images/content when visible

**Example Usage:**
```javascript
const Performance = window.AI_GEO.Performance;

// Debounce search input
const debouncedSearch = Performance.debounce(searchFunction, 300);
input.addEventListener('input', debouncedSearch);

// Throttle scroll handler
const throttledScroll = Performance.throttle(scrollHandler, 100);
window.addEventListener('scroll', throttledScroll);

// Lazy load images
Performance.lazyLoad(images, (img) => {
    img.src = img.dataset.src;
});
```

---

## Testing Infrastructure

### 1. Test Framework

- **Jest**: Unit testing framework
- **@testing-library/dom**: DOM testing utilities
- **jsdom**: Browser environment for Node.js

### 2. Test Coverage

Current test files:

- `tests/security.test.js` - Security utility tests
- `tests/performance.test.js` - Performance utility tests

### 3. Test Scripts

```bash
# Run all tests
npm test

# Watch mode (re-run on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### 4. Code Quality

**ESLint** configuration for code quality:

- Prevents common errors
- Enforces consistent code style
- Catches security issues (eval, implied eval, etc.)

```bash
# Lint code
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

---

## Installation

### Prerequisites

- Node.js 14+ and npm

### Setup

1. Install dependencies:
```bash
cd /Users/thomasschmitz/Sites/ai-optimization
npm install
```

2. Run tests to verify installation:
```bash
npm test
```

---

## Usage

### Loading Utilities

Add utility scripts to your HTML pages:

```html
<head>
    <!-- Load utilities first -->
    <script src="/assets/js/utils/security.js"></script>
    <script src="/assets/js/utils/error-handler.js"></script>
    <script src="/assets/js/utils/performance.js"></script>
    <script src="/assets/js/utils/accessibility.js"></script>
    
    <!-- Then load main scripts -->
    <script src="/assets/js/includes.js"></script>
    <script src="/assets/js/script.js"></script>
    
    <!-- Load utility styles -->
    <link rel="stylesheet" href="/assets/css/utilities.css">
</head>
```

### Using Security Features

```javascript
// Always sanitize user input
const userInput = document.getElementById('input').value;
const safe = window.AI_GEO.Security.escapeHTML(userInput);

// Validate URLs before navigation
const url = document.getElementById('url').value;
if (window.AI_GEO.Security.validateURL(url)) {
    window.location.href = url;
}
```

### Error Handling Pattern

```javascript
async function loadData() {
    try {
        const response = await fetch('/api/data');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        window.AI_GEO.ErrorHandler.handle(error, 'loadData', true);
        throw error;
    }
}
```

---

## Running Tests

### Run All Tests

```bash
npm test
```

### Watch Mode (Development)

```bash
npm run test:watch
```

### Coverage Report

```bash
npm run test:coverage
```

This generates a coverage report in `coverage/` directory.

### Linting

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix
```

---

## Browser Compatibility

All utilities support:

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- Modern mobile browsers

For older browser support, consider adding polyfills:

- fetch API polyfill
- IntersectionObserver polyfill
- URL API polyfill

---

## Security Best Practices

### Do's

✅ Always sanitize user input before displaying  
✅ Validate URLs before navigation  
✅ Use error handling for all async operations  
✅ Check content-type headers for fetched content  
✅ Use HTTPS in production  
✅ Keep dependencies updated  

### Don'ts

❌ Never use `innerHTML` without sanitization  
❌ Don't trust user input  
❌ Avoid `eval()` and `new Function()`  
❌ Don't expose sensitive data in client-side code  
❌ Don't ignore console errors in production  

---

## Accessibility Best Practices

### Do's

✅ Provide keyboard navigation for all interactive elements  
✅ Use semantic HTML  
✅ Add ARIA labels where needed  
✅ Ensure sufficient color contrast  
✅ Test with screen readers  
✅ Support reduced motion preferences  

### Don'ts

❌ Don't rely solely on color to convey information  
❌ Don't create keyboard traps  
❌ Don't use empty links or buttons  
❌ Don't hide focus indicators  

---

## Performance Optimization

### Implemented Optimizations

1. **Throttled scroll handlers** - Reduces event handler calls
2. **Debounced search input** - Waits for user to finish typing
3. **Lazy loading** - Loads content when visible
4. **Event delegation** - Reduces number of event listeners
5. **CSS minification** - Reduced file sizes (to be implemented)

### Recommended Next Steps

- Implement CSS code splitting
- Add image lazy loading
- Use async/defer for non-critical scripts
- Implement service worker for offline support
- Add resource hints (preload, prefetch)

---

## Maintenance

### Regular Tasks

1. **Weekly**:
   - Run test suite
   - Review console logs
   - Check accessibility with tools

2. **Monthly**:
   - Update dependencies
   - Review security advisories
   - Run Lighthouse audits

3. **Quarterly**:
   - Comprehensive security audit
   - Performance testing
   - Accessibility audit with screen readers

---

## Support & Documentation

### Additional Resources

- [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Jest Documentation](https://jestjs.io/)
- [ESLint Rules](https://eslint.org/docs/rules/)

### Code Review Checklist

See `CODE_REVIEW.md` for complete code review findings and recommendations.

---

## License

This project is provided as-is for educational purposes.
