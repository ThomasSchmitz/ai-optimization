# AI Optimization Requirements Document

## Document Purpose

This document defines the technical and content requirements for ensuring the AI GEO website maintains and improves its visibility across AI platforms (ChatGPT, Gemini, Claude, Perplexity, etc.) during and after the Astro migration.

**Critical**: The migration must NOT harm current AI visibility. Ideally, it should enhance it.

---

## Core AI Optimization Principles

### 1. Content Accessibility
**Requirement**: AI crawlers must access all content without barriers.

#### Implementation Requirements
- ✅ **Server-Side Rendering**: All content rendered as HTML (Astro does this by default)
- ✅ **No JavaScript-Gated Content**: Critical information must be in HTML, not rendered client-side only
- ✅ **Semantic HTML**: Use proper heading hierarchy (H1→H2→H3)
- ✅ **Clean URL Structure**: Human-readable, descriptive URLs
- ✅ **No Login Walls**: All public content freely accessible
- ❌ **Avoid**: Shadow DOM for navigation, canvas-rendered text, client-only rendering

#### Validation
```bash
# Test: Disable JavaScript and ensure content is visible
curl https://yoursite.com/page | grep "expected content"

# Test: Lighthouse accessibility score
lighthouse https://yoursite.com --only-categories=accessibility

# Test: Validate HTML structure
html-validate src/pages/**/*.astro
```

---

### 2. Structured Data (Schema.org)

**Requirement**: Comprehensive JSON-LD markup on every page.

#### Schema Types Required

| Page Type | Primary Schema | Secondary Schema |
|-----------|---------------|------------------|
| Homepage | Organization, WebSite | ItemList (platforms) |
| Platform guides | Article, HowTo | Breadcrumb |
| Industry guides | Article | Breadcrumb |
| Tool pages | SoftwareApplication | AggregateRating |
| FAQ page | FAQPage | Breadcrumb |
| Contact | ContactPage | Organization |
| Glossary | DefinedTermSet | DefinedTerm (each entry) |

#### Implementation Pattern

```typescript
// src/components/Schema.astro
interface SchemaProps {
  type: 'Article' | 'HowTo' | 'FAQPage' | 'Organization';
  data: Record<string, any>;
}

// Example usage in page
---
import Schema from '@/components/Schema.astro';

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": frontmatter.title,
  "description": frontmatter.description,
  "author": {
    "@type": "Organization",
    "name": "AI GEO"
  },
  "datePublished": frontmatter.publishDate,
  "dateModified": frontmatter.lastUpdated
};
---

<Schema type="Article" data={schemaData} />
```

#### Schema Validation Requirements
- [ ] All pages have at least one schema type
- [ ] Schema validates with Google Rich Results Test
- [ ] Schema validates with Schema.org validator
- [ ] No schema errors in Search Console

---

### 3. Content Quality Standards

**Requirement**: Content must demonstrate E-E-A-T for AI trust.

#### E-E-A-T Implementation

**Experience**
- ✅ Include case studies with real results
- ✅ Share original research and data
- ✅ Document testing methodologies
- ✅ Show practical implementation examples

**Expertise**
- ✅ Cite authoritative sources (research papers, official documentation)
- ✅ Link to credible external resources
- ✅ Use technical terminology correctly
- ✅ Provide in-depth explanations

**Authoritativeness**
- ✅ Build backlink profile from industry sites
- ✅ Get cited by authoritative sources
- ✅ Maintain consistent brand presence across platforms
- ✅ Display credentials/certifications

**Trustworthiness**
- ✅ Keep information current (last updated dates visible)
- ✅ Correct errors promptly
- ✅ Provide contact information
- ✅ Use HTTPS
- ✅ Display transparent privacy policy

#### Content Freshness
```yaml
# Required in all content frontmatter
publishDate: 2025-11-20
lastUpdated: 2025-11-20
reviewCycle: 90 # days
nextReview: 2026-02-18
```

#### Content Quality Checklist
- [ ] Every guide >1500 words (comprehensive)
- [ ] Includes practical examples
- [ ] Has table of contents for >1000 words
- [ ] Cites at least 3 authoritative sources
- [ ] Updated within last 6 months
- [ ] No grammar/spelling errors
- [ ] Images have descriptive alt text

---

### 4. Answer-Optimized Content

