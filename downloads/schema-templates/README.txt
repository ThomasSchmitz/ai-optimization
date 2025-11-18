# Schema Markup Templates - README

## Overview

This package contains 10 ready-to-use JSON-LD schema markup templates for common content types. These templates help AI platforms and search engines better understand your content, improving your visibility in AI responses and search results.

## What's Included

1. **organization-schema.json** - Company/organization information
2. **product-schema.json** - E-commerce product pages
3. **article-schema.json** - Blog posts and news articles
4. **faq-schema.json** - FAQ sections and pages
5. **review-schema.json** - Product/service reviews
6. **local-business-schema.json** - Location-based businesses
7. **how-to-schema.json** - Step-by-step guides
8. **video-schema.json** - Video content
9. **breadcrumb-schema.json** - Navigation paths
10. **person-schema.json** - Author and expert profiles

## How to Use

### Step 1: Choose the Right Template
Select the template that matches your content type. You can use multiple schema types on a single page.

### Step 2: Customize the Template
Open the JSON file in any text editor and replace the placeholder values:
- Values in ALL_CAPS are required fields
- Values in [brackets] are optional but recommended
- Follow the comments for guidance on each field

### Step 3: Validate Your Schema
Before publishing, validate your schema using:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/
- JSON-LD Playground: https://json-ld.org/playground/

### Step 4: Add to Your Page
Add the customized JSON-LD script to your HTML page in the <head> or <body> section:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  ... your customized schema here ...
}
</script>
```

## Implementation Best Practices

### 1. Use Accurate Information
- Only include information that appears on the page
- Keep schema in sync with visible content
- Don't add false or misleading data

### 2. Required vs. Recommended Fields
- Always include required fields (marked as required in templates)
- Add recommended fields when possible for better results
- Optional fields can enhance your schema but aren't necessary

### 3. Multiple Schema Types
You can include multiple schema types on one page:
```html
<script type="application/ld+json">
[
  { ... Organization schema ... },
  { ... Article schema ... },
  { ... Breadcrumb schema ... }
]
</script>
```

### 4. Test Before Publishing
- Always validate schema before going live
- Fix all errors reported by validators
- Monitor Google Search Console for schema issues

### 5. Keep Updated
- Review schema quarterly
- Update when content changes
- Remove outdated information
- Add new properties as Schema.org releases them

## Common Issues & Solutions

### Issue: Schema not showing in Google Search Console
**Solution:** 
- Allow 1-2 weeks for Google to crawl and process
- Ensure schema is valid (no errors in Rich Results Test)
- Check that page is indexed in Google

### Issue: Validation errors
**Solution:**
- Required fields must not be empty
- Dates must be in ISO 8601 format (YYYY-MM-DD)
- URLs must be absolute, not relative
- Ensure proper JSON syntax (commas, quotes, brackets)

### Issue: Schema not eligible for rich results
**Solution:**
- Not all schema types show rich results
- Follow Google's guidelines for each type
- Include all required properties
- Ensure content quality meets Google's standards

## Schema Type Quick Reference

### Organization Schema
**Best for:** Homepage, About page, Contact page
**Benefits:** Knowledge panel, site name in search
**Key fields:** name, logo, url, sameAs (social profiles)

### Product Schema
**Best for:** E-commerce product pages
**Benefits:** Rich snippets with price, ratings, availability
**Key fields:** name, description, image, offers, aggregateRating

### Article Schema
**Best for:** Blog posts, news articles, guides
**Benefits:** Article rich results, Top Stories eligibility
**Key fields:** headline, author, datePublished, image

### FAQ Schema
**Best for:** FAQ pages, Q&A content
**Benefits:** FAQ rich snippets in search results
**Key fields:** mainEntity (array of questions and answers)

### Review Schema
**Best for:** Product/service review pages
**Benefits:** Star ratings in search results
**Key fields:** itemReviewed, reviewRating, author

### LocalBusiness Schema
**Best for:** Physical business locations
**Benefits:** Local pack, knowledge panel
**Key fields:** name, address, telephone, geo, openingHours

### HowTo Schema
**Best for:** Step-by-step guides, tutorials
**Benefits:** How-to rich results with steps
**Key fields:** name, step (array), totalTime

### Video Schema
**Best for:** Pages with video content
**Benefits:** Video rich results, video carousel
**Key fields:** name, description, thumbnailUrl, uploadDate

### Breadcrumb Schema
**Best for:** All interior pages
**Benefits:** Breadcrumb trails in search results
**Key fields:** itemListElement (array of pages)

### Person Schema
**Best for:** Author pages, team pages, bios
**Benefits:** Knowledge panel, author attribution
**Key fields:** name, jobTitle, image, sameAs

## Platform-Specific Considerations

### ChatGPT / OpenAI
- Schema helps with content understanding
- Focus on Article and Organization schema
- Ensures proper content attribution

### Google Gemini / AI Overviews
- All schema types valuable
- Especially FAQ, HowTo, Product
- Directly feeds into AI Overviews

### Perplexity AI
- Values Article and Organization schema
- Helps with source citation
- Improves content authority

### Voice Search
- LocalBusiness schema critical
- FAQ schema for question-based queries
- HowTo for instructional queries

## Additional Resources

- Schema.org Official Documentation: https://schema.org
- Google Search Central Schema Guide: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Bing Schema Documentation: https://www.bing.com/webmasters/help/marking-up-your-site-with-structured-data-3a93e731
- JSON-LD Tutorial: https://json-ld.org/
- Rich Results Test: https://search.google.com/test/rich-results

## Support

For questions or issues:
1. Check the AI GEO guides at https://ai-geo.com
2. Consult Schema.org documentation
3. Use validation tools to identify errors
4. Test in Google Search Console

## Updates

**Version 1.0 - November 2025**
- Initial release
- 10 schema templates
- Based on latest Schema.org vocabulary

We regularly update these templates to reflect Schema.org changes and best practices. Check back periodically for updates.

---

© 2025 AI GEO. Free to use and distribute.
Licensed for personal and commercial use.
