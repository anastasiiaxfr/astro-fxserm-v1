export const countTopPost = 2

export const allPosts = Object.values(
    import.meta.glob('../../md/blog/*.md', { eager: true })
)

export const sortedPosts = allPosts.sort((a, b) => {
    return new Date(b.frontmatter.pubdate) - new Date(a.frontmatter.pubdate)
})

export const allTags = Array.from(
    new Set(
        sortedPosts
            .flatMap((service) => service.frontmatter.category || [])
            .map((category) => category.trim())
    )
)