**Requirement**: Content must directly answer common queries.

#### Question-Answer Format

**Pattern**: Start sections with questions as H2/H3 headings

```markdown
## How Do I Optimize for ChatGPT?

To optimize your content for ChatGPT visibility:

1. **Use Structured Data**: Implement Article schema with clear author and date
2. **Create Comprehensive Guides**: Provide complete answers (1500+ words)
3. **Include Examples**: Show practical implementation
...

This approach ensures ChatGPT can cite your content when users ask "How do I optimize for ChatGPT?"
```

#### FAQ Schema Implementation
```typescript
// Every guide should have FAQ section with schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How long does AI optimization take?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "AI optimization typically shows results in 4-12 weeks..."
    }
  }]
};
```

#### Target Query Types
- **Informational**: "What is AI GEO?"
- **How-to**: "How to optimize for Perplexity?"
- **Comparison**: "ChatGPT vs Gemini optimization"
- **Best practices**: "AI optimization best practices"
- **Tools**: "Best AI optimization tools"

---

### 5. Citation-Friendly Formatting

**Requirement**: Make it easy for AI to extract and cite information.

#### Formatting Rules

**Lists**: Use bullet points and numbered lists liberally
```markdown
✅ Good:
Benefits of AI optimization:
- Increased visibility in AI responses
- Higher quality traffic
- Better brand positioning

❌ Avoid:
AI optimization provides increased visibility in AI responses, higher quality traffic, and better brand positioning.
```

**Key Information First**: Lead with the answer
```markdown
✅ Good:
AI GEO (Generative Engine Optimization) is the practice of optimizing content for AI platform visibility. This emerging field focuses on...

❌ Avoid:
In recent years, as artificial intelligence has grown, a new field has emerged. This field, which some call generative engine optimization...
```

**Tables for Comparisons**:
```markdown
| Platform | Users | Best For |
|----------|-------|----------|
| ChatGPT | 200M+ | Conversational queries |
| Gemini | 150M+ | Google ecosystem |
```

**Callout Boxes for Key Takeaways**:
```markdown
> **Key Takeaway**: AI platforms prioritize content with clear structure, authoritative sources, and up-to-date information.
```

---

### 6. Technical SEO Requirements

**Requirement**: Technical excellence for crawler accessibility.

#### Critical Technical Elements

**Performance**
- ✅ First Contentful Paint <1.2s
- ✅ Largest Contentful Paint <2.5s
- ✅ Time to Interactive <3.5s
- ✅ Cumulative Layout Shift <0.1
- ✅ Mobile-friendly (responsive design)

**Crawlability**
- ✅ XML sitemap auto-generated
- ✅ Robots.txt properly configured
- ✅ Canonical URLs on all pages
- ✅ No orphan pages (all linked from somewhere)
- ✅ Internal linking strategy
- ✅ Clean URL structure (no IDs, use slugs)

**Meta Data**
```html
<!-- Required on every page -->
<title>Page Title - AI GEO</title>
<meta name="description" content="150-160 char description">
<link rel="canonical" href="https://example.com/page">
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Description">
<meta property="og:image" content="https://example.com/image.jpg">
<meta name="twitter:card" content="summary_large_image">
```

#### robots.txt Configuration
```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

Sitemap: https://yoursite.com/sitemap.xml
```

---

### 7. Platform-Specific Optimizations

#### ChatGPT (SearchGPT)
- **Focus**: Web search integration, real-time info
- **Optimization**: 
  - Clear source attribution
  - Updated timestamps
  - Comprehensive answers
  - Link to authoritative sources

#### Google Gemini
- **Focus**: Multimodal understanding, Google ecosystem
- **Optimization**:
  - Use Google Search Console
  - Implement all Google-supported schema
  - Optimize images with descriptive alt text
  - Use YouTube embeds with transcripts

#### Perplexity AI
- **Focus**: Search-oriented, citation-heavy
- **Optimization**:
  - Build domain authority (backlinks)
  - Create research-quality content
  - Cite academic sources
  - Use clear section headings

#### Claude
- **Focus**: Long-form analysis, professional users
- **Optimization**:
  - In-depth, comprehensive guides (2000+ words)
  - Logical structure with ToC
  - Technical accuracy
  - Code examples (if relevant)

---

### 8. Content Distribution Strategy

