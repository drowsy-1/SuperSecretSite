// src/app/daylily/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Mail, ArrowLeft, Sun, Moon } from 'lucide-react';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/lib/constants';
import { Daylily } from '@/types/daylily';
import ClientImage from '@/components/ClientImage';
import { getAllDaylilies, getDaylily } from '@/lib/daylily-data';
import { createSlugFromName } from '@/lib/client-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


type Props = {
    params: { slug: string }
};

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const daylily = await getDaylily(params.slug);

    if (!daylily) {
        return {
            title: 'Daylily Not Found | Rice Daylilies',
            robots: { index: true, follow: true }
        };
    }

    const description = `${daylily.color_description || ''}. ${daylily.hybridizer} (${daylily.year}). ${daylily.bloom_size} blooms on ${daylily.scape_height} scapes.`;

    return {
        title: `${daylily.name} | Rice Daylilies`,
        description: description.substring(0, 160),
        openGraph: {
            title: `${daylily.name} | Rice Daylilies`,
            description: description.substring(0, 160),
            images: [
                {
                    url: `https://ricedaylilies.hemeroholics.com${getImageUrl(daylily.image_url)}`,
                    width: 1200,
                    height: 630,
                    alt: daylily.name
                }
            ],

            type: 'website',
        },
        alternates: {
            canonical: `/daylily/${params.slug}`,
        },
        robots: { index: true, follow: true }
    };
}

