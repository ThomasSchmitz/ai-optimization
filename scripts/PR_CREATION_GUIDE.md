# GitHub Pull Request Creation Guide

## Branches Created

All 7 branches have been created and pushed to GitHub:

1. ✅ `feature/migrate-meta-ai`
2. ✅ `feature/migrate-you-com`
3. ✅ `feature/migrate-voice-search`
4. ✅ `feature/migrate-google-ai-overviews`
5. ✅ `feature/migrate-google-assistant`
6. ✅ `feature/migrate-alexa`
7. ✅ `feature/migrate-siri`

## Create Pull Requests

Visit these URLs to create each PR (GitHub will auto-detect the branches):

### 1. Meta AI Migration
**URL**: https://github.com/ThomasSchmitz/ai-optimization/pull/new/feature/migrate-meta-ai

**Title**: `feat: Migrate Meta AI platform page to full content`

**Description**:
```markdown
Meta AI platform migration - Facebook, Instagram, WhatsApp, and Messenger AI optimization guide

## Changes
- Migrate `astro-site/src/content/platforms/meta-ai.mdx` from stub to comprehensive content
- Extract content from live site (`/tmp/meta-ai.html`)
- Include platform overview, key features, optimization strategies
- Add comprehensive checklist and implementation roadmap
- Include best practices, measurement strategies, and resources

## Related
- Part of Phase 4: Content Migration
- Follows pattern established in ChatGPT, Gemini, Copilot, Claude, Perplexity, and Grok migrations
- Each platform migration is in a separate PR to enable parallel work without merge conflicts

## File Changed
- `astro-site/src/content/platforms/meta-ai.mdx` (~400-700 lines)

## Testing
- [ ] Run `npm run build` - should show 56+ pages built with 0 errors
- [ ] Verify page renders at `http://localhost:4321/platforms/meta-ai`
- [ ] Confirm breadcrumbs, navigation, and internal links work
- [ ] Check dark/light mode theming

## Checklist
- [ ] Content migrated from live site
- [ ] MDX syntax validated (no numbered headings, no HTML operators)
- [ ] Frontmatter schema correct
- [ ] Build passes with no errors
- [ ] Page renders correctly in dev server
```

---

### 2. You.com Migration
**URL**: https://github.com/ThomasSchmitz/ai-optimization/pull/new/feature/migrate-you-com

**Title**: `feat: Migrate You.com platform page to full content`

**Description**:
```markdown
You.com platform migration - Privacy-focused AI search engine optimization guide

## Changes
- Migrate `astro-site/src/content/platforms/you-com.mdx` from stub to comprehensive content
- Extract content from live site (`/tmp/you-com.html`)
- Include platform overview, key features, optimization strategies
- Add comprehensive checklist and implementation roadmap
- Include best practices, measurement strategies, and resources

## Related
- Part of Phase 4: Content Migration
- Follows pattern established in ChatGPT, Gemini, Copilot, Claude, Perplexity, and Grok migrations
- Each platform migration is in a separate PR to enable parallel work without merge conflicts

## File Changed
- `astro-site/src/content/platforms/you-com.mdx` (~400-700 lines)

## Testing
- [ ] Run `npm run build` - should show 56+ pages built with 0 errors
- [ ] Verify page renders at `http://localhost:4321/platforms/you-com`
- [ ] Confirm breadcrumbs, navigation, and internal links work
- [ ] Check dark/light mode theming

## Checklist
- [ ] Content migrated from live site
- [ ] MDX syntax validated (no numbered headings, no HTML operators)
- [ ] Frontmatter schema correct
- [ ] Build passes with no errors
- [ ] Page renders correctly in dev server
```

---

### 3. Voice Search Migration
**URL**: https://github.com/ThomasSchmitz/ai-optimization/pull/new/feature/migrate-voice-search

**Title**: `feat: Migrate Voice Search platform page to full content`

**Description**:
```markdown
Voice Search platform migration - Voice-optimized content and featured snippet strategies

## Changes
- Migrate `astro-site/src/content/platforms/voice-search.mdx` from stub to comprehensive content
- Extract content from live site (`/tmp/voice-search.html`)
- Include platform overview, key features, optimization strategies
- Add comprehensive checklist and implementation roadmap
- Include best practices, measurement strategies, and resources

## Related
- Part of Phase 4: Content Migration
- Follows pattern established in ChatGPT, Gemini, Copilot, Claude, Perplexity, and Grok migrations
- Each platform migration is in a separate PR to enable parallel work without merge conflicts

