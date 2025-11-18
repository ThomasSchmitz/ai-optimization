# AI GEO Website Maintenance Plan

## Overview

This document outlines the procedures and schedules for maintaining the AI GEO website. Given the rapid pace of change in the AI landscape, regular maintenance is critical to ensure the site remains a trusted, authoritative resource.

## Regular Updates Schedule

### Weekly

- **Monitor AI Platform Announcements**: Track official blogs and press releases from OpenAI, Google, Microsoft, Anthropic, Meta, and Perplexity.
- **Check "Fresh Ideas"**: Review `FRESH-IDEAS.md` for new community suggestions or urgent updates.

### Bi-Weekly

- **Platform Page Updates**: Update specific platform pages if minor features or model tweaks are released.
- **Link Validation**: Run a broken link checker to ensure all external documentation links are valid.

### Monthly

- **Comprehensive Content Review**: Review one major platform guide (rotating schedule) for depth and accuracy.
- **Performance Audit**: Check Core Web Vitals and page speed scores; optimize images or scripts if needed.
- **Backup**: Ensure full site backup (code + assets).

### Quarterly

- **Full Site Audit**:
  - Verify all statistics and data points.
  - Update "Last Modified" dates where significant changes occurred.
  - Review branding and naming conventions (e.g., "Bing Chat" vs "Copilot").
- **Security Review**: Check for any vulnerabilities in scripts or dependencies.

## Platform Monitoring Checklist

| Platform | Official Source | Key Metrics to Monitor |
|----------|-----------------|------------------------|
| **ChatGPT** | OpenAI Blog | Model versions, browsing capabilities, plugin changes |
| **Gemini** | Google The Keyword | Integration with Search, multimodal features, extensions |
| **Claude** | Anthropic News | Context window limits, reasoning capabilities, API changes |
| **Copilot** | Microsoft Blog | M365 integration, Bing index updates, enterprise features |
| **Perplexity** | Perplexity Blog | Citation formats, "Pro" search features, index frequency |
| **Meta AI** | Meta Newsroom | Social integration (IG/FB/WhatsApp), image generation tools |

## Content Quality Standards

To maintain E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness):

1. **Conservative Statistics**: Use verifiable numbers. Avoid hype.
2. **Official Sources**: Always link to primary documentation (e.g., `platform.openai.com`) rather than third-party news sites when possible.
3. **Version Clarity**: Clearly state which model version is being discussed (e.g., "As of GPT-4o...").
4. **Disclaimer Visibility**: Maintain clear disclaimers about the experimental nature of AI optimization.

## Technical Maintenance

- **Codebase**: Keep HTML/CSS/JS clean and commented. Refactor repetitive code into components.
- **Search Index**: Regenerate `search-index.json` whenever new pages are added.
- **Sitemap**: Update `sitemap.xml` with new URLs and `lastmod` dates.
- **Browser Compatibility**: Test on latest versions of Chrome, Firefox, Safari, and Edge.

## Emergency Procedures

**In case of a major AI shift (e.g., a platform shuts down or radically changes):**

1. **Immediate Banner**: Add a site-wide alert banner noting the change.
2. **Status Update**: Update the "Status" on the relevant platform page to "⚠️ Under Review" or "❌ Discontinued".
3. **Expedited PR**: Create a high-priority PR to update the content within 48 hours.
