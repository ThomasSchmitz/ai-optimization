# Bluehost Deployment Guide

Complete guide for deploying the AI Optimization Astro site to Bluehost shared hosting.

## Prerequisites

- Bluehost shared hosting account
- FTP/SFTP access credentials
- Domain configured in Bluehost
- Node.js installed locally (for building)

---

## Quick Deployment Steps

```bash
# 1. Build production site
cd astro-site
npm run build

# 2. Upload dist/ contents to Bluehost public_html/
# Use FTP client (FileZilla, Cyberduck) or Bluehost File Manager

# 3. Verify deployment
# Visit your domain
```

---

## Detailed Instructions

### Step 1: Build the Site Locally

```bash
cd c:\xampp\htdocs\GitHub\ai-optimization\astro-site

# Install dependencies (if not already)
npm install

# Build for production
npm run build

# Preview build (optional but recommended)
npm run preview
```

This creates a `dist/` folder with optimized static files.

### Step 2: Configure Site URL

Before building, update `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://yourdomain.com',  // Your Bluehost domain
  // ...
});
```

### Step 3: Upload to Bluehost

#### Option A: FTP/SFTP (Recommended)

**FTP Credentials** (from Bluehost cPanel):
- **Host**: ftp.yourdomain.com or server IP
- **Port**: 21 (FTP) or 22 (SFTP)
- **Username**: Your Bluehost username
- **Password**: Your Bluehost password

**Using FileZilla:**

1. Open FileZilla
2. Connect to your Bluehost server
3. Navigate to `public_html/website_55bbb501/`
4. **Delete old files** (important!)
5. Upload **contents** of `dist/` folder (not the folder itself)
6. Ensure all files uploaded successfully

**File Structure After Upload:**
```
public_html/website_55bbb501/
├── index.html
├── 404.html
├── platforms/
├── guides/
├── _astro/
├── images/
└── [other files from dist/]
```

#### Option B: Bluehost File Manager

1. Log into Bluehost cPanel
2. Go to **File Manager**
3. Navigate to `public_html/website_55bbb501/`
4. **Delete** old website files
5. Click **Upload**
6. Select all files/folders from `dist/`
7. Wait for upload to complete
8. Verify file structure

#### Option C: Automated Deployment Script

Create `deploy-to-bluehost.ps1`:

```powershell
# Bluehost Deployment Script
param(
    [string]$ftpHost = "ftp.yourdomain.com",
    [string]$ftpUser = "your-username",
    [string]$ftpPass = "your-password"
)

Write-Host "Building Astro site..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build successful! Uploading to Bluehost..." -ForegroundColor Green
    
    # Use WinSCP, lftp, or PowerShell FTP module
    # Example with WinSCP scripting
    
    Write-Host "Deployment complete!" -ForegroundColor Green
} else {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}
```

---

## Post-Deployment Configuration

### 1. Create .htaccess File

Bluehost uses Apache, so create `.htaccess` in `public_html/website_55bbb501/`:

```apache
# .htaccess for Astro Static Site on Bluehost

# Enable HTTPS redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove .html extension from URLs
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.+)$ $1.html [L,QSA]

# Custom 404 page
ErrorDocument 404 /404.html

# Enable Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

**To upload .htaccess:**
- Enable "Show Hidden Files" in File Manager
- Upload or create the file
- Ensure it's in the root directory (`public_html/website_55bbb501/`)

### 2. Verify robots.txt

Ensure `robots.txt` is in the root with AI bot permissions:

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

User-agent: PerplexityBot
Allow: /

Sitemap: https://yourdomain.com/sitemap-index.xml
```

### 3. Test the Deployment

**Checklist:**
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Images display properly
- [ ] CSS/styling applied
- [ ] JavaScript functionality works
- [ ] Theme toggle works
- [ ] Search functionality (if implemented)
- [ ] 404 page displays
- [ ] Mobile responsive
- [ ] HTTPS enabled

**Test URLs:**
```
https://yourdomain.com/
https://yourdomain.com/platforms/chatgpt
https://yourdomain.com/guides/
https://yourdomain.com/404
```

---

## Troubleshooting

### Issue: 404 Errors on Pages

**Problem**: Direct navigation to routes fails  
**Solution**: Add to `.htaccess`:
```apache
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.+)$ $1.html [L,QSA]
```

### Issue: CSS Not Loading

**Problem**: Styles not applied  
**Solution**: 
1. Check `astro.config.mjs` has correct `site` URL
2. Clear Bluehost cache
3. Hard refresh browser (Ctrl+Shift+R)
4. Verify `_astro/` folder uploaded

