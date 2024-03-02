import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.coerce.date(),
		thumbnail: z.string(),
		thumbnailAlt: z.string()
	}),
});

export const collections = { blog };
