'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TermsPage() {
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
              Terms of Service
            </li>
          </ol>
        </nav>

        {/* Title */}
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
          isDarkMode ? 'text-slate-50' : 'text-slate-900'
        }`}>
          Terms of Service
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
            <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
            <p>
              By accessing or using SHRP Notes (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Description of Service</h2>
            <p>
              SHRP Notes is a free, client-side web application that helps users transform and organize notes using natural language processing. All processing happens locally in your browser—no data is transmitted to our servers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Use License</h2>
            <p>
              SHRP Notes is open source software released under the MIT License. You are granted a free, worldwide, non-exclusive license to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Service for personal or commercial purposes</li>
              <li>View, fork, and modify the source code</li>
              <li>Deploy your own instance of the application</li>
              <li>Distribute modified versions under the same MIT License</li>
            </ul>
            <p>
              The full source code is available at: <a href="https://github.com/digitalwareshub/sharpnotes" target="_blank" rel="noopener noreferrer" className={`underline ${
                isDarkMode ? 'text-violet-300 hover:text-violet-200' : 'text-violet-600 hover:text-violet-700'
              }`}>github.com/digitalwareshub/sharpnotes</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Acceptable Use</h2>
            <p>You agree to use SHRP Notes only for lawful purposes. You must not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Attempt to hack, disrupt, or damage the Service</li>
              <li>Use the Service to violate any applicable laws or regulations</li>
              <li>Attempt to reverse engineer or compromise the security of the application</li>
              <li>Use automated tools to scrape or overwhelm the Service</li>
              <li>Impersonate others or misrepresent your affiliation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">No Warranty</h2>
            <p>
              SHRP Notes is provided <strong>&quot;as is&quot;</strong> without warranty of any kind, express or implied. We do not guarantee that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The Service will be uninterrupted, secure, or error-free</li>
              <li>The results of note transformation will be accurate or complete</li>
              <li>Any errors or defects will be corrected</li>
              <li>The Service will be compatible with your device or browser</li>
              <li>Your data will not be lost (you are responsible for backing up important notes)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Digiwares and SHRP Notes shall not be liable for any:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Indirect, incidental, special, or consequential damages</li>
              <li>Loss of data, profits, revenue, or business opportunities</li>
              <li>Damages resulting from your use or inability to use the Service</li>
              <li>Unauthorized access to or alteration of your data</li>
              <li>Any other matter relating to the Service</li>
            </ul>
            <p>
              Our total liability for any claim related to the Service is limited to $100 USD.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Responsibility</h2>
            <p>
              Since SHRP Notes stores all data locally in your browser:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>You are responsible</strong> for backing up important notes</li>
              <li><strong>Data loss</strong> can occur if you clear browser data, uninstall the app, or switch devices</li>
              <li><strong>We cannot recover</strong> lost data—there are no server backups</li>
              <li><strong>You control deletion</strong>—we cannot delete your data because we don&apos;t have access to it</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Privacy and Data Collection</h2>
            <p>
              Our data practices are detailed in our <Link href="/privacy" className={`underline ${
                isDarkMode ? 'text-violet-300 hover:text-violet-200' : 'text-violet-600 hover:text-violet-700'
              }`}>Privacy Policy</Link>. Key points:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We do not collect, store, or transmit your notes</li>
              <li>All processing happens locally in your browser</li>
              <li>We use Google Analytics for anonymous usage statistics</li>
              <li>No personal information is required or collected</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p>
              SHRP Notes uses the following third-party services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Vercel:</strong> Website hosting and delivery</li>
              <li><strong>Google Analytics:</strong> Anonymous usage analytics</li>
              <li><strong>compromise.js:</strong> Open source NLP library for text processing</li>
              <li><strong>Web Speech API:</strong> Browser-native voice recognition (optional feature)</li>
            </ul>
            <p>
              These services have their own terms of service and privacy policies. We are not responsible for their practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p>
              SHRP Notes is open source (MIT License). You retain all rights to your notes and content. We claim no ownership of your data.
            </p>
            <p>
              The SHRP Notes name, logo, and branding are owned by Digiwares. You may not use our branding in a way that suggests endorsement without permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Professional Use Disclaimer</h2>
            <p>
              If you use SHRP Notes for professional purposes (medical, legal, financial, etc.):
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are responsible for ensuring compliance with industry regulations (HIPAA, GDPR, etc.)</li>
              <li>The tool does not provide regulatory compliance guarantees</li>
              <li>You should implement appropriate security measures on your devices</li>
              <li>Always verify the accuracy of transformed notes for critical use cases</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Accuracy of Transformations</h2>
            <p>
              While SHRP Notes uses advanced natural language processing, it is not perfect:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Task extraction may miss or misidentify action items</li>
              <li>Summaries may omit important details</li>
              <li>Grammar fixes may occasionally introduce errors</li>
              <li>Date parsing may misinterpret ambiguous dates</li>
            </ul>
            <p>
              <strong>Always review transformed notes</strong> before relying on them for important decisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
            <p>
              We strive to keep SHRP Notes available 24/7, but we do not guarantee uptime. The Service may be temporarily unavailable due to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Scheduled maintenance</li>
              <li>Technical difficulties</li>
              <li>Hosting provider issues</li>
              <li>Unforeseen circumstances</li>
            </ul>
            <p>
              Since all processing happens locally, the core functionality continues to work even if our website is down (if you have it cached).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to Service</h2>
            <p>
              We reserve the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modify or discontinue features</li>
              <li>Update the Service without notice</li>
              <li>Change these Terms of Service at any time</li>
            </ul>
            <p>
              Continued use of the Service after changes constitutes acceptance of the new terms. The open source nature means you can always fork and maintain your own version.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Termination</h2>
            <p>
              We reserve the right to restrict or terminate access to the Service for violations of these terms. However, since the Service is open source and runs locally, you can always deploy your own instance.
            </p>
            <p>
              You may stop using the Service at any time by simply closing the application.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
            <p>
              These Terms are governed by the laws of the United States. Any disputes shall be resolved in the courts of appropriate jurisdiction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact:
            </p>
            <p className="mt-4">
              <strong>Email:</strong> <a href="mailto:legal@shrp.app" className={`underline ${
                isDarkMode ? 'text-violet-300 hover:text-violet-200' : 'text-violet-600 hover:text-violet-700'
              }`}>legal@shrp.app</a><br />
              <strong>GitHub:</strong> <a href="https://github.com/digitalwareshub/sharpnotes" target="_blank" rel="noopener noreferrer" className={`underline ${
                isDarkMode ? 'text-violet-300 hover:text-violet-200' : 'text-violet-600 hover:text-violet-700'
              }`}>github.com/digitalwareshub/sharpnotes</a>
            </p>
          </section>

          <section className="mb-8 p-6 rounded-xl border-2" style={{
            borderColor: isDarkMode ? 'rgb(139, 92, 246, 0.3)' : 'rgb(139, 92, 246, 0.2)',
            backgroundColor: isDarkMode ? 'rgb(139, 92, 246, 0.1)' : 'rgb(139, 92, 246, 0.05)'
          }}>
            <p className="text-lg font-semibold mb-2">
              📜 In Simple Terms
            </p>
            <p>
              Use SHRP Notes however you want. It&apos;s free, open source, and privacy-focused. We&apos;re not responsible if something goes wrong (it&apos;s a free tool). Your notes stay on your device—back them up yourself. Don&apos;t be malicious. That&apos;s pretty much it.
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
