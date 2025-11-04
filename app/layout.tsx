import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'SHRP Notes – Turn messy notes into sharp docs',
  description: 'Paste your messy notes and SHRP Notes restructures them into clean summaries, outlines, polished drafts, or actionable task lists — all in your browser.',
  keywords: [
    // Core functionality
    'note taking app',
    'text summarizer',
    'note organizer',
    'meeting notes',
    'note formatting',
    'text transformation',
    
    // Specific features
    'summarize notes',
    'structure notes',
    'polish writing',
    'extract tasks from notes',
    'convert notes to bullet points',
    'meeting minutes organizer',
    
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
    'convert notes to tasks',
    'clean up messy notes',
    'note taking for students',
    'note taking for professionals',
    
    // Technical
    'local storage notes',
    'browser-based note app',
    'privacy-focused note taking',
    'offline note app',
  ].join(', '),
  authors: [{ name: 'Digiwares' }],
  creator: 'Digiwares',
  openGraph: {
    title: 'SHRP Notes – Turn messy notes into sharp docs',
    description: 'Transform messy brain dumps into clean, structured notes instantly.',
    url: 'https://shrp.app', // Update with your domain
    siteName: 'SHRP Notes',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SHRP Notes – Turn messy notes into sharp docs',
    description: 'Transform messy brain dumps into clean, structured notes instantly.',
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
