'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// Declare the gtag function for TypeScript
declare global {
    interface Window {
        gtag: (
            command: string,
            action: string,
            params?: Record<string, any>
        ) => void;
        dataLayer: any[];
    }
}

export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (pathname && window.gtag) {
            // When route changes, log page view with current path
            window.gtag('event', 'page_view', {
                page_location: window.location.href,
                page_path: pathname,
                page_title: document.title,
                send_to: measurementId
            });
        }
    }, [pathname, searchParams, measurementId]);

    return (
        <>
            {/* Google tag (gtag.js) - Google Analytics 4 */}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${measurementId}', {
                            page_path: window.location.pathname,
                            cookie_flags: 'SameSite=None;Secure',
                            cookie_domain: 'none'
                        });
                    `
                }}
            />
        </>
    );
}