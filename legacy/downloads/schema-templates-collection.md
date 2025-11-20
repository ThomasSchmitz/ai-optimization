# Schema Markup Templates Collection

This collection contains ready-to-use JSON-LD schema markup templates for common content types. Simply copy the JSON code, customize it with your content, and add it to your website's `<head>` section or via Google Tag Manager.

---

## Table of Contents

1. [Article Schema](#1-article-schema)
2. [Breadcrumb Schema](#2-breadcrumb-schema)
3. [FAQ Schema](#3-faq-schema)
4. [How-To Schema](#4-how-to-schema)
5. [Local Business Schema](#5-local-business-schema)
6. [Organization Schema](#6-organization-schema)
7. [Person Schema](#7-person-schema)
8. [Product Schema](#8-product-schema)
9. [Review Schema](#9-review-schema)
10. [Video Schema](#10-video-schema)

---

## 1. Article Schema

Use for blog posts, news articles, and guides.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "ARTICLE_TITLE_HERE",
  "description": "Brief summary or meta description of the article",
  "image": [
    "https://www.yourwebsite.com/article-featured-image.jpg",
    "https://www.yourwebsite.com/article-image-2.jpg"
  ],
  "author": {
    "@type": "Person",
    "name": "AUTHOR_FULL_NAME",
    "url": "https://www.yourwebsite.com/author/author-name",
    "jobTitle": "Senior Content Writer",
    "image": "https://www.yourwebsite.com/author-photo.jpg"
  },
  "publisher": {
    "@type": "Organization",
    "name": "YOUR_COMPANY_NAME",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.yourwebsite.com/logo.png",
      "width": 600,
      "height": 60
    }
  },
  "datePublished": "YYYY-MM-DDTHH:MM:SS+00:00",
  "dateModified": "YYYY-MM-DDTHH:MM:SS+00:00",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.yourwebsite.com/article-url"
  },
  "articleSection": "Category or Topic",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "wordCount": 1500,
  "articleBody": "The full text of your article goes here... (optional but helpful)",
  "inLanguage": "en-US"
}
```

### Instructions
1. Use the exact headline that appears on the page
2. Include high-resolution images (minimum 1200px wide)
3. Use ISO 8601 format for dates (YYYY-MM-DDTHH:MM:SS+00:00)
4. Publisher logo should be rectangular (600x60 recommended)
5. Update dateModified whenever you update the article

---

## 2. Breadcrumb Schema

Use to help search engines understand your site structure.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.yourwebsite.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Category Name",
      "item": "https://www.yourwebsite.com/category"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Subcategory Name",
      "item": "https://www.yourwebsite.com/category/subcategory"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Current Page Title",
      "item": "https://www.yourwebsite.com/category/subcategory/current-page"
    }
  ]
}
```

### Instructions
1. List breadcrumb items in order from home to current page
2. Position numbers must be sequential (1, 2, 3, 4...)
3. Each "item" should be the full URL to that page
4. The last item is typically the current page

---

## 3. FAQ Schema

Use for Frequently Asked Questions pages or sections.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is your question here?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This is the answer to the question. Keep it clear and concise. You can include <strong>HTML formatting</strong> if needed."
      }
    },
    {
      "@type": "Question",
      "name": "How does your product/service work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Detailed answer explaining how the product or service works. Include specific details and examples."
      }
    },
    {
      "@type": "Question",
      "name": "What are your pricing options?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Explanation of pricing, including different tiers or options available."
      }
    }
  ]
}
```

### Instructions
1. Add as many question-answer pairs as needed (minimum 2 recommended)
2. Questions should match exactly what appears on your page
3. Answers should be visible on the page (not hidden content)
4. Keep answers focused and under 300 words each

---

## 4. How-To Schema

Use for step-by-step guides and tutorials.

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "HOW TO TITLE (e.g., How to Optimize Your Website for AI)",
  "description": "Brief overview of what this guide teaches and what readers will accomplish",
  "image": {
    "@type": "ImageObject",
    "url": "https://www.yourwebsite.com/how-to-guide-image.jpg",
    "height": 406,
    "width": 305
  },
  "totalTime": "PT30M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "0"
  },
  "step": [
    {
      "@type": "HowToStep",
      "name": "Step 1 Title",
      "text": "Detailed instructions for the first step. Be clear and specific about what to do.",
      "url": "https://www.yourwebsite.com/guide#step1",
      "image": "https://www.yourwebsite.com/step1-image.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Step 2 Title",
      "text": "Instructions for the second step. Include any important details or warnings.",
      "url": "https://www.yourwebsite.com/guide#step2",
      "image": "https://www.yourwebsite.com/step2-image.jpg"
    }
  ]
}
```

### Instructions
1. Include minimum 2 steps
2. Each step should be on your page in the same order
3. Use ISO 8601 duration format for totalTime (e.g., PT30M = 30 minutes)

---

## 5. Local Business Schema

Use for businesses with a physical location.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "YOUR_BUSINESS_NAME",
  "image": "https://www.yourwebsite.com/business-photo.jpg",
  "priceRange": "$$",
  "telephone": "+1-XXX-XXX-XXXX",
  "email": "info@yourbusiness.com",
  "url": "https://www.yourwebsite.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "City Name",
    "addressRegion": "ST",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  ]
}
```

### Instructions
1. Replace all placeholder values with your actual business information
2. Get accurate coordinates from Google Maps
3. Use 24-hour time format for opening hours (09:00, not 9am)

---

## 6. Organization Schema

Use for company or organization homepages.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "YOUR_COMPANY_NAME",
  "alternateName": "YOUR_BRAND_NAME_OR_DBA",
  "url": "https://www.yourwebsite.com",
  "logo": "https://www.yourwebsite.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-XXX-XXX-XXXX",
    "contactType": "customer service",
    "areaServed": "US",
    "availableLanguage": ["en", "es"]
  },
  "sameAs": [
    "https://www.facebook.com/yourpage",
    "https://twitter.com/yourhandle",
    "https://www.linkedin.com/company/yourcompany",
    "https://www.instagram.com/yourhandle"
  ]
}
```

