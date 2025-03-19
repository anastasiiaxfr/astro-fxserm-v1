import rss from '@astrojs/rss';

// Import all the markdown files under /src/md/blog/
const blogPosts = import.meta.glob('/src/md/blog/*.md');

export async function GET(context) {
	const posts = await Promise.all(
		Object.keys(blogPosts).map(async (path) => {
			const postModule = await blogPosts[path]();
			return {
				title: postModule.frontmatter.title,
				pubDate: postModule.frontmatter.pubDate,
				description: postModule.frontmatter.description,
				link: `/blog/${postModule.frontmatter.slug}/`,
				guid: `${context.site}/blog/${postModule.frontmatter.slug}/` // Unique guid
			};
		})
	);

	return rss({
		title: 'FxSerm',
		description: 'A humble Astronaut’s guide to the stars',
		site: context.site,
		items: posts,
		customData: `
      <language>en-us</language>
      <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${context.site}/rss.xml" rel="self" />
    `
	});
}
