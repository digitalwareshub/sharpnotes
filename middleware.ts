import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect old PDF/OCR service URLs to relevant pages
  const redirects: Record<string, string> = {
    // Old main digitize pages
    '/digitize': '/',
    '/digitize/extract-text': '/blog/how-to-organize-meeting-notes',
    '/digitize/pdf-to-excel': '/blog/how-to-organize-meeting-notes',
    '/digitize/form-extractor': '/',
    '/preview': '/',
    '/demo': '/',
    
    // Old tools pages
    '/tools/contract-parser': '/',
    '/tools/invoice-extractor': '/',
    '/tools/receipt-scanner': '/',
    '/tools/pdf-to-excel': '/blog/how-to-organize-meeting-notes',
    '/tools/invoice-to-excel': '/',
    '/tools/document-scanner': '/',
    
    // Old blog posts about OCR/PDF extraction → redirect to relevant SHRP Notes content
    '/blog/free-vs-paid-ocr-software-comparison': '/blog/privacy-cost-of-cloud-note-apps',
    '/blog/how-to-extract-text-from-pdf-complete-guide-2025': '/blog/how-to-organize-meeting-notes',
    '/blog/ocr-software-comparison-shrp-vs-competitors': '/blog/shrp-vs-notion-vs-obsidian',
    '/blog/document-digitization-for-law-firms': '/blog/privacy-cost-of-cloud-note-apps',
    '/blog/document-digitization-guide': '/blog/how-to-organize-meeting-notes',
    '/blog/ocr-accuracy-standards': '/blog',
    '/blog/small-business-paperless-office-setup': '/blog',
    '/blog/free-vs-paid-ocr': '/blog/privacy-cost-of-cloud-note-apps',
    '/blog/pdf-extraction-guide': '/blog/how-to-organize-meeting-notes',
    '/blog/best-ocr-software-2025': '/blog',
    
    // Webapp OCR variation (malformed URL from analytics)
    '/webapp ocr': '/webapp',
    '/webapp%20ocr': '/webapp',
    '/webapp-ocr': '/webapp',
    
    // Old info pages → redirect to blog or homepage
    '/how-it-works': '/blog',
    '/about': '/blog',
    '/contact': 'https://twitter.com/digi_wares',
    '/faq': '/blog',
    '/signup': '/',
    '/features': '/',
    '/use-cases': '/',
    '/industries': '/',
    
    // Old legal pages → we have these now
    '/data-privacy': '/privacy',
    '/security': '/blog/privacy-cost-of-cloud-note-apps',
    '/terms-of-service': '/terms',
    '/cookie-policy': '/privacy',
    
    // Old API endpoints → redirect to homepage
    '/api/extract-text': '/',
    '/api/pdf-to-excel': '/',
    '/api/contract-parse': '/',
    '/api/invoice-extract': '/',
    '/api/form-extractor': '/',
    '/api/receipt-scan': '/',
    '/api/ocr': '/',
    '/api/digitize': '/',
    
    // Common variations/misspellings
    '/extract-pdf': '/blog/how-to-organize-meeting-notes',
    '/pdf-extract': '/blog/how-to-organize-meeting-notes',
    '/ocr': '/',
    '/ocr-service': '/',
    '/vision-api': '/',
    '/extract': '/',
    '/docs': '/blog',
    '/documentation': '/blog',
    '/pricing': '/',
    '/api-docs': '/blog',
    '/plans': '/',
    '/pro': '/',
    '/enterprise': '/',
    
    // Additional old URLs
    '/restore': '/',
    '/examples': '/',
    '/gallery': '/',
    '/testimonials': '/',
    '/reviews': '/',
    '/support': '/report',
    '/help': '/blog',
    '/getting-started': '/blog',
    '/tutorial': '/blog',
    '/guide': '/blog',
    '/download': '/',
  };

  // Check if current path should be redirected
  const redirectTo = redirects[pathname.toLowerCase()];
  
  if (redirectTo) {
    // 301 Permanent Redirect (tells Google this is permanent)
    const url = request.nextUrl.clone();
    url.pathname = redirectTo;
    return NextResponse.redirect(url, { status: 301 });
  }

  // Allow request to continue
  return NextResponse.next();
}

// Configure which routes this middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
