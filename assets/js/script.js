// Track document-level bindings so we only attach them once
let mobileMenuDismissBound = false;
let navLinkCloseBound = false;
let dropdownDismissBound = false;
let smoothScrollBound = false;

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    initializePageAfterIncludes();
    enableSmoothScroll();
});

// Listen for includes loaded event and re-initialize
document.addEventListener('includesLoaded', function() {
    initializePageAfterIncludes();
});

function initializePageAfterIncludes() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        // Remove old listeners by cloning and replacing
        const newToggle = mobileMenuToggle.cloneNode(true);
        mobileMenuToggle.parentNode.replaceChild(newToggle, mobileMenuToggle);
        
        newToggle.addEventListener('click', function() {
            const isExpanded = navLinks.classList.toggle('active');
            newToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // Close mobile menu when clicking a link (non-dropdown)
    bindMobileMenuClosers();

    // Initialize dropdowns
    initializeDropdowns();
    
    // Initialize breadcrumbs
    generateBreadcrumbs();
    
    // Set active navigation state
    setActiveNavigation();
}

// Dropdown menu functionality
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        let closeTimeout = null;
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (toggle) {
            if (toggle.dataset.dropdownBound === 'true') {
                return;
            }
            toggle.dataset.dropdownBound = 'true';
            // Desktop: hover behavior with delay to prevent premature closing
            if (window.innerWidth > 768) {
                dropdown.addEventListener('mouseenter', function() {
                    // Close other dropdowns immediately to prevent overlap
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });

                    // Clear any pending close timeout
                    if (closeTimeout) {
                        clearTimeout(closeTimeout);
                        closeTimeout = null;
                    }
                    this.classList.add('active');
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    // Add a delay before closing to allow users to move mouse to menu
                    const self = this;
                    closeTimeout = setTimeout(function() {
                        self.classList.remove('active');
                    }, 300); // 300ms delay
                });
            }
            
            // Mobile and click behavior
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            });
        }
    });
    
    // Close dropdowns when clicking outside
    if (!dropdownDismissBound) {
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
        dropdownDismissBound = true;
    }
}

// Generate breadcrumb navigation based on current page
function generateBreadcrumbs() {
    const breadcrumbContainer = document.querySelector('.breadcrumb-container');
    const breadcrumb = document.getElementById('breadcrumb');
    
    if (!breadcrumb) return;
    
    const path = window.location.pathname;
    const pathParts = path.split('/').filter(part => part && part !== 'index.html');
    
    // Only show breadcrumbs if not on home page
    if (pathParts.length === 0) {
        breadcrumbContainer.classList.remove('show');
        return;
    }
    
    breadcrumbContainer.classList.add('show');
    
    // Build breadcrumb items
    let breadcrumbHTML = '<li><a href="/index.html">Home</a></li>';
    let currentPath = '';
    
    // Custom mappings for intermediate paths
    const pathMapping = {
        '/pages': null, // Non-clickable
        '/pages/tools': '/pages/tools-directory.html',
        '/pages/guides': null,
        '/pages/industries': null,
        '/pages/platforms': null,
        '/pages/resources': null,
        '/pages/learn': '/pages/learn/index.html'
    };

    // Custom labels for specific paths/files
    const labelMapping = {
        'eeat-assessment': 'E-E-A-T Assessment',
        'eeat-optimization': 'E-E-A-T Optimization',
        'b2b': 'B2B',
        'saas': 'SaaS',
        'you-com': 'You.com',
        'chatgpt': 'ChatGPT',
        'gemini': 'Gemini',
        'claude': 'Claude',
        'copilot': 'Copilot',
        'grok': 'Grok',
        'perplexity': 'Perplexity',
        'meta-ai': 'Meta AI',
        'voice-search': 'Voice Search',
        'local-seo-ai': 'Local SEO AI',
        'technical-seo': 'Technical SEO',
        'schema-markup': 'Schema Markup',
        'agentic-ai-optimization': 'Agentic AI Optimization'
    };
    
    pathParts.forEach((part, index) => {
        currentPath += '/' + part;
        
        // Clean up the part name for display
        let displayName = part.replace('.html', '').replace(/-/g, ' ');
        
        // Check for custom label
        const cleanPart = part.replace('.html', '');
        if (labelMapping[cleanPart]) {
            displayName = labelMapping[cleanPart];
        } else {
            displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
        }
        
        if (index === pathParts.length - 1) {
            // Last item (current page)
            breadcrumbHTML += `<li><span>${displayName}</span></li>`;
        } else {
            // Parent directories
            let url = currentPath;
            let isClickable = true;

            // Check mappings
            if (pathMapping.hasOwnProperty(currentPath)) {
                if (pathMapping[currentPath] === null) {
                    isClickable = false;
                } else {
                    url = pathMapping[currentPath];
                }
            }

            if (isClickable) {
                breadcrumbHTML += `<li><a href="${url}">${displayName}</a></li>`;
            } else {
                breadcrumbHTML += `<li><span>${displayName}</span></li>`;
            }
        }
    });
    
    breadcrumb.innerHTML = breadcrumbHTML;
}

// Set active navigation state based on current page
function setActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a, .dropdown-menu a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Remove active class from all links
        link.classList.remove('active');
        
        // Check if link matches current page
        if (linkPath && linkPath !== '#') {
            // Handle absolute paths and hash links
            if (linkPath.startsWith('/') && currentPath === linkPath) {
                link.classList.add('active');
            } else if (linkPath.includes('#') && currentPath === '/index.html') {
                // For hash links on index page
                const hash = window.location.hash;
                if (hash && linkPath.includes(hash)) {
                    link.classList.add('active');
                }
            }
        }
    });
}

// Update active navigation on hash change (for single-page navigation)
window.addEventListener('hashchange', setActiveNavigation);

function bindMobileMenuClosers() {
    if (!navLinkCloseBound) {
        document.addEventListener('click', function(event) {
            const link = event.target.closest('.nav-links a:not(.dropdown-toggle)');
            if (!link) return;
            const navLinks = document.querySelector('.nav-links');
            const toggle = document.querySelector('.mobile-menu-toggle');
            if (navLinks) {
                navLinks.classList.remove('active');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            }
        });
        navLinkCloseBound = true;
    }

    if (!mobileMenuDismissBound) {
        document.addEventListener('click', function(event) {
            const navLinks = document.querySelector('.nav-links');
            const toggle = document.querySelector('.mobile-menu-toggle');
            if (!navLinks) {
                return;
            }
            const isClickInside = event.target.closest('.navbar');
            if (!isClickInside && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            }
        });
        mobileMenuDismissBound = true;
    }
}

// Smooth scrolling for anchor links (delegated so late-loaded links are supported)
function enableSmoothScroll() {
    if (smoothScrollBound) return;

    document.addEventListener('click', function(event) {
        const anchor = event.target.closest('a[href^="#"]');
        if (!anchor) return;

        const href = anchor.getAttribute('href');
        if (!href || href === '#') {
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            event.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });

    smoothScrollBound = true;
}

// Add active state to navigation based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Add animation on scroll for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards on page load
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card, .tool-card, .guide-card, .practice-card, .resource-category');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
