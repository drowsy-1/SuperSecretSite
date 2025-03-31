// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { Daylily } from '@/types/daylily';
import { createSlugFromName } from '@/lib/client-utils';

// Simplified versions of the imported functions
async function getAllDaylilies(): Promise<Daylily[]> {
    try {
        const filePath = path.join(process.cwd(), 'public/data/varieties.jsonl');
        const content = await fs.readFile(filePath, 'utf8');
        const lines = content.split('\n').filter(line => line.trim());
        return lines.map(line => JSON.parse(line));
    } catch (error) {
        console.error('Error loading daylilies:', error);
        return [];
    }
}

async function getAllTags(): Promise<string[]> {
    try {
        const daylilies = await getAllDaylilies();
        const tags = new Set<string>();

        // Extract tags from various daylily properties
        daylilies.forEach(daylily => {
            // Add ploidy as tag
            if (daylily.ploidy) tags.add(daylily.ploidy);

            // Add foliage type
            if (daylily.foliage_type) tags.add(daylily.foliage_type);

            // Basic extraction of common categories to keep it simple and safe
            if (daylily.color_description) {
                const colorText = daylily.color_description.toLowerCase();
                if (colorText.includes('purple')) tags.add('Purple');
                if (colorText.includes('lavender')) tags.add('Lavender');
                if (colorText.includes('blue')) tags.add('Blue');
                if (colorText.includes('pink')) tags.add('Pink');
                if (colorText.includes('red')) tags.add('Red');
                if (colorText.includes('yellow')) tags.add('Yellow');
                if (colorText.includes('orange')) tags.add('Orange');
                if (colorText.includes('cream')) tags.add('Cream');
                if (colorText.includes('white')) tags.add('White');
            }
        });

        return Array.from(tags).sort();
    } catch (error) {
        console.error('Error getting all tags:', error);
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ricedaylilies.hemeroholics.com';

    try {
        // Get all daylilies and tags using the safer functions
        let daylilies: Daylily[] = [];
        let tags: string[] = [];

        try {
            daylilies = await getAllDaylilies();
        } catch (error) {
            console.error("Error fetching daylilies for sitemap:", error);
        }

        try {
            tags = await getAllTags();
        } catch (error) {
            console.error("Error fetching tags for sitemap:", error);
        }

        const currentDate = new Date();

        // Create sitemap entries for static pages (these should always work)
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

        // Create entries for all daylily detail pages (with safer fallbacks)
        const dayliliesPages = daylilies.map(daylily => {
            try {
                const slug = createSlugFromName(daylily.name);
                return {
                    url: `${baseUrl}/daylily/${slug}`,
                    lastModified: currentDate,
                    changeFrequency: 'monthly' as const,
                    priority: 0.7,
                };
            } catch (error) {
                console.error(`Error creating sitemap entry for daylily ${daylily.name}:`, error);
                return null;
            }
        }).filter(entry => entry !== null) as MetadataRoute.Sitemap;

        // Create entries for category pages with safe URL encoding
        const categoryPages = tags.map(tag => {
            try {
                return {
                    url: `${baseUrl}/category/${encodeURIComponent(tag)}`,
                    lastModified: currentDate,
                    changeFrequency: 'monthly' as const,
                    priority: 0.6,
                };
            } catch (error) {
                console.error(`Error creating sitemap entry for tag ${tag}:`, error);
                return null;
            }
        }).filter(entry => entry !== null) as MetadataRoute.Sitemap;

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
            },
            {
                url: `${baseUrl}/about`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.8,
            }
        ];
    }
}