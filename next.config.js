/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable strict mode for better development experience
  reactStrictMode: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Enable SWC minification for better performance
  swcMinify: true,
  
  // Optimize font loading
  optimizeFonts: true,
  
  // Compress responses
  compress: true,
  
  // Performance optimizations
  // experimental: {
  //   optimizeCss: true,
  //   optimizePackageImports: ['react-hot-toast', '@vercel/analytics'],
  // },
  
  // Redirects for old website URLs
  async redirects() {
    return [
      // Redirect www to non-www (canonical domain)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.shrp.app',
          },
        ],
        destination: 'https://shrp.app/:path*',
        permanent: true,
      },
      // Old feature/service pages to homepage
      {
        source: '/features',
        destination: '/',
        permanent: true,
      },
      {
        source: '/start',
        destination: '/',
        permanent: true,
      },
      {
        source: '/digitize/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/remove-background',
        destination: '/',
        permanent: true,
      },
      {
        source: '/colorize',
        destination: '/',
        permanent: true,
      },
      {
        source: '/decode',
        destination: '/',
        permanent: true,
      },
      {
        source: '/product-photography',
        destination: '/',
        permanent: true,
      },
      {
        source: '/transform',
        destination: '/',
        permanent: true,
      },
      {
        source: '/how-it-works',
        destination: '/',
        permanent: true,
      },
      // Old utility/info pages
      {
        source: '/migration-guide',
        destination: '/',
        permanent: true,
      },
      {
        source: '/comparison-checklist',
        destination: '/',
        permanent: true,
      },
      {
        source: '/comparison-sheet',
        destination: '/',
        permanent: true,
      },
      {
        source: '/implementation',
        destination: '/',
        permanent: true,
      },
      {
        source: '/security-guide',
        destination: '/',
        permanent: true,
      },
      {
        source: '/test-data',
        destination: '/',
        permanent: true,
      },
      {
        source: '/roi-calculator',
        destination: '/',
        permanent: true,
      },
      {
        source: '/api',
        destination: '/',
        permanent: true,
      },
      {
        source: '/search',
        destination: '/',
        permanent: true,
      },
      // Search with query parameter
      {
        source: '/search\\?:query*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/browserconfig.xml',
        destination: '/',
        permanent: true,
      },
      // Old blog posts to main blog page
      {
        source: '/blog/free-vs-paid-ocr',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/extract-text-pdf',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/digitization-guide',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/ocr-security',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/ocr-accuracy-standards',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/complete-guide-to-photo-restoration',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/photo-restoration-tips',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/damaged-photo-repair-techniques',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/restore-old-family-photos',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/ai-vs-traditional-photo-restoration',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/wedding-photo-restoration-guide',
        destination: '/blog',
        permanent: true,
      },
    ];
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
