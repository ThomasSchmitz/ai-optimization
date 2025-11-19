/**
 * Security Utility Tests
 */

describe('Security Utility', () => {
    let Security;

    beforeAll(() => {
        require('../assets/js/utils/security.js');
        Security = window.AI_GEO.Security;
    });

    describe('sanitizeHTML', () => {
        test('should convert HTML to text', () => {
            const html = '<script>alert("XSS")</script>';
            const result = Security.sanitizeHTML(html);
            expect(result).not.toContain('<script>');
        });

        test('should handle empty input', () => {
            expect(Security.sanitizeHTML('')).toBe('');
            expect(Security.sanitizeHTML(null)).toBe('');
        });
    });

    describe('validateURL', () => {
        test('should accept valid HTTP URLs', () => {
            expect(Security.validateURL('http://example.com')).toBe(true);
            expect(Security.validateURL('https://example.com')).toBe(true);
        });

        test('should reject javascript URLs', () => {
            expect(Security.validateURL('javascript:alert(1)')).toBe(false);
        });

        test('should handle empty input', () => {
            expect(Security.validateURL('')).toBe(false);
            expect(Security.validateURL(null)).toBe(false);
        });
    });
});