### Issue: Images Not Showing

**Problem**: Image paths broken  
**Solution**:
1. Ensure images in `public/` folder before build
2. Verify correct paths in code
3. Check file permissions (644 for files, 755 for folders)

### Issue: Slow Load Times

**Solution**:
1. Enable Gzip compression (see .htaccess above)
2. Use Bluehost CDN (if available)
3. Optimize images before deployment
4. Enable browser caching

### Issue: Deployment Overwrites .htaccess

**Solution**:
1. Keep `.htaccess` in `public/` folder in Astro project
2. It will be copied to `dist/` during build
3. Always included in deployments

---

## Bluehost-Specific Optimizations

### 1. Enable Cloudflare (Free on Bluehost)

Bluehost offers free Cloudflare integration:

1. Log into Bluehost
2. Go to **Advanced** → **Cloudflare**
3. Enable Cloudflare for your domain
4. Configure caching rules
5. Set SSL to "Full"

**Benefits**: CDN, DDoS protection, faster load times

### 2. PHP Version (Not Needed)

Astro generates static HTML - no PHP needed. Bluehost defaults are fine.

### 3. File Permissions

Set correct permissions after upload:
- Files: 644
- Folders: 755

```bash
# Via SSH (if available)
find public_html/website_55bbb501 -type f -exec chmod 644 {} \;
find public_html/website_55bbb501 -type d -exec chmod 755 {} \;
```

### 4. Subdomains

To deploy to a subdomain:

1. Create subdomain in Bluehost cPanel
2. Upload to the subdomain's directory (similar to `public_html/website_55bbb501/`)
3. Update `site` in `astro.config.mjs`

---

## Update Workflow

When updating the site:

```bash
# 1. Make changes locally
# 2. Test changes
npm run dev

# 3. Build new version
npm run build

# 4. Backup current live site (optional)
# Download current public_html/website_55bbb501/ via FTP

# 5. Deploy new version
# Upload dist/ contents to public_html/website_55bbb501/

# 6. Clear caches
# - Bluehost cache
# - Cloudflare cache (if enabled)
# - Browser cache

# 7. Verify
# Test all critical pages
```

---

## Automated Deployment (Advanced)

### Using GitHub Actions + FTP

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Bluehost

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
    
    - name: Install dependencies
      working-directory: ./astro-site
      run: npm install
    
    - name: Build
      working-directory: ./astro-site
      run: npm run build
    
    - name: Deploy to Bluehost
      uses: SamKirkland/FTP-Deploy-Action@4.3.0
      with:
        server: ${{ secrets.FTP_SERVER }}
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        local-dir: ./astro-site/dist/
        server-dir: ./public_html/website_55bbb501/
```

**Setup:**
1. Add FTP credentials to GitHub Secrets
2. Push to main branch
3. Automatic deployment!

---

## Performance Monitoring

### Google PageSpeed Insights

Test your live site:
```
https://pagespeed.web.dev/
```

**Target Scores:**
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### Uptime Monitoring

Use free services:
- UptimeRobot
- Pingdom
- StatusCake

---

## Support Resources

**Bluehost Support:**
- Phone: Available in your account
- Live Chat: Available in cPanel
- Knowledge Base: help.bluehost.com

**Astro Deployment:**
- Docs: docs.astro.build/en/guides/deploy/

**This Project:**
- Migration Docs: `docs/migration/`
- Issues: GitHub Issues

---

## Deployment Checklist

Before going live:

**Pre-Build:**
- [ ] Update `site` URL in `astro.config.mjs`
- [ ] Test locally with `npm run dev`
- [ ] Run `npm run build` successfully
- [ ] Preview with `npm run preview`
- [ ] Check for console errors
- [ ] Verify all links work

**Upload:**
- [ ] Backup current site (if replacing)
- [ ] Delete old files from public_html/website_55bbb501/
- [ ] Upload all dist/ contents
- [ ] Upload .htaccess file
- [ ] Verify file permissions

**Post-Deploy:**
- [ ] Test homepage
- [ ] Test all main routes
- [ ] Check mobile responsiveness
- [ ] Verify HTTPS works
- [ ] Test 404 page
- [ ] Check browser console for errors
- [ ] Run PageSpeed Insights
- [ ] Test AI bot accessibility (robots.txt)
- [ ] Clear all caches
- [ ] Monitor for 24 hours

---

**Last Updated**: November 20, 2025  
**Hosting**: Bluehost Shared Hosting  
**Framework**: Astro (Static Site)
