import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: 'https://ricedaylilies.hemeroholics.com/sitemap.xml', // Update with your actual domain
    };
}