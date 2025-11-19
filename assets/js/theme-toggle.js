/**
 * Theme Toggle Functionality
 * Handles switching between dark (default) and light modes
 * Persists preference in localStorage
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme preference, otherwise use default (dark)
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply current theme
    if (currentTheme === 'light') {
        document.documentElement.classList.add('light-mode');
    }
    
    // Initialize all toggle switches (header and footer)
    const themeToggles = document.querySelectorAll('.theme-toggle-checkbox');
    
    themeToggles.forEach(toggle => {
        // Set initial state
        toggle.checked = currentTheme === 'light';
        
        // Add event listener
        toggle.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
                // Sync other toggles
                themeToggles.forEach(t => t.checked = true);
            } else {
                document.documentElement.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark');
                // Sync other toggles
                themeToggles.forEach(t => t.checked = false);
            }
        });
    });
});
