import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.coerce.date(),
	}),
});

const project = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string(),
		summary: z.string().max(64),
		link: z.string().url(),
		emoji: z.string().emoji(),
		order: z.number().positive(),
	}),
});

export const collections = {
	'blog': blog,
	'projects': project
};