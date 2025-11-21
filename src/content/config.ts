import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

const portfolioCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    image: z.object({
      png: z.string().optional(),
      avif: z.string().optional(),
      webp: z.string().optional(),
      alt: z.string(),
    }).optional(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

const fictionCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
  portfolio: portfolioCollection,
  fiction: fictionCollection,
};
