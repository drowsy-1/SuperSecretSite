import { MetadataRoute } from 'next';
import { getAllDaylilies, getAllTags } from '@/lib/daylily-data';
import { createSlugFromName } from '@/lib/client-utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ricedaylilies.hemeroholics.com';

    try {
        // Get all daylilies and tags
        const daylilies = await getAllDaylilies();
        const tags = await getAllTags();

        const currentDate = new Date();

        // Create sitemap entries for static pages
        const staticPages = [
            {
                url: baseUrl,
                lastModified: currentDate,
                changeFrequency: 'weekly' as const,
                priority: 1.0,
            },
            {
                url: `${baseUrl}/about`,
                lastModified: currentDate,
                changeFrequency: 'monthly' as const,
                priority: 0.8,
            },
        ];

        // Create entries for all daylily detail pages
        const dayliliesPages = daylilies.map(daylily => ({
            url: `${baseUrl}/daylily/${createSlugFromName(daylily.name)}`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }));

        // Create entries for category pages with safe URL encoding
        const categoryPages = tags.map(tag => ({
            url: `${baseUrl}/category/${encodeURIComponent(tag)}`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }));

        return [...staticPages, ...dayliliesPages, ...categoryPages];
    } catch (error) {
        console.error("Error generating sitemap:", error);

        // Return a minimal sitemap in case of errors
        return [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 1.0,
            }
        ];
    }
}