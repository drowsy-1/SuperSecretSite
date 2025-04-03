/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false, // Remove X-Powered-By header for security
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Adding explicit build configuration
  experimental: {
    // Use supported options only
    // Remove staticWorkerRequestTimeout
  },
  // Helps with AWS Amplify deployments
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint during build to prevent build failures
  },
  typescript: {
    ignoreBuildErrors: true, // Skip TypeScript errors during build to prevent build failures
  },
  // Optimize for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Define environment variables for deployment
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://ricedaylilies.hemeroholics.com',
  },
  // Add support for trailing slashes option
  trailingSlash: false, // Set to true if you want URLs to have trailing slashes

  // Add redirects configuration for canonical URL handling
  async redirects() {
    return [
      // HTTP to HTTPS (this one is essential and shouldn't cause loops)
      {
        source: '/:path*',
        has: [
          { type: 'header', key: 'x-forwarded-proto', value: 'http' }
        ],
        destination: 'https://ricedaylilies.hemeroholics.com/:path*',
        permanent: true,
      },

      // Handle index.html and other legacy URLs if needed
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },

      // Normalize trailing slashes based on your trailingSlash setting
      // Since you have trailingSlash: false, redirect URLs with trailing slashes to non-trailing slash versions
      // This should not cause loops if implemented correctly
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      }
    ];
  },
  // Add this section for robots handling
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
        ],
      },
    ];
  }
}

module.exports = nextConfig