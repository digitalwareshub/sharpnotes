import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'SHRP Notes – NLP-Powered Note Transformation',
  description: 'Transform messy notes into sharp, structured documents with natural language processing. Extract tasks, summarize content, fix grammar, and organize information—all client-side with complete privacy.',
  metadataBase: new URL('https://shrp.app'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  authors: [{ name: 'Digiwares' }],
  creator: 'Digiwares',
  openGraph: {
    title: 'SHRP Notes – NLP-Powered Note Transformation',
    description: 'Transform messy brain dumps into clean, structured notes with natural language processing—100% private and local.',
    url: 'https://shrp.app',
    siteName: 'SHRP Notes',
    images: [
      {
        url: 'https://shrp.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SHRP Notes - Transform Messy Notes Into Sharp, Structured Docs',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SHRP Notes – NLP-Powered Note Transformation',
    description: 'Transform messy brain dumps into clean, structured notes with natural language processing—100% private and local.',
    creator: '@digi_wares',
    images: ['https://shrp.app/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Prevent theme flash - must run before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const isDark = theme === 'dark' || (!theme && false);
                  document.documentElement.classList.toggle('dark', isDark);
                  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
                } catch (e) {}
              })();
            `,
          }}
        />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K5WHXKDGE4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K5WHXKDGE4', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        
        {/* JSON-LD Structured Data for Rich Snippets */}
        <Script id="structured-data" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "SHRP Notes",
              "applicationCategory": "ProductivityApplication",
              "operatingSystem": "Web Browser, macOS, Windows, Linux",
              "description": "Transform messy notes into clean, structured documents with natural language processing. Extract tasks, summarize content, organize information, and fix grammar—all client-side with complete privacy.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "127"
              },
              "featureList": [
                "NLP-powered text summarization",
                "Automatic task extraction with people and dates",
                "Smart content organization and structuring",
                "Grammar and typo correction",
                "Voice-to-text note taking",
                "Export to multiple formats",
                "100% client-side processing for privacy",
                "Unlimited local storage",
                "Free to use"
              ],
              "screenshot": "https://shrp.app/og-image.png",
              "url": "https://shrp.app",
              "author": {
                "@type": "Organization",
                "name": "Digiwares"
              }
            }
          `}
        </Script>
      </head>
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              border: '1px solid #334155',
            },
            success: {
              iconTheme: {
                primary: '#8b5cf6',
                secondary: '#f1f5f9',
              },
            },
          }}
        />
        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}