import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | SHRP Notes',
  description: 'This page could not be found. SHRP Notes is our new privacy-first note transformation tool.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            404
          </h1>
          <div className="mt-4">
            <svg
              className="w-32 h-32 mx-auto text-purple-500/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Main Message */}
        <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
        
        {/* Context about old site */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 mb-8">
          <p className="text-slate-300 mb-4">
            Looking for our PDF extraction or OCR service?
          </p>
          <p className="text-slate-400 text-sm mb-4">
            We&apos;ve evolved! <span className="text-purple-400 font-semibold">SHRP Notes</span> is our 
            new privacy-first note transformation tool that helps you organize meeting notes, extract 
            tasks, and structure information—all locally in your browser.
          </p>
          <p className="text-slate-500 text-xs">
            Our previous PDF/OCR services have been discontinued as we focus on building the best 
            note-taking experience.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full max-w-md mx-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Try SHRP Notes Free →
          </Link>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/blog"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
            >
              Read Our Blog
            </Link>
            
            <Link
              href="/blog/how-to-organize-meeting-notes"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
            >
              Organize Notes Guide
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-slate-500 text-sm">
          If you believe this page should exist, please{' '}
          <a
            href="https://twitter.com/digi_wares"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 underline"
          >
            let us know
          </a>
        </p>
      </div>
    </div>
  );
}
