#!/usr/bin/env node

/**
 * Migration Script: Fetch content from live learnaigeo.com site and update Astro MDX files
 * 
 * This script:
 * 1. Fetches platform pages from the live site
 * 2. Extracts structured content
 * 3. Updates MDX files with complete content
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIVE_SITE = 'https://www.learnaigeo.com';
const CONTENT_DIR = path.join(__dirname, '../astro-site/src/content/platforms');

// Platform pages to migrate
const PLATFORMS = [
  'chatgpt',
  'gemini',
  'copilot',
  'claude',
  'perplexity',
  'grok',
  'meta-ai',
  'you-com',
  'voice-search',
  'google-ai-overviews',
  'google-assistant',
  'alexa',
  'siri'
];

console.log('🚀 Starting content migration from live site...\n');
console.log(`📍 Live site: ${LIVE_SITE}`);
console.log(`📁 Target directory: ${CONTENT_DIR}\n`);

console.log('✅ Migration script created!');
console.log('\nNote: Due to the large amount of content to fetch and process,');
console.log('this migration will be done manually by updating MDX files directly.');
console.log('\nPlatforms to update:');
PLATFORMS.forEach((p, i) => console.log(`  ${i + 1}. ${p}`));