export default async function DaylilyPage({ params }: Props) {
    const daylily = await getDaylily(params.slug);

    if (!daylily) {
        notFound();
    }

    // Add extra safety checks
    const imagePath = daylily.image_url || 'placeholder.jpg';

    // Generate tags for this daylily
    const tags = generateTags(daylily);

    // Get related daylilies (same hybridizer, or similar color)
    const relatedDaylilies = await getRelatedDaylilies(daylily);


    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header - moved outside the container to match gallery page */}
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
            <div className="container mx-auto px-4 ">
                {/* Main daylily card with all information */}
                <Card className="mb-8 mt-3">
                    <CardContent className="p-6">
                        <div className="mb-4">
                            <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80">
                                <ArrowLeft className="h-4 w-4 mr-1"/>
                                Back to Gallery
                            </Link>
                        </div>
                        {/* Image container at the top */}
                        <div className="max-w-xl mx-auto mb-6">
                            <Card className="overflow-hidden border-0 shadow-md">
                                <div className="aspect-square relative">
                                    <ClientImage
                                        src={getImageUrl(imagePath)}
                                        alt={daylily.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 30vw"
                                        priority
                                        className="object-cover"
                                        unoptimized={true}
                                    />
                                </div>
                            </Card>
                        </div>

                        {/* Daylily header information */}
                        <div className="text-center mb-6">
                            <div className="flex items-center justify-center gap-4 flex-wrap">
                                <h1 className="text-3xl font-bold">{daylily.name}</h1>
                                {daylily.price && (
                                    <p className="text-2xl font-medium text-green-600 dark:text-green-400">
                                        ${daylily.price}
                                    </p>
                                )}
                            </div>

                            <p className="text-lg text-muted-foreground mt-2">
                                {daylily.hybridizer} ({daylily.year})
                            </p>

                            <div className="flex flex-wrap gap-2 justify-center mt-4">
                                {tags.map(tag => (
                                    <Link
                                        key={tag}
                                        href={`/category/${encodeURIComponent(tag)}`}
                                        className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm hover:bg-secondary/80 transition-colors"
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </div>


                            <div className="mt-4">
                                <a
                                    href={`mailto:daylilymagic@yahoo.com?subject=Variety%20Inquiry%20-%20${encodeURIComponent(daylily.name)}%20&body=I%20am%20interested%20in%20the%20variety%20${encodeURIComponent(daylily.name)}%20.%20Please%20provide%20information%20about%20its%20availability%20and%20pricing.`}
                                    className="inline-block"
                                >
                                    <Button className="gap-2">
                                        <Mail className="h-4 w-4"/>
                                        <span>{daylily.availability || "Email For Availability"}</span>
                                    </Button>
                                </a>
                            </div>
                        </div>

                        <div className="border-t my-6"></div>

                        {/* Characteristics section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">Characteristics</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
                                <div>
                                    <span className="font-medium">Ploidy:</span> {daylily.ploidy}
                                </div>
                                <div>
                                    <span className="font-medium">Bloom Size:</span> {daylily.bloom_size}
                                </div>
                                <div>
                                    <span className="font-medium">Scape Height:</span> {daylily.scape_height}
                                </div>
                                <div>
                                    <span className="font-medium">Bloom Season:</span> {daylily.bloom_season}
                                </div>
                                <div>
                                    <span className="font-medium">Foliage Type:</span> {daylily.foliage_type}
                                </div>
                                {daylily.branches && (
                                    <div>
                                        <span className="font-medium">Branches:</span> {daylily.branches}
                                    </div>
                                )}
                                {daylily.bud_count && (
                                    <div>
                                        <span className="font-medium">Bud Count:</span> {daylily.bud_count}
                                    </div>
                                )}
                                {daylily.fragrance && (
                                    <div>
                                        <span className="font-medium">Fragrance:</span> {daylily.fragrance}
                                    </div>
                                )}
                                {daylily.bloom_habit && (
                                    <div>
                                        <span className="font-medium">Bloom Habit:</span> {daylily.bloom_habit}
                                    </div>
                                )}
                                {daylily.form && (
                                    <div>
                                        <span className="font-medium">Form:</span> {daylily.form}
                                    </div>
                                )}
                                {daylily.sculpting && (
                                    <div>
                                        <span className="font-medium">Sculpting:</span> {daylily.sculpting}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="border-t my-6"></div>

                        {/* Details section */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Details</h2>
                            <div className="space-y-4">
                                {daylily.color_description && (
                                    <div>
                                        <h3 className="text-md font-semibold mb-1">Color</h3>
                                        <p>{daylily.color_description}</p>
                                    </div>
                                )}
                                {daylily.parentage && (
                                    <div>
                                        <h3 className="text-md font-semibold mb-1">Parentage</h3>
                                        <p>{daylily.parentage}</p>
                                    </div>
                                )}
                                {daylily["seedling_#"] && (
                                    <div>
                                        <h3 className="text-md font-semibold mb-1">Seedling #</h3>
                                        <p>{daylily["seedling_#"]}</p>
                                    </div>
                                )}
                                {daylily.notes && (
                                    <div>
                                        <h3 className="text-md font-semibold mb-1">Notes</h3>
                                        <p>{daylily.notes}</p>
                                    </div>
                                )}
                                {daylily.description && (
                                    <div>
                                        <h3 className="text-md font-semibold mb-1">Description</h3>
                                        <p className="whitespace-pre-line">
                                            {daylily.description}
                                        </p>
                                    </div>
                                )}
                                {daylily.learn_more_url && (
                                    <div className="mt-4">
                                        <a
                                            href={daylily.learn_more_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90"
                                        >
                                            Learn More
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

                {/* Related daylilies in separate card */}
                {relatedDaylilies.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>You Might Also Like</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {relatedDaylilies.map(related => (
                                    <Link
                                        key={related.name}
                                        href={`/daylily/${createSlugFromName(related.name)}`}
                                        className="block group"
                                    >
                                        <div className="aspect-square relative rounded-lg overflow-hidden">
                                            <ClientImage
                                                src={getImageUrl(related.image_url)}
                                                alt={related.name}
                                                fill
                                                sizes="(max-width: 768px) 50vw, 25vw"
                                                className="object-cover transition-transform group-hover:scale-105"
                                            />
                                        </div>
                                        <p className="mt-2 font-medium text-sm truncate group-hover:text-primary transition-colors">
                                            {related.name}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Schema markup */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org/",
                            "@type": "Product",
                            "name": daylily.name,
                            "image": `https://ricedaylilies.hemeroholics.com${getImageUrl(daylily.image_url)}`,
                            "description": daylily.description || daylily.color_description,
                            "sku": daylily["seedling_#"] || daylily.name.replace(/\s+/g, '-').toLowerCase(),
                            "brand": {
                                "@type": "Brand",
                                "name": "Rice Daylilies"
                            },
                            "offers": {
                                "@type": "Offer",
                                "priceCurrency": "USD",
                                "price": daylily.price || "0.00",
                                "availability": daylily.availability?.toLowerCase().includes("stock")
                                    ? "https://schema.org/InStock"
                                    : "https://schema.org/OutOfStock",
                                "seller": {
                                    "@type": "Organization",
                                    "name": "Rice Daylilies"
                                }
                            }
                        })
                    }}
                />
            </div>
            );
            }

            // Generate all possible paths at build time
            export async function generateStaticParams() {
            try {
            const daylilies = await getAllDaylilies();

            return daylilies.map((daylily) => ({
            slug: createSlugFromName(daylily.name),
        }));
        } catch (error) {
            console.error("Error generating static params:", error);
            return [];
        }
        }

            // Helper function to generate tags for a daylily
            function generateTags(daylily: Daylily): string[] {
            const tags: string[] = [];

            // Add ploidy as tag
            if (daylily.ploidy) {
            tags.push(daylily.ploidy);
        }

            // Add foliage type
            if (daylily.foliage_type) {
            tags.push(daylily.foliage_type);
        }

            // Parse and add bloom season tags
            if (daylily.bloom_season) {
            const seasonText = daylily.bloom_season.toLowerCase();
            if (seasonText.includes('early')) tags.push('Early');
            if (seasonText.includes('mid')) tags.push('Midseason');
            if (seasonText.includes('late')) tags.push('Late');
            if (seasonText.includes('rebloom')) tags.push('Rebloomer');
        }

            // Add color-based tags
            if (daylily.color_description) {
            const colorText = daylily.color_description.toLowerCase();
            if (colorText.includes('purple')) tags.push('Purple');
            if (colorText.includes('lavender')) tags.push('Lavender');
            if (colorText.includes('blue')) tags.push('Blue');
            if (colorText.includes('pink')) tags.push('Pink');
            if (colorText.includes('red')) tags.push('Red');
            if (colorText.includes('yellow')) tags.push('Yellow');
            if (colorText.includes('orange')) tags.push('Orange');
            if (colorText.includes('cream')) tags.push('Cream');
            if (colorText.includes('white')) tags.push('White');

            // Add pattern/eye tags
            if (colorText.includes('eye')) tags.push('Eye');
            if (colorText.includes('edge')) tags.push('Edge');
            if (colorText.includes('watermark')) tags.push('Watermark');
            if (colorText.includes('throat')) tags.push('Green Throat');
        }

            // Add form tags
            if (daylily.form) {
            const formText = daylily.form.toLowerCase();
            if (formText.includes('unusual')) tags.push('Unusual Form');
            if (formText.includes('spider')) tags.push('Spider');
            if (formText.includes('crispate')) tags.push('Crispate');
            if (formText.includes('cascade')) tags.push('Cascade');
        }

            // Add special features
            if (daylily.sculpting) {
            tags.push('Sculpted');

            const sculptingText = daylily.sculpting.toLowerCase();
            if (sculptingText.includes('cristate')) tags.push('Cristate');
            if (sculptingText.includes('relief')) tags.push('Relief');
        }

            // Add fragrance tag
            if (daylily.fragrance) {
            tags.push('Fragrant');
        }

            // Remove duplicates
            return Array.from(new Set(tags));
        }

            // Helper function to get related daylilies
            async function getRelatedDaylilies(daylily: Daylily): Promise<Daylily[]> {
            try {
            const allDaylilies = await getAllDaylilies();
            const related: Daylily[] = []; // Use array instead of Set
            const usedNames = new Set<string>();

            // Add current daylily name
            usedNames.add(daylily.name);

            // First try to find daylilies by the same hybridizer
            const sameHybridizer = allDaylilies.filter(d =>
            d.name !== daylily.name &&
            d.hybridizer === daylily.hybridizer
            );

            // Then try to find similar color daylilies
            const colorTerms = ['purple', 'lavender', 'blue', 'pink', 'red', 'yellow', 'orange', 'cream', 'white'];
            const currentColors = colorTerms.filter(color =>
            daylily.color_description?.toLowerCase().includes(color)
            );

            const similarColors = allDaylilies.filter(d =>
            d.name !== daylily.name &&
            !sameHybridizer.some(h => h.name === d.name) && // Exclude those already in sameHybridizer
            currentColors.some(color => d.color_description?.toLowerCase().includes(color))
            );

            // Shuffle hybridizer matches and add up to 2
            if (sameHybridizer.length > 0) {
            // Shuffle to get random ones (using a more stable method)
            const shuffledHybridizer = [...sameHybridizer].sort(() => 0.5 - Math.random());

            for (let i = 0; i < Math.min(2, shuffledHybridizer.length); i++) {
            if (!usedNames.has(shuffledHybridizer[i].name)) {
            related.push(shuffledHybridizer[i]);
            usedNames.add(shuffledHybridizer[i].name);
        }
        }
        }

            // Shuffle color matches and add up to the limit (4 total)
            if (similarColors.length > 0) {
            // Shuffle to get random ones
            const shuffledColors = [...similarColors].sort(() => 0.5 - Math.random());

            for (let i = 0; i < shuffledColors.length && related.length < 4; i++) {
            if (!usedNames.has(shuffledColors[i].name)) {
            related.push(shuffledColors[i]);
            usedNames.add(shuffledColors[i].name);
        }
        }
        }

            // If we still need more, add random ones from remaining daylilies
            if (related.length < 4) {
            const remainingDaylilies = allDaylilies.filter(d => !usedNames.has(d.name));

            // Shuffle remaining daylilies
            const shuffledRemaining = [...remainingDaylilies].sort(() => 0.5 - Math.random());

            for (let i = 0; i < shuffledRemaining.length && related.length < 4; i++) {
            if (!usedNames.has(shuffledRemaining[i].name)) {
            related.push(shuffledRemaining[i]);
            usedNames.add(shuffledRemaining[i].name);
        }
        }
        }

            return related;
        } catch (error) {
            console.error("Error getting related daylilies:", error);
            return []; // Return empty array on error
        }
        }