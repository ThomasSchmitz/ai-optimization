# Legacy HTML Site - Archived

This directory contains the original HTML/CSS/JavaScript implementation of the AI Optimization website.

## ⚠️ Status: Archived

This code is **no longer actively developed**. It has been preserved for:
- Historical reference during migration
- Comparison with new Astro implementation
- Access to legacy content and assets

## 🚀 Active Development

The active project is now in **[../astro-site/](../astro-site/)** using modern technologies:
- Astro framework
- Tailwind CSS
- TypeScript
- MDX content

## 📚 Running the Legacy Site

If you need to reference the old site:

```bash
# Option 1: Open in browser
open index.html

# Option 2: Run local server
python -m http.server 8000
# Visit http://localhost:8000
```

## 📁 Structure

```
legacy/
├── index.html           # Homepage
├── assets/              # CSS, JS, images
├── components/          # HTML includes
├── pages/               # Content pages
├── templates/           # Page templates
├── downloads/           # Downloadable resources
├── tests/               # Jest tests
├── package.json         # Node dependencies
└── jest.config.js       # Test configuration
```

## 📖 Documentation

Legacy documentation has been moved to **[../docs/legacy/](../docs/legacy/)**:
- CODE_REVIEW.md
- IMPLEMENTATION_SUMMARY.md
- QUICK_START.md
- SECURITY_IMPLEMENTATION.md
- And more...

## 🔄 Migration

See **[../docs/migration/MIGRATION_PLAN.md](../docs/migration/MIGRATION_PLAN.md)** for the complete migration roadmap.

---

**Note**: For new development, use [../astro-site/](../astro-site/)
