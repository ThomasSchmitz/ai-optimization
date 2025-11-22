#!/bin/bash

# Script to create GitHub pull requests for platform migrations
# Each PR focuses on migrating one platform page from stub to full content

REPO="ThomasSchmitz/ai-optimization"
BASE_BRANCH="main"

# Array of platforms to migrate
declare -A PLATFORMS=(
    ["meta-ai"]="Meta AI platform migration - Facebook, Instagram, WhatsApp, and Messenger AI optimization guide"
    ["you-com"]="You.com platform migration - Privacy-focused AI search engine optimization guide"
    ["voice-search"]="Voice Search platform migration - Voice-optimized content and featured snippet strategies"
    ["google-ai-overviews"]="Google AI Overviews platform migration - AI-generated search results optimization (formerly SGE)"
    ["google-assistant"]="Google Assistant platform migration - Voice assistant and smart home optimization guide"
    ["alexa"]="Alexa platform migration - Amazon Echo and Alexa Skills optimization guide"
    ["siri"]="Siri platform migration - Apple ecosystem and Siri Suggestions optimization guide"
)

# Create PRs for each platform
for platform in "${!PLATFORMS[@]}"; do
    BRANCH="feature/migrate-${platform}"
    TITLE="feat: Migrate ${platform} platform page to full content"
    BODY="${PLATFORMS[$platform]}

## Changes
- Migrate \`astro-site/src/content/platforms/${platform}.mdx\` from stub to comprehensive content
- Extract content from live site (\`/tmp/${platform}.html\`)
- Include platform overview, key features, optimization strategies
- Add comprehensive checklist and implementation roadmap
- Include best practices, measurement strategies, and resources

## Related
- Part of Phase 4: Content Migration
- Follows pattern established in ChatGPT, Gemini, Copilot, Claude, Perplexity, and Grok migrations
- Each platform migration is in a separate PR to enable parallel work without merge conflicts

## File Changed
- \`astro-site/src/content/platforms/${platform}.mdx\` (~400-700 lines)

## Testing
- [ ] Run \`npm run build\` - should show 56+ pages built with 0 errors
- [ ] Verify page renders at \`http://localhost:4321/platforms/${platform}\`
- [ ] Confirm breadcrumbs, navigation, and internal links work
- [ ] Check dark/light mode theming

## Checklist
- [ ] Content migrated from live site
- [ ] MDX syntax validated (no numbered headings, no HTML operators)
- [ ] Frontmatter schema correct
- [ ] Build passes with no errors
- [ ] Page renders correctly in dev server"

    echo "Creating PR for ${platform}..."
    
    gh pr create \
        --repo "$REPO" \
        --base "$BASE_BRANCH" \
        --head "$BRANCH" \
        --title "$TITLE" \
        --body "$BODY" \
        --draft
    
    echo "✓ PR created for ${platform}"
    echo ""
done

echo "All 7 pull requests created successfully!"
echo ""
echo "Next steps:"
echo "1. Check out each branch: git checkout feature/migrate-[platform]"
echo "2. Complete the migration for that platform"
echo "3. Test with: npm run build"
echo "4. Commit changes and push to branch"
echo "5. Mark PR as ready for review"
echo ""
echo "Branches created:"
echo "  - feature/migrate-meta-ai"
echo "  - feature/migrate-you-com"
echo "  - feature/migrate-voice-search"
echo "  - feature/migrate-google-ai-overviews"
echo "  - feature/migrate-google-assistant"
echo "  - feature/migrate-alexa"
echo "  - feature/migrate-siri"
