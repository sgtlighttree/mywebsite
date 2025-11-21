import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    tags: z.array(z.string()),
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
  }),
});

export const collections = {
  blog: blogCollection,
  portfolio: portfolioCollection,
};
