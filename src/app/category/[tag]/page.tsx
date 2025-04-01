// src/app/category/[tag]/page.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import { getDayliliesByTag, getAllTags } from '@/lib/daylily-data';
import { getImageUrl } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { createSlugFromName } from '@/lib/client-utils';
import ClientImage from '@/components/ClientImage';

type Props = {
    params: { tag: string }
};

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const tag = decodeURIComponent(params.tag);

    return {
        title: `${tag} Daylilies | Rice Daylilies`,
        description: `Browse our collection of ${tag.toLowerCase()} daylilies bred by John and Annette Rice in Kentucky. Award-winning daylily hybridizers with over 25 years experience.`,
        openGraph: {
            title: `${tag} Daylilies | Rice Daylilies`,
            description: `Browse our collection of ${tag.toLowerCase()} daylilies bred by John and Annette Rice in Kentucky.`,
            type: 'website',
        },
        alternates: {
            canonical: `/category/${encodeURIComponent(tag)}`,
        },
        robots: { index: true, follow: true }
    };
}

export default async function CategoryPage({ params }: Props) {
    const tag = decodeURIComponent(params.tag);
    const daylilies = await getDayliliesByTag(tag);

    // Find related categories that might interest someone viewing this category
    const relatedCategories = getRelatedCategories(tag);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header - Now matches the main gallery view header */}
            <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
                <div className="container mx-auto p-4">
                    <div className="flex justify-between items-center">
                        <Link href="/">
                            <h1 className="text-2xl font-bold">Rice Daylilies</h1>
                        </Link>
                        <div className="flex items-center gap-2">
                            <Link href="/about">
                                <Button
                                    variant="outline"
                                    className="h-auto min-h-[40px] px-4 py-2"
                                >
                                    About & Contact
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 container mx-auto px-4 py-6">
                {/* Back link */}
                <Link href="/" className="inline-flex items-center mb-6 text-primary hover:text-primary/80">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Gallery
                </Link>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">{tag} Daylilies</h1>
                        <p className="text-muted-foreground mt-2">
                            {daylilies.length} varieties available
                        </p>
                    </div>

                    {/* Related categories */}
                    {relatedCategories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            <span className="text-sm text-muted-foreground mr-2 self-center">Related:</span>
                            {relatedCategories.map(relatedTag => (
                                <Link
                                    key={relatedTag}
                                    href={`/category/${encodeURIComponent(relatedTag)}`}
                                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm hover:bg-secondary/80 transition-colors"
                                >
                                    {relatedTag}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {daylilies.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-lg text-muted-foreground">No daylilies found in this category.</p>
                        <Link href="/" className="text-primary hover:underline mt-4 inline-block">
                            Return to Gallery
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {daylilies.map((daylily) => (
                            <Link
                                key={daylily.name}
                                href={`/daylily/${createSlugFromName(daylily.name)}`}
                                className="block group"
                            >
                                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="aspect-square relative">
                                        <ClientImage
                                            src={getImageUrl(daylily.image_url)}
                                            alt={daylily.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover transition-transform group-hover:scale-105"
                                        />
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start gap-2">
                                            <h2 className="font-semibold truncate group-hover:text-primary transition-colors">{daylily.name}</h2>
                                            {daylily.price && (
                                                <span className="text-sm font-medium text-green-600 dark:text-green-400 whitespace-nowrap">
                                                    ${daylily.price}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {daylily.hybridizer} ({daylily.year})
                                        </p>
                                        <div className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer mt-2">
                                            <span className="italic text-sm">
                                                {daylily.availability || "Email For Availability"}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

// Generate static paths for all category pages
export async function generateStaticParams() {
    try {
        const allTags = await getAllTags();
        return allTags.map(tag => ({
            tag: encodeURIComponent(tag),
        }));
    } catch (error) {
        console.error("Error generating category static params:", error);
        return [];
    }
}

// Helper function to get related categories
function getRelatedCategories(currentTag: string): string[] {
    // Define category relationships
    const categoryRelationships: Record<string, string[]> = {
        // Color relationships
        'Purple': ['Lavender', 'Blue', 'Eye', 'Watermark'],
        'Lavender': ['Purple', 'Blue', 'Pink', 'Eye'],
        'Blue': ['Lavender', 'Purple', 'Eye', 'Green Throat'],
        'Pink': ['Lavender', 'Red', 'Cream', 'Watermark'],
        'Red': ['Pink', 'Orange', 'Edge'],
        'Yellow': ['Cream', 'Orange', 'Green Throat'],
        'Orange': ['Red', 'Yellow', 'Edge'],
        'Cream': ['Yellow', 'White', 'Pink'],
        'White': ['Cream', 'Green Throat', 'Edge'],

        // Pattern relationships
        'Eye': ['Watermark', 'Purple', 'Lavender', 'Blue'],
        'Edge': ['Orange', 'Red', 'White', 'Yellow'],
        'Watermark': ['Eye', 'Purple', 'Lavender'],
        'Green Throat': ['Blue', 'Yellow', 'White'],

        // Form relationships
        'Unusual Form': ['Spider', 'Crispate', 'Cascade'],
        'Spider': ['Unusual Form', 'Crispate'],
        'Crispate': ['Spider', 'Unusual Form', 'Cascade'],
        'Cascade': ['Crispate', 'Unusual Form'],

        // Ploidy relationships
        'Diploid': ['Tetraploid', 'Cristate', 'Unusual Form'],
        'Tetraploid': ['Diploid', 'Edge', 'Relief'],

        // Foliage relationships
        'Dormant': ['Semi-Evergreen', 'Early', 'Late'],
        'Evergreen': ['Semi-Evergreen', 'Rebloomer'],
        'Semi-Evergreen': ['Dormant', 'Evergreen'],

        // Season relationships
        'Early': ['Midseason', 'Dormant'],
        'Midseason': ['Early', 'Late'],
        'Late': ['Midseason', 'Rebloomer'],
        'Rebloomer': ['Late', 'Evergreen', 'Semi-Evergreen'],

        // Special features
        'Sculpted': ['Cristate', 'Relief', 'Unusual Form'],
        'Cristate': ['Sculpted', 'Diploid', 'Unusual Form'],
        'Relief': ['Sculpted', 'Tetraploid'],
        'Fragrant': ['Rebloomer', 'Cream', 'Yellow']
    };

    // Return up to 4 related categories, or empty array if none defined
    return (categoryRelationships[currentTag] || []).slice(0, 4);
}