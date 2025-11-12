'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  // Initialize from localStorage immediately to prevent flash
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (!savedTheme && true);
    }
    return true;
  });

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
    document.documentElement.style.colorScheme = newTheme ? 'dark' : 'light';
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-50'
    }`}>
      {/* Header */}
      <header className={`border-b backdrop-blur-sm ${
        isDarkMode 
          ? 'border-slate-800/50 bg-slate-900/50' 
          : 'border-slate-200/50 bg-white/50'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-2xl">✏️</span>
              <span className={`text-xl font-bold ${isDarkMode ? 'text-slate-50' : 'text-slate-900'}`}>
                SHRP
              </span>
            </Link>

            <button
              onClick={toggleTheme}
              className={`rounded-full p-2 transition-colors ${
                isDarkMode
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              aria-label="Toggle theme"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <svg
                className="h-5 w-5"
                fill={isDarkMode ? "none" : "currentColor"} 
                viewBox="0 0 24 24"
                strokeWidth={isDarkMode ? "2" : "1.5"}
                stroke="currentColor"
              >
                {isDarkMode ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                ) : (
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className={`flex items-center gap-2 text-sm ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            <li>
              <Link href="/" className={`hover:underline ${
                isDarkMode ? 'hover:text-violet-300' : 'hover:text-violet-600'
              }`}>
                Home
              </Link>
            </li>
            <li>/</li>
            <li className={isDarkMode ? 'text-slate-300' : 'text-slate-900'} aria-current="page">
              Privacy Policy
            </li>
          </ol>
        </nav>

        {/* Title */}
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
          isDarkMode ? 'text-slate-50' : 'text-slate-900'
        }`}>
          Privacy Policy
        </h1>
        
        <p className={`text-sm mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Last updated: November 12, 2025
        </p>

        {/* Content */}
        <div className={`prose prose-lg max-w-none ${
          isDarkMode 
            ? 'prose-invert prose-headings:text-slate-50 prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-slate-200' 
            : 'prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700'
        }`}>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Core Privacy Promise</h2>
            <p>
              SHRP Notes is built with privacy as its foundation. <strong>We do not collect, store, transmit, or have any access to your notes or personal data.</strong> All note processing happens entirely in your browser using local natural language processing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What Data We Don&apos;t Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Your notes content:</strong> All text you input stays on your device. It never touches our servers.</li>
              <li><strong>Personal information:</strong> No account creation, no email addresses, no phone numbers, no names.</li>
              <li><strong>Usage tracking:</strong> We don&apos;t track which features you use or how often you use them.</li>
              <li><strong>Location data:</strong> We don&apos;t collect or access your location.</li>
              <li><strong>Device identifiers:</strong> No fingerprinting or unique device tracking.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How Your Data is Stored</h2>
            <p>
              SHRP Notes uses <strong>browser localStorage</strong> to save your notes locally on your device. This means:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your notes are stored only on your device</li>
              <li>No cloud synchronization or backup</li>
              <li>Data persists until you clear your browser data</li>
              <li>Other websites cannot access your SHRP notes</li>
              <li>You can delete all data at any time from within the app</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Analytics and Monitoring</h2>
            <p>
              We use <strong>Google Analytics</strong> to understand aggregate usage patterns and improve the product. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Page views and navigation patterns</li>
              <li>Browser type and device category (mobile vs desktop)</li>
              <li>General geographic region (country level only)</li>
              <li>Anonymous event tracking (button clicks, feature usage)</li>
            </ul>
            <p>
              Important: <strong>We never send your note content or any personal information to analytics services.</strong> All events are anonymized and aggregated.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p>
              SHRP Notes uses the following third-party services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Vercel (Hosting):</strong> Our website is hosted on Vercel. They may collect standard server logs (IP addresses, request times) but have no access to your notes.</li>
              <li><strong>Google Analytics:</strong> For anonymous usage analytics as described above.</li>
              <li><strong>Web Speech API:</strong> If you use voice input, the browser&apos;s built-in speech recognition may send audio to the browser vendor&apos;s servers (Google for Chrome, Apple for Safari). This is controlled by your browser, not by us.</li>
            </ul>
            <p>
              We do not use any third-party note processing, AI services, or cloud storage providers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cookies and Local Storage</h2>
            <p>
              SHRP Notes uses browser storage for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Theme preference:</strong> Remembering if you prefer light or dark mode</li>
              <li><strong>Notes storage:</strong> Saving your notes locally in localStorage</li>
              <li><strong>Analytics cookies:</strong> Google Analytics uses cookies to track sessions</li>
            </ul>
            <p>
              You can clear all local data at any time through your browser settings or the SHRP Notes history panel.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">HIPAA and Compliance</h2>
            <p>
              While SHRP Notes processes all data locally (which is privacy-friendly), <strong>we do not provide HIPAA compliance guarantees</strong>. If you&apos;re handling protected health information (PHI), ensure:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your device is encrypted and password-protected</li>
              <li>You follow your organization&apos;s data handling policies</li>
              <li>You understand that data is not backed up or recoverable if lost</li>
            </ul>
            <p>
              The local-only architecture means your data never leaves your device, but you are responsible for device security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Deletion</h2>
            <p>
              You can delete your data at any time:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Individual notes:</strong> Delete from the Note History panel</li>
              <li><strong>All notes:</strong> Clear browser data or use browser developer tools to clear localStorage</li>
              <li><strong>Analytics data:</strong> Opt out of Google Analytics using browser extensions or your browser&apos;s Do Not Track setting</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">International Users</h2>
            <p>
              SHRP Notes works globally. Since all processing happens locally in your browser, there is no international data transfer. Your notes never leave your device regardless of your location.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Children&apos;s Privacy</h2>
            <p>
              SHRP Notes does not knowingly collect any information from children under 13. Since we don&apos;t collect personal information at all, users of any age can safely use the tool.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Open Source</h2>
            <p>
              SHRP Notes is open source (MIT License). You can review the entire codebase on GitHub to verify our privacy claims. The code is fully transparent and auditable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have questions about this privacy policy, please contact us at:
            </p>
            <p className="mt-4">
              <strong>Email:</strong> <a href="mailto:privacy@shrp.app" className={`underline ${
                isDarkMode ? 'text-violet-300 hover:text-violet-200' : 'text-violet-600 hover:text-violet-700'
              }`}>privacy@shrp.app</a>
            </p>
          </section>

          <section className="mb-8 p-6 rounded-xl border-2" style={{
            borderColor: isDarkMode ? 'rgb(139, 92, 246, 0.3)' : 'rgb(139, 92, 246, 0.2)',
            backgroundColor: isDarkMode ? 'rgb(139, 92, 246, 0.1)' : 'rgb(139, 92, 246, 0.05)'
          }}>
            <p className="text-lg font-semibold mb-2">
              🔒 Bottom Line
            </p>
            <p>
              Your notes are yours. We can&apos;t see them, we don&apos;t store them, and we don&apos;t have any interest in them. SHRP Notes was built to give you a private, fast, local-only note transformation tool. That&apos;s our promise.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className={`mt-16 border-t ${
        isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50/50'
      }`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              © 2025 SHRP Notes. Open source, privacy-first note taking.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className={`text-sm ${
                isDarkMode ? 'text-slate-400 hover:text-violet-300' : 'text-slate-600 hover:text-violet-600'
              }`}>
                Privacy
              </Link>
              <Link href="/terms" className={`text-sm ${
                isDarkMode ? 'text-slate-400 hover:text-violet-300' : 'text-slate-600 hover:text-violet-600'
              }`}>
                Terms
              </Link>
              <a href="https://github.com/digitalwareshub/sharpnotes" target="_blank" rel="noopener noreferrer" className={`text-sm ${
                isDarkMode ? 'text-slate-400 hover:text-violet-300' : 'text-slate-600 hover:text-violet-600'
              }`}>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
