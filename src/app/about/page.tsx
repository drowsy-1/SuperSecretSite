// src/app/about/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Calendar, Info, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
    const emailAddress = 'annettesmagic22@icloud.com';
    const phoneNumber = '(859) 435-0000';
    const emailSubject = 'Rice Daylilies Inquiry';
    const emailBody = 'Hello, I am interested in learning more about your daylilies.';

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur">
                <div className="container mx-auto p-4">
                    <div className="flex justify-between items-center">
                        <Link href="/">
                            <h1 className="text-2xl font-bold cursor-pointer">Rice Daylilies</h1>
                        </Link>
                        <Link href="/">
                            <Button variant="outline" className="h-auto min-h-[40px] px-4 py-2">
                                Back to Gallery
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 pt-20 pb-8">
                <div className="max-w-3xl mx-auto space-y-8">
                    <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                        <Image
                            src="/assets/Garden_7-22-20.jpg"
                            alt="Daylily Garden"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Introduction Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                About Rice Daylilies
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="prose dark:prose-invert">
                            <p>
                                Welcome to Rice Daylilies, a premier daylily breeding farm in Kentucky's Bourbon County,
                                where award-winning horticulturalist and Vietnam veteran John Rice and his wife Annette
                                have spent over 25 years perfecting exceptional daylilies. Located just 15 miles east
                                of Lexington, our 10-acre farm showcases both diploid and tetraploid varieties, with
                                2 acres dedicated to cultivating exceptional northern and southern-hardy daylily.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Breeding Programs Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Our Breeding Programs</CardTitle>
                        </CardHeader>
                        <CardContent className="prose dark:prose-invert">
                            <h3 className="font-bold">Innovative Diploid Program</h3>
                            <p className="mt-1">
                                Our current breeding focus centers on creating exceptional diploid daylilies
                                that push the boundaries of color and form. We're particularly known for our
                                breakthrough work with color ranges from light to deep purple, along with
                                distinctive blues and lavenders. Blue Dolphin, one of our cornerstone varieties,
                                is prized by hybridizers for its exceptional plant habits, especially the large
                                flowers, thick scapes, and waxy substance. Dream Sequence has become a foundation
                                plant for hybridizers working to introduce teeth in diploids.
                            </p>

                            <h3 className="font-bold mt-3">Our collection features varieties with:</h3>
                            <ul className=" list-none space-y-2 pl-0">
                                <li>• Embossment - a rare and little-known trait </li>
                                <li>• Blue eye bands</li>
                                <li>• Cristate or bearded forms </li>
                                <li>• Near-black to near-white color ranges</li>
                                <li>• Pronounced green eyes</li>
                                <li>• Large flowers exceeding 7 inches</li>
                            </ul>

                            <h3 className="font-bold mt-4">Legacy Tetraploid Collection</h3>
                            <p className="mt-1">
                                While our current focus is diploids, we maintain an impressive collection
                                of both classic and new tetraploid varieties. Our earlier tetraploid
                                introductions remain widely grown and are known for their thick substance,
                                clarity of color, sun-fastness, ruffled edges, sculptured forms, and distinctive
                                teeth. With some fan favorites being Old Friends, Redneck Red, Jackie Canner, Truly
                                Angelic, Hey Mr.Bud, Bass Gibson, and Crowning Achievement.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Growing Conditions Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Growing Conditions & Bloom Season</CardTitle>
                        </CardHeader>
                        <CardContent className="prose dark:prose-invert">
                            <p className="mt-1">
                                Unlike greenhouse operations, we grow all our daylily in natural outdoor conditions,
                                ensuring exceptional garden hardiness in both northern and southern climates. This
                                realistic growing environment produces resilient, garden-worthy plants that
                                consistently perform well across diverse growing zones.
                            </p>
                            <p className="mt-2">
                                Peak bloom occurs from late June through mid-July, with some flowering into August
                                and September. Our collection includes primarily mid-late and late-blooming
                                varieties, plus reliable rebloomers.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Purchasing Information Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Purchasing Information</CardTitle>
                        </CardHeader>
                        <CardContent className="prose dark:prose-invert">
                            <p className="font-medium text-primary">
                                All sales are conducted via email or in-person. Contact us for current availability and pricing.
                            </p>
                            <ul className="list-none space-y-2 pl-0 pt-1 mt-1">
                                <li>• Shipping: $16 per order, plus $2 for each for each
                                    additional division above 5 or
                                    more
                                </li>
                                <li>• We can only ship to mainland United States</li>
                                <li>• Cash or check preferred</li>
                                <li>• Located in AHS/ADS Region 10</li>
                                <li>• USDA Zone 6</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Contact Information Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                Contact Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <MapPin className="h-5 w-5 flex-shrink-0"/>
                                            <h3 className="font-semibold">Location</h3>
                                        </div>
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('6615 Briar Hill Road Paris KY 40361-9064')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 p-2 text-primary hover:text-primary/80"
                                        >
                                            <div>
                                                <p>6615 Briar Hill Road</p>
                                                <p>Paris, KY 40361-9064</p>
                                            </div>
                                            <ExternalLink className="h-4 w-4"/>
                                        </a>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Mail className="h-5 w-5 flex-shrink-0 text-primary"/>
                                            <h3 className="font-semibold">Email Us</h3>
                                        </div>
                                        <a
                                            href={`mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
                                            className="text-primary hover:text-primary/80 flex items-center gap-2"
                                        >
                                            {emailAddress}
                                            <ExternalLink className="h-4 w-4"/>
                                        </a>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Phone className="h-5 w-5 flex-shrink-0"/>
                                            <h3 className="font-semibold">Phone</h3>
                                        </div>
                                        <a
                                            href={`tel:${phoneNumber.replace(/\D/g, '')}`}
                                            className="hover:text-primary/80 flex items-center gap-2"
                                        >
                                            {phoneNumber}
                                            <ExternalLink className="h-4 w-4"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Visiting Guidelines Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                Visiting Guidelines
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Please email ahead to schedule your visit</li>
                                <li>Peak bloom season: June through July</li>
                                <li>Garden tours available by appointment only</li>
                                <li>Personalized selection assistance provided</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}