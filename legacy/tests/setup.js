// Test setup file
require('@testing-library/jest-dom');

// Mock window.AI_GEO
global.window.AI_GEO = {
    basePath: '',
    resolveUrl: (url) => url,
    Security: null,
    ErrorHandler: null,
    Performance: null,
    A11y: null
};

// Mock console methods
global.console = {
    ...console,
    error: jest.fn(),
    warn: jest.fn(),
    log: jest.fn()
};
