/**
 * Performance Utilities
 * Debouncing, throttling, and lazy loading helpers
 */

(function() {
    'use strict';

    const Performance = {
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        lazyLoad(elements, callback, options = {}) {
            const defaultOptions = {
                root: null,
                rootMargin: '50px',
                threshold: 0.1
            };

            const observerOptions = { ...defaultOptions, ...options };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        callback(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            elements.forEach(el => observer.observe(el));
            return observer;
        }
    };

    if (typeof window !== 'undefined') {
        window.AI_GEO = window.AI_GEO || {};
        window.AI_GEO.Performance = Performance;
    }

})();
