// AI GEO Interactive Tools JavaScript
// Contains functionality for all interactive tools and calculators

(function() {
    'use strict';

    // ============================================================================
    // AI Visibility Scorecard
    // ============================================================================
    
    function initVisibilityScorecard() {
        const form = document.getElementById('visibility-scorecard-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateVisibilityScore();
        });
    }

    function calculateVisibilityScore() {
        const form = document.getElementById('visibility-scorecard-form');
        const formData = new FormData(form);
        
        // Calculate scores by category
        const categories = {
            'Technical Foundation': ['schema', 'mobile', 'sitemap'],
            'Content Quality': ['content-depth', 'content-freshness', 'citations'],
            'Authority & Trust': ['backlinks', 'author-bios', 'trust-signals'],
            'Voice Search': ['faq', 'natural-language'],
            'Social Integration': ['social-activity', 'social-tags']
        };

        let categoryScores = {};
        let totalScore = 0;
        let maxScore = 0;

        // Calculate scores for each category
        for (const [category, fields] of Object.entries(categories)) {
            let categoryTotal = 0;
            let categoryMax = 0;

            fields.forEach(field => {
                const value = parseInt(formData.get(field)) || 0;
                categoryTotal += value;
                categoryMax += 3; // Max value per question
            });

            const categoryPercent = (categoryTotal / categoryMax) * 100;
            categoryScores[category] = {
                score: categoryTotal,
                max: categoryMax,
                percent: Math.round(categoryPercent)
            };

            totalScore += categoryTotal;
            maxScore += categoryMax;
        }

        const finalScore = Math.round((totalScore / maxScore) * 100);

        // Display results
        displayVisibilityResults(finalScore, categoryScores);
    }

    function displayVisibilityResults(score, categoryScores) {
        const resultsDiv = document.getElementById('scorecard-results');
        const scoreValue = document.getElementById('total-score');
        const scoreRating = document.getElementById('score-rating');
        const categoryScoresDiv = document.getElementById('category-scores');
        const recommendationsDiv = document.getElementById('recommendations-list');

        // Show results
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Display score
        scoreValue.textContent = score;

        // Determine rating
        let rating, ratingClass;
        if (score >= 90) {
            rating = 'Excellent - Well Optimized for AI';
            ratingClass = 'excellent';
        } else if (score >= 70) {
            rating = 'Good - Solid Foundation';
            ratingClass = 'good';
        } else if (score >= 50) {
            rating = 'Fair - Needs Improvement';
            ratingClass = 'fair';
        } else {
            rating = 'Needs Work - Critical Gaps';
            ratingClass = 'poor';
        }

        scoreRating.textContent = rating;
        scoreRating.className = 'score-rating ' + ratingClass;

        // Display category breakdown
        let categoryHTML = '';
        for (const [category, data] of Object.entries(categoryScores)) {
            const barClass = data.percent >= 70 ? 'good' : data.percent >= 50 ? 'fair' : 'poor';
            categoryHTML += `
                <div class="category-score">
                    <div class="category-header">
                        <span class="category-name">${category}</span>
                        <span class="category-percent">${data.percent}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill ${barClass}" style="width: ${data.percent}%"></div>
                    </div>
                </div>
            `;
        }
        categoryScoresDiv.innerHTML = categoryHTML;

        // Generate recommendations
        const recommendations = generateVisibilityRecommendations(score, categoryScores);
        recommendationsDiv.innerHTML = recommendations.map(rec => 
            `<div class="recommendation-item">
                <div class="rec-priority ${rec.priority}">${rec.priority.toUpperCase()}</div>
                <h4>${rec.title}</h4>
                <p>${rec.description}</p>
            </div>`
        ).join('');
    }

    function generateVisibilityRecommendations(score, categoryScores) {
        const recommendations = [];

        // Check each category and provide specific recommendations
        for (const [category, data] of Object.entries(categoryScores)) {
            if (data.percent < 70) {
                const priority = data.percent < 50 ? 'high' : 'medium';
                
                if (category === 'Technical Foundation') {
                    recommendations.push({
                        priority,
                        title: 'Improve Technical Infrastructure',
                        description: 'Implement comprehensive schema markup, ensure mobile responsiveness, and create/update your XML sitemap and robots.txt files.'
                    });
                } else if (category === 'Content Quality') {
                    recommendations.push({
                        priority,
                        title: 'Enhance Content Depth and Quality',
                        description: 'Create more in-depth, original content with external citations. Update existing content regularly to maintain freshness.'
                    });
                } else if (category === 'Authority & Trust') {
                    recommendations.push({
                        priority,
                        title: 'Build Authority Signals',
                        description: 'Focus on acquiring quality backlinks, displaying author credentials prominently, and adding trust indicators like reviews and certifications.'
                    });
                } else if (category === 'Voice Search') {
                    recommendations.push({
                        priority,
                        title: 'Optimize for Voice Search',
                        description: 'Add comprehensive FAQ sections and write in a more conversational, natural language style that matches how people speak.'
                    });
                } else if (category === 'Social Integration') {
                    recommendations.push({
                        priority,
                        title: 'Strengthen Social Presence',
                        description: 'Implement Open Graph and Twitter Card tags. Increase activity on relevant social media platforms.'
                    });
                }
            }
        }

        // Add general recommendations based on overall score
        if (score < 50) {
            recommendations.unshift({
                priority: 'high',
                title: 'Start with Technical Foundation',
                description: 'Before focusing on content, ensure your technical infrastructure is solid. Implement schema markup and ensure mobile optimization.'
            });
        }

        return recommendations.slice(0, 5); // Return top 5 recommendations
    }

    // ============================================================================
    // Schema Markup Validator
    // ============================================================================
    
    function initSchemaValidator() {
        const validateBtn = document.getElementById('validate-btn');
        const clearBtn = document.getElementById('clear-btn');
        const exampleBtn = document.getElementById('example-btn');
        
        if (!validateBtn) return;

        validateBtn.addEventListener('click', validateSchema);
        clearBtn.addEventListener('click', clearSchemaInput);
        exampleBtn.addEventListener('click', loadExampleSchema);
    }

    function validateSchema() {
        const input = document.getElementById('schema-input').value.trim();
        const resultsDiv = document.getElementById('validation-results');
        const statusDiv = document.getElementById('validation-status');
        const messagesDiv = document.getElementById('validation-messages');
        const detailsDiv = document.getElementById('schema-details');
        const schemaInfoDiv = document.getElementById('schema-info');
        const recommendationsDiv = document.getElementById('recommendations');
        const recListDiv = document.getElementById('recommendations-list');

        if (!input) {
            alert('Please paste your schema markup to validate.');
            return;
        }

        let schema;
        let isValid = true;
        let messages = [];

        // Try to parse JSON
        try {
            schema = JSON.parse(input);
            messages.push({ type: 'success', text: '✓ Valid JSON syntax' });
        } catch (e) {
            isValid = false;
            messages.push({ type: 'error', text: `✗ JSON Syntax Error: ${e.message}` });
        }

        // Validate schema structure
        if (isValid && schema) {
            // Check for @context
            if (!schema['@context']) {
                messages.push({ type: 'warning', text: '⚠ Missing @context property (should be "https://schema.org")' });
            } else if (schema['@context'] !== 'https://schema.org') {
                messages.push({ type: 'warning', text: '⚠ @context should be "https://schema.org"' });
            } else {
                messages.push({ type: 'success', text: '✓ Valid @context' });
            }

            // Check for @type
            if (!schema['@type']) {
                messages.push({ type: 'error', text: '✗ Missing @type property (required)' });
                isValid = false;
            } else {
                messages.push({ type: 'success', text: `✓ Schema type: ${schema['@type']}` });
            }

            // Type-specific validation
            if (schema['@type']) {
                const typeRecommendations = validateSchemaType(schema);
                if (typeRecommendations.length > 0) {
                    messages.push(...typeRecommendations);
                }
            }
        }

        // Display results
        resultsDiv.style.display = 'block';
        statusDiv.textContent = isValid ? '✓ Schema is Valid' : '✗ Schema has Errors';
        statusDiv.className = isValid ? 'success' : 'error';

        messagesDiv.innerHTML = messages.map(msg => 
            `<div class="validation-message ${msg.type}">${msg.text}</div>`
        ).join('');

        // Show schema details if valid
        if (isValid && schema) {
            detailsDiv.style.display = 'block';
            schemaInfoDiv.innerHTML = `
                <p><strong>Type:</strong> ${schema['@type']}</p>
                <p><strong>Properties Found:</strong> ${Object.keys(schema).length}</p>
            `;

            // Show recommendations
            const recommendations = getSchemaRecommendations(schema);
            if (recommendations.length > 0) {
                recommendationsDiv.style.display = 'block';
                recListDiv.innerHTML = recommendations.map(rec => 
                    `<div class="recommendation-item">
                        <h4>${rec.title}</h4>
                        <p>${rec.description}</p>
                    </div>`
                ).join('');
            }
        }

        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }

    function validateSchemaType(schema) {
        const messages = [];
        const type = schema['@type'];

        // Common required properties by type
        const requiredProps = {
            'Organization': ['name', 'url'],
            'Product': ['name', 'description'],
            'Article': ['headline', 'author'],
            'FAQPage': ['mainEntity'],
            'LocalBusiness': ['name', 'address'],
            'HowTo': ['name', 'step']
        };

        if (requiredProps[type]) {
            requiredProps[type].forEach(prop => {
                if (!schema[prop]) {
                    messages.push({ 
                        type: 'warning', 
                        text: `⚠ Recommended property missing: ${prop}` 
                    });
                }
            });
        }

        return messages;
    }

    function getSchemaRecommendations(schema) {
        const recommendations = [];
        const type = schema['@type'];

        if (type === 'Organization') {
            if (!schema.logo) {
                recommendations.push({
                    title: 'Add Logo',
                    description: 'Include a logo URL to help AI platforms identify your brand visually.'
                });
            }
            if (!schema.sameAs) {
                recommendations.push({
                    title: 'Add Social Profiles',
                    description: 'Use the "sameAs" property to link to your social media profiles.'
                });
            }
        }

        if (type === 'Product' && !schema.offers) {
            recommendations.push({
                title: 'Add Offers Information',
                description: 'Include pricing and availability information using the "offers" property.'
            });
        }

        return recommendations;
    }

    function clearSchemaInput() {
        document.getElementById('schema-input').value = '';
        document.getElementById('validation-results').style.display = 'none';
    }

    function loadExampleSchema() {
        const example = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Example Company",
            "url": "https://example.com",
            "logo": "https://example.com/logo.png",
            "sameAs": [
                "https://facebook.com/example",
                "https://twitter.com/example"
            ]
        };
        document.getElementById('schema-input').value = JSON.stringify(example, null, 2);
    }

    // ============================================================================
    // Content AI-Readiness Checker
    // ============================================================================
    
    function initContentChecker() {
        const analyzeBtn = document.getElementById('analyze-btn');
        const clearBtn = document.getElementById('clear-content-btn');
        
        if (!analyzeBtn) return;

        analyzeBtn.addEventListener('click', analyzeContent);
        if (clearBtn) clearBtn.addEventListener('click', clearContentInput);
    }

    function analyzeContent() {
        const content = document.getElementById('content-input').value.trim();
        
        if (!content || content.split(/\s+/).length < 100) {
            alert('Please enter at least 100 words of content to analyze.');
            return;
        }

        const analysis = performContentAnalysis(content);
        displayContentResults(analysis);
    }

    function performContentAnalysis(content) {
        const words = content.split(/\s+/);
        const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0);

        // Basic statistics
        const wordCount = words.length;
        const sentenceCount = sentences.length;
        const avgSentenceLength = wordCount / sentenceCount;
        const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

        // Readability (simplified Flesch Reading Ease approximation)
        const avgWordLength = words.join('').length / wordCount;
        const readabilityScore = Math.max(0, Math.min(100, 
            206.835 - 1.015 * avgSentenceLength - 84.6 * (avgWordLength / 5)
        ));

        // Check for questions
        const questions = sentences.filter(s => s.trim().endsWith('?')).length;
        
        // Check for lists
        const hasLists = /[-*•]|\d+\./.test(content);
        
        // Check for headings (approximate)
        const hasHeadings = /^#{1,6}\s|^[A-Z][^.!?]*$/m.test(content);

        // Scoring
        let score = 0;
        const categories = {};

        // Readability (25 points)
        let readabilityPoints = 0;
        if (readabilityScore >= 60) readabilityPoints = 25;
        else if (readabilityScore >= 50) readabilityPoints = 20;
        else if (readabilityScore >= 40) readabilityPoints = 15;
        else readabilityPoints = 10;
        
        categories['Readability'] = {
            score: readabilityPoints,
            max: 25,
            percent: Math.round((readabilityPoints / 25) * 100)
        };
        score += readabilityPoints;

        // Structure (25 points)
        let structurePoints = 0;
        if (hasHeadings) structurePoints += 10;
        if (hasLists) structurePoints += 10;
        if (paragraphs.length >= 3) structurePoints += 5;
        
        categories['Structure'] = {
            score: structurePoints,
            max: 25,
            percent: Math.round((structurePoints / 25) * 100)
        };
        score += structurePoints;

        // Content depth (25 points)
        let depthPoints = 0;
        if (wordCount >= 1500) depthPoints = 25;
        else if (wordCount >= 1000) depthPoints = 20;
        else if (wordCount >= 500) depthPoints = 15;
        else depthPoints = 10;
        
        categories['Content Depth'] = {
            score: depthPoints,
            max: 25,
            percent: Math.round((depthPoints / 25) * 100)
        };
        score += depthPoints;

        // Conversational (25 points)
        let conversationalPoints = 0;
        if (questions >= 3) conversationalPoints = 25;
        else if (questions >= 1) conversationalPoints = 15;
        else conversationalPoints = 5;
        
        categories['Conversational Style'] = {
            score: conversationalPoints,
            max: 25,
            percent: Math.round((conversationalPoints / 25) * 100)
        };
        score += conversationalPoints;

        return {
            score,
            wordCount,
            readingTime,
            readabilityScore: Math.round(readabilityScore),
            avgSentenceLength: Math.round(avgSentenceLength),
            categories,
            hasQuestions: questions > 0,
            hasLists,
            hasHeadings
        };
    }

    function displayContentResults(analysis) {
        const resultsDiv = document.getElementById('content-results');
        const scoreValue = document.getElementById('content-score');
        const ratingDiv = document.getElementById('content-rating');
        const wordCountDiv = document.getElementById('word-count');
        const readingTimeDiv = document.getElementById('reading-time');
        const readabilityDiv = document.getElementById('readability-score');
        const avgSentenceDiv = document.getElementById('avg-sentence');
        const breakdownDiv = document.getElementById('analysis-breakdown');
        const recommendationsDiv = document.getElementById('content-recommendations');

        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth' });

        // Display score
        scoreValue.textContent = analysis.score;
        
        let rating, ratingClass;
        if (analysis.score >= 90) {
            rating = 'Excellent - Highly AI-Ready';
            ratingClass = 'excellent';
        } else if (analysis.score >= 70) {
            rating = 'Good - Well Optimized';
            ratingClass = 'good';
        } else if (analysis.score >= 50) {
            rating = 'Fair - Needs Improvement';
            ratingClass = 'fair';
        } else {
            rating = 'Poor - Significant Work Needed';
            ratingClass = 'poor';
        }
        
        ratingDiv.textContent = rating;
        ratingDiv.className = 'score-rating ' + ratingClass;

        // Display stats
        wordCountDiv.textContent = analysis.wordCount;
        readingTimeDiv.textContent = analysis.readingTime + ' min';
        readabilityDiv.textContent = analysis.readabilityScore;
        avgSentenceDiv.textContent = analysis.avgSentenceLength + ' words';

        // Display category breakdown
        let breakdownHTML = '';
        for (const [category, data] of Object.entries(analysis.categories)) {
            const barClass = data.percent >= 70 ? 'good' : data.percent >= 50 ? 'fair' : 'poor';
            breakdownHTML += `
                <div class="category-score">
                    <div class="category-header">
                        <span class="category-name">${category}</span>
                        <span class="category-percent">${data.percent}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill ${barClass}" style="width: ${data.percent}%"></div>
                    </div>
                </div>
            `;
        }
        breakdownDiv.innerHTML = breakdownHTML;

        // Generate recommendations
        const recommendations = generateContentRecommendations(analysis);
        recommendationsDiv.innerHTML = recommendations.map(rec => 
            `<div class="recommendation-item">
                <h4>${rec.title}</h4>
                <p>${rec.description}</p>
            </div>`
        ).join('');
    }

    function generateContentRecommendations(analysis) {
        const recommendations = [];

        if (analysis.categories['Readability'].percent < 70) {
            recommendations.push({
                title: 'Improve Readability',
                description: 'Shorten sentences and use simpler language. Aim for an average sentence length of 15-20 words.'
            });
        }

        if (!analysis.hasHeadings) {
            recommendations.push({
                title: 'Add Clear Headings',
                description: 'Use H2 and H3 headings to organize your content into clear sections. This helps both readers and AI understand your content structure.'
            });
        }

        if (!analysis.hasLists) {
            recommendations.push({
                title: 'Include Lists',
                description: 'Add bullet points or numbered lists to make content more scannable and digestible.'
            });
        }

        if (!analysis.hasQuestions) {
            recommendations.push({
                title: 'Address Questions',
                description: 'Include FAQ-style questions and answers. This optimizes for voice search and makes content more conversational.'
            });
        }

        if (analysis.wordCount < 1000) {
            recommendations.push({
                title: 'Expand Content Depth',
                description: 'Aim for at least 1000-1500 words for comprehensive coverage. AI platforms favor in-depth, authoritative content.'
            });
        }

        return recommendations;
    }

    function clearContentInput() {
        document.getElementById('content-input').value = '';
        document.getElementById('content-url').value = '';
        document.getElementById('content-results').style.display = 'none';
    }

    // ============================================================================
    // Voice Search Optimization Analyzer
    // ============================================================================
    
    function initVoiceSearchAnalyzer() {
        const form = document.getElementById('voice-search-form');
        const isLocalSelect = document.getElementById('is-local');
        const localDetails = document.getElementById('local-details');
        
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            analyzeVoiceSearch();
        });

        if (isLocalSelect) {
            isLocalSelect.addEventListener('change', function() {
                if (localDetails) {
                    localDetails.style.display = this.value === 'yes' ? 'block' : 'none';
                }
            });
        }
    }

    function analyzeVoiceSearch() {
        const content = document.getElementById('voice-content').value.trim();
        const title = document.getElementById('page-title').value;
        const isLocal = document.getElementById('is-local').value === 'yes';
        const elements = Array.from(document.querySelectorAll('input[name="elements"]:checked'))
            .map(cb => cb.value);

        if (!content) {
            alert('Please enter content to analyze.');
            return;
        }

        const analysis = performVoiceSearchAnalysis(content, title, isLocal, elements);
        displayVoiceSearchResults(analysis);
    }

    function performVoiceSearchAnalysis(content, title, isLocal, elements) {
        const words = content.split(/\s+/);
        const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);

        // Detect questions
        const questionWords = ['who', 'what', 'when', 'where', 'why', 'how', 'can', 'will', 'should', 'would'];
        const questions = sentences.filter(s => {
            const lower = s.trim().toLowerCase();
            return lower.endsWith('?') || questionWords.some(q => lower.startsWith(q));
        });

        // Check for conversational tone
        const conversationalPhrases = ['you can', 'you should', 'you might', 'we recommend', 'let\'s', 'here\'s'];
        const hasConversational = conversationalPhrases.some(phrase => content.toLowerCase().includes(phrase));

        // Check for long-tail keywords (3+ words)
        const avgWordLength = words.join('').length / words.length;
        
        // Calculate score
        let score = 0;
        const categories = {};

        // Question format (25 points)
        let questionPoints = 0;
        if (questions.length >= 5) questionPoints = 25;
        else if (questions.length >= 3) questionPoints = 20;
        else if (questions.length >= 1) questionPoints = 15;
        else questionPoints = 5;
        
        categories['Question Format'] = {
            score: questionPoints,
            max: 25,
            percent: Math.round((questionPoints / 25) * 100)
        };
        score += questionPoints;

        // Conversational language (20 points)
        let conversationalPoints = hasConversational ? 20 : 10;
        categories['Conversational Tone'] = {
            score: conversationalPoints,
            max: 20,
            percent: Math.round((conversationalPoints / 20) * 100)
        };
        score += conversationalPoints;

        // Elements present (30 points)
        let elementsPoints = elements.length * 6;
        categories['Voice-Optimized Elements'] = {
            score: elementsPoints,
            max: 30,
            percent: Math.round((elementsPoints / 30) * 100)
        };
        score += elementsPoints;

        // Local optimization (15 points if applicable)
        let localPoints = 0;
        if (isLocal) {
            const hasLocation = /address|location|near|directions|hours/i.test(content);
            localPoints = hasLocation ? 15 : 5;
        } else {
            localPoints = 15; // Full points if not local business
        }
        categories['Local Optimization'] = {
            score: localPoints,
            max: 15,
            percent: Math.round((localPoints / 15) * 100)
        };
        score += localPoints;

        // Natural language (10 points)
        let naturalPoints = avgWordLength < 6 ? 10 : 5;
        categories['Natural Language'] = {
            score: naturalPoints,
            max: 10,
            percent: Math.round((naturalPoints / 10) * 100)
        };
        score += naturalPoints;

        return {
            score,
            categories,
            questions,
            hasConversational,
            elements
        };
    }

    function displayVoiceSearchResults(analysis) {
        const resultsDiv = document.getElementById('voice-results');
        const scoreValue = document.getElementById('voice-score');
        const ratingDiv = document.getElementById('voice-rating');
        const breakdownDiv = document.getElementById('voice-breakdown');
        const questionsDiv = document.getElementById('questions-found');
        const questionsListDiv = document.getElementById('questions-list');
        const recommendationsDiv = document.getElementById('voice-recommendations');

        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth' });

        scoreValue.textContent = analysis.score;

        let rating, ratingClass;
        if (analysis.score >= 85) {
            rating = 'Excellent - Voice Search Optimized';
            ratingClass = 'excellent';
        } else if (analysis.score >= 65) {
            rating = 'Good - Well Positioned';
            ratingClass = 'good';
        } else if (analysis.score >= 45) {
            rating = 'Fair - Needs Work';
            ratingClass = 'fair';
        } else {
            rating = 'Poor - Major Gaps';
            ratingClass = 'poor';
        }

        ratingDiv.textContent = rating;
        ratingDiv.className = 'score-rating ' + ratingClass;

        // Display breakdown
        let breakdownHTML = '';
        for (const [category, data] of Object.entries(analysis.categories)) {
            const barClass = data.percent >= 70 ? 'good' : data.percent >= 50 ? 'fair' : 'poor';
            breakdownHTML += `
                <div class="category-score">
                    <div class="category-header">
                        <span class="category-name">${category}</span>
                        <span class="category-percent">${data.percent}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill ${barClass}" style="width: ${data.percent}%"></div>
                    </div>
                </div>
            `;
        }
        breakdownDiv.innerHTML = breakdownHTML;

        // Display questions found
        if (analysis.questions.length > 0) {
            questionsDiv.style.display = 'block';
            questionsListDiv.innerHTML = `
                <ul>
                    ${analysis.questions.map(q => `<li>${q.trim()}</li>`).join('')}
                </ul>
                <p><em>${analysis.questions.length} question(s) detected in your content.</em></p>
            `;
        }

        // Generate recommendations
        const recommendations = generateVoiceRecommendations(analysis);
        recommendationsDiv.innerHTML = recommendations.map(rec => 
            `<div class="recommendation-item">
                <h4>${rec.title}</h4>
                <p>${rec.description}</p>
            </div>`
        ).join('');
    }

    function generateVoiceRecommendations(analysis) {
        const recommendations = [];

        if (analysis.categories['Question Format'].percent < 70) {
            recommendations.push({
                title: 'Add More Questions',
                description: 'Include FAQ-style questions and answers. Target common "who, what, when, where, why, how" queries.'
            });
        }

        if (analysis.categories['Conversational Tone'].percent < 70) {
            recommendations.push({
                title: 'Write More Conversationally',
                description: 'Use natural, spoken language. Write as if you\'re explaining to a friend rather than writing formal documentation.'
            });
        }

        if (!analysis.elements.includes('faq')) {
            recommendations.push({
                title: 'Create FAQ Section',
                description: 'Add a dedicated FAQ section with common questions and concise answers. Use FAQPage schema markup.'
            });
        }

        if (!analysis.elements.includes('schema')) {
            recommendations.push({
                title: 'Implement Schema Markup',
                description: 'Add FAQPage, HowTo, or LocalBusiness schema to help voice assistants understand your content structure.'
            });
        }

        if (!analysis.elements.includes('mobile')) {
            recommendations.push({
                title: 'Optimize for Mobile',
                description: 'Ensure fast loading and mobile-friendly design. Most voice searches happen on mobile devices.'
            });
        }

        return recommendations;
    }

    // ============================================================================
    // E-E-A-T Assessment Tool
    // ============================================================================
    
    function initEEATAssessment() {
        const form = document.getElementById('eeat-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateEEATScore();
        });
    }

    function calculateEEATScore() {
        const form = document.getElementById('eeat-form');
        const formData = new FormData(form);

        const categories = {
            'Experience': ['exp-demonstrated', 'exp-examples', 'exp-insights'],
            'Expertise': ['exp-credentials', 'exp-accuracy', 'exp-depth'],
            'Authoritativeness': ['auth-backlinks', 'auth-mentions', 'auth-recognition'],
            'Trustworthiness': ['trust-citations', 'trust-security', 'trust-transparency', 'trust-freshness']
        };

        let categoryScores = {};
        let totalScore = 0;
        let maxScore = 0;

        for (const [category, fields] of Object.entries(categories)) {
            let categoryTotal = 0;
            let categoryMax = 0;

            fields.forEach(field => {
                const value = parseInt(formData.get(field)) || 0;
                categoryTotal += value;
                categoryMax += 4; // Max value per question
            });

            const categoryPercent = (categoryTotal / categoryMax) * 100;
            categoryScores[category] = {
                score: categoryTotal,
                max: categoryMax,
                percent: Math.round(categoryPercent)
            };

            totalScore += categoryTotal;
            maxScore += categoryMax;
        }

        const finalScore = Math.round((totalScore / maxScore) * 100);

        displayEEATResults(finalScore, categoryScores);
    }

    function displayEEATResults(score, categoryScores) {
        const resultsDiv = document.getElementById('eeat-results');
        const scoreValue = document.getElementById('eeat-score');
        const ratingDiv = document.getElementById('eeat-rating');
        const breakdownDiv = document.getElementById('eeat-breakdown');
        const recommendationsDiv = document.getElementById('eeat-recommendations');

        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth' });

        scoreValue.textContent = score;

        let rating, ratingClass;
        if (score >= 85) {
            rating = 'Excellent - Strong E-E-A-T Signals';
            ratingClass = 'excellent';
        } else if (score >= 65) {
            rating = 'Good - Solid Foundation';
            ratingClass = 'good';
        } else if (score >= 45) {
            rating = 'Fair - Needs Improvement';
            ratingClass = 'fair';
        } else {
            rating = 'Poor - Critical Gaps';
            ratingClass = 'poor';
        }

        ratingDiv.textContent = rating;
        ratingDiv.className = 'score-rating ' + ratingClass;

        // Display breakdown
        let breakdownHTML = '';
        for (const [category, data] of Object.entries(categoryScores)) {
            const barClass = data.percent >= 70 ? 'good' : data.percent >= 50 ? 'fair' : 'poor';
            breakdownHTML += `
                <div class="category-score">
                    <div class="category-header">
                        <span class="category-name">${category}</span>
                        <span class="category-percent">${data.percent}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill ${barClass}" style="width: ${data.percent}%"></div>
                    </div>
                </div>
            `;
        }
        breakdownDiv.innerHTML = breakdownHTML;

        // Generate recommendations
        const recommendations = generateEEATRecommendations(categoryScores);
        recommendationsDiv.innerHTML = recommendations.map(rec => 
            `<div class="recommendation-item">
                <div class="rec-priority ${rec.priority}">${rec.priority.toUpperCase()}</div>
                <h4>${rec.title}</h4>
                <p>${rec.description}</p>
            </div>`
        ).join('');
    }

    function generateEEATRecommendations(categoryScores) {
        const recommendations = [];

        for (const [category, data] of Object.entries(categoryScores)) {
            if (data.percent < 70) {
                const priority = data.percent < 50 ? 'high' : 'medium';

                if (category === 'Experience') {
                    recommendations.push({
                        priority,
                        title: 'Demonstrate Real-World Experience',
                        description: 'Share specific examples, case studies, and lessons learned from your practical experience. Include before/after results and specific metrics.'
                    });
                } else if (category === 'Expertise') {
                    recommendations.push({
                        priority,
                        title: 'Showcase Your Expertise',
                        description: 'Display author credentials prominently. Provide in-depth, technically accurate content that covers nuances and complexities.'
                    });
                } else if (category === 'Authoritativeness') {
                    recommendations.push({
                        priority,
                        title: 'Build Authority',
                        description: 'Focus on earning quality backlinks, getting mentioned by industry publications, and acquiring relevant certifications or awards.'
                    });
                } else if (category === 'Trustworthiness') {
                    recommendations.push({
                        priority,
                        title: 'Strengthen Trust Signals',
                        description: 'Add HTTPS, create comprehensive privacy policies, cite authoritative sources, display reviews, and keep content updated with clear dates.'
                    });
                }
            }
        }

        return recommendations.slice(0, 6);
    }

    // ============================================================================
    // Initialize all tools on page load
    // ============================================================================
    
    document.addEventListener('DOMContentLoaded', function() {
        initVisibilityScorecard();
        initSchemaValidator();
        initContentChecker();
        initVoiceSearchAnalyzer();
        initEEATAssessment();
    });

    // Re-initialize after includes are loaded
    document.addEventListener('includesLoaded', function() {
        initVisibilityScorecard();
        initSchemaValidator();
        initContentChecker();
        initVoiceSearchAnalyzer();
        initEEATAssessment();
    });

})();
