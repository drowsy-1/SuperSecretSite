// src/app/page.tsx
import { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import DaylilyGallery from '@/components/DaylilyGallery';

export const metadata: Metadata = {
    title: 'Rice Daylilies - Award-Winning Daylily Breeder in Kentucky',
    description: 'Browse our collection of award-winning daylilies bred in Kentucky. Featuring both diploid and tetraploid varieties with exceptional northern and southern hardiness.',
    alternates: {
        canonical: '/',
    },
};

export default function Home() {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <DaylilyGallery />
        </ThemeProvider>
    );
}