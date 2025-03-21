export const countTopPost = 4;
export const uri = 'blog';
export const postPerPage = 6;

export const allPosts = Object.values(
	import.meta.glob('../../md/blog/*.md', { eager: true })
);

export const sortedPosts = allPosts.sort((a, b) => {
	return new Date(b.frontmatter.pubdate) - new Date(a.frontmatter.pubdate);
});

export const allTags = Array.from(
	new Set(
		sortedPosts
			.map((post) => post.frontmatter.category)
			.filter((category) => category?.slug)
			.map((category) => category.slug)
	)
).map((slug) => {
	return sortedPosts
		.map((post) => post.frontmatter.category)
		.find((category) => category.slug === slug);
});
