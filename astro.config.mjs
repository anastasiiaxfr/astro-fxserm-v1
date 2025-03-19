// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	site: 'https://astro-ex-1.vercel.app',
	integrations: [
		sitemap({
			entryLimit: 1000,
			changefreq: 'weekly',
			priority: 0.7
		})
	]
});
