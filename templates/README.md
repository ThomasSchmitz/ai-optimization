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
- Case studies section
- Best practices (do's and don'ts)
- Resources and tools
- Related platforms navigation

**Usage:**
1. Copy the template to your target location (e.g., `/pages/platforms/chatgpt.html`)
2. Replace all `[PLATFORM_NAME]` placeholders with your platform name
3. Replace `[STAT_VALUE_X]` and `[STAT_LABEL_X]` with platform-specific statistics
4. Fill in content sections with platform-specific information
5. Customize the checklist categories as needed
6. Add platform-specific case studies

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
- Case studies
- Tools and resources
- Next steps with related content

**Usage:**
1. Copy the template to your target location (e.g., `/pages/guides/website-optimization.html`)
2. Replace all `[GUIDE_TITLE]` and `[GUIDE_TOPIC]` placeholders
3. Set `[READING_TIME]`, `[DIFFICULTY_LEVEL]`, and `[TARGET_AUDIENCE]` values
4. Fill in all content sections
5. Customize the implementation phases
6. Add relevant statistics, case studies, and resources

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

### `case-study.html`
Case study structure with challenge/solution/results format and results metrics grid.

## Styling

All templates and components use the existing design system defined in `/styles.css`. New styles have been added for:
- Platform and guide hero sections
- Checklist components
- Case study cards
- Strategy and implementation layouts
- Best practices and mistakes lists
- Resources grids
- And more...

All components are fully responsive and follow the existing color scheme and spacing patterns.

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
6. **Content Quality:** Provide actionable, well-researched content in all sections
7. **Internal Linking:** Link to related pages and maintain the site navigation structure

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
