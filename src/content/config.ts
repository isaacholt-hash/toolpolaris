import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title:        z.string(),
    description:  z.string(),
    pubDate:      z.coerce.date(),
    updatedDate:  z.coerce.date().optional(),
    category:     z.string(),
    tags:         z.array(z.string()).default([]),
    affiliate:    z.boolean().default(true),
    readTime:     z.number().optional(),   // minutes
    featured:     z.boolean().default(false),
    heroImage:    z.string().optional(),   // e.g. /images/slug.png
  }),
});

export const collections = { articles };