### Instructions
1. Replace all placeholder values with your actual information
2. The "sameAs" array should include all your social media profile URLs
3. Use absolute URLs (include https://)

---

## 7. Person Schema

Use for author bios and team pages.

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "FULL_NAME",
  "alternateName": "NICKNAME_OR_ALIAS",
  "description": "Brief professional bio describing expertise, role, and background",
  "image": "https://www.yourwebsite.com/person-photo.jpg",
  "url": "https://www.yourwebsite.com/author/author-name",
  "jobTitle": "Job Title / Role",
  "worksFor": {
    "@type": "Organization",
    "name": "COMPANY_NAME",
    "url": "https://www.company.com"
  },
  "sameAs": [
    "https://twitter.com/username",
    "https://www.linkedin.com/in/username"
  ],
  "knowsAbout": [
    "AI Optimization",
    "Search Engine Optimization",
    "Content Marketing"
  ]
}
```

### Instructions
1. Use high-quality professional photo
2. Include all relevant social media profiles in sameAs
3. List expertise areas in knowsAbout array

---

## 8. Product Schema

Use for e-commerce product pages.

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "PRODUCT_NAME",
  "description": "Detailed description of the product",
  "image": [
    "https://www.yourwebsite.com/product-image-1.jpg"
  ],
  "brand": {
    "@type": "Brand",
    "name": "BRAND_NAME"
  },
  "sku": "PRODUCT_SKU_123",
  "offers": {
    "@type": "Offer",
    "url": "https://www.yourwebsite.com/product-page",
    "priceCurrency": "USD",
    "price": "99.99",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition"
  }
}
```

### Instructions
1. Replace all placeholder values with actual product information
2. Update availability status as needed (InStock, OutOfStock, PreOrder)

---

## 9. Review Schema

Use for individual reviews on your site.

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Product",
    "name": "PRODUCT_OR_SERVICE_NAME",
    "image": "https://www.yourwebsite.com/product-image.jpg"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "4.5",
    "bestRating": "5",
    "worstRating": "1"
  },
  "author": {
    "@type": "Person",
    "name": "REVIEWER_NAME"
  },
  "reviewBody": "Detailed review text goes here.",
  "datePublished": "YYYY-MM-DD"
}
```

### Instructions
1. Only include reviews that actually appear on your page
2. Rating must be a number (e.g., 4.5)
3. Include the actual review text in reviewBody

---

## 10. Video Schema

Use for video content.

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "VIDEO_TITLE",
  "description": "Detailed description of what the video is about",
  "thumbnailUrl": "https://www.yourwebsite.com/video-thumbnail.jpg",
  "uploadDate": "YYYY-MM-DDTHH:MM:SS+00:00",
  "duration": "PT5M30S",
  "contentUrl": "https://www.yourwebsite.com/video.mp4",
  "embedUrl": "https://www.youtube.com/embed/VIDEO_ID",
  "publisher": {
    "@type": "Organization",
    "name": "YOUR_CHANNEL_OR_COMPANY_NAME",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.yourwebsite.com/logo.png",
      "width": 600,
      "height": 60
    }
  }
}
```

### Instructions
1. Thumbnail should be high-quality (minimum 160x90)
2. Use ISO 8601 format for dates and duration
3. Include either contentUrl (direct video file) or embedUrl (embed player)

---

**Template Version:** 1.0 (November 2025)
**Created by:** AI GEO
**License:** Free to use for personal and commercial purposes
