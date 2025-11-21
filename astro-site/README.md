# AI Optimization - Astro Project

Modern, performant website for AI Generative Engine Optimization education and resources.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
http://localhost:4321
```

## 📁 Project Structure

```
├── src/
│   ├── components/      # Reusable Astro components
│   ├── layouts/         # Page layouts
│   ├── pages/           # File-based routing
│   ├── content/         # Content collections (MDX)
│   │   ├── guides/      # Guide articles
│   │   ├── platforms/   # Platform-specific guides
│   │   └── industries/  # Industry guides
│   ├── styles/          # Global CSS & Tailwind
│   └── utils/           # Helper functions
├── public/              # Static assets
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 🧞 Commands

| Command              | Action                               |
| -------------------- | ------------------------------------ |
| `npm install`        | Install dependencies                 |
| `npm run dev`        | Start dev server at `localhost:4321` |
| `npm run build`      | Build production site to `./dist/`   |
| `npm run preview`    | Preview production build locally     |
| `npm run lint`       | Run ESLint                           |
| `npm run format`     | Format code with Prettier            |
| `npm run type-check` | Check TypeScript types               |
| `npm run test`       | Run E2E tests with Playwright        |

## 🎨 Technology Stack

- **Framework**: [Astro](https://astro.build) - Static site generator
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- **Content**: [MDX](https://mdxjs.com) - Markdown with components
- **Language**: [TypeScript](https://www.typescriptlang.org) - Type-safe JavaScript
- **Testing**: [Playwright](https://playwright.dev) - E2E testing
- **SEO**: Auto-generated sitemaps, structured data, meta tags

## 📝 Content Management

### Creating a New Guide

1. Create MDX file in `src/content/guides/`
2. Add frontmatter:

```yaml
---
title: 'Your Guide Title'
description: 'SEO-friendly description'
publishDate: 2025-11-20
lastUpdated: 2025-11-20
category: 'platform'
featured: true
---
```

3. Write content in Markdown/MDX
4. File automatically becomes route: `/guides/your-guide-title`

### Adding a Platform Page

Similar process in `src/content/platforms/` with platform-specific schema.

## 🎯 AI Optimization Features

- ✅ Server-side rendering (all content accessible to AI crawlers)
- ✅ Comprehensive schema.org markup (JSON-LD)
- ✅ Answer-optimized content structure
- ✅ E-E-A-T signals throughout
- ✅ Clean, semantic HTML
- ✅ Fast performance (Core Web Vitals)
- ✅ Mobile-friendly responsive design
- ✅ Accessibility (WCAG 2 AA compliant)

## 📚 Documentation

- [Migration Plan](../docs/migration/MIGRATION_PLAN.md) - Complete migration roadmap
- [AI Requirements](../docs/migration/AI_REQUIREMENTS.md) - AI optimization specifications
- [Setup Guide](../docs/migration/SETUP.md) - Installation instructions

## 🔧 Configuration

### Site URL

Update in `astro.config.mjs` with your Bluehost domain:

```javascript
export default defineConfig({
  site: 'https://yourdomain.com', // Replace with your Bluehost domain
  // ...
});
```

### Theme Colors

Customize in `tailwind.config.mjs` under `theme.extend.colors`

### SEO

Global SEO settings in `src/layouts/BaseLayout.astro`

## 🚢 Deployment

### Bluehost Shared Hosting

This site is deployed on Bluehost shared hosting.

**Build and Deploy Steps:**

```bash
# 1. Build the production site locally
npm run build

# 2. Upload the dist/ folder contents to Bluehost
# Upload to: public_html/ (or your domain's root directory)
# Using: FTP, SFTP, or Bluehost File Manager
```

**Deployment Methods:**

1. **FTP/SFTP** (Recommended for automation)
   - Host: Your Bluehost domain or server IP
   - Port: 21 (FTP) or 22 (SFTP)
   - Upload `dist/*` to `public_html/`

2. **Bluehost File Manager**
   - Log into Bluehost cPanel
   - Navigate to File Manager
   - Upload contents of `dist/` to `public_html/`
   - Note: Delete old files first to avoid conflicts

3. **Bluehost Git Deployment** (if available)
   - Some Bluehost plans support Git deployment
   - Contact Bluehost support for setup

**Important Notes:**

- Always upload the **contents** of `dist/`, not the folder itself
- Clear browser cache after deployment
- Test on a subdomain first if available
- Bluehost may cache static files (24-48 hours)

## 📈 Performance Targets

- Lighthouse Performance: 95+
- First Contentful Paint: <1.2s
- Time to Interactive: <2.5s
- Cumulative Layout Shift: <0.1

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Run tests: `npm run test`
4. Format code: `npm run format`
5. Submit pull request

## 📄 License

MIT

## 🆘 Support

- Documentation: See `../docs/` folder
- Migration Docs: `../docs/migration/`
- Issues: GitHub Issues
- Astro Discord: https://astro.build/chat

## 🌐 Hosting

**Platform**: Bluehost Shared Hosting

**Deployment Checklist:**

- [ ] Run `npm run build` locally
- [ ] Test build with `npm run preview`
- [ ] Upload `dist/*` to Bluehost `public_html/`
- [ ] Verify .htaccess rules (if needed)
- [ ] Test all pages and routes
- [ ] Clear Bluehost cache
- [ ] Check Core Web Vitals

---

**Built with ❤️ using Astro, Tailwind CSS, and TypeScript**
