'use client';

import Link from 'next/link';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';

export default function PrivacyPage() {


  return (
    <div className="min-h-screen transition-colors duration-200 ">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-slate-600">
            <li>
              <Link href="/" className="hover:underline hover:text-orange-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className='text-slate-900' aria-current="page">
              Privacy Policy
            </li>
          </ol>
        </nav>

        {/* Content */}
        <article className={`prose prose-lg $'' max-w-none`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Privacy Policy
          </h1>
          
          <p className={`text-lg mb-8 $'text-slate-600'`}>
            Last updated: November 12, 2025
          </p>

          <div className={`space-y-8 $'text-slate-700'`}>
            <section>
              <h2 className={`text-2xl font-bold mb-4 $'text-orange-600'`}>
                Core Promise: Your Data Stays Private
              </h2>
              <p className="mb-4">
                SHRP Notes is built on a fundamental principle: <strong>your notes never leave your device</strong>. 
                All note processing happens locally in your browser using client-side JavaScript. We don&apos;t have servers 
                collecting, storing, or analyzing your notes.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 $'text-orange-600'`}>
                What We Don&apos;t Collect
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your notes content</li>
                <li>Personal information</li>
                <li>Email addresses (unless you provide for support)</li>
                <li>Payment information (app is free)</li>
                <li>Behavioral tracking data</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 $'text-orange-600'`}>
                Local Storage
              </h2>
              <p className="mb-4">
                Your notes are stored exclusively in your browser&apos;s local storage. This means:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Data stays on your device</li>
                <li>We cannot access your notes</li>
                <li>Clearing browser data will delete your notes</li>
                <li>Notes don&apos;t sync across devices (by design for privacy)</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 $'text-orange-600'`}>
                Analytics
              </h2>
              <p className="mb-4">
                We use privacy-friendly analytics (Google Analytics and Vercel Analytics) to understand:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Page views and navigation patterns</li>
                <li>General usage statistics</li>
                <li>Performance metrics</li>
              </ul>
              <p className="mt-4">
                These tools do NOT track:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your note content</li>
                <li>Individual user identification</li>
                <li>Cross-site tracking</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 $'text-orange-600'`}>
                Third-Party Services
              </h2>
              <p className="mb-4">
                SHRP Notes uses these third-party services:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Vercel</strong>: Hosting platform (doesn&apos;t access user data)</li>
                <li><strong>Google Analytics</strong>: Anonymized usage statistics</li>
                <li><strong>Vercel Analytics</strong>: Performance monitoring</li>
              </ul>
              <p className="mt-4">
                None of these services have access to your note content.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 $'text-orange-600'`}>
                Cookies
              </h2>
              <p>
                We use minimal cookies only for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Theme preference (dark/light mode)</li>
                <li>Analytics (can be blocked with browser settings)</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 $'text-orange-600'`}>
                HIPAA and Professional Use
              </h2>
              <p className="mb-4">
                While SHRP Notes doesn&apos;t transmit data to external servers, we are not HIPAA certified as a service. 
                However, our local-first architecture means:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>No PHI (Protected Health Information) leaves your device</li>
                <li>Suitable for privacy-sensitive use cases</li>
                <li>Responsibility for data security rests with device security</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 $'text-orange-600'`}>
                Data Deletion
              </h2>
              <p>
                Since all data is stored locally on your device, you can delete it anytime by:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Clearing browser data/cache</li>
                <li>Using the &quot;Clear All Notes&quot; function in the app</li>
                <li>Uninstalling/reinstalling the browser</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 $'text-orange-600'`}>
                Changes to This Policy
              </h2>
              <p>
                We may update this privacy policy from time to time. We will notify users of any material changes 
                by updating the &quot;Last updated&quot; date at the top of this policy.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 $'text-orange-600'`}>
                Contact Us
              </h2>
              <p>
                If you have questions about this privacy policy, please contact us:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email: <a href="mailto:write@digiwares.xyz" className="text-orange-400 hover:underline">write@digiwares.xyz</a></li>
                <li>Twitter: <a href="https://twitter.com/digi_wares" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">@digi_wares</a></li>
                <li>GitHub: <a href="https://github.com/digitalwareshub/sharpnotes/issues" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">GitHub Issues</a></li>
              </ul>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
