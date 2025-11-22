#!/bin/bash

# Run this script after authenticating with: gh auth login

echo "Creating 7 pull requests for platform migrations..."
echo ""

# 1. Meta AI
echo "Creating PR for Meta AI..."
gh pr create \
  --repo "ThomasSchmitz/ai-optimization" \
  --base "main" \
  --head "feature/migrate-meta-ai" \
  --title "feat: Migrate Meta AI platform page to full content" \
  --body "Meta AI platform migration - Facebook, Instagram, WhatsApp, and Messenger AI optimization guide

## Changes
- Migrate \`astro-site/src/content/platforms/meta-ai.mdx\` from stub to comprehensive content
- Extract content from live site (\`/tmp/meta-ai.html\`)
- Include platform overview, key features, optimization strategies
- Add comprehensive checklist and implementation roadmap
- Include best practices, measurement strategies, and resources

## Related
- Part of Phase 4: Content Migration
- Follows pattern established in ChatGPT, Gemini, Copilot, Claude, Perplexity, and Grok migrations
- Each platform migration is in a separate PR to enable parallel work without merge conflicts

## File Changed
- \`astro-site/src/content/platforms/meta-ai.mdx\` (~400-700 lines)

## Testing
- [ ] Run \`npm run build\` - should show 56+ pages built with 0 errors
- [ ] Verify page renders at \`http://localhost:4321/platforms/meta-ai\`
- [ ] Confirm breadcrumbs, navigation, and internal links work
- [ ] Check dark/light mode theming

## Checklist
- [ ] Content migrated from live site
- [ ] MDX syntax validated (no numbered headings, no HTML operators)
- [ ] Frontmatter schema correct
- [ ] Build passes with no errors
- [ ] Page renders correctly in dev server" \
  --draft

echo "✓ Meta AI PR created"
echo ""

# 2. You.com
echo "Creating PR for You.com..."
gh pr create \
  --repo "ThomasSchmitz/ai-optimization" \
  --base "main" \
  --head "feature/migrate-you-com" \
  --title "feat: Migrate You.com platform page to full content" \
  --body "You.com platform migration - Privacy-focused AI search engine optimization guide

## Changes
- Migrate \`astro-site/src/content/platforms/you-com.mdx\` from stub to comprehensive content
- Extract content from live site (\`/tmp/you-com.html\`)
- Include platform overview, key features, optimization strategies
- Add comprehensive checklist and implementation roadmap
- Include best practices, measurement strategies, and resources

## Related
- Part of Phase 4: Content Migration
- Follows pattern established in ChatGPT, Gemini, Copilot, Claude, Perplexity, and Grok migrations
- Each platform migration is in a separate PR to enable parallel work without merge conflicts

## File Changed
- \`astro-site/src/content/platforms/you-com.mdx\` (~400-700 lines)

## Testing
- [ ] Run \`npm run build\` - should show 56+ pages built with 0 errors
- [ ] Verify page renders at \`http://localhost:4321/platforms/you-com\`
- [ ] Confirm breadcrumbs, navigation, and internal links work
- [ ] Check dark/light mode theming

## Checklist
- [ ] Content migrated from live site
- [ ] MDX syntax validated (no numbered headings, no HTML operators)
- [ ] Frontmatter schema correct
- [ ] Build passes with no errors
- [ ] Page renders correctly in dev server" \
  --draft

echo "✓ You.com PR created"
echo ""

# 3. Voice Search
echo "Creating PR for Voice Search..."
gh pr create \
  --repo "ThomasSchmitz/ai-optimization" \
  --base "main" \
  --head "feature/migrate-voice-search" \
  --title "feat: Migrate Voice Search platform page to full content" \
  --body "Voice Search platform migration - Voice-optimized content and featured snippet strategies

## Changes
- Migrate \`astro-site/src/content/platforms/voice-search.mdx\` from stub to comprehensive content
- Extract content from live site (\`/tmp/voice-search.html\`)
- Include platform overview, key features, optimization strategies
- Add comprehensive checklist and implementation roadmap
- Include best practices, measurement strategies, and resources

## Related
- Part of Phase 4: Content Migration
- Follows pattern established in ChatGPT, Gemini, Copilot, Claude, Perplexity, and Grok migrations
- Each platform migration is in a separate PR to enable parallel work without merge conflicts

## File Changed
- \`astro-site/src/content/platforms/voice-search.mdx\` (~400-700 lines)

## Testing
- [ ] Run \`npm run build\` - should show 56+ pages built with 0 errors
- [ ] Verify page renders at \`http://localhost:4321/platforms/voice-search\`
- [ ] Confirm breadcrumbs, navigation, and internal links work
- [ ] Check dark/light mode theming

## Checklist
- [ ] Content migrated from live site
- [ ] MDX syntax validated (no numbered headings, no HTML operators)
- [ ] Frontmatter schema correct
- [ ] Build passes with no errors
- [ ] Page renders correctly in dev server" \
  --draft

echo "✓ Voice Search PR created"
echo ""

# 4. Google AI Overviews
echo "Creating PR for Google AI Overviews..."
gh pr create \
  --repo "ThomasSchmitz/ai-optimization" \
  --base "main" \
  --head "feature/migrate-google-ai-overviews" \
  --title "feat: Migrate Google AI Overviews platform page to full content" \
  --body "Google AI Overviews platform migration - AI-generated search results optimization (formerly SGE)

## Changes
- Migrate \`astro-site/src/content/platforms/google-ai-overviews.mdx\` from stub to comprehensive content
- Extract content from live site (\`/tmp/google-ai-overviews.html\`)
- Include platform overview, key features, optimization strategies
- Add comprehensive checklist and implementation roadmap
- Include best practices, measurement strategies, and resources

## Related
- Part of Phase 4: Content Migration
- Follows pattern established in ChatGPT, Gemini, Copilot, Claude, Perplexity, and Grok migrations
- Each platform migration is in a separate PR to enable parallel work without merge conflicts

## File Changed
- \`astro-site/src/content/platforms/google-ai-overviews.mdx\` (~400-700 lines)

## Testing
- [ ] Run \`npm run build\` - should show 56+ pages built with 0 errors
- [ ] Verify page renders at \`http://localhost:4321/platforms/google-ai-overviews\`
- [ ] Confirm breadcrumbs, navigation, and internal links work
- [ ] Check dark/light mode theming

## Checklist
- [ ] Content migrated from live site
- [ ] MDX syntax validated (no numbered headings, no HTML operators)
- [ ] Frontmatter schema correct
- [ ] Build passes with no errors
- [ ] Page renders correctly in dev server" \
  --draft

echo "✓ Google AI Overviews PR created"
echo ""

# 5. Google Assistant
echo "Creating PR for Google Assistant..."
gh pr create \
  --repo "ThomasSchmitz/ai-optimization" \
  --base "main" \
  --head "feature/migrate-google-assistant" \
  --title "feat: Migrate Google Assistant platform page to full content" \
  --body "Google Assistant platform migration - Voice assistant and smart home optimization guide

## Changes
- Migrate \`astro-site/src/content/platforms/google-assistant.mdx\` from stub to comprehensive content
- Extract content from live site (\`/tmp/google-assistant.html\`)
- Include platform overview, key features, optimization strategies
- Add comprehensive checklist and implementation roadmap
- Include best practices, measurement strategies, and resources

## Related
- Part of Phase 4: Content Migration
- Follows pattern established in ChatGPT, Gemini, Copilot, Claude, Perplexity, and Grok migrations
- Each platform migration is in a separate PR to enable parallel work without merge conflicts

## File Changed
- \`astro-site/src/content/platforms/google-assistant.mdx\` (~400-700 lines)

## Testing
- [ ] Run \`npm run build\` - should show 56+ pages built with 0 errors
- [ ] Verify page renders at \`http://localhost:4321/platforms/google-assistant\`
- [ ] Confirm breadcrumbs, navigation, and internal links work
- [ ] Check dark/light mode theming

## Checklist
- [ ] Content migrated from live site
- [ ] MDX syntax validated (no numbered headings, no HTML operators)
- [ ] Frontmatter schema correct
- [ ] Build passes with no errors
- [ ] Page renders correctly in dev server" \
  --draft

echo "✓ Google Assistant PR created"
echo ""

# 6. Alexa
echo "Creating PR for Alexa..."
gh pr create \
  --repo "ThomasSchmitz/ai-optimization" \
  --base "main" \
  --head "feature/migrate-alexa" \
  --title "feat: Migrate Alexa platform page to full content" \
  --body "Alexa platform migration - Amazon Echo and Alexa Skills optimization guide

## Changes
- Migrate \`astro-site/src/content/platforms/alexa.mdx\` from stub to comprehensive content
- Extract content from live site (\`/tmp/alexa.html\`)
- Include platform overview, key features, optimization strategies
- Add comprehensive checklist and implementation roadmap
- Include best practices, measurement strategies, and resources

## Related
- Part of Phase 4: Content Migration
- Follows pattern established in ChatGPT, Gemini, Copilot, Claude, Perplexity, and Grok migrations
- Each platform migration is in a separate PR to enable parallel work without merge conflicts

## File Changed
- \`astro-site/src/content/platforms/alexa.mdx\` (~400-700 lines)

## Testing
- [ ] Run \`npm run build\` - should show 56+ pages built with 0 errors
- [ ] Verify page renders at \`http://localhost:4321/platforms/alexa\`
- [ ] Confirm breadcrumbs, navigation, and internal links work
- [ ] Check dark/light mode theming

## Checklist
- [ ] Content migrated from live site
- [ ] MDX syntax validated (no numbered headings, no HTML operators)
- [ ] Frontmatter schema correct
- [ ] Build passes with no errors
- [ ] Page renders correctly in dev server" \
  --draft

echo "✓ Alexa PR created"
echo ""

# 7. Siri
echo "Creating PR for Siri..."
gh pr create \
  --repo "ThomasSchmitz/ai-optimization" \
  --base "main" \
  --head "feature/migrate-siri" \
  --title "feat: Migrate Siri platform page to full content" \
  --body "Siri platform migration - Apple ecosystem and Siri Suggestions optimization guide

## Changes
- Migrate \`astro-site/src/content/platforms/siri.mdx\` from stub to comprehensive content
- Extract content from live site (\`/tmp/siri.html\`)
- Include platform overview, key features, optimization strategies
- Add comprehensive checklist and implementation roadmap
- Include best practices, measurement strategies, and resources

## Related
- Part of Phase 4: Content Migration
- Follows pattern established in ChatGPT, Gemini, Copilot, Claude, Perplexity, and Grok migrations
- Each platform migration is in a separate PR to enable parallel work without merge conflicts

## File Changed
- \`astro-site/src/content/platforms/siri.mdx\` (~400-700 lines)

## Testing
- [ ] Run \`npm run build\` - should show 56+ pages built with 0 errors
- [ ] Verify page renders at \`http://localhost:4321/platforms/siri\`
- [ ] Confirm breadcrumbs, navigation, and internal links work
- [ ] Check dark/light mode theming

## Checklist
- [ ] Content migrated from live site
- [ ] MDX syntax validated (no numbered headings, no HTML operators)
- [ ] Frontmatter schema correct
- [ ] Build passes with no errors
- [ ] Page renders correctly in dev server" \
  --draft

echo "✓ Siri PR created"
echo ""

echo "=========================================="
echo "All 7 pull requests created successfully!"
echo "=========================================="
echo ""
echo "View all PRs at: https://github.com/ThomasSchmitz/ai-optimization/pulls"
echo ""
echo "Next steps:"
echo "1. Check out each branch: git checkout feature/migrate-[platform]"
echo "2. Complete the migration for that platform"
echo "3. Test with: npm run build"
echo "4. Commit changes and push to branch"
echo "5. Mark PR as ready for review on GitHub"
