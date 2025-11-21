#!/usr/bin/env node

/**
 * Platform Stub Generator
 * Creates clean, buildable MDX stubs for platforms
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LEGACY_PLATFORMS_DIR = path.join(__dirname, '../legacy/pages/platforms');
const ASTRO_PLATFORMS_DIR = path.join(__dirname, '../astro-site/src/content/platforms');

// Platform metadata
const PLATFORMS = {
  'gemini': { title: 'Google Gemini Optimization Guide', category: 'major', users: '100M+', url: 'https://gemini.google.com/', icon: '✨' },
  'copilot': { title: 'Microsoft Copilot Optimization Guide', category: 'major', users: '50M+', url: 'https://copilot.microsoft.com/', icon: '🤖' },
  'claude': { title: 'Claude (Anthropic) Optimization Guide', category: 'major', users: '10M+', url: 'https://claude.ai/', icon: '🧠' },
  'perplexity': { title: 'Perplexity AI Optimization Guide', category: 'major', users: '10M+', url: 'https://www.perplexity.ai/', icon: '🔍' },
  'grok': { title: 'Grok (X) Optimization Guide', category: 'major', users: '5M+', url: 'https://grok.x.ai/', icon: '🚀' },
  'meta-ai': { title: 'Meta AI Optimization Guide', category: 'major', users: '500M+', url: 'https://www.meta.ai/', icon: '📱' },
  'you-com': { title: 'You.com Optimization Guide', category: 'major', users: '5M+', url: 'https://you.com/', icon: '🔐' },
  'voice-search': { title: 'Voice Search Optimization', category: 'voice', users: '1B+', url: 'https://assistant.google.com/', icon: '🎤' },
  'google-ai-overviews': { title: 'Google AI Overviews', category: 'major', users: 'Billions', url: 'https://blog.google/products/search/', icon: '🌐' },
  'google-assistant': { title: 'Google Assistant Optimization', category: 'voice', users: '500M+', url: 'https://assistant.google.com/', icon: '🗣️' },
  'alexa': { title: 'Amazon Alexa Optimization', category: 'voice', users: '100M+', url: 'https://www.amazon.com/alexa/', icon: '🔊' },
  'siri': { title: 'Apple Siri Optimization', category: 'voice', users: '500M+', url: 'https://www.apple.com/siri/', icon: '🍎' },
};

function createStub(slug, meta) {
  const template = `---
title: "${meta.title}"
description: "Learn how to optimize your content for ${meta.title} visibility, citations, and AI-powered recommendations."
platform: "${slug}"
category: "${meta.category}"
publishDate: 2025-01-15
lastUpdated: 2025-11-21
users: "${meta.users}"
website: "${meta.url}"
features:
  - "AI-powered search and recommendations"
  - "Citation and source attribution"
  - "Real-time information access"
featured: ${meta.category === 'major'}
ogImage: "/images/platforms/${slug}-og.png"
relatedPlatforms: []
relatedGuides:
  - "content-strategy"
  - "schema-markup"
schema:
  type: "Article"
  author: "AI GEO"
---

## Platform Overview

${meta.title} is an AI-powered platform that helps users discover information, make decisions, and find solutions. Optimizing for this platform ensures your brand appears in relevant AI-generated responses and recommendations.

## Key Features

- AI-powered search and recommendations
- Real-time information access
- Source citations and attribution
- Conversational interface
- Integration with broader ecosystem

## Optimization Strategies

### 1. Content Structure

Create well-structured, authoritative content that AI can easily understand and cite:

- Use clear heading hierarchy (H1, H2, H3)
- Start with direct answers to common questions
- Include FAQ sections
- Use bullet points and lists for easy parsing
- Maintain updated, accurate information

### 2. Technical Optimization

Ensure your site is technically sound and easy for AI to access:

- Fast page load speeds
- Mobile-responsive design
- Secure HTTPS connection
- Clean, crawlable URL structure
- XML sitemap submission
- Proper robots.txt configuration

### 3. Authority Signals

Build trust and authority signals:

- Display author credentials
- Show publication and update dates
- Link to authoritative sources
- Include customer reviews and testimonials
- Maintain comprehensive about/contact pages

### 4. Schema Markup

Implement structured data to help AI understand your content:

- Article schema for content pages
- Product schema for e-commerce
- FAQ schema for question-answer content
- Organization schema for brand identity
- Review schema for testimonials

## Testing Your Visibility

Regularly test how your brand appears in AI responses:

- Query the platform with brand-related questions
- Test product and service queries
- Monitor competitor mentions
- Track citation frequency
- Analyze response accuracy

## Best Practices

- Maintain current, accurate information
- Create comprehensive, unique content
- Build authoritative backlinks
- Encourage and showcase customer reviews
- Monitor platform updates and adapt strategies

## Resources

- [Platform Website](${meta.url})
- [Content Strategy Guide](/guides/content-strategy)
- [Schema Markup Guide](/guides/schema-markup)
- [E-E-A-T Optimization](/guides/eeat-optimization)

---

*This guide will be continuously updated as the platform evolves. Check back regularly for the latest optimization strategies.*
`;

  return template;
}

function main() {
  console.log('🚀 Generating platform page stubs...\n');

  let created = 0;
  let skipped = 0;

  for (const [slug, meta] of Object.entries(PLATFORMS)) {
    const outputPath = path.join(ASTRO_PLATFORMS_DIR, `${slug}.mdx`);
    
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping ${slug} (already exists)`);
      skipped++;
      continue;
    }

    const content = createStub(slug, meta);
    fs.writeFileSync(outputPath, content, 'utf-8');
    console.log(`✅ Created ${slug}.mdx`);
    created++;
  }

  console.log(`\n✨ Complete! Created ${created} stubs, skipped ${skipped}`);
}

main();
