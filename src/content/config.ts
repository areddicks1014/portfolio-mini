import { defineCollection, z } from 'astro:content';

export const workCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        viewLink: z.optional(z.string()),
        codeLink: z.optional(z.string()),
        designLink: z.optional(z.string()),
        status: z.optional(z.string()),
        progressCurrent: z.optional(z.string()),
        progressEnd: z.optional(z.string()),
    }),
});

export const caseStudyCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        viewLink: z.optional(z.string()),
        codeLink: z.optional(z.string()),
        designLink: z.optional(z.string()),
        status: z.optional(z.string()),
        progressCurrent: z.optional(z.string()),
        progressEnd: z.optional(z.string()),
        background: z.optional(z.string()),
    }),
});

export const collections = {
	'work': workCollection,
    'case-studies': caseStudyCollection,
}