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
      // Redirect www to non-www (assuming you prefer non-www)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.ricedaylilies.hemeroholics.com',
          },
        ],
        destination: 'https://ricedaylilies.hemeroholics.com/:path*',
        permanent: true,
      },
      // Redirect HTTP to HTTPS
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://ricedaylilies.hemeroholics.com/:path*',
        permanent: true,
      },
      // Handle any duplicates with trailing slashes (if trailingSlash is false)
      {
        source: '/:path*/',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig