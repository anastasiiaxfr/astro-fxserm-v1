export const uri = 'job';

export const countTopItems = 10;

export const allJobs = Object.values(
    import.meta.glob('../../md/job/*.md', { eager: true })
);

export const sortedJobs = allJobs.sort((a, b) => {
    return new Date(b.frontmatter.pubdate) - new Date(a.frontmatter.pubdate);
});

export const allTags = Array.from(
    new Set(
        sortedJobs
            .flatMap(service => service.frontmatter.job_category || [])
            .map(category => category.trim())
    )
);