**Requirement**: Multi-channel presence for maximum AI visibility.

#### Distribution Channels

**Owned Media**
- ✅ Main website (this Astro site)
- ✅ Blog with RSS feed
- ✅ Newsletter (optional)

**Social Media** (AI crawls these)
- ✅ LinkedIn articles (long-form)
- ✅ X/Twitter threads (for Grok)
- ✅ Reddit posts (Perplexity crawls)
- ✅ YouTube videos with transcripts (Gemini)

**Third-Party Platforms**
- ✅ Medium/Dev.to syndication (with canonical back to main site)
- ✅ Guest posts on industry sites
- ✅ Podcast appearances (with show notes)

#### Cross-Platform Consistency
- Same author name across platforms
- Consistent brand messaging
- Link back to main site
- Use schema.org sameAs property

```json
{
  "@type": "Organization",
  "name": "AI GEO",
  "url": "https://yoursite.com",
  "sameAs": [
    "https://twitter.com/youraccount",
    "https://linkedin.com/company/youraccount",
    "https://github.com/youraccount"
  ]
}
```

---

### 9. Monitoring & Testing

**Requirement**: Track AI visibility and adjust strategy.

#### AI Citation Testing

**Monthly Manual Testing**
Test queries in each major platform:
```
✅ ChatGPT: "How to optimize for AI search"
✅ Gemini: "AI GEO best practices"
✅ Perplexity: "Generative engine optimization guide"
✅ Claude: "AI optimization strategies"
✅ You.com: "AI visibility optimization"
```

Document:
- [ ] Is your site cited?
- [ ] Position in response (first mention, middle, last)
- [ ] Context of citation
- [ ] Accuracy of information

#### Automated Monitoring

**Google Search Console**
- Monitor impressions and clicks
- Track featured snippets
- Check for crawl errors
- Review Core Web Vitals

**Schema Validation**
- Weekly automated schema validation
- Monitor Rich Results Test
- Track structured data errors

**Performance Monitoring**
- Lighthouse CI in GitHub Actions
- Core Web Vitals tracking
- Uptime monitoring

**Analytics**
- Track referral traffic from AI platforms
- Monitor search queries leading to site
- Track engagement metrics
- A/B test content formats

---

### 10. Migration-Specific Requirements

**Requirement**: Ensure seamless transition without AI visibility loss.

#### Pre-Migration Checklist
- [ ] Document current AI citations (baseline)
- [ ] Export all schema markup
- [ ] Audit all internal links
- [ ] Map old URLs to new URLs
- [ ] Create redirect rules (if URLs change)
- [ ] Test schema on staging site
- [ ] Verify robots.txt allows all AI bots

#### URL Preservation Strategy

**Option 1: Keep Exact URLs** (Preferred)
```
Old: /pages/platforms/chatgpt.html
New: /platforms/chatgpt
```

**Option 2: Redirect if URLs Change**
```javascript
// astro.config.mjs
export default defineConfig({
  redirects: {
    '/pages/platforms/chatgpt.html': '/platforms/chatgpt',
    '/pages/guides/[...slug].html': '/guides/[...slug]'
  }
});
```

#### Schema Migration Validation
```bash
# Extract all schema from old site
grep -r "@context.*schema.org" pages/ > old-schema.txt

# Validate new site has equivalent coverage
npm run extract-schema
diff old-schema.txt new-schema.txt
```

#### Post-Migration Monitoring (First 30 Days)
- [ ] Daily: Check Search Console for errors
- [ ] Daily: Monitor analytics for traffic drops
- [ ] Weekly: Test AI citations in all platforms
- [ ] Weekly: Validate all schema markup
- [ ] Weekly: Check for broken links
- [ ] Weekly: Review performance metrics

---

## Implementation Priority Matrix

| Requirement | Impact | Effort | Priority |
|-------------|--------|--------|----------|
| Server-side rendering | Critical | Low | P0 |
| Schema markup | Critical | Medium | P0 |
| Clean URLs | High | Low | P0 |
| Answer-optimized format | High | Medium | P1 |
| E-E-A-T signals | High | High | P1 |
| Performance optimization | Medium | Medium | P1 |
| FAQ sections | Medium | Low | P2 |
| Multi-channel distribution | Medium | High | P2 |
| Citation testing | Low | Medium | P2 |

