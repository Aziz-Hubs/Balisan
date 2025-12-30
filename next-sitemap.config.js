/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://balisan.com',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    exclude: ['/account/*', '/checkout/*', '/cart'],
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://balisan.com/server-sitemap.xml', // Dynamic products if implemented
        ],
    },
}
