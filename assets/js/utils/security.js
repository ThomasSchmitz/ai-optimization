/**
 * Security Utilities
 * Provides XSS protection and input sanitization
 */

(function() {
    'use strict';

    const Security = {
        /**
         * Sanitize HTML content to prevent XSS attacks
         * @param {string} html - The HTML string to sanitize
         * @returns {string} Sanitized HTML
         */
        sanitizeHTML(html) {
            if (!html) return '';
            
            const temp = document.createElement('div');
            temp.textContent = html;
            return temp.innerHTML;
        },

        /**
         * Advanced HTML sanitization that allows safe HTML tags
         * @param {string} html - The HTML string to sanitize
         * @param {Array} allowedTags - Array of allowed HTML tags
         * @returns {string} Sanitized HTML with allowed tags
         */
        sanitizeHTMLWithTags(html, allowedTags = ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'span']) {
            if (!html) return '';
            
            const temp = document.createElement('div');
            temp.innerHTML = html;
            
            this.removeScriptsAndEvents(temp);
            this.removeDisallowedTags(temp, allowedTags);
            
            return temp.innerHTML;
        },

        /**
         * Remove all script tags and event handler attributes
         * @param {HTMLElement} element - The element to clean
         */
        removeScriptsAndEvents(element) {
            const scripts = element.querySelectorAll('script');
            scripts.forEach(script => script.remove());
            
            const allElements = element.querySelectorAll('*');
            allElements.forEach(el => {
                const attrs = Array.from(el.attributes);
                attrs.forEach(attr => {
                    if (attr.name.startsWith('on')) {
                        el.removeAttribute(attr.name);
                    }
                    if (attr.value && attr.value.toLowerCase().includes('javascript:')) {
                        el.removeAttribute(attr.name);
                    }
                });
            });
        },

        /**
         * Remove tags that are not in the allowed list
         * @param {HTMLElement} element - The element to clean
         * @param {Array} allowedTags - Array of allowed tag names
         */
        removeDisallowedTags(element, allowedTags) {
            const allElements = element.querySelectorAll('*');
            allElements.forEach(el => {
                if (!allowedTags.includes(el.tagName.toLowerCase())) {
                    const text = document.createTextNode(el.textContent);
                    el.parentNode.replaceChild(text, el);
                }
            });
        },

        /**
         * Escape HTML special characters
         * @param {string} text - Text to escape
         * @returns {string} Escaped text
         */
        escapeHTML(text) {
            if (!text) return '';
            
            const div = document.createElement('div');
            div.appendChild(document.createTextNode(text));
            return div.innerHTML;
        },

        /**
         * Validate URL to prevent XSS
         * @param {string} url - URL to validate
         * @returns {boolean} True if URL is safe
         */
        validateURL(url) {
            if (!url) return false;
            
            try {
                const parsed = new URL(url, window.location.origin);
                const safeProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
                return safeProtocols.includes(parsed.protocol);
            } catch {
                return !url.toLowerCase().includes('javascript:');
            }
        },

        /**
         * Sanitize URL
         * @param {string} url - URL to sanitize
         * @returns {string} Sanitized URL or empty string if invalid
         */
        sanitizeURL(url) {
            return this.validateURL(url) ? url : '';
        }
    };

    if (typeof window !== 'undefined') {
        window.AI_GEO = window.AI_GEO || {};
        window.AI_GEO.Security = Security;
    }

})();
