/**
 * Theme Toggle Functionality
 * Handles switching between dark (default) and light modes
 * Persists preference in localStorage
 */

(function() {
    'use strict';

    function initThemeToggle() {
        // Check for saved theme preference, otherwise use default (dark)
        const currentTheme = localStorage.getItem('theme') || 'dark';
        
        // Apply current theme immediately
        if (currentTheme === 'light') {
            document.documentElement.classList.add('light-mode');
        } else {
            document.documentElement.classList.remove('light-mode');
        }
        
        // Initialize all toggle switches (header and footer)
        const themeToggles = document.querySelectorAll('.theme-toggle-checkbox');
        
        if (themeToggles.length === 0) {
            // If toggles not found yet, wait for includesLoaded event
            return false;
        }
        
        themeToggles.forEach(toggle => {
            // Remove any existing listeners to prevent duplicates
            const newToggle = toggle.cloneNode(true);
            toggle.parentNode.replaceChild(newToggle, toggle);
        });
        
        // Re-query after replacement
        const toggles = document.querySelectorAll('.theme-toggle-checkbox');
        
        toggles.forEach(toggle => {
            // Set initial state
            toggle.checked = currentTheme === 'light';
            
            // Add event listener
            toggle.addEventListener('change', function() {
                if (this.checked) {
                    document.documentElement.classList.add('light-mode');
                    localStorage.setItem('theme', 'light');
                    // Sync other toggles
                    toggles.forEach(t => {
                        if (t !== this) {
                            t.checked = true;
                        }
                    });
                } else {
                    document.documentElement.classList.remove('light-mode');
                    localStorage.setItem('theme', 'dark');
                    // Sync other toggles
                    toggles.forEach(t => {
                        if (t !== this) {
                            t.checked = false;
                        }
                    });
                }
            });
        });
        
        return true;
    }

    // Try to initialize immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeToggle);
    } else {
        initThemeToggle();
    }

    // Also initialize when includes are loaded
    document.addEventListener('includesLoaded', function() {
        setTimeout(initThemeToggle, 100);
    });

})();
