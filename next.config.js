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
      // Old tools from document digitization site
      {
        source: '/tools/pdf-to-excel',
        destination: '/blog/how-to-organize-meeting-notes',
        permanent: true,
      },
      {
        source: '/tools/contract-parser',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tools/invoice-extractor',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tools/receipt-scanner',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tools/invoice-to-excel',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tools/document-scanner',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tools/:path*',
        destination: '/',
        permanent: true,
      },
      // Old preview/demo pages
      {
        source: '/preview',
        destination: '/',
        permanent: true,
      },
      {
        source: '/demo',
        destination: '/',
        permanent: true,
      },
      // OCR/PDF related pages
      {
        source: '/ocr',
        destination: '/',
        permanent: true,
      },
      {
        source: '/pdf-extract',
        destination: '/blog/how-to-organize-meeting-notes',
        permanent: true,
      },
      {
        source: '/extract-pdf',
        destination: '/blog/how-to-organize-meeting-notes',
        permanent: true,
      },
      // Old image processing services
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
      // Old info/support pages
      {
        source: '/about',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/faq',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/report',
        permanent: true,
      },
      {
        source: '/support',
        destination: '/report',
        permanent: true,
      },
      {
        source: '/help',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/getting-started',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/guide',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tutorial',
        destination: '/blog',
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
      // Old blog posts - redirect to most relevant SHRP Notes content
      {
        source: '/blog/free-vs-paid-ocr-software-comparison',
        destination: '/blog/privacy-cost-of-cloud-note-apps',
        permanent: true,
      },
      {
        source: '/blog/free-vs-paid-ocr',
        destination: '/blog/privacy-cost-of-cloud-note-apps',
        permanent: true,
      },
      {
        source: '/blog/how-to-extract-text-from-pdf-complete-guide-2025',
        destination: '/blog/how-to-organize-meeting-notes',
        permanent: true,
      },
      {
        source: '/blog/extract-text-pdf',
        destination: '/blog/how-to-organize-meeting-notes',
        permanent: true,
      },
      {
        source: '/blog/ocr-software-comparison-shrp-vs-competitors',
        destination: '/blog/shrp-vs-notion-vs-obsidian',
        permanent: true,
      },
      {
        source: '/blog/document-digitization-for-law-firms',
        destination: '/blog/privacy-cost-of-cloud-note-apps',
        permanent: true,
      },
      {
        source: '/blog/document-digitization-guide',
        destination: '/blog/how-to-organize-meeting-notes',
        permanent: true,
      },
      {
        source: '/blog/digitization-guide',
        destination: '/blog/how-to-organize-meeting-notes',
        permanent: true,
      },
      {
        source: '/blog/small-business-paperless-office-setup',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/ocr-security',
        destination: '/blog/privacy-cost-of-cloud-note-apps',
        permanent: true,
      },
      {
        source: '/blog/ocr-accuracy-standards',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/best-ocr-software-2025',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/pdf-extraction-guide',
        destination: '/blog/how-to-organize-meeting-notes',
        permanent: true,
      },
      // Photo restoration blog posts (old service)
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
