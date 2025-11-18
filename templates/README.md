# AI GEO Page Templates

This directory contains reusable HTML templates for creating consistent platform-specific and guide pages across the AI GEO website.

## Templates

### 1. `platform-page-template.html`
Template for creating individual AI platform optimization guides (e.g., ChatGPT, Google Gemini, Microsoft Copilot).

**Features:**
- Platform hero section with icon, stats, and CTAs
- Table of contents for easy navigation
- Platform overview with feature grid
- How it works section
- Optimization strategies
- Step-by-step implementation guide
- Interactive optimization checklist
- Best practices (do's and don'ts)
- Resources and tools
- Related platforms navigation

**Usage:**
1. Copy the template to your target location (e.g., `/pages/platforms/chatgpt.html`)
2. Replace all `[PLATFORM_NAME]` placeholders with your platform name
3. Replace `[STAT_VALUE_X]` and `[STAT_LABEL_X]` with platform-specific statistics
4. Fill in content sections with platform-specific information
5. Customize the checklist categories as needed

### 2. `guide-page-template.html`
Template for creating optimization strategy guides (e.g., Website Optimization, Content Strategy, E-E-A-T).

**Features:**
- Guide hero with reading time, difficulty, and target audience metadata
- Table of contents
- Introduction with learning objectives
- Statistics and importance section
- Key concepts breakdown
- Multi-phase implementation strategy
- Best practices list
- Common mistakes to avoid with solutions
- Action checklist
- Tools and resources
- Next steps with related content

**Usage:**
1. Copy the template to your target location (e.g., `/pages/guides/website-optimization.html`)
2. Replace all `[GUIDE_TITLE]` and `[GUIDE_TOPIC]` placeholders
3. Set `[READING_TIME]`, `[DIFFICULTY_LEVEL]`, and `[TARGET_AUDIENCE]` values
4. Fill in all content sections
5. Customize the implementation phases
6. Add relevant statistics and resources

## Reusable Components

The `/components` directory contains modular HTML snippets that can be included in any page:

### `platform-hero.html`
Reusable hero section for platform pages with customizable data attributes.

### `optimization-checklist.html`
Interactive checklist component with 4 default categories:
- Content Optimization
- Technical Implementation
- Authority & Trust
- Testing & Monitoring

## Styling

All templates and components use the existing design system defined in `/styles.css`.

All components are fully responsive and follow the existing color scheme and spacing patterns.

## Content Quality Guidelines

**IMPORTANT: All content on this website must be verifiable and supported by authoritative sources.**

### Do NOT Include:
- **Fake or fictional case studies** - Even if marked as "illustrative examples," these can be perceived as AI hallucinations and damage credibility
- Unverifiable statistics or metrics
- Made-up company names or scenarios
- Hypothetical results presented as real outcomes

### DO Include:
- **Real, verifiable case studies** with links to original sources (company blogs, press releases, published research)
- Published research studies with proper citations
- Industry statistics from authoritative sources (Gartner, Forrester, official company reports)
- Documented best practices with references
- Original research conducted with transparent methodology

### If You Cannot Find Real Case Studies:
- Remove the case studies section entirely
- Focus on optimization strategies and best practices instead
- Link to external resources that contain verified case studies
- Consider conducting original research or partnering with companies for real case studies

### Verifying Sources:
Before adding any case study or statistic:
1. Verify the source exists and is accessible
2. Link directly to the original source
3. Include publication date
4. Cite the author or organization
5. Ensure the source is authoritative in the field

## Customization Guide

### Placeholders to Replace

**Platform Pages:**
- `[PLATFORM_NAME]` - Full name of the platform
- `[STAT_VALUE_X]` - Numeric values or text for statistics
- `[STAT_LABEL_X]` - Labels for statistics
- Content sections marked with `[Add...]`

**Guide Pages:**
- `[GUIDE_TITLE]` - Full title of the guide
- `[GUIDE_TOPIC]` - Short topic name
- `[GUIDE_KEYWORDS]` - SEO keywords
- `[READING_TIME]` - Estimated reading time in minutes
- `[DIFFICULTY_LEVEL]` - Beginner, Intermediate, or Advanced
- `[TARGET_AUDIENCE]` - Who the guide is for
- `[STAT_X]` - Statistics to support importance
- `[Phase X Title]` - Implementation phase names
- `[Related Guide/Platform]` - Links to related content

### Adding New Sections

To add new sections to a template:
1. Follow the existing section structure:
   ```html
   <section id="your-section" class="content-section">
       <div class="container">
           <h2>Section Title</h2>
           <p class="section-intro">Introduction text</p>
           <!-- Your content -->
       </div>
   </section>
   ```
2. Alternate background colors using `class="content-section alt-bg"`
3. Add the section to the Table of Contents

### Component Integration

To use reusable components:
1. Include component HTML in your page
2. Customize data attributes or replace placeholder text
3. Ensure the component CSS is loaded from `/styles.css`

## Best Practices

1. **Maintain Consistency:** Use the templates as-is to ensure visual consistency across all pages
2. **SEO Optimization:** Fill in all meta tags with relevant, unique content
3. **Accessibility:** Maintain semantic HTML structure and ARIA labels
4. **Performance:** Optimize images and keep page weight reasonable
5. **Mobile-First:** Test on mobile devices as all components are responsive
6. **Content Quality:** Provide actionable, well-researched content in all sections - **all claims must be verifiable with credible sources**
7. **Internal Linking:** Link to related pages and maintain the site navigation structure
8. **Source Attribution:** Always cite and link to original sources for statistics, research, and case studies

## Example Implementation

See `/tmp/test-platform-page.html` for a working example of how the components render together.

## Next Steps

After creating a new page from a template:
1. Test on multiple devices and browsers
2. Validate HTML and check for broken links
3. Optimize images and assets
4. Update sitemap.xml
5. Add to navigation menus if appropriate
6. Review content for accuracy and completeness
