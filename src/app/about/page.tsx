// src/app/about/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Image from 'next/image'




export default function AboutPage() {
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
                    <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                        <Image
                            src="/assets/Garden_7-22-20.jpg"
                            alt="Daylily Garden"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <Card>

                        <CardHeader>
                            <CardTitle>About Us</CardTitle>
                        </CardHeader>
                        <CardContent className="prose dark:prose-invert">
                            <p>
                                Welcome to Rice Daylilies, formerly Thoroughbred Daylilies, the home and vision
                                of John and Annette Rice. Nestled on 10 beautiful acres in Bourbon County—just
                                15 miles east of downtown Lexington, Kentucky—our farm is dedicated to cultivating
                                and sharing the beauty of daylilies. We currently have over 2 acres planted in these
                                exceptional flowers, featuring hundreds of named cultivars and tens of thousands of
                                seedlings that are part of our robust hybridizing program.
                            </p>
                            <br/>
                            <p>
                                While our early work focused on tetraploid daylilies beginning in 1991, we have
                                since
                                shifted our attention to diploid daylilies. We chose to revisit our original diploid
                                introductions because they embodied the characteristics we value most: hardiness,
                                vigor,
                                sturdy scapes, and especially clear, vibrant colors in the violet, lavender, and
                                purple
                                range. Over the years, we’ve acquired and evaluated hundreds of diploid
                                cultivars—both
                                new and old—to enrich our breeding stock. In previous seasons, we've plant thousands
                                of seeds and are continually excited to see how these unique crosses flourish in our
                                fields.
                            </p>
                            <br/>
                            <p>
                                Unlike many hybridizers who work in controlled greenhouse environments, we do all
                                our
                                breeding and growing outside in the ground. This approach ensures that our plants
                                thrive under real-world conditions, making them more resilient and garden-worthy. It
                                does mean that we often wait two to three years to see what our seedlings are truly
                                capable of—but the reward of strong, beautiful daylilies is worth the patience.
                            </p>
                            <br/>
                            <p>
                                Peak bloom occurs from late June through mid-July, with some varieties continuing
                                well into August and even September. Whether you’re looking for mid-late or
                                late-blooming daylilies—or even rebloomers—you’ll find a wide array of options here.
                                We
                                welcome
                                visitors by appointment only. This helps us give you the personalized attention and
                                guidance you
                                deserve, whether you’re selecting daylilies for your garden or simply enjoying the
                                beauty
                                of the blooms.
                            </p>
                            <br/>
                            <p>
                                We offer a large selection of daylilies for purchase. We’re happy to ship throughout
                                the
                                United States. If you have any questions, don’t hesitate to reach out by email,
                                we’re always here to
                                help you find the perfect daylily.
                            </p>
                            <br/>
                            <p>
                                Thank you for your interest in Rice Daylilies. We look forward to sharing the
                                vibrant colors and hardy beauty of our unique and beautiful blooms with you soon!
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
                                    <p>6615 Briar Hill Road</p>
                                    <p>Paris, KY 40361 </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2">Contact Details</h3>
                                    <p>Email: daylilycat68@gmail.com</p>
                                    <p>Phone: (859) 435-0000</p>
                                </div>

                                {/*<div>
                                    <h3 className="font-semibold mb-2">Hours of Operation</h3>
                                    <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                                    <p>Saturday: By Appointment</p>
                                    <p>Sunday: Closed</p>
                                </div>*/}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Visiting Guidelines</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Please email ahead of time to schedule a visit</li>
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