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
    
    // Old info pages → redirect to blog or homepage
    '/how-it-works': '/blog',
    '/about': '/blog',
    '/contact': 'https://twitter.com/digi_wares',
    '/faq': '/blog',
    '/signup': '/',
    
    // Old legal pages → we don't have these yet, redirect to homepage
    '/terms': '/',
    '/privacy': '/',
    '/data-privacy': '/',
    '/security': '/blog/privacy-cost-of-cloud-note-apps',
    
    // Old API endpoints → redirect to homepage
    '/api/extract-text': '/',
    '/api/pdf-to-excel': '/',
    '/api/contract-parse': '/',
    '/api/invoice-extract': '/',
    '/api/form-extractor': '/',
    '/api/receipt-scan': '/',
    
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
