// src/app/about/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur">
                <div className="container mx-auto p-4">
                    <div className="flex justify-between items-center">
                        <Link href="/">
                            <h1 className="text-2xl font-bold cursor-pointer">Daylily Gallery</h1>
                        </Link>
                        <Link href="/">
                            <Button
                                variant="outline"
                                className="h-auto min-h-[40px] px-4 py-2"
                                >
                                Back to Gallery
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 pt-20 pb-8">
                <div className="max-w-3xl mx-auto space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>About Us</CardTitle>
                        </CardHeader>
                        <CardContent className="prose dark:prose-invert">
                            <p>
                                Welcome to Thurough Bred Daylily, where passion for color, quality,
                                and heritage blossoms in every bloom. Founded by lifelong horticulture
                                enthusiasts, our mission is to bring the timeless beauty of daylilies
                                into gardens around the world. We’ve spent countless hours researching,
                                breeding, and cultivating these vibrant perennials, ensuring that every
                                variety we offer lives up to the highest standards—just like a
                                thoroughbred champion.
                            </p>
                            <br />
                            <p>
                                At Thurough Bred Daylily, we believe that every garden tells a story,
                                and our role is to make that story as colorful and memorable as possible.
                                We focus on producing robust, eye-catching daylilies with strong genetics,
                                exceptional form, and remarkable color saturation. Our dedication to careful,
                                deliberate breeding methods guarantees that each of our plants thrives in a
                                range of climates, making them a stunning addition to any landscape.
                            </p>
                            <br />
                            <p>
                                Above all, we are guided by our commitment to excellence, innovation, and
                                community. Whether you’re a seasoned gardener, a passionate collector, or
                                discovering daylilies for the first time, we invite you to explore our
                                collection, share in our love of these extraordinary flowers, and become
                                part of the Thurough Bred Daylily family. We can’t wait to see how our
                                daylilies brighten your garden and inspire your own horticultural journey.
                            </p>
                            {/* Add your about content here */}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold mb-2">Location</h3>
                                    <p>Your Address Here</p>
                                    <p>City, State ZIP</p>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2">Contact Details</h3>
                                    <p>Email: your.email@example.com</p>
                                    <p>Phone: (555) 123-4567</p>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2">Hours of Operation</h3>
                                    <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                                    <p>Saturday: By Appointment</p>
                                    <p>Sunday: Closed</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Visiting Guidelines</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Please call ahead to schedule a visit</li>
                                <li>Peak bloom season is typically June through July</li>
                                <li>Garden tours available by appointment only</li>
                                {/* Add more guidelines as needed */}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}