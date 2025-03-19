// src/components/ClientImage.tsx
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { DEFAULT_IMAGE_PATH } from '@/lib/constants';

export default function ClientImage({
                                        src,
                                        alt,
                                        ...props
                                    }: {
    src: string;
    alt: string;
    [key: string]: any;
}) {
    const [imgSrc, setImgSrc] = useState(src);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Reset state when src changes
    useEffect(() => {
        setImgSrc(src);
        setLoading(true);
        setError(false);
    }, [src]);

    return (
        <>
            <Image
                src={imgSrc}
                alt={alt || ""}
                {...props}
                onError={() => {
                    console.log(`Image load error: ${imgSrc}`);
                    setImgSrc(DEFAULT_IMAGE_PATH);
                    setError(true);
                }}
                onLoad={() => setLoading(false)}
            />
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 bg-opacity-50">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </>
    );
}