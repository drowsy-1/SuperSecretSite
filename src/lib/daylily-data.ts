import fs from 'fs/promises';
import path from 'path';
import { Daylily } from '@/types/daylily';
import 'server-only';
import { createSlugFromName, getNameFromSlug } from './client-utils';

// Cache for data
let dayliliesCache: Daylily[] | null = null;
let tagsCache: string[] | null = null;

export async function getAllDaylilies(): Promise<Daylily[]> {
    if (dayliliesCache) return dayliliesCache;

    try {
        const filePath = path.join(process.cwd(), 'public/data/varieties.jsonl');
        const content = await fs.readFile(filePath, 'utf8');
        const lines = content.split('\n').filter(line => line.trim());
        const daylilies = lines.map(line => JSON.parse(line));

        dayliliesCache = daylilies;
        return daylilies;
    } catch (error) {
        console.error('Error loading daylilies:', error);
        return [];
    }
}

/**
 * Get a daylily by its slug with improved matching for special characters
 */
export async function getDaylily(slug: string): Promise<Daylily | null> {
    try {
        const daylilies = await getAllDaylilies();

        // First attempt: try to match using slug conversion directly
        let normalizedSlug = slug.toLowerCase();
        let daylily = daylilies.find(d => createSlugFromName(d.name) === normalizedSlug);

        if (daylily) return daylily;

        // Second attempt: try to match using the name obtained from the slug
        const nameFromSlug = getNameFromSlug(slug);
        daylily = daylilies.find(d =>
            d.name.toLowerCase() === nameFromSlug.toLowerCase()
        );

        if (daylily) return daylily;

        // Third attempt: try fuzzy matching by removing special characters
        const normalizedSearch = nameFromSlug.toLowerCase()
            .replace(/[^\w\s]/g, '')  // Remove all non-alphanumeric characters
            .replace(/\s+/g, ' ')     // Normalize whitespace
            .trim();

        daylily = daylilies.find(d => {
            const normalizedName = d.name.toLowerCase()
                .replace(/[^\w\s]/g, '')
                .replace(/\s+/g, ' ')
                .trim();
            return normalizedName === normalizedSearch;
        });

        return daylily || null;
    } catch (error) {
        console.error(`Error getting daylily for slug ${slug}:`, error);
        return null;
    }
}

/**
 * Get daylilies filtered by tag with improved character handling
 */
export async function getDayliliesByTag(tag: string): Promise<Daylily[]> {
    try {
        const daylilies = await getAllDaylilies();
        const normalizedTag = tag.toLowerCase().trim();

        return daylilies.filter(daylily => {
            // Check if tag matches color description, bloom season, foliage type, etc.
            const fieldMatches = [
                daylily.color_description,
                daylily.bloom_season,
                daylily.foliage_type,
                daylily.ploidy,
                daylily.form,
                daylily.sculpting
            ].some(field => field && field.toLowerCase().includes(normalizedTag));

            // For "rebloomer" tag, check if bloom_season contains "rebloom"
            if (normalizedTag === "rebloomer") {
                return daylily.bloom_season?.toLowerCase().includes("rebloom");
            }

            return fieldMatches;
        });
    } catch (error) {
        console.error(`Error getting daylilies for tag ${tag}:`, error);
        return [];
    }
}

/**
 * Get all available tags from the daylily collection
 */
export async function getAllTags(): Promise<string[]> {
    // Return cached tags if available
    if (tagsCache) return tagsCache;

    try {
        const daylilies = await getAllDaylilies();
        const tags = new Set<string>();

        // Extract tags from various daylily properties
        daylilies.forEach(daylily => {
            // Add ploidy as tag
            if (daylily.ploidy) tags.add(daylily.ploidy);

            // Add foliage type
            if (daylily.foliage_type) tags.add(daylily.foliage_type);

            // Parse and add bloom season tags
            if (daylily.bloom_season) {
                const seasonText = daylily.bloom_season.toLowerCase();
                if (seasonText.includes('early')) tags.add('Early');
                if (seasonText.includes('mid')) tags.add('Midseason');
                if (seasonText.includes('late')) tags.add('Late');
                if (seasonText.includes('rebloom')) tags.add('Rebloomer');
            }

            // Add color-based tags
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

                // Add pattern/eye tags
                if (colorText.includes('eye')) tags.add('Eye');
                if (colorText.includes('edge')) tags.add('Edge');
                if (colorText.includes('watermark')) tags.add('Watermark');
                if (colorText.includes('throat')) tags.add('Green Throat');
            }

            // Add form tags
            if (daylily.form) {
                const formText = daylily.form.toLowerCase();
                if (formText.includes('unusual')) tags.add('Unusual Form');
                if (formText.includes('spider')) tags.add('Spider');
                if (formText.includes('crispate')) tags.add('Crispate');
                if (formText.includes('cascade')) tags.add('Cascade');
            }

            // Add special features
            if (daylily.sculpting) {
                tags.add('Sculpted');

                const sculptingText = daylily.sculpting.toLowerCase();
                if (sculptingText.includes('cristate')) tags.add('Cristate');
                if (sculptingText.includes('relief')) tags.add('Relief');
            }

            // Add fragrance tag
            if (daylily.fragrance) {
                tags.add('Fragrant');
            }
        });

        // Store in cache
        tagsCache = Array.from(tags).sort();
        return tagsCache;
    } catch (error) {
        console.error('Error getting all tags:', error);
        return [];
    }
}