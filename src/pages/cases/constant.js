export const postsPerPage = 3;
export const uri = 'cases';

export const allCases = Object.values(
    import.meta.glob('../../md/cases/*.md', { eager: true })
);

// Collect all unique categories
export const allTags = Array.from(
    new Set(
        allCases
            .map(service => service.frontmatter.category) // Extract the category object
            .filter(category => category?.slug) // Ensure the category has a slug
            .map(category => category.slug) // Extract only the slugs
    )
).map(slug => {
    // Find the category with the matching slug to get the full category object
    return allCases
        .map(service => service.frontmatter.category)
        .find(category => category.slug === slug);
});

export const casesByCategory = allCases.reduce((acc, caseItem) => {
    const { category } = caseItem.frontmatter;

    // Debug log category structure
    //console.log('category', category);

    if (category && category.slug) {
        // Ensure category and slug exist
        if (!acc[category.slug]) {
            // Use `slug` for the key
            acc[category.slug] = { title: category.title, cases: [] };
        }
        acc[category.slug].cases.push(caseItem); // Push the case into the respective category
    } else {
        console.error('Missing category or slug', caseItem); // Error if category or slug is missing
    }
    return acc;
}, {});
