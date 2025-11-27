'use client';

import Link from 'next/link';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* 404 Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* 404 Visual */}
            <div className="mb-8">
              <h1 className="text-8xl sm:text-9xl font-bold text-gray-900 mb-4">
                404
              </h1>
              <div className="text-6xl mb-6">😕</div>
            </div>

            {/* Main Message */}
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Page Not Found
            </h2>
            
            {/* Context about old site */}
            <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 sm:p-8 mb-8 max-w-2xl mx-auto">
              <p className="text-lg text-gray-900 mb-4">
                <strong>Looking for our PDF extraction or OCR service?</strong>
              </p>
              <p className="text-gray-700 mb-4">
                We&apos;ve evolved! <span className="text-orange-600 font-semibold">SHRP Notes</span> is our 
                new privacy-first note transformation tool that helps you organize meeting notes, extract 
                tasks, and structure information—all locally in your browser.
              </p>
              <div className="bg-white/50 border border-orange-300 rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  <strong>What happened to the old site?</strong><br />
                  Our previous PDF/OCR services have been discontinued. We&apos;re now focused on building 
                  the best privacy-first note-taking experience with local NLP processing.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-12">
              <Link
                href="/webapp"
                className="inline-block px-8 py-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg shadow-orange-500/30"
              >
                Try SHRP Notes Free →
              </Link>

              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/"
                  className="px-6 py-3 border-2 border-gray-300 text-gray-900 hover:bg-gray-50 rounded-xl transition-colors font-medium"
                >
                  Go to Homepage
                </Link>
                
                <Link
                  href="/blog"
                  className="px-6 py-3 border-2 border-gray-300 text-gray-900 hover:bg-gray-50 rounded-xl transition-colors font-medium"
                >
                  Read Our Blog
                </Link>
              </div>
            </div>

            {/* Popular Pages */}
            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500 mb-4">Or explore these popular pages:</p>
              <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <Link
                  href="/blog/how-to-organize-meeting-notes"
                  className="p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all text-left"
                >
                  <div className="text-2xl mb-2">📝</div>
                  <div className="font-semibold text-gray-900 text-sm mb-1">Organize Notes Guide</div>
                  <div className="text-xs text-gray-600">Learn how to structure meeting notes</div>
                </Link>
                
                <Link
                  href="/blog/privacy-cost-of-cloud-note-apps"
                  className="p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all text-left"
                >
                  <div className="text-2xl mb-2">🔒</div>
                  <div className="font-semibold text-gray-900 text-sm mb-1">Privacy Analysis</div>
                  <div className="text-xs text-gray-600">Why local-first matters</div>
                </Link>
                
                <Link
                  href="/blog/adhd-note-taking-guide"
                  className="p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all text-left"
                >
                  <div className="text-2xl mb-2">🧠</div>
                  <div className="font-semibold text-gray-900 text-sm mb-1">ADHD Note-Taking</div>
                  <div className="text-xs text-gray-600">Systems that actually work</div>
                </Link>
              </div>
            </div>

            {/* Help Text */}
            <p className="mt-12 text-gray-500 text-sm">
              Think this page should exist?{' '}
              <Link
                href="/report"
                className="text-orange-600 hover:text-orange-700 underline font-medium"
              >
                Report an issue
              </Link>
              {' '}or{' '}
              <a
                href="https://twitter.com/digi_wares"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 underline font-medium"
              >
                contact us on Twitter
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
