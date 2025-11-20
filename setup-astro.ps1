# PowerShell script to set up Astro project for AI Optimization migration

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  AI Optimization - Astro Project Setup" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "Choose the LTS (Long Term Support) version" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Check npm
Write-Host "Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm found: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm is not available!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Creating Astro project..." -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# Create Astro project
$projectName = "astro-site"

if (Test-Path $projectName) {
    Write-Host ""
    Write-Host "⚠ Directory '$projectName' already exists!" -ForegroundColor Yellow
    $response = Read-Host "Do you want to delete it and start fresh? (y/N)"
    if ($response -eq 'y' -or $response -eq 'Y') {
        Remove-Item -Recurse -Force $projectName
        Write-Host "✓ Removed existing directory" -ForegroundColor Green
    } else {
        Write-Host "Setup cancelled." -ForegroundColor Yellow
        exit 0
    }
}

Write-Host "Creating new Astro project in '$projectName'..." -ForegroundColor Yellow
npm create astro@latest $projectName -- --template minimal --typescript strict --install --no-git

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to create Astro project" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Astro project created successfully" -ForegroundColor Green

# Navigate to project
Set-Location $projectName

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Installing dependencies..." -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# Install Tailwind CSS
Write-Host "Installing Tailwind CSS..." -ForegroundColor Yellow
npm install -D tailwindcss @astrojs/tailwind

# Install MDX
Write-Host "Installing MDX support..." -ForegroundColor Yellow
npm install -D @astrojs/mdx

# Install Sitemap
Write-Host "Installing Sitemap plugin..." -ForegroundColor Yellow
npm install -D @astrojs/sitemap

# Install Pagefind (search)
Write-Host "Installing Pagefind (search)..." -ForegroundColor Yellow
npm install -D astro-pagefind

# Install Prettier
Write-Host "Installing Prettier..." -ForegroundColor Yellow
npm install -D prettier prettier-plugin-astro eslint-plugin-astro

# Install Playwright for testing
Write-Host "Installing Playwright..." -ForegroundColor Yellow
npm install -D @playwright/test

Write-Host ""
Write-Host "✓ All dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Configuring project..." -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# Initialize Tailwind
Write-Host "Initializing Tailwind CSS..." -ForegroundColor Yellow
npx tailwindcss init

Write-Host "✓ Configuration complete" -ForegroundColor Green

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. cd $projectName" -ForegroundColor White
Write-Host "  2. npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Your dev server will start at: http://localhost:4321" -ForegroundColor Cyan
Write-Host ""
Write-Host "Documentation:" -ForegroundColor Yellow
Write-Host "  - Migration Plan: ../docs/migration/MIGRATION_PLAN.md" -ForegroundColor White
Write-Host "  - AI Requirements: ../docs/migration/AI_REQUIREMENTS.md" -ForegroundColor White
Write-Host "  - Setup Guide: ../docs/migration/SETUP.md" -ForegroundColor White
Write-Host ""

# Return to parent directory
Set-Location ..

Write-Host "Happy coding! 🚀" -ForegroundColor Cyan
Write-Host ""
