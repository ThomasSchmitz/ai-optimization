#!/usr/bin/env node
/**
 * Fix Internal Links in MDX Content
 * 
 * Converts old HTML paths to new Astro routes:
 * - /pages/guides/example.html → /guides/example
 * - /pages/platforms/example.html → /platforms/example
 * - /pages/industries/example.html → /industries/example
 * - /pages/tools/example.html → /tools/example
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const contentDir = join(__dirname, '../astro-site/src/content');

// Link transformation patterns
const linkPatterns = [
  { from: /\/pages\/guides\/([^)]+)\.html/g, to: '/guides/$1' },
  { from: /\/pages\/platforms\/([^)]+)\.html/g, to: '/platforms/$1' },
  { from: /\/pages\/industries\/([^)]+)\.html/g, to: '/industries/$1' },
  { from: /\/pages\/tools\/([^)]+)\.html/g, to: '/tools/$1' },
];

async function getAllMdxFiles(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getAllMdxFiles(fullPath)));
    } else if (entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function fixLinksInFile(filePath) {
  let content = await readFile(filePath, 'utf-8');
  let modified = false;
  let changeCount = 0;

  for (const pattern of linkPatterns) {
    const matches = content.match(pattern.from);
    if (matches) {
      content = content.replace(pattern.from, pattern.to);
      changeCount += matches.length;
      modified = true;
    }
  }

  if (modified) {
    await writeFile(filePath, content, 'utf-8');
    const relativePath = filePath.replace(contentDir + '/', '');
    console.log(`✅ Fixed ${changeCount} link(s) in ${relativePath}`);
    return changeCount;
  }

  return 0;
}

async function main() {
  console.log('🔍 Finding MDX files...\n');
  const mdxFiles = await getAllMdxFiles(contentDir);
  console.log(`Found ${mdxFiles.length} MDX files\n`);

  console.log('🔧 Fixing internal links...\n');
  let totalFixed = 0;

  for (const file of mdxFiles) {
    const fixed = await fixLinksInFile(file);
    totalFixed += fixed;
  }

  console.log(`\n✨ Complete! Fixed ${totalFixed} internal links across ${mdxFiles.length} files`);
}

main().catch(console.error);