## File Changed
- `astro-site/src/content/platforms/voice-search.mdx` (~400-700 lines)

## Testing
- [ ] Run `npm run build` - should show 56+ pages built with 0 errors
- [ ] Verify page renders at `http://localhost:4321/platforms/voice-search`
- [ ] Confirm breadcrumbs, navigation, and internal links work
- [ ] Check dark/light mode theming

## Checklist
- [ ] Content migrated from live site
- [ ] MDX syntax validated (no numbered headings, no HTML operators)
- [ ] Frontmatter schema correct
- [ ] Build passes with no errors
- [ ] Page renders correctly in dev server
```

---

### 4. Google AI Overviews Migration
**URL**: https://github.com/ThomasSchmitz/ai-optimization/pull/new/feature/migrate-google-ai-overviews

**Title**: `feat: Migrate Google AI Overviews platform page to full content`

**Description**:
```markdown
Google AI Overviews platform migration - AI-generated search results optimization (formerly SGE)

## Changes
- Migrate `astro-site/src/content/platforms/google-ai-overviews.mdx` from stub to comprehensive content
- Extract content from live site (`/tmp/google-ai-overviews.html`)
- Include platform overview, key features, optimization strategies
- Add comprehensive checklist and implementation roadmap
- Include best practices, measurement strategies, and resources

## Related
- Part of Phase 4: Content Migration
- Follows pattern established in ChatGPT, Gemini, Copilot, Claude, Perplexity, and Grok migrations
- Each platform migration is in a separate PR to enable parallel work without merge conflicts

## File Changed
- `astro-site/src/content/platforms/google-ai-overviews.mdx` (~400-700 lines)

## Testing
- [ ] Run `npm run build` - should show 56+ pages built with 0 errors
- [ ] Verify page renders at `http://localhost:4321/platforms/google-ai-overviews`
- [ ] Confirm breadcrumbs, navigation, and internal links work
- [ ] Check dark/light mode theming

## Checklist
- [ ] Content migrated from live site
- [ ] MDX syntax validated (no numbered headings, no HTML operators)
- [ ] Frontmatter schema correct
- [ ] Build passes with no errors
- [ ] Page renders correctly in dev server
```

---

### 5. Google Assistant Migration
**URL**: https://github.com/ThomasSchmitz/ai-optimization/pull/new/feature/migrate-google-assistant

**Title**: `feat: Migrate Google Assistant platform page to full content`

**Description**:
```markdown
Google Assistant platform migration - Voice assistant and smart home optimization guide

## Changes
- Migrate `astro-site/src/content/platforms/google-assistant.mdx` from stub to comprehensive content
- Extract content from live site (`/tmp/google-assistant.html`)
- Include platform overview, key features, optimization strategies
- Add comprehensive checklist and implementation roadmap
- Include best practices, measurement strategies, and resources

## Related
- Part of Phase 4: Content Migration
- Follows pattern established in ChatGPT, Gemini, Copilot, Claude, Perplexity, and Grok migrations
- Each platform migration is in a separate PR to enable parallel work without merge conflicts

## File Changed
- `astro-site/src/content/platforms/google-assistant.mdx` (~400-700 lines)

## Testing
- [ ] Run `npm run build` - should show 56+ pages built with 0 errors
- [ ] Verify page renders at `http://localhost:4321/platforms/google-assistant`
- [ ] Confirm breadcrumbs, navigation, and internal links work
- [ ] Check dark/light mode theming

## Checklist
- [ ] Content migrated from live site
- [ ] MDX syntax validated (no numbered headings, no HTML operators)
- [ ] Frontmatter schema correct
- [ ] Build passes with no errors
- [ ] Page renders correctly in dev server
```

---

### 6. Alexa Migration
**URL**: https://github.com/ThomasSchmitz/ai-optimization/pull/new/feature/migrate-alexa

**Title**: `feat: Migrate Alexa platform page to full content`

**Description**:
```markdown
Alexa platform migration - Amazon Echo and Alexa Skills optimization guide

## Changes
- Migrate `astro-site/src/content/platforms/alexa.mdx` from stub to comprehensive content
- Extract content from live site (`/tmp/alexa.html`)
- Include platform overview, key features, optimization strategies
- Add comprehensive checklist and implementation roadmap
- Include best practices, measurement strategies, and resources

