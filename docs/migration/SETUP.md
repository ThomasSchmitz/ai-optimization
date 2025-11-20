# Setup Instructions for AI Optimization Astro Migration

## Prerequisites Installation

### 1. Install Node.js (Required)

**Download**: https://nodejs.org/en/download/

Choose the **LTS (Long Term Support)** version for Windows.

During installation:
- ✅ Check "Automatically install necessary tools"
- ✅ Add to PATH (should be default)

**Verify Installation**:
```powershell
node --version    # Should show v20.x.x or later
npm --version     # Should show v10.x.x or later
```

---

## Quick Start (After Node.js Installation)

### Option 1: Automated Setup (Recommended)

```powershell
# Navigate to your project directory
cd c:\xampp\htdocs\GitHub\ai-optimization

# Run the setup script
.\setup-astro.ps1
```

### Option 2: Manual Setup

```powershell
# 1. Create new Astro project in subdirectory
npm create astro@latest astro-site -- --template minimal --typescript strict --install

# 2. Navigate into the project
cd astro-site

# 3. Install additional dependencies
npm install -D tailwindcss @astrojs/tailwind
npm install -D @astrojs/mdx
npm install -D @astrojs/sitemap
npm install -D astro-pagefind
npm install -D prettier prettier-plugin-astro
npm install -D @playwright/test

# 4. Initialize Tailwind CSS
npx tailwindcss init

# 5. Start development server
npm run dev
```

---

## Project Structure

After setup, you'll have:

```
ai-optimization/
├── astro-site/                 # New Astro project
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── content/
│   │   └── styles/
│   ├── public/
│   ├── astro.config.mjs
│   ├── package.json
│   └── tsconfig.json
├── pages/                      # Legacy HTML pages (keep for reference)
├── assets/                     # Legacy assets (will migrate)
├── components/                 # Legacy components (will convert)
└── MIGRATION_PLAN.md
```

---

## Development Workflow

### Daily Development

```powershell
cd astro-site
npm run dev              # Start dev server at http://localhost:4321
```

### Building for Production

```powershell
npm run build            # Creates dist/ folder
npm run preview          # Preview the production build
```

### Code Quality

```powershell
npm run lint             # Check for code issues
npm run format           # Format code with Prettier
npm run type-check       # TypeScript validation
```

### Testing

```powershell
npm run test             # Run unit tests
npm run test:e2e         # Run E2E tests with Playwright
```

---

## Next Steps After Installation

1. **Review the scaffolded project** in `astro-site/`
2. **Read**: `MIGRATION_PLAN.md` - Detailed migration roadmap
3. **Read**: `AI_REQUIREMENTS.md` - AI optimization requirements
4. **Start Phase 1**: Set up configuration files
5. **Create first component**: Convert header to Astro

---

## Troubleshooting

### Issue: npm command not found
**Solution**: Restart terminal after installing Node.js, or add Node.js to PATH manually

### Issue: Port 4321 already in use
**Solution**: 
```powershell
# Kill process using port
Get-Process -Id (Get-NetTCPConnection -LocalPort 4321).OwningProcess | Stop-Process

# Or use different port
npm run dev -- --port 3000
```

### Issue: Permission errors during npm install
**Solution**: Run PowerShell as Administrator

### Issue: Slow npm install
**Solution**: Use pnpm (faster alternative to npm)
```powershell
npm install -g pnpm
pnpm install  # Instead of npm install
```

---

## Useful Resources

- **Astro Docs**: https://docs.astro.build
- **Tailwind Docs**: https://tailwindcss.com/docs
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Migration Plan**: See `MIGRATION_PLAN.md`
- **AI Requirements**: See `AI_REQUIREMENTS.md`

---

## Support

If you encounter issues:
1. Check Node.js version (must be v18+)
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules/` and `package-lock.json`, reinstall
4. Review error messages carefully
5. Search Astro Discord: https://astro.build/chat

---

**Last Updated**: November 20, 2025
