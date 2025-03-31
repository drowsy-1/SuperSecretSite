/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://ricedaylilies.hemeroholics.com',
    generateRobotsTxt: true,
    generateIndexSitemap: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/'],
            },
        ],
        additionalSitemaps: [
            `${process.env.NEXT_PUBLIC_BASE_URL || 'https://ricedaylilies.hemeroholics.com'}/sitemap.xml`,
        ],
    },
    priority: 0.7,
    changefreq: 'weekly',
    exclude: ['/api/*'],
    // Set to true to avoid overwriting your manually created sitemap
    // if you already have one from Next.js's built-in functionality
    outDir: 'public',
}