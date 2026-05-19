import { defineCollection, z } from 'astro:content';

const toolEntrySchema = z.object({
  name:    z.string(),
  url:     z.string(),
  bestFor: z.string(),
  price:   z.string().optional(),
  rating:  z.string().optional(),
});

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
    tools:        z.array(toolEntrySchema).optional(), // ItemList schema data
  }),
});

export const collections = { articles };
