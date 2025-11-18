// Client-side search functionality for AI GEO
(function() {
    let searchIndex = [];
    let currentFilter = 'all';
    
    // Load search index
    async function loadSearchIndex() {
        try {
            const response = await fetch('/assets/data/search-index.json');
            const data = await response.json();
            searchIndex = data.pages || [];
        } catch (error) {
            console.error('Error loading search index:', error);
            searchIndex = [];
        }
    }
    
    // Perform search
    function performSearch(query) {
        if (!query || query.trim() === '') {
            return [];
        }
        
        const searchTerm = query.toLowerCase().trim();
        const results = [];
        
        searchIndex.forEach(page => {
            let score = 0;
            let matchedText = '';
            
            // Check title (highest weight)
            if (page.title.toLowerCase().includes(searchTerm)) {
                score += 10;
                matchedText = page.title;
            }
            
            // Check keywords (high weight)
            const keywordMatches = page.keywords.filter(keyword => 
                keyword.toLowerCase().includes(searchTerm)
            );
            if (keywordMatches.length > 0) {
                score += 5 * keywordMatches.length;
                if (!matchedText) matchedText = keywordMatches.join(', ');
            }
            
            // Check description (medium weight)
            if (page.description.toLowerCase().includes(searchTerm)) {
                score += 3;
                if (!matchedText) matchedText = page.description;
            }
            
            // Check content (lower weight)
            if (page.content.toLowerCase().includes(searchTerm)) {
                score += 1;
                if (!matchedText) matchedText = page.content;
            }
            
            // Apply category filter
            if (currentFilter !== 'all' && page.category !== currentFilter) {
                score = 0;
            }
            
            if (score > 0) {
                results.push({
                    ...page,
                    score,
                    matchedText: matchedText || page.description
                });
            }
        });
        
        // Sort by score (descending)
        results.sort((a, b) => b.score - a.score);
        
        return results;
    }
    
    // Highlight search term in text
    function highlightTerm(text, term) {
        if (!term) return text;
        
        const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }
    
    // Escape special regex characters
    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    // Get snippet from text containing search term
    function getSnippet(text, term, maxLength = 200) {
        const lowerText = text.toLowerCase();
        const lowerTerm = term.toLowerCase();
        const index = lowerText.indexOf(lowerTerm);
        
        if (index === -1) {
            return text.substring(0, maxLength) + (text.length > maxLength ? '...' : '');
        }
        
        const start = Math.max(0, index - 50);
        const end = Math.min(text.length, index + term.length + 150);
        
        let snippet = text.substring(start, end);
        
        if (start > 0) snippet = '...' + snippet;
        if (end < text.length) snippet = snippet + '...';
        
        return snippet;
    }
    
    // Display search results
    function displayResults(results, query) {
        const resultsContainer = document.getElementById('search-results');
        const noResults = document.getElementById('no-results');
        const searchStats = document.getElementById('search-stats');
        
        if (!resultsContainer) return;
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '';
            resultsContainer.style.display = 'none';
            noResults.style.display = 'block';
            searchStats.style.display = 'none';
            return;
        }
        
        noResults.style.display = 'none';
        resultsContainer.style.display = 'block';
        searchStats.style.display = 'block';
        
        // Display search stats
        const filterText = currentFilter === 'all' ? '' : ` in ${currentFilter}`;
        searchStats.textContent = `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"${filterText}`;
        
        // Build results HTML
        const resultsHTML = results.map(result => {
            const categoryLabels = {
                'platform': 'AI Platform',
                'guide': 'Guide',
                'glossary': 'Glossary',
                'resource': 'Resource'
            };
            
            const snippet = getSnippet(result.matchedText, query);
            const highlightedSnippet = highlightTerm(snippet, query);
            const highlightedTitle = highlightTerm(result.title, query);
            
            return `
                <div class="search-result">
                    <span class="result-category">${categoryLabels[result.category] || 'Page'}</span>
                    <h3 class="result-title">
                        <a href="${result.url}">${highlightedTitle}</a>
                    </h3>
                    <p class="result-snippet">${highlightedSnippet}</p>
                    <div class="result-url">${window.location.origin}${result.url}</div>
                </div>
            `;
        }).join('');
        
        resultsContainer.innerHTML = resultsHTML;
    }
    
    // Handle search
    function handleSearch() {
        const searchInput = document.getElementById('search-input');
        if (!searchInput) return;
        
        const query = searchInput.value;
        const results = performSearch(query);
        displayResults(results, query);
    }
    
    // Initialize search functionality
    function initSearch() {
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        const filterButtons = document.querySelectorAll('.filter-button');
        
        if (!searchInput) return;
        
        // Load search index
        loadSearchIndex();
        
        // Search on button click
        if (searchButton) {
            searchButton.addEventListener('click', handleSearch);
        }
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
        
        // Real-time search as user types (debounced)
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(handleSearch, 300);
        });
        
        // Handle filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Update current filter
                currentFilter = this.dataset.category;
                
                // Re-run search if there's a query
                if (searchInput.value.trim() !== '') {
                    handleSearch();
                }
            });
        });
        
        // Check for URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const queryParam = urlParams.get('q');
        if (queryParam) {
            searchInput.value = queryParam;
            handleSearch();
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSearch);
    } else {
        initSearch();
    }
})();
