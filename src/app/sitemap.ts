import { MetadataRoute } from 'next';
import { getAllDaylilies, getAllTags } from '@/lib/daylily-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://ricedaylilies.hemeroholics.com'; // Update with your actual domain

    // Get all daylilies and tags
    const daylilies = await getAllDaylilies();
    const tags = await getAllTags();

    // Create sitemap entries for static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        // Add other static pages
    ];

    // Create entries for all daylily detail pages
    const dayliliesPages = daylilies.map(daylily => ({
        url: `${baseUrl}/daylily/${encodeURIComponent(daylily.name.toLowerCase().replace(/\s+/g, '-'))}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Create entries for category pages
    const categoryPages = tags.map(tag => ({
        url: `${baseUrl}/category/${encodeURIComponent(tag)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticPages, ...dayliliesPages, ...categoryPages];
}