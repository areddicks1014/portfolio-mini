import { defineCollection, z } from 'astro:content';

export const workCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        viewLink: z.optional(z.string()),
        codeLink: z.optional(z.string()),
    }),
})

export const collections = {
	'work': workCollection,
}