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

    // Track page views when the route changes
    useEffect(() => {
        if (pathname && window.gtag) {
            // Construct the full URL including search params
            const url = searchParams?.toString()
                ? `${pathname}?${searchParams.toString()}`
                : pathname;

            // Track page view
            window.gtag('event', 'page_view', {
                page_location: window.location.href,
                page_path: url,
                page_title: document.title,
                send_to: measurementId
            });
        }
    }, [pathname, searchParams, measurementId]);

    // Handle errors for gtag loading
    const handleGtagError = () => {
        console.error('Error loading Google Analytics');
    };

    return (
        <>
            {/* Google tag (gtag.js) - Google Analytics 4 */}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
                onError={handleGtagError}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        
                        // Basic configuration
                        gtag('config', '${measurementId}', {
                            page_path: window.location.pathname,
                            cookie_flags: 'SameSite=None;Secure',
                            cookie_domain: 'none',
                            send_page_view: true,
                        });
                        
                        // Add enhanced link attribution
                        gtag('set', 'link_attribution', true);

                        // Set user properties
                        gtag('set', 'user_properties', {
                            app_name: 'Rice Daylilies',
                            app_version: '1.0.0',
                            page_type: 'web'
                        });
                        
                        // Add any custom events you want to track here
                        // Example: tracking outbound email clicks
                        document.addEventListener('click', function(e) {
                            const target = e.target;
                            if (target instanceof HTMLAnchorElement && 
                                target.href && 
                                target.href.indexOf('mailto:') === 0) {
                                gtag('event', 'email_click', {
                                    email_address: target.href.substring(7),
                                    page_location: window.location.href
                                });
                            }
                        });
                    `
                }}
            />
        </>
    );
}