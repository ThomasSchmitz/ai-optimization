/**
 * Accessibility Utilities
 * ARIA helpers and keyboard navigation support
 */

(function() {
    'use strict';

    const A11y = {
        /**
         * Add keyboard navigation to elements
         * @param {HTMLElement} element - Element to make keyboard accessible
         * @param {Function} callback - Callback on Enter/Space
         */
        makeKeyboardAccessible(element, callback) {
            if (!element) return;
            
            if (!element.hasAttribute('tabindex')) {
                element.setAttribute('tabindex', '0');
            }
            
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    callback(e);
                }
            });
        },

        /**
         * Setup escape key to close modals/dropdowns
         * @param {HTMLElement} element - Element to close on Escape
         * @param {Function} closeCallback - Function to call when closing
         */
        setupEscapeKey(element, closeCallback) {
            const handler = (e) => {
                if (e.key === 'Escape') {
                    closeCallback();
                    document.removeEventListener('keydown', handler);
                }
            };
            
            document.addEventListener('keydown', handler);
            return handler;
        },

        /**
         * Trap focus within an element (for modals/dialogs)
         * @param {HTMLElement} element - Container element
         */
        trapFocus(element) {
            const focusableElements = element.querySelectorAll(
                'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length === 0) return;
            
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];
            
            element.addEventListener('keydown', (e) => {
                if (e.key !== 'Tab') return;
                
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            });
            
            firstFocusable.focus();
        },

        /**
         * Announce message to screen readers
         * @param {string} message - Message to announce
         * @param {string} priority - 'polite' or 'assertive'
         */
        announce(message, priority = 'polite') {
            let announcer = document.querySelector('.sr-announcer');
            if (!announcer) {
                announcer = document.createElement('div');
                announcer.className = 'sr-announcer';
                announcer.setAttribute('aria-live', priority);
                announcer.setAttribute('aria-atomic', 'true');
                announcer.style.cssText = 'position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden;';
                document.body.appendChild(announcer);
            }
            
            announcer.textContent = '';
            setTimeout(() => {
                announcer.textContent = message;
            }, 100);
        },

        /**
         * Set aria-current on active navigation item
         * @param {NodeList} links - Navigation links
         * @param {string} currentPath - Current page path
         */
        setAriaCurrent(links, currentPath) {
            links.forEach(link => {
                link.removeAttribute('aria-current');
                if (link.getAttribute('href') === currentPath) {
                    link.setAttribute('aria-current', 'page');
                }
            });
        },

        /**
         * Add skip to main content link
         */
        addSkipLink() {
            if (document.querySelector('.skip-link')) return;
            
            const skipLink = document.createElement('a');
            skipLink.href = '#main';
            skipLink.className = 'skip-link';
            skipLink.textContent = 'Skip to main content';
            
            document.body.insertBefore(skipLink, document.body.firstChild);
            
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const main = document.querySelector('#main, main');
                if (main) {
                    main.setAttribute('tabindex', '-1');
                    main.focus();
                }
            });
        },

        /**
         * Ensure minimum touch target size
         * @param {HTMLElement} element - Element to check
         * @param {number} minSize - Minimum size in pixels (default 44)
         */
        ensureTouchTarget(element, minSize = 44) {
            const rect = element.getBoundingClientRect();
            if (rect.width < minSize || rect.height < minSize) {
                element.style.minWidth = `${minSize}px`;
                element.style.minHeight = `${minSize}px`;
            }
        }
    };

    if (typeof window !== 'undefined') {
        window.AI_GEO = window.AI_GEO || {};
        window.AI_GEO.A11y = A11y;
    }

})();
