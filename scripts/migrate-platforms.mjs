#!/usr/bin/env node

/**
 * Platform Migration Script
 * Converts legacy HTML platform pages to MDX format with frontmatter
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const LEGACY_PLATFORMS_DIR = path.join(__dirname, '../legacy/pages/platforms');
const ASTRO_PLATFORMS_DIR = path.join(__dirname, '../astro-site/src/content/platforms');

// Platform metadata mapping
const PLATFORM_METADATA = {
  'gemini': {
    title: 'Google Gemini Optimization Guide',
    category: 'major',
    users: '100M+',
    website: 'https://gemini.google.com/',
    icon: '✨',
  },
  'copilot': {
    title: 'Microsoft Copilot Optimization Guide',
    category: 'major',
    users: '50M+',
    website: 'https://copilot.microsoft.com/',
    icon: '🤖',
  },
  'claude': {
    title: 'Claude (Anthropic) Optimization Guide',
    category: 'major',
    users: '10M+',
    website: 'https://claude.ai/',
    icon: '🧠',
  },
  'perplexity': {
    title: 'Perplexity AI Optimization Guide',
    category: 'major',
    users: '10M+',
    website: 'https://www.perplexity.ai/',
    icon: '🔍',
  },
  'grok': {
    title: 'Grok (X) Optimization Guide',
    category: 'major',
    users: '5M+',
    website: 'https://grok.x.ai/',
    icon: '🚀',
  },
  'meta-ai': {
    title: 'Meta AI Optimization Guide',
    category: 'major',
    users: '500M+',
    website: 'https://www.meta.ai/',
    icon: '📱',
  },
  'you-com': {
    title: 'You.com Optimization Guide',
    category: 'major',
    users: '5M+',
    website: 'https://you.com/',
    icon: '🔐',
  },
  'voice-search': {
    title: 'Voice Search Optimization (Alexa, Siri, Google Assistant)',
    category: 'voice',
    users: '1B+',
    website: 'https://assistant.google.com/',
    icon: '🎤',
  },
  'google-ai-overviews': {
    title: 'Google AI Overviews Optimization Guide',
    category: 'major',
    users: 'Billions',
    website: 'https://blog.google/products/search/generative-ai-search/',
    icon: '🌐',
  },
  'emerging-ai': {
    title: 'Emerging AI Platforms',
    category: 'emerging',
    users: 'Varies',
    website: 'https://learnaigeo.com/',
    icon: '🌟',
  },
  'international-ai': {
    title: 'International AI Platforms',
    category: 'international',
    users: 'Varies',
    website: 'https://learnaigeo.com/',
    icon: '🌍',
  },
};

// Helper functions
function stripHtml(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
}

function extractMetaDescription(html) {
  const match = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  return match ? match[1] : '';
}

function extractTitle(html) {
  const match = html.match(/<title>([^<]+)<\/title>/i);
  if (match) {
    return match[1].replace(' | AI GEO', '').trim();
  }
  return '';
}

function extractSectionContent(html, sectionId) {
  const regex = new RegExp(`<section[^>]*id="${sectionId}"[^>]*>([\\s\\S]*?)<\\/section>`, 'i');
  const match = html.match(regex);
  return match ? match[1] : '';
}

function convertHtmlToMarkdown(html) {
  // Simple, safe conversion that avoids nested structures
  let md = html;

  // Remove script and style tags
  md = md.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  md = md.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // Convert headings
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n\n');
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n\n');
  md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n\n');

  // Convert simple paragraphs
  md = md.replace(/<p[^>]*>(.*?)<\/p>/gis, '$1\n\n');

  // Convert links before removing tags
  md = md.replace(/<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');

  // Convert strong/bold
  md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');

  // Convert lists - flatten complex structures
  md = md.replace(/<ul[^>]*>|<\/ul>/gi, '\n');
  md = md.replace(/<ol[^>]*>|<\/ol>/gi, '\n');
  md = md.replace(/<li[^>]*>(.*?)<\/li>/gis, (match, content) => {
    // Remove nested HTML from list items
    const cleaned = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return `- ${cleaned}\n`;
  });

  // Remove all remaining HTML tags
  md = md.replace(/<[^>]+>/g, ' ');

  // Clean up entities
  md = md
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–');

  // Clean up whitespace
  md = md.replace(/[ \t]+/g, ' '); // Multiple spaces to single space
  md = md.replace(/\n\s*\n\s*\n+/g, '\n\n'); // Multiple newlines to double
  md = md.trim();

  return md;
}

function generateFrontmatter(slug, metadata, description) {
  const defaultMeta = PLATFORM_METADATA[slug] || {
    title: metadata.title || 'Platform Guide',
    category: 'emerging',
    users: 'N/A',
    website: 'https://learnaigeo.com/',
    icon: '🤖',
  };

  const now = new Date();
  const publishDate = new Date('2025-01-15');

  return `---
title: "${defaultMeta.title}"
description: "${description || `Learn how to optimize your content for ${defaultMeta.title} visibility and citations.`}"
platform: "${slug}"
category: "${defaultMeta.category}"
publishDate: ${publishDate.toISOString().split('T')[0]}
lastUpdated: ${now.toISOString().split('T')[0]}
users: "${defaultMeta.users}"
website: "${defaultMeta.website}"
features:
  - "AI-powered search and recommendations"
  - "Citation and source attribution"
  - "Real-time information access"
featured: ${defaultMeta.category === 'major' ? 'true' : 'false'}
ogImage: "/images/platforms/${slug}-og.png"
relatedPlatforms: []
relatedGuides:
  - "content-strategy"
  - "schema-markup"
schema:
  type: "Article"
  author: "AI GEO"
---

import Callout from '@/components/Callout.astro';
import FeatureCard from '@/components/FeatureCard.astro';
`;
}

function migratePlatform(filename) {
  const slug = path.basename(filename, '.html');
  
  // Skip index.html
  if (slug === 'index') {
    console.log(`⏭️  Skipping ${slug} (index page)`);
    return;
  }

  // Skip if already migrated
  const outputPath = path.join(ASTRO_PLATFORMS_DIR, `${slug}.mdx`);
  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  Skipping ${slug} (already exists)`);
    return;
  }

  console.log(`📄 Processing ${slug}...`);

  try {
    const htmlPath = path.join(LEGACY_PLATFORMS_DIR, filename);
    const html = fs.readFileSync(htmlPath, 'utf-8');

    // Extract metadata
    const title = extractTitle(html);
    const description = extractMetaDescription(html);

    // Generate frontmatter
    const frontmatter = generateFrontmatter(slug, { title }, description);

    // Extract main content (everything after hero section)
    let content = '';
    
    // Try to extract overview section
    const overviewSection = extractSectionContent(html, 'overview');
    if (overviewSection) {
      content += convertHtmlToMarkdown(overviewSection) + '\n\n';
    }

    // Try to extract other sections
    const sections = [
      'how-it-works',
      'optimization-guide',
      'schema-markup',
      'testing',
      'checklist',
      'best-practices',
      'resources',
    ];

    sections.forEach((sectionId) => {
      const sectionContent = extractSectionContent(html, sectionId);
      if (sectionContent) {
        content += convertHtmlToMarkdown(sectionContent) + '\n\n';
      }
    });

    // If no sections found, try to extract main content
    if (!content.trim()) {
      const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
      if (mainMatch) {
        content = convertHtmlToMarkdown(mainMatch[1]);
      }
    }

    // Combine frontmatter and content
    const mdxContent = frontmatter + '\n' + content.trim();

    // Write MDX file
    fs.writeFileSync(outputPath, mdxContent, 'utf-8');
    console.log(`✅ Migrated ${slug} → ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`❌ Error migrating ${slug}:`, error.message);
  }
}

// Main execution
function main() {
  console.log('🚀 Starting platform migration...\n');

  // Ensure output directory exists
  if (!fs.existsSync(ASTRO_PLATFORMS_DIR)) {
    fs.mkdirSync(ASTRO_PLATFORMS_DIR, { recursive: true });
  }

  // Get all HTML files
  const htmlFiles = fs
    .readdirSync(LEGACY_PLATFORMS_DIR)
    .filter((file) => file.endsWith('.html'));

  console.log(`Found ${htmlFiles.length} HTML files to process\n`);

  // Process each file
  htmlFiles.forEach(migratePlatform);

  console.log('\n✨ Migration complete!');
  console.log(`📁 Output directory: ${ASTRO_PLATFORMS_DIR}`);
}

main();
