import { defineCollection } from 'astro:content';

export const collections = {
	blog: defineCollection({
		schema: {
			title: 'string',
			description: 'string',
			pubDate: 'date'
		}
	})
};
