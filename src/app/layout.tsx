// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://ricedaylilies.hemeroholics.com'),
    title: {
        template: '%s | Rice Daylilies',
        default: 'Rice Daylilies - Award-Winning Daylily Breeder in Kentucky',
    },
    description: 'Award-winning daylily hybridizers in Kentucky with over 25 years of breeding exceptional daylilies. Browse our collection of Northern-hardy daylilies.',
    keywords: 'daylilies, hemerocallis, Kentucky daylily breeder, daylily hybridizer, Rice daylilies, Thoroughbred daylilies',
    authors: [{ name: 'John and Annette Rice' }],
    creator: 'John Rice',
    alternates: {
        canonical: 'https://ricedaylilies.hemeroholics.com',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://ricedaylilies.hemeroholics.com',
        siteName: 'Rice Daylilies',
        title: 'Rice Daylilies - Award-Winning Daylily Breeder in Kentucky',
        description: 'Award-winning daylily hybridizers in Kentucky with over 25 years of breeding exceptional daylilies. Browse our collection of Northern-hardy daylilies.',
        images: [
            {
                url: 'https://ricedaylilies.hemeroholics.com/assets/Garden_7-22-20.jpg',
                width: 1200,
                height: 630,
                alt: 'Rice Daylilies Garden'
            }
        ]
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        }
    },
    verification: {
        // Add Google Search Console verification if you have it
        google: 'your-google-site-verification-code', // You'll need to replace this with your actual code
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Rice Daylilies - Award-Winning Daylily Breeder in Kentucky',
        description: 'Award-winning daylily hybridizers in Kentucky with over 25 years of breeding exceptional daylilies.',
        images: ['https://ricedaylilies.hemeroholics.com/assets/Garden_7-22-20.jpg'],
    }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            {/* Explicitly add indexing meta tags to override any injected ones */}
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

            {/* Add preconnect for performance */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </head>
        <body className={inter.className}>
        {/* Replace with your actual Google Analytics measurement ID */}
        <GoogleAnalytics measurementId="G-P5HD7BPYPV" />

        <Providers>{children}</Providers>

        {/* Local Business Schema */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "PlantNursery",
                    "name": "Rice Daylilies",
                    "url": "https://ricedaylilies.hemeroholics.com",
                    "telephone": "(859) 435-0000",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "6615 Briar Hill Road",
                        "addressLocality": "Paris",
                        "addressRegion": "KY",
                        "postalCode": "40361",
                        "addressCountry": "US"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": 38.084405,
                        "longitude": 84.277545
                    },
                    "openingHoursSpecification": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday"
                        ],
                        "opens": "09:00",
                        "closes": "17:00"
                    },
                    "description": "Award-winning daylily breeder in Kentucky's Bourbon County with over 25 years of experience perfecting exceptional thoroughbred daylilies."
                })
            }}
        />
        </body>
        </html>
    );
}