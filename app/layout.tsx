import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'SHRP Notes – NLP-Powered Note Transformation',
  description: 'Transform messy notes into sharp, structured documents with natural language processing. Extract tasks, summarize content, fix grammar, and organize information—all client-side with complete privacy.',
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
  keywords: [
    // Core functionality
    'note taking app',
    'nlp note organizer',
    'text transformation tool',
    'natural language processing notes',
    'meeting notes organizer',
    'note formatting',
    
    // Specific features
    'summarize notes',
    'extract action items',
    'structure notes',
    'polish writing',
    'grammar checker',
    'task extraction from text',
    'convert notes to bullet points',
    'meeting minutes organizer',
    
    // Privacy & local-first
    'privacy-focused note app',
    'local note processing',
    'offline note app',
    'client-side nlp',
    'browser-based text processing',
    'no cloud note app',
    
    // Use cases
    'productivity tool',
    'note taking software',
    'free note app',
    'online note organizer',
    'brain dump organizer',
    'messy notes cleaner',
    
    // Long-tail keywords
    'how to organize meeting notes',
    'best free note taking app',
    'summarize text online',
    'extract tasks from notes',
    'clean up messy notes',
    'note taking for students',
    'note taking for professionals',
    'meeting notes template',
    'voice to text notes',
    'organize lecture notes',
    'transcribe meeting notes',
    'note taking app for mac',
    'note taking app for windows',
    'free alternative to notion',
    'markdown note taking',
    'quick note taking app',
    'capture meeting action items',
    'automatic note summarizer',
    'nlp text organizer',
    'text cleanup tool',
    'compromise js',
    'natural language processing browser',
    
    // Technical
    'local storage notes',
    'browser-based note app',
    'privacy-focused note taking',
    'offline note app',
  ].join(', '),
  authors: [{ name: 'Digiwares' }],
  creator: 'Digiwares',
  openGraph: {
    title: 'SHRP Notes – NLP-Powered Note Transformation',
    description: 'Transform messy brain dumps into clean, structured notes with natural language processing—100% private and local.',
    url: 'https://shrp.app',
    siteName: 'SHRP Notes',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SHRP Notes – NLP-Powered Note Transformation',
    description: 'Transform messy brain dumps into clean, structured notes with natural language processing—100% private and local.',
    creator: '@digi_wares',
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