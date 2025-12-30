import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://balisan.com'

    // Static routes
    const routes = [
        '',
        '/shop',
        '/cart',
        '/checkout',
        '/account',
        '/terms',
        '/privacy',
        '/faq',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    return [...routes]
}
