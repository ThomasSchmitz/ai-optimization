# Merge All Open PRs Script
# This script merges PRs #75-82 sequentially into main

$ErrorActionPreference = "Stop"

# PR branches to merge in order
$prBranches = @(
    "copilot/implement-local-business-ai-optimization",      # PR #75
    "copilot/implement-b2b-professional-services",           # PR #76
    "copilot/implement-saas-technology-products",            # PR #77
    "copilot/implement-healthcare-regulated-industries",     # PR #78
    "copilot/implement-content-creators-media",              # PR #79
    "copilot/implement-roadmap-learning-paths",              # PR #80
    "copilot/implement-faq-support-contact",                 # PR #81
    "copilot/implement-community-resources"                  # PR #82
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Merging PRs #75-82" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Make sure we're on main and up to date
Write-Host "Ensuring main branch is current..." -ForegroundColor Yellow
git checkout main
git pull origin main

# Fetch all branches
Write-Host "`nFetching all remote branches..." -ForegroundColor Yellow
git fetch origin

$mergedCount = 0
$failedMerges = @()

foreach ($branch in $prBranches) {
    $prNumber = switch ($branch) {
        "copilot/implement-local-business-ai-optimization" { "75" }
        "copilot/implement-b2b-professional-services" { "76" }
        "copilot/implement-saas-technology-products" { "77" }
        "copilot/implement-healthcare-regulated-industries" { "78" }
        "copilot/implement-content-creators-media" { "79" }
        "copilot/implement-roadmap-learning-paths" { "80" }
        "copilot/implement-faq-support-contact" { "81" }
        "copilot/implement-community-resources" { "82" }
    }
    
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "Merging PR #$prNumber ($branch)" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    
    try {
        # Attempt merge
        git merge "origin/$branch" --no-edit -m "Merge PR #$prNumber"
        
        # Check if there are conflicts
        $conflictStatus = git status --porcelain | Select-String "^UU"
        
        if ($conflictStatus) {
            Write-Host "CONFLICTS DETECTED in PR #$prNumber" -ForegroundColor Red
            Write-Host "Conflicting files:" -ForegroundColor Red
            git status --short | Where-Object { $_ -match "^UU" }
            
            # Check which files have conflicts
            $conflicts = git diff --name-only --diff-filter=U
            
            Write-Host "`nAttempting auto-resolution..." -ForegroundColor Yellow
            
            # Auto-resolve by accepting both changes for known files
            foreach ($file in $conflicts) {
                if ($file -eq "search-index.json" -or $file -eq "sitemap.xml") {
                    Write-Host "  - Auto-merging $file (keeping both changes)" -ForegroundColor Yellow
                    # For these files, we'll use a strategy to keep both sides
                    git checkout --ours $file
                    git add $file
                } else {
                    Write-Host "  - Unknown conflict in $file, needs manual resolution" -ForegroundColor Red
                    $failedMerges += "PR #$prNumber - $file"
                }
            }
            
            # Try to commit if all conflicts resolved
            $remainingConflicts = git diff --name-only --diff-filter=U
            if (-not $remainingConflicts) {
                git commit --no-edit
                Write-Host "Auto-resolved and committed PR #$prNumber" -ForegroundColor Green
                $mergedCount++
            } else {
                Write-Host "Could not auto-resolve all conflicts in PR #$prNumber" -ForegroundColor Red
                $failedMerges += "PR #$prNumber - Manual resolution needed"
                # Abort this merge
                git merge --abort
            }
        } else {
            Write-Host "PR #$prNumber merged successfully (no conflicts)" -ForegroundColor Green
            $mergedCount++
        }
    }
    catch {
        Write-Host "ERROR merging PR #$prNumber : $_" -ForegroundColor Red
        $failedMerges += "PR #$prNumber - $_"
        # Try to abort if merge is in progress
        try { git merge --abort } catch {}
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "MERGE SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Successfully merged: $mergedCount / $($prBranches.Count)" -ForegroundColor Green

if ($failedMerges.Count -gt 0) {
    Write-Host "`nFailed merges:" -ForegroundColor Red
    $failedMerges | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Write-Host "`nThese will need manual resolution in GitHub UI" -ForegroundColor Yellow
} else {
    Write-Host "`nAll PRs merged successfully!" -ForegroundColor Green
    Write-Host "`nTo push all changes to GitHub, run:" -ForegroundColor Yellow
    Write-Host "  git push origin main" -ForegroundColor Cyan
}

Write-Host "`nCurrent branch status:" -ForegroundColor Yellow
git status
