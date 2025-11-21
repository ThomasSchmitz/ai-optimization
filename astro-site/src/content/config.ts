import { defineCollection, z } from 'astro:content';

// Define the schema for guides
const guidesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    lastUpdated: z.date(),
    category: z.enum(['platform', 'strategy', 'technical', 'content', 'analytics']),
    icon: z.string().optional(),
    readTime: z.string().optional(),
    difficulty: z.string().optional(),
    audience: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    author: z.string().default('AI GEO'),
    relatedGuides: z.array(z.string()).optional(),
    schema: z
      .object({
        type: z.string(),
        additionalData: z.record(z.any()).optional(),
      })
      .optional(),
  }),
});

// Define the schema for platforms
const platformsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    platform: z.string(), // Changed to string for flexibility with all platform names
    category: z.enum(['major', 'emerging', 'voice', 'international']).default('major'),
    publishDate: z.date(),
    lastUpdated: z.date(),
    users: z.string().optional(), // e.g., "200M+"
    website: z.string().url(),
    features: z.array(z.string()),
    featured: z.boolean().default(false),
    ogImage: z.string().optional(),
    relatedPlatforms: z.array(z.string()).optional(),
    relatedGuides: z.array(z.string()).optional(),
    schema: z
      .object({
        type: z.string().default('Article'),
        author: z.string().default('AI GEO'),
      })
      .optional(),
  }),
});

// Define the schema for industries
const industriesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    industry: z.string(),
    publishDate: z.date(),
    lastUpdated: z.date(),
    featured: z.boolean().default(false),
    relatedIndustries: z.array(z.string()).optional(),
    caseStudies: z
      .array(
        z.object({
          company: z.string(),
          result: z.string(),
        })
      )
      .optional(),
  }),
});

// Export collections
export const collections = {
  guides: guidesCollection,
  platforms: platformsCollection,
  industries: industriesCollection,
};