**P0**: Must-have before launch  
**P1**: Should-have within 2 weeks post-launch  
**P2**: Nice-to-have within 1 month post-launch

---

## Success Criteria

### Launch Readiness (Go/No-Go)
- ✅ All P0 requirements implemented
- ✅ Schema validation passes (0 errors)
- ✅ Lighthouse SEO score ≥95
- ✅ All pages accessible without JavaScript
- ✅ No broken internal links
- ✅ robots.txt allows AI bots
- ✅ Sitemap auto-generates
- ✅ Performance meets targets

### Post-Launch Success (30 Days)
- ✅ No drop in organic traffic (±10% acceptable variance)
- ✅ AI citations maintained or improved
- ✅ No schema errors in Search Console
- ✅ Core Web Vitals: All "Good"
- ✅ Zero critical accessibility issues

### Long-Term Success (90 Days)
- ✅ 25% increase in AI platform citations
- ✅ 15% increase in organic traffic
- ✅ 3+ features in AI-generated responses
- ✅ Top 3 position for "AI GEO" queries
- ✅ Backlinks from 5+ authoritative sources

---

## AI-Specific Content Guidelines

### Writing Style
- **Clarity**: Use simple, direct language
- **Completeness**: Answer questions fully (no "contact us for more info")
- **Currency**: Include recent examples and data
- **Context**: Provide background for technical terms
- **Citations**: Link to authoritative sources

### Content Structure Template
```markdown
---
title: "[Topic]: Complete Guide"
description: "150-160 chars with primary keyword"
lastUpdated: YYYY-MM-DD
---

# [H1: Primary Topic/Question]

> **Key Takeaway**: One-sentence summary of the answer

[2-3 paragraph introduction with answer in first paragraph]

## Table of Contents
- Overview
- How It Works
- Best Practices
- Common Mistakes
- Tools & Resources
- FAQ

## What is [Topic]?

[Define the topic clearly, answer the "what" question]

## How Does [Topic] Work?

[Explain mechanics, processes, methodology]

## Best Practices

1. **Practice One**: Description with example
2. **Practice Two**: Description with example
...

## Common Mistakes to Avoid

- ❌ Mistake 1: Why it's wrong
- ❌ Mistake 2: Why it's wrong
...

## Tools & Resources

| Tool | Purpose | Link |
|------|---------|------|
| ... | ... | ... |

## Frequently Asked Questions

### Question 1?
Answer...

### Question 2?
Answer...

## Conclusion

[Summary, key takeaways, next steps]

## Related Guides
- [Link to related content]
- [Link to related content]
```

---

## Compliance Requirements

### Legal & Privacy
- ✅ Privacy policy (required for AI trust)
- ✅ Cookie notice (if using analytics)
- ✅ Accessibility statement
- ✅ Content licensing clearly stated

### Accessibility (WCAG 2 AA)
- ✅ Color contrast ratios ≥4.5:1
- ✅ All images have alt text
- ✅ Keyboard navigation works
- ✅ Screen reader compatible
- ✅ Focus indicators visible
- ✅ Semantic HTML structure

### Security
- ✅ HTTPS only
- ✅ Security headers configured
- ✅ No mixed content
- ✅ CSP policy implemented
- ✅ Dependencies regularly updated

---

## Documentation Requirements

### Content Documentation
- [ ] Content style guide
- [ ] Schema implementation guide
- [ ] Frontmatter schema reference
- [ ] Editorial calendar
- [ ] Content review process

### Technical Documentation
- [ ] Architecture decision records
- [ ] Component library documentation
- [ ] Deployment procedures
- [ ] Monitoring & alerting setup
- [ ] Incident response plan

---

## Appendix: AI Bot User Agents

Allow these bots in robots.txt:

```
# OpenAI
User-agent: GPTBot
User-agent: ChatGPT-User

# Google
User-agent: Googlebot
User-agent: Google-Extended

# Anthropic
User-agent: anthropic-ai
User-agent: Claude-Web

# Perplexity
User-agent: PerplexityBot

# Common Good
User-agent: CCBot

# Others
User-agent: Applebot
User-agent: Bingbot
User-agent: YouBot
```

---

**Document Version**: 1.0  
**Last Updated**: November 20, 2025  
**Owner**: Technical Lead  
**Review Cycle**: Monthly
