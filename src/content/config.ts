import { defineCollection, reference, z } from 'astro:content';

const categories = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string(),
		color: z.string(),
	}),
});

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.coerce.date(),
		category: reference('categories'),
		tags: z.array(z.string())
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
	'categories': categories,
	'blog': blog,
	'projects': project
};