// Dynamic HTML includes system for header and footer
// Handles base path detection for both development and production environments

(function() {
    'use strict';
    
    // Detect base path based on current location
    function detectBasePath() {
        const path = window.location.pathname;
        
        // Check if we're in a subdirectory (e.g., /github/ai-optimization/)
        // Common patterns: localhost/github/ai-optimization/ or localhost:port/github/ai-optimization/
        const match = path.match(/^(\/[^\/]+\/[^\/]+)\//);
        
        if (match && !path.startsWith('/pages/') && !path.startsWith('/components/')) {
            return match[1]; // Returns something like "/github/ai-optimization"
        }
        
        return ''; // Production or root-level development
    }
    
    // Get the base path for the site
    window.AI_GEO = window.AI_GEO || {};
    window.AI_GEO.basePath = detectBasePath();
    
    // Helper function to resolve URLs with base path
    window.AI_GEO.resolveUrl = function(url) {
        if (!url || url.startsWith('#') || url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        
        // If URL starts with /, prepend base path
        if (url.startsWith('/')) {
            return window.AI_GEO.basePath + url;
        }
        
        return url;
    };
    
    // Load HTML content from a file and insert it into a target element
    function loadInclude(url, targetSelector) {
        return fetch(window.AI_GEO.resolveUrl(url))
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${url}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                const target = document.querySelector(targetSelector);
                if (target) {
                    target.innerHTML = html;
                    
                    // Fix all URLs in the loaded content
                    fixUrlsInElement(target);
                }
            })
            .catch(error => {
                console.error('Include load error:', error);
            });
    }
    
    // Fix all URLs in an element to use the base path
    function fixUrlsInElement(element) {
        // Fix anchor tags
        element.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('/') && !href.startsWith('//')) {
                link.setAttribute('href', window.AI_GEO.resolveUrl(href));
            }
        });
        
        // Fix img tags
        element.querySelectorAll('img[src]').forEach(img => {
            const src = img.getAttribute('src');
            if (src && src.startsWith('/') && !src.startsWith('//')) {
                img.setAttribute('src', window.AI_GEO.resolveUrl(src));
            }
        });
        
        // Fix link tags (stylesheets, etc.)
        element.querySelectorAll('link[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('/') && !href.startsWith('//')) {
                link.setAttribute('href', window.AI_GEO.resolveUrl(href));
            }
        });
        
        // Fix script tags
        element.querySelectorAll('script[src]').forEach(script => {
            const src = script.getAttribute('src');
            if (src && src.startsWith('/') && !src.startsWith('//')) {
                script.setAttribute('src', window.AI_GEO.resolveUrl(src));
            }
        });
    }
    
    // Initialize includes when DOM is ready
    function initIncludes() {
        const includeElements = document.querySelectorAll('[data-include]');
        const promises = [];
        
        includeElements.forEach(element => {
            const includeUrl = element.getAttribute('data-include');
            const targetSelector = '#' + element.id || element;
            
            if (includeUrl) {
                promises.push(loadInclude(includeUrl, '#' + element.id));
            }
        });
        
        // When all includes are loaded, trigger a custom event
        Promise.all(promises).then(() => {
            document.dispatchEvent(new CustomEvent('includesLoaded'));
        });
    }
    
    // Auto-load header and footer if placeholder elements exist
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initIncludes);
    } else {
        initIncludes();
    }
    
})();