## Related
- Part of Phase 4: Content Migration
- Follows pattern established in ChatGPT, Gemini, Copilot, Claude, Perplexity, and Grok migrations
- Each platform migration is in a separate PR to enable parallel work without merge conflicts

## File Changed
- `astro-site/src/content/platforms/alexa.mdx` (~400-700 lines)

## Testing
- [ ] Run `npm run build` - should show 56+ pages built with 0 errors
- [ ] Verify page renders at `http://localhost:4321/platforms/alexa`
- [ ] Confirm breadcrumbs, navigation, and internal links work
- [ ] Check dark/light mode theming

## Checklist
- [ ] Content migrated from live site
- [ ] MDX syntax validated (no numbered headings, no HTML operators)
- [ ] Frontmatter schema correct
- [ ] Build passes with no errors
- [ ] Page renders correctly in dev server
```

---

### 7. Siri Migration
**URL**: https://github.com/ThomasSchmitz/ai-optimization/pull/new/feature/migrate-siri

**Title**: `feat: Migrate Siri platform page to full content`

**Description**:
```markdown
Siri platform migration - Apple ecosystem and Siri Suggestions optimization guide

## Changes
- Migrate `astro-site/src/content/platforms/siri.mdx` from stub to comprehensive content
- Extract content from live site (`/tmp/siri.html`)
- Include platform overview, key features, optimization strategies
- Add comprehensive checklist and implementation roadmap
- Include best practices, measurement strategies, and resources

## Related
- Part of Phase 4: Content Migration
- Follows pattern established in ChatGPT, Gemini, Copilot, Claude, Perplexity, and Grok migrations
- Each platform migration is in a separate PR to enable parallel work without merge conflicts

## File Changed
- `astro-site/src/content/platforms/siri.mdx` (~400-700 lines)

## Testing
- [ ] Run `npm run build` - should show 56+ pages built with 0 errors
- [ ] Verify page renders at `http://localhost:4321/platforms/siri`
- [ ] Confirm breadcrumbs, navigation, and internal links work
- [ ] Check dark/light mode theming

## Checklist
- [ ] Content migrated from live site
- [ ] MDX syntax validated (no numbered headings, no HTML operators)
- [ ] Frontmatter schema correct
- [ ] Build passes with no errors
- [ ] Page renders correctly in dev server
```

---

## Workflow for Each Platform

1. **Check out the branch**:
   ```bash
   git checkout feature/migrate-[platform-name]
   ```

2. **Complete the migration**:
   - Extract content from `/tmp/[platform].html`
   - Update `astro-site/src/content/platforms/[platform].mdx`
   - Follow the pattern from Grok, Perplexity, Claude, etc.

3. **Test the changes**:
   ```bash
   cd astro-site
   npm run build
   npm run dev
   # Visit http://localhost:4321/platforms/[platform]
   ```

4. **Commit and push**:
   ```bash
   git add astro-site/src/content/platforms/[platform].mdx
   git commit -m "feat: Complete [Platform] migration with comprehensive guide"
   git push origin feature/migrate-[platform]
   ```

5. **Mark PR as ready for review** on GitHub

## No Merge Conflicts

Each branch modifies only ONE file:
- `feature/migrate-meta-ai` → only touches `meta-ai.mdx`
- `feature/migrate-you-com` → only touches `you-com.mdx`
- `feature/migrate-voice-search` → only touches `voice-search.mdx`
- `feature/migrate-google-ai-overviews` → only touches `google-ai-overviews.mdx`
- `feature/migrate-google-assistant` → only touches `google-assistant.mdx`
- `feature/migrate-alexa` → only touches `alexa.mdx`
- `feature/migrate-siri` → only touches `siri.mdx`

This means you can work on all 7 simultaneously without any merge conflicts!

## Quick Reference

| Platform | Branch | File |
|----------|--------|------|
| Meta AI | `feature/migrate-meta-ai` | `meta-ai.mdx` |
| You.com | `feature/migrate-you-com` | `you-com.mdx` |
| Voice Search | `feature/migrate-voice-search` | `voice-search.mdx` |
| Google AI Overviews | `feature/migrate-google-ai-overviews` | `google-ai-overviews.mdx` |
| Google Assistant | `feature/migrate-google-assistant` | `google-assistant.mdx` |
| Alexa | `feature/migrate-alexa` | `alexa.mdx` |
| Siri | `feature/migrate-siri` | `siri.mdx` |
