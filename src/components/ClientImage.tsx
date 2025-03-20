// src/components/ClientImage.tsx
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { DEFAULT_IMAGE_PATH } from '@/lib/constants';

export default function ClientImage({
                                        src,
                                        alt,
                                        className,
                                        ...props
                                    }: {
    src: string;
    alt: string;
    className?: string;
    [key: string]: any;
}) {
    const [imgSrc, setImgSrc] = useState<string>(DEFAULT_IMAGE_PATH); // Start with placeholder
    const [loading, setLoading] = useState(true);
    const [hasLoaded, setHasLoaded] = useState(false);

    // Set the actual image source after component mount
    useEffect(() => {
        // Slight delay to let the component fully mount
        const timer = setTimeout(() => {
            setImgSrc(src);
        }, 50);

        return () => clearTimeout(timer);
    }, [src]);

    return (
        <div className="relative w-full h-full">
            <Image
                src={imgSrc}
                alt={alt || "Daylily image"}
                className={`${className || ''} ${loading && !hasLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                {...props}
                onError={() => {
                    console.log(`Image load error: ${imgSrc}`);
                    setImgSrc(DEFAULT_IMAGE_PATH);
                    setLoading(false);
                    setHasLoaded(true);
                }}
                onLoad={() => {
                    setLoading(false);
                    setHasLoaded(true);
                }}
                unoptimized={true} // This can help with Safari compatibility
            />

            {(loading && !hasLoaded) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 bg-opacity-50">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
}