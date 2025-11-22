# Migration Scripts

Automated tools for migrating legacy HTML pages to the new Astro MDX format.

## Available Scripts

### `migrate-all-pages.mjs` - Universal Page Migration

Converts legacy HTML pages (guides, industries, tools) to MDX format with proper frontmatter and markdown conversion.

#### Features

- ✅ Automatic metadata extraction (title, description, keywords)
- ✅ HTML to Markdown conversion with proper formatting
- ✅ Frontmatter generation with schema support
- ✅ Icon detection and assignment
- ✅ Reading time, difficulty, and audience extraction
- ✅ Component preservation (Callouts, FeatureCards)
- ✅ Table of contents removal (handled by layout)
- ✅ Dry-run mode for testing
- ✅ Force overwrite option
- ✅ Selective migration by type

#### Usage

```bash
# Migrate all page types
node scripts/migrate-all-pages.mjs

# Migrate specific type
node scripts/migrate-all-pages.mjs --type=guides
node scripts/migrate-all-pages.mjs --type=industries
node scripts/migrate-all-pages.mjs --type=tools

# Dry run (preview without writing files)
node scripts/migrate-all-pages.mjs --type=guides --dry-run

# Force overwrite existing files
node scripts/migrate-all-pages.mjs --type=guides --force

# Combine options
node scripts/migrate-all-pages.mjs --type=industries --force --dry-run
```

#### Options

| Option | Description |
|--------|-------------|
| `--type=<type>` | Migrate specific page type: `guides`, `industries`, `tools`, or `all` (default: `all`) |
| `--force` | Overwrite existing MDX files |
| `--dry-run` | Preview migration without writing files |

#### Output

The script creates MDX files in:

- **Guides**: `astro-site/src/content/guides/`
- **Industries**: `astro-site/src/content/industries/`
- **Tools**: `astro-site/src/content/tools/`

Each file includes:

- **Frontmatter**: All metadata needed for the Astro content collection
- **Imports**: Pre-configured component imports (Callout, FeatureCard)
- **Content**: Clean markdown with proper heading hierarchy
- **Preserved components**: Callouts and special formatting

#### Example Output

```mdx
---
title: "Analytics and Tracking for AI Visibility"
description: "Comprehensive guide to measuring and monitoring your AI GEO performance..."
slug: "analytics"
category: "guide"
publishDate: 2025-01-15
lastUpdated: 2025-11-22
icon: "📊"
readingTime: 30
difficulty: "Intermediate to Advanced"
audience: "Marketers, Analytics Professionals, Business Owners"
featured: false
keywords:
  - "AI analytics"
  - "AI tracking"
relatedGuides: []
relatedPlatforms: []
schema:
  type: "Article"
  author: "AI GEO"
---

import Callout from '@/components/Callout.astro';
import FeatureCard from '@/components/FeatureCard.astro';

## Introduction

Content begins here...
```

---

### `migrate-platforms.mjs` - Platform Migration (Legacy)

Original platform migration script with section extraction and metadata mapping.

**Status**: Superseded by platform stub generator. Use for reference only.

---

### `generate-platform-stubs.mjs` - Platform Stub Generator

Creates clean, buildable platform page stubs with template content.

#### Usage

```bash
node scripts/generate-platform-stubs.mjs
```

#### Features

- Pre-defined metadata for major platforms
- Template content structure
- Optimization strategies included
- Testing and best practices sections

---

## Migration Workflow

### Recommended Order

1. **Platforms** ✅ (Complete - 13 pages)
   ```bash
   # Already migrated with stubs
   ```

2. **Guides** ✅ (Complete - 17 pages)
   ```bash
   node scripts/migrate-all-pages.mjs --type=guides
   ```

3. **Industries** ✅ (Complete - 10 pages)
   ```bash
   node scripts/migrate-all-pages.mjs --type=industries
   ```

4. **Tools** (Pending)
   ```bash
   node scripts/migrate-all-pages.mjs --type=tools
   ```

### Post-Migration Tasks

After running migration scripts:

1. **Review Output**
   - Check for any formatting issues
   - Verify metadata accuracy
   - Ensure links are correct

2. **Test Build**
   ```bash
   cd astro-site
   npm run build
   ```

3. **Manual Cleanup**
   - Fix complex tables (auto-conversion may need help)
   - Enhance stub content with full details
   - Add related content links
   - Update OG images

4. **Validate**
   ```bash
   npm run type-check
   npm run lint
   ```

---

## Troubleshooting

### Script Errors

**Problem**: Script fails with "Cannot find module"

**Solution**: Ensure you're running from the project root:
```bash
cd /Users/thomasschmitz/Sites/ai-optimization
node scripts/migrate-all-pages.mjs
```

---

**Problem**: "Directory not found" error

**Solution**: Check that legacy HTML files exist:
```bash
ls legacy/pages/guides/
```

---

### Migration Quality Issues

**Problem**: Tables not converting properly

**Solution**: Tables are marked with HTML comments for manual conversion. Review and convert using markdown table syntax.

---

**Problem**: Lost formatting in complex sections

**Solution**: Use `--dry-run` to preview, then manually enhance specific sections after migration.

---

**Problem**: Missing icons or metadata

**Solution**: The script uses pattern matching and defaults. Update the icon/metadata mappings in the script for better detection.

---

## Extending the Scripts

### Adding New Page Types

1. Add configuration to `PAGE_TYPES` object:

```javascript
const PAGE_TYPES = {
  // ... existing types
  resources: {
    legacyDir: path.join(BASE_LEGACY_DIR, 'resources'),
    outputDir: path.join(BASE_ASTRO_DIR, 'resources'),
    category: 'resource',
    schemaType: 'Article',
  },
};
```

2. Run migration:

```bash
node scripts/migrate-all-pages.mjs --type=resources
```

### Customizing Icon Detection

Edit the `defaultIcons` object in `extractIcon()` function:

```javascript
const defaultIcons = {
  content: '✍️',
  analytics: '📊',
  // Add your patterns here
  'your-pattern': '🎯',
};
```

---

## Migration Statistics

### Current Progress

| Page Type | Total | Migrated | Status |
|-----------|-------|----------|--------|
| Platforms | 13 | 13 | ✅ Complete |
| Guides | 18 | 18 | ✅ Complete |
| Industries | 10 | 10 | ✅ Complete |
| Tools | TBD | 0 | ⏸️ Pending |
| Support | TBD | 0 | ⏸️ Pending |

**Total Migrated**: 41 pages  
**Estimated Remaining**: ~10-15 pages

---

## Best Practices

1. **Always dry-run first** - Preview changes before writing
2. **Migrate incrementally** - One page type at a time
3. **Test builds frequently** - Catch errors early
4. **Manual review** - Complex content may need cleanup
5. **Preserve URLs** - Maintain legacy URLs for SEO
6. **Update links** - Fix internal cross-references after migration

---

## Support

For issues or questions:

1. Check this README
2. Review script comments
3. Examine successful migrations as examples
4. Test with `--dry-run` before committing changes

---

**Last Updated**: November 22, 2025  
**Maintained By**: Thomas Schmitz
