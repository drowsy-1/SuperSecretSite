// src/lib/client-utils.ts

/**
 * Creates a URL-friendly slug from a daylily name
 * Handles special characters according to ICNCP 2016 Rules:
 * - Permitted: apostrophe ('), comma (,), up to two non-adjacent exclamation marks (!),
 *   period (.), hyphen (-), forward slash (/), and backward slash (\)
 * - Not allowed: Fractions, symbols, parentheses, and ampersands
 */
export function createSlugFromName(name: string): string {
    if (!name) return '';

    // Step 1: Replace spaces with hyphens
    let slug = name.trim().replace(/\s+/g, '-');

    // Step 2: Special handling for permitted characters
    // Replace slashes with a safe character sequence
    slug = slug.replace(/\//g, '-fwd-');
    slug = slug.replace(/\\/g, '-back-');

    // Step 3: Apply basic URL encoding but preserve permitted characters
    slug = encodeURIComponent(slug)
        // Restore permitted characters that got encoded
        .replace(/%27/g, "'")
        .replace(/%2C/g, ",")
        .replace(/%21/g, "!")
        .replace(/%2E/g, ".")
        .replace(/%2D/g, "-");

    // Step 4: Ensure the slug is lowercase for consistency
    return slug.toLowerCase();
}

/**
 * Retrieves the original daylily name from a slug
 */
export function getNameFromSlug(slug: string): string {
    if (!slug) return '';

    // Step 1: Decode the URL components
    let name = decodeURIComponent(slug);

    // Step 2: Replace hyphens with spaces
    name = name.replace(/-/g, ' ');

    // Step 3: Special handling for encoded slashes
    name = name.replace(/fwd/g, '/');
    name = name.replace(/back/g, '\\');

    // Step 4: Clean up and restore proper spacing
    name = name.replace(/\s+/g, ' ').trim();

    return name;
}