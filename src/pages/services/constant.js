export const allServices = Object.values(
	import.meta.glob('../../md/services/*.md', { eager: true })
);

export const allTags = Array.from(
	new Set(
		allServices
			.map((post) => post.frontmatter.category)
			.filter((category) => category?.slug)
			.map((category) => category.slug)
	)
).map((slug) => {
	return allServices
		.map((post) => post.frontmatter.category)
		.find((category) => category.slug === slug);
});
