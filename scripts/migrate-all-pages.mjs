#!/usr/bin/env node

/**
 * Universal Page Migration Script
 * Converts legacy HTML pages (guides, industries, tools, support) to MDX format
 * 
 * Usage:
 *   node migrate-all-pages.mjs [--type=guides|industries|tools|all] [--force]
 * 
 * Options:
 *   --type     Specify which page type to migrate (default: all)
 *   --force    Overwrite existing MDX files
 *   --dry-run  Preview migration without writing files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BASE_LEGACY_DIR = path.join(__dirname, '../legacy/pages');
const BASE_ASTRO_DIR = path.join(__dirname, '../astro-site/src/content');

const PAGE_TYPES = {
  guides: {
    legacyDir: path.join(BASE_LEGACY_DIR, 'guides'),
    outputDir: path.join(BASE_ASTRO_DIR, 'guides'),
    category: 'guide',
    schemaType: 'Article',
  },
  industries: {
    legacyDir: path.join(BASE_LEGACY_DIR, 'industries'),
    outputDir: path.join(BASE_ASTRO_DIR, 'industries'),
    category: 'industry',
    schemaType: 'Article',
  },
  tools: {
    legacyDir: path.join(BASE_LEGACY_DIR, 'tools'),
    outputDir: path.join(BASE_ASTRO_DIR, 'tools'),
    category: 'tool',
    schemaType: 'SoftwareApplication',
  },
};

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  type: 'all',
  force: false,
  dryRun: false,
};

args.forEach(arg => {
  if (arg.startsWith('--type=')) {
    options.type = arg.split('=')[1];
  } else if (arg === '--force') {
    options.force = true;
  } else if (arg === '--dry-run') {
    options.dryRun = true;
  }
});

// HTML cleaning and conversion helpers
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
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
}

function extractMetaTag(html, name) {
  const patterns = [
    new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]+)"`, 'i'),
    new RegExp(`<meta\\s+content="([^"]+)"\\s+name="${name}"`, 'i'),
  ];
  
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return match[1];
  }
  return '';
}

function extractTitle(html) {
  const match = html.match(/<title>([^<]+)<\/title>/i);
  if (match) {
    return match[1]
      .replace(' | AI GEO', '')
      .replace(' - AI GEO', '')
      .trim();
  }
  return '';
}

function extractIcon(html) {
  // Try to find guide-icon or similar
  const iconMatch = html.match(/<div class="guide-icon"[^>]*>\s*([^<\s]+)\s*<\/div>/i);
  if (iconMatch) return iconMatch[1];
  
  // Default icons based on common patterns
  const defaultIcons = {
    content: '✍️',
    strategy: '🎯',
    technical: '⚙️',
    analytics: '📊',
    schema: '🏗️',
    eeat: '🎓',
    local: '📍',
    product: '🛍️',
    social: '📱',
    authority: '⭐',
    writing: '📝',
    testing: '🧪',
    website: '🌐',
    reputation: '💎',
    perplexity: '🔍',
    linkedin: '💼',
    twitter: '🐦',
    agentic: '🤖',
    b2b: '🏢',
    ecommerce: '🛒',
    healthcare: '⚕️',
    publishing: '📰',
    saas: '☁️',
    technology: '💻',
    professional: '👔',
    regulated: '⚖️',
  };
  
  const title = extractTitle(html).toLowerCase();
  for (const [key, icon] of Object.entries(defaultIcons)) {
    if (title.includes(key)) return icon;
  }
  
  return '📄';
}

function extractReadingTime(html) {
  const match = html.match(/<span class="meta-text">(\d+)\s*min read<\/span>/i);
  return match ? parseInt(match[1]) : 10;
}

function extractDifficulty(html) {
  const difficultyMatch = html.match(/<span class="meta-text">(Beginner|Intermediate|Advanced|Beginner to Intermediate|Intermediate to Advanced)<\/span>/i);
  return difficultyMatch ? difficultyMatch[1] : 'Intermediate';
}

function extractAudience(html) {
  const audienceMatch = html.match(/<span class="meta-icon">🎯<\/span>\s*<span class="meta-text">([^<]+)<\/span>/i);
  return audienceMatch ? audienceMatch[1].trim() : 'All Users';
}

function convertHtmlToMarkdown(html) {
  let md = html;

  // Remove header/footer placeholders and noscript
  md = md.replace(/<div[^>]*id="header-placeholder"[^>]*>[\s\S]*?<\/div>/gi, '');
  md = md.replace(/<div[^>]*id="footer-placeholder"[^>]*>[\s\S]*?<\/div>/gi, '');
  md = md.replace(/<noscript>[\s\S]*?<\/noscript>/gi, '');

  // Remove script and style tags
  md = md.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  md = md.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // Convert headings
  md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n\n');
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n\n');
  md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n\n');
  md = md.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '\n##### $1\n\n');

  // Convert code blocks
  md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (match, code) => {
    const cleaned = code
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"');
    return '\n```\n' + cleaned + '\n```\n';
  });
  
  // Convert inline code
  md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');

  // Convert blockquotes
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (match, content) => {
    const cleaned = content.replace(/<[^>]+>/g, '').trim();
    return '\n> ' + cleaned + '\n\n';
  });

  // Convert Callout components (preserve these)
  md = md.replace(/<div class="callout callout-(info|warning|tip|success)"[^>]*>([\s\S]*?)<\/div>/gi, (match, type, content) => {
    const text = content.replace(/<[^>]+>/g, '').trim();
    return `\n<Callout type="${type}">\n${text}\n</Callout>\n\n`;
  });

  // Convert links before removing tags
  md = md.replace(/<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');

  // Convert strong/bold
  md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');

  // Convert emphasis/italic
  md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');

  // Convert unordered lists
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, content) => {
    let items = '';
    content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (m, item) => {
      const cleaned = item.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      items += `- ${cleaned}\n`;
    });
    return '\n' + items + '\n';
  });

  // Convert ordered lists
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, content) => {
    let items = '';
    let index = 1;
    content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (m, item) => {
      const cleaned = item.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      items += `${index}. ${cleaned}\n`;
      index++;
    });
    return '\n' + items + '\n';
  });

  // Convert tables (basic support)
  md = md.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (match, content) => {
    // This is a simplified table converter - may need manual cleanup
    return '\n<!-- Table converted - may need manual formatting -->\n' + match + '\n';
  });

  // Convert paragraphs
  md = md.replace(/<p[^>]*>(.*?)<\/p>/gis, '$1\n\n');

  // Convert line breaks
  md = md.replace(/<br\s*\/?>/gi, '\n');

  // Remove all remaining HTML tags
  md = md.replace(/<[^>]+>/g, '');

  // Clean up HTML entities
  md = md
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&copy;/g, '©')
    .replace(/&reg;/g, '®')
    .replace(/&trade;/g, '™');

  // Clean up whitespace
  md = md.replace(/[ \t]+/g, ' '); // Multiple spaces to single
  md = md.replace(/\n\s*\n\s*\n+/g, '\n\n'); // Multiple newlines to double
  
  // Escape square brackets that could be confused with JSX expressions in MDX
  // Preserve markdown links [text](url) and code blocks, but escape everything else
  
  // 1. Protect code blocks
  const codeBlocks = [];
  md = md.replace(/```[\s\S]*?```/g, (match) => {
    codeBlocks.push(match);
    return `___CODE_${codeBlocks.length - 1}___`;
  });
  
  // 2. Protect markdown links
  const links = [];
  md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match) => {
    links.push(match);
    return `___LINK_${links.length - 1}___`;
  });
  
  // 3. Now escape all remaining square brackets
  md = md.replace(/\[/g, '\\[').replace(/\]/g, '\\]');
  
  // 4. Restore markdown links
  links.forEach((link, index) => {
    md = md.replace(`___LINK_${index}___`, link);
  });
  
  // 5. Restore code blocks
  codeBlocks.forEach((block, index) => {
    md = md.replace(`___CODE_${index}___`, block);
  });
  
  md = md.trim();

  return md;
}

function extractMainContent(html) {
  // Remove hero section
  let content = html.replace(/<section class="guide-hero"[^>]*>[\s\S]*?<\/section>/i, '');
  
  // Remove table of contents
  content = content.replace(/<section class="content-section"[^>]*>[\s\S]*?<nav class="table-of-contents">[\s\S]*?<\/nav>[\s\S]*?<\/div>[\s\S]*?<\/section>/i, '');
  
  // Extract main tag content
  const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) {
    content = mainMatch[1];
  }
  
  return content;
}

function inferCategory(title, keywords) {
  const lower = (title + ' ' + keywords).toLowerCase();
  if (lower.includes('platform') || lower.includes('chatgpt') || lower.includes('gemini')) return 'platform';
  if (lower.includes('schema') || lower.includes('technical') || lower.includes('seo')) return 'technical';
  if (lower.includes('content') || lower.includes('writing') || lower.includes('product')) return 'content';
  if (lower.includes('analytics') || lower.includes('tracking') || lower.includes('testing')) return 'analytics';
  return 'strategy';
}

function generateFrontmatter(slug, html, pageType) {
  const title = extractTitle(html);
  const description = extractMetaTag(html, 'description');
  const keywords = extractMetaTag(html, 'keywords');
  const icon = extractIcon(html);
  const readingTime = extractReadingTime(html);
  const difficulty = extractDifficulty(html);
  const audience = extractAudience(html);
  
  const now = new Date();
  const publishDate = new Date('2025-01-15');
  
  const config = PAGE_TYPES[pageType];
  
  // For guides, infer category from content
  const category = pageType === 'guides' 
    ? inferCategory(title, keywords) 
    : config.category;
  
  let frontmatter = '';
  
  if (pageType === 'guides') {
    frontmatter = `---
title: "${title}"
description: "${description}"
publishDate: ${publishDate.toISOString().split('T')[0]}
lastUpdated: ${now.toISOString().split('T')[0]}
category: "${category}"
icon: "${icon}"
readTime: "${readingTime} min"
difficulty: "${difficulty}"
audience: "${audience}"`;
    
    if (keywords) {
      const keywordArray = keywords.split(',').map(k => k.trim()).slice(0, 8);
      frontmatter += `\ntags:`;
      keywordArray.forEach(kw => {
        frontmatter += `\n  - "${kw}"`;
      });
    }
    
    frontmatter += `\nfeatured: false
author: "AI GEO"
relatedGuides: []
schema:
  type: "${config.schemaType}"
`;
  } else if (pageType === 'industries') {
    frontmatter = `---
title: "${title}"
description: "${description}"
industry: "${slug}"
publishDate: ${publishDate.toISOString().split('T')[0]}
lastUpdated: ${now.toISOString().split('T')[0]}
featured: false
relatedIndustries: []
`;
  } else {
    // Default/tools format
    frontmatter = `---
title: "${title}"
description: "${description}"
slug: "${slug}"
category: "${category}"
publishDate: ${publishDate.toISOString().split('T')[0]}
lastUpdated: ${now.toISOString().split('T')[0]}
icon: "${icon}"
readingTime: ${readingTime}
difficulty: "${difficulty}"
audience: "${audience}"
featured: false
`;
  }

  frontmatter += `---

import Callout from '@/components/Callout.astro';
import FeatureCard from '@/components/FeatureCard.astro';
`;

  return frontmatter;
}

function migratePage(filePath, pageType, config) {
  const filename = path.basename(filePath);
  const slug = path.basename(filename, '.html');
  
  // Skip index pages
  if (slug === 'index') {
    console.log(`⏭️  Skipping ${slug} (index page)`);
    return { skipped: true, reason: 'index' };
  }

  const outputPath = path.join(config.outputDir, `${slug}.mdx`);
  
  // Check if already exists
  if (fs.existsSync(outputPath) && !options.force) {
    console.log(`⏭️  Skipping ${slug} (already exists, use --force to overwrite)`);
    return { skipped: true, reason: 'exists' };
  }

  console.log(`📄 Processing ${pageType}/${slug}...`);

  try {
    const html = fs.readFileSync(filePath, 'utf-8');
    
    // Generate frontmatter
    const frontmatter = generateFrontmatter(slug, html, pageType);
    
    // Extract and convert content
    const mainContent = extractMainContent(html);
    const markdown = convertHtmlToMarkdown(mainContent);
    
    // Combine
    const mdxContent = frontmatter + '\n' + markdown;
    
    // Write file (unless dry run)
    if (!options.dryRun) {
      // Ensure output directory exists
      if (!fs.existsSync(config.outputDir)) {
        fs.mkdirSync(config.outputDir, { recursive: true });
      }
      
      fs.writeFileSync(outputPath, mdxContent, 'utf-8');
      console.log(`✅ Migrated ${slug} → ${path.relative(BASE_ASTRO_DIR, outputPath)}`);
    } else {
      console.log(`✅ [DRY RUN] Would migrate ${slug} → ${path.relative(BASE_ASTRO_DIR, outputPath)}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error(`❌ Error migrating ${slug}:`, error.message);
    return { error: error.message };
  }
}

function migratePageType(pageType) {
  const config = PAGE_TYPES[pageType];
  
  if (!fs.existsSync(config.legacyDir)) {
    console.log(`⚠️  Directory not found: ${config.legacyDir}`);
    return { total: 0, migrated: 0, skipped: 0, errors: 0 };
  }
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 Migrating ${pageType.toUpperCase()} pages...`);
  console.log(`${'='.repeat(60)}\n`);
  
  const files = fs.readdirSync(config.legacyDir)
    .filter(f => f.endsWith('.html'))
    .map(f => path.join(config.legacyDir, f));
  
  console.log(`Found ${files.length} HTML files\n`);
  
  let migrated = 0;
  let skipped = 0;
  let errors = 0;
  
  files.forEach(file => {
    const result = migratePage(file, pageType, config);
    if (result.success) migrated++;
    else if (result.skipped) skipped++;
    else if (result.error) errors++;
  });
  
  console.log(`\n📊 ${pageType.toUpperCase()} Summary:`);
  console.log(`   Total: ${files.length}`);
  console.log(`   ✅ Migrated: ${migrated}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Errors: ${errors}`);
  
  return { total: files.length, migrated, skipped, errors };
}

function main() {
  console.log('\n🚀 AI GEO Universal Page Migration Script');
  console.log(`${'='.repeat(60)}\n`);
  
  if (options.dryRun) {
    console.log('⚠️  DRY RUN MODE - No files will be written\n');
  }
  
  console.log(`Options:`);
  console.log(`  Type: ${options.type}`);
  console.log(`  Force overwrite: ${options.force}`);
  console.log(`  Dry run: ${options.dryRun}`);
  
  const stats = {
    total: 0,
    migrated: 0,
    skipped: 0,
    errors: 0,
  };
  
  const typesToMigrate = options.type === 'all' 
    ? Object.keys(PAGE_TYPES)
    : [options.type];
  
  // Validate page types
  for (const type of typesToMigrate) {
    if (!PAGE_TYPES[type]) {
      console.error(`\n❌ Invalid page type: ${type}`);
      console.error(`   Valid types: ${Object.keys(PAGE_TYPES).join(', ')}, all`);
      process.exit(1);
    }
  }
  
  // Migrate each type
  typesToMigrate.forEach(type => {
    const result = migratePageType(type);
    stats.total += result.total;
    stats.migrated += result.migrated;
    stats.skipped += result.skipped;
    stats.errors += result.errors;
  });
  
  // Final summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('✨ MIGRATION COMPLETE');
  console.log(`${'='.repeat(60)}`);
  console.log(`\n📊 Overall Summary:`);
  console.log(`   Total files processed: ${stats.total}`);
  console.log(`   ✅ Successfully migrated: ${stats.migrated}`);
  console.log(`   ⏭️  Skipped: ${stats.skipped}`);
  console.log(`   ❌ Errors: ${stats.errors}`);
  console.log(`\n📁 Output directory: ${BASE_ASTRO_DIR}`);
  
  if (options.dryRun) {
    console.log(`\n💡 This was a dry run. Remove --dry-run to write files.`);
  }
  
  console.log('\n');
}

// Run the script
main();
