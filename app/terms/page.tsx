'use client';

import Link from 'next/link';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';

export default function TermsPage() {


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
              Terms of Service
            </li>
          </ol>
        </nav>

        {/* Content */}
        <article className={`prose prose-lg $'' max-w-none`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Terms of Service
          </h1>
          
          <p className={`text-lg mb-8 $'text-slate-600'`}>
            Last updated: November 12, 2025
          </p>

          <div className={`space-y-8 $'text-slate-700'`}>
            <section>
              <h2 className={`text-2xl font-bold mb-4 $'text-orange-600'`}>
                1. Agreement to Terms
              </h2>
              <p>
                By accessing and using SHRP Notes (&quot;the Service&quot;), you agree to be bound by these Terms of Service. 
                If you disagree with any part of these terms, you may not access the Service.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 $'text-orange-600'`}>
                2. Use License
              </h2>
              <p className="mb-4">
                SHRP Notes is open-source software licensed under the MIT License. You are granted permission to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Service for personal or commercial purposes</li>
                <li>Modify and distribute the source code</li>
                <li>Create derivative works</li>
              </ul>
              <p className="mt-4">
                See our <a href="https://github.com/digitalwareshub/sharpnotes/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">MIT License</a> for full details.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 $'text-orange-600'`}>
                3. Acceptable Use
              </h2>
              <p className="mb-4">You agree NOT to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Service for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Use the Service to transmit malicious code</li>
                <li>Impersonate or misrepresent your affiliation with any person or entity</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 $'text-orange-600'`}>
                4. Disclaimer of Warranties
              </h2>
              <p className="mb-4">
                THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND. We make no warranties, expressed or implied, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Merchantability</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement</li>
                <li>Uninterrupted or error-free operation</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 $'text-orange-600'`}>
                5. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, Digiwares shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred 
                directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your use or inability to use the Service</li>
                <li>Any unauthorized access to or use of our servers</li>
                <li>Any interruption or cessation of transmission to or from the Service</li>
                <li>Any bugs, viruses, or the like that may be transmitted through the Service</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 $'text-orange-600'`}>
                6. Privacy and Data Responsibility
              </h2>
              <p className="mb-4">
                SHRP Notes operates on a local-first architecture. This means:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your data stays on your device</li>
                <li>You are responsible for backing up your notes</li>
                <li>We cannot recover lost data</li>
                <li>See our <Link href="/privacy" className="text-orange-400 hover:underline">Privacy Policy</Link> for details</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 $'text-orange-600'`}>
                7. Professional Use
              </h2>
              <p>
                While SHRP Notes can be used for professional purposes (medical, legal, etc.), users are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ensuring compliance with industry regulations (HIPAA, etc.)</li>
                <li>Implementing appropriate security measures on their devices</li>
                <li>Maintaining proper backup procedures</li>
                <li>Validating the accuracy of AI-generated transformations</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 $'text-orange-600'`}>
                8. Modifications to Service
              </h2>
              <p>
                We reserve the right to modify or discontinue the Service at any time without notice. 
                We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the Service.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 $'text-orange-600'`}>
                9. Governing Law
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction 
                in which Digiwares operates, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 $'text-orange-600'`}>
                10. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of material changes 
                by updating the &quot;Last updated&quot; date. Your continued use of the Service after such modifications 
                constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 $'text-orange-600'`}>
                11. Contact Information
              </h2>
              <p>
                Questions about these Terms of Service? Contact us:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email: <a href="mailto:hello@digiwares.xyz" className="text-orange-400 hover:underline">hello@digiwares.xyz</a></li>
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
