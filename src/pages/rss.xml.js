import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
	// Fetch the blog collection from content
	const blog = await getCollection('blog');

	return rss({
		title: 'FxSerm',
		description: 'A humble Astronaut’s guide to the stars',
		site: context.site,
		items: blog.map((post) => ({
			title: post.data.title, // Post title from the frontmatter
			pubDate: post.data.pubDate, // Post publication date
			description: post.data.description, // Post description from frontmatter
			link: `/blog/${post.id}/` // Link to the individual blog post
		})),
		customData: `<language>en-us</language>` // Custom XML data
	});
}
