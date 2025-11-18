# Contributing to AI GEO

Thank you for your interest in contributing to AI GEO! This guide will help you get started with contributing to our AI Generative Engine Optimization resource.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Style Guidelines](#style-guidelines)
- [Submitting Changes](#submitting-changes)
- [Community](#community)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors. We expect everyone to:

- **Be Respectful**: Treat all contributors with respect and kindness
- **Be Constructive**: Provide helpful, constructive feedback
- **Be Collaborative**: Work together towards improving the project
- **Be Professional**: Maintain professionalism in all interactions

### Unacceptable Behavior

- Harassment, discrimination, or personal attacks
- Trolling, insulting, or derogatory comments
- Publishing others' private information
- Spam or excessive self-promotion
- Any conduct that could be considered inappropriate in a professional setting

## How Can I Contribute?

There are many ways to contribute to AI GEO:

### 📝 Content Contributions

- **Add new guides**: Share your expertise on AI optimization topics
- **Update existing content**: Keep our guides current with the latest AI platform changes
- **Submit case studies**: Share real-world success stories
- **Improve documentation**: Help us make our content clearer and more comprehensive
- **Fix typos and errors**: Even small corrections are valuable

### 💻 Code Contributions

- **Bug fixes**: Help us identify and fix issues
- **New features**: Implement features from our [ROADMAP.md](ROADMAP.md)
- **Performance improvements**: Optimize page load times and user experience
- **Accessibility improvements**: Make the site more accessible to all users
- **Tool development**: Create interactive tools and calculators

### 🎨 Design Contributions

- **UI/UX improvements**: Enhance the user interface and experience
- **Visual assets**: Create diagrams, infographics, or illustrations
- **Responsive design**: Improve mobile and tablet experiences

### 🔍 Testing & Quality Assurance

- **Report bugs**: Help us identify issues
- **Test new features**: Try out new features before they're released
- **Cross-browser testing**: Test on different browsers and devices
- **Accessibility testing**: Ensure the site works with screen readers and other assistive technologies

## Getting Started

### Prerequisites

AI GEO is built with simple web technologies:

- HTML5
- CSS3
- Vanilla JavaScript
- No build tools or frameworks required

### Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/ai-optimization.git
   cd ai-optimization
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Start a local server** (optional but recommended)
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server
   
   # Then visit http://localhost:8000
   ```

## Development Workflow

### 1. Choose What to Work On

- Check [ROADMAP.md](ROADMAP.md) for planned features
- Look at [GitHub Issues](https://github.com/ThomasSchmitz/ai-optimization/issues) for open tasks
- Check [FRESH-IDEAS.md](FRESH-IDEAS.md) for new feature proposals
- Suggest your own improvements

### 2. Before You Start

- **Check existing issues**: Make sure someone isn't already working on it
- **Open an issue**: For significant changes, open an issue to discuss first
- **Keep it focused**: One feature or fix per pull request

### 3. Make Your Changes

- Follow our [Style Guidelines](#style-guidelines)
- Test your changes thoroughly
- Ensure responsive design (mobile, tablet, desktop)
- Maintain accessibility standards (WCAG 2.1 AA)
- Update documentation if needed

### 4. Test Your Changes

- **Visual testing**: Check on different screen sizes
- **Browser testing**: Test on Chrome, Firefox, Safari, Edge
- **Functionality testing**: Ensure all features work as expected
- **Accessibility testing**: Use screen readers and keyboard navigation
- **Link checking**: Verify all internal and external links work

## Style Guidelines

### HTML

- Use semantic HTML5 elements
- Include proper meta tags for SEO
- Add ARIA labels for accessibility
- Keep markup clean and well-formatted
- Use the existing template structure in `/templates/`

```html
<!-- Good example -->
<section class="content-section">
    <div class="container">
        <h2>Section Title</h2>
        <p class="section-intro">Introduction text...</p>
    </div>
</section>
```

### CSS

- Follow existing naming conventions (BEM-like approach)
- Keep styles modular and reusable
- Add comments for complex styles
- Ensure responsive design with mobile-first approach
- Use CSS variables for colors when defined

```css
/* Good example */
.feature-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
```

### JavaScript

- Use vanilla JavaScript (no frameworks)
- Keep code simple and readable
- Add comments for complex logic
- Ensure cross-browser compatibility
- Follow existing patterns in `script.js`

```javascript
// Good example
function handleDropdown(element) {
    const menu = element.nextElementSibling;
    menu.classList.toggle('show');
}
```

### Content Writing

- **Be Clear**: Write in simple, straightforward language
- **Be Accurate**: Cite sources for statistics and claims
- **Be Actionable**: Provide practical, implementable advice
- **Be Current**: Use up-to-date information (as of November 2025)
- **Be Comprehensive**: Cover topics thoroughly but concisely

### File Organization

Follow the existing structure:

```
ai-optimization/
├── index.html                 # Homepage
├── pages/                     # Content pages
│   ├── platforms/            # Platform-specific guides
│   ├── guides/               # Strategy guides
│   ├── learn/                # Learning resources
│   ├── resources/            # Templates and resources
│   ├── tools/                # Interactive tools
│   ├── community.html        # Community page
│   ├── events.html           # Events page
│   ├── tools-directory.html  # Tools directory
│   ├── glossary.html         # Glossary
│   └── search.html           # Search page
├── components/               # Reusable components
├── templates/                # Page templates
├── assets/                   # Images and downloads
├── styles.css                # Global styles
├── script.js                 # Global scripts
└── CONTRIBUTING.md           # This file
```

## Submitting Changes

### Pull Request Process

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Commit your changes**
   ```bash
   git add .
   git commit -m "Clear, descriptive commit message"
   ```

3. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Fill out the PR template
   - Link to related issues

### Pull Request Guidelines

Your PR should:

- **Have a clear title**: Describe what the PR does
- **Include a description**: Explain why the change is needed
- **Reference issues**: Link to related issues with `Fixes #123`
- **Include screenshots**: For visual changes, add before/after screenshots
- **Pass all checks**: Ensure the site still works properly
- **Follow style guidelines**: Match the existing code style
- **Update documentation**: If you change functionality, update docs

### Example PR Description

```markdown
## Description
Adds a new guide on optimizing for Perplexity AI.

## Changes
- Created new page: `/pages/platforms/perplexity.html`
- Added Perplexity to platform navigation menu
- Updated sitemap with new page
- Added internal links from related pages

## Screenshots
[Include screenshots of the new page]

## Checklist
- [x] Tested on Chrome, Firefox, Safari
- [x] Mobile responsive
- [x] Accessibility tested
- [x] All links work
- [x] Follows style guidelines
- [x] Documentation updated

Fixes #42
```

## Documentation Updates

When contributing, please update relevant documentation:

### When to Update ROADMAP.md

- Completing a planned PR → Update status to ✅ Completed
- Adding a new feature → Add new PR to appropriate phase
- Changing priorities → Update PR priority levels

### When to Update FRESH-IDEAS.md

- Proposing new features → Add to Fresh Ideas
- Approving an idea → Change status to ✅ Approved
- Implementing an idea → Move to ROADMAP.md, update status to 🚀 Implemented

### When to Update README.md

- Adding major features → Update feature list
- Changing setup process → Update Getting Started section
- Adding new sections → Update Website Structure

## Case Study Contributions

When contributing case studies:

### Source Attribution Requirements

**ALWAYS include verifiable sources:**

- Link to original sources (company blogs, press releases, case study pages)
- Include publication dates when available
- Add context about where data/results originated
- For illustrative examples, clearly label as "illustrative" or "hypothetical"

### Example

```markdown
**Good:**
"Acme Corp increased their ChatGPT visibility by 150% using AI GEO strategies. 
Source: [Acme Corp Case Study](https://acme.com/case-studies/ai-geo) (Published: March 2025)"

**Bad:**
"Acme Corp increased their ChatGPT visibility by 150%." 
(No source, can't be verified)
```

## Community

### Get Help

- **Discord**: Join our [Discord server](#) for real-time discussion
- **GitHub Issues**: Ask questions by opening an issue
- **Discussions**: Use GitHub Discussions for broader topics

### Stay Updated

- **Watch the repository**: Get notifications for new issues and PRs
- **Follow on Twitter**: [@AIGEOOfficial](#) for updates
- **Join the newsletter**: Monthly updates on AI optimization

## Questions?

If you have questions about contributing:

1. Check this guide first
2. Search existing [GitHub Issues](https://github.com/ThomasSchmitz/ai-optimization/issues)
3. Ask in our [Discord community](#)
4. Open a new issue with the "question" label

## Recognition

Contributors will be:

- Listed in our contributors section
- Credited in release notes for significant contributions
- Featured in community highlights (with permission)
- Invited to join our contributor team for ongoing major contributors

## License

By contributing to AI GEO, you agree that your contributions will be licensed under the same terms as the project.

---

Thank you for contributing to AI GEO! Together, we're helping businesses succeed in the AI-powered future of search and discovery. 🚀
