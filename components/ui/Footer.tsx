'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative border-t mt-20 border-orange-200/50 bg-orange-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4 text-orange-600">Product</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/webapp" className="hover:text-orange-400 transition-colors">Web App</Link></li>
              <li><a href="/#features" className="hover:text-orange-400 transition-colors">Features</a></li>
              <li><a href="/#how-it-works" className="hover:text-orange-400 transition-colors">How It Works</a></li>
              <li><a href="/#use-cases" className="hover:text-orange-400 transition-colors">Use Cases</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-orange-600">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/blog" className="hover:text-orange-400 transition-colors">Blog</Link></li>
              <li><a href="https://digiwares.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">About Digiwares</a></li>
              <li><a href="https://twitter.com/digi_wares" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Twitter</a></li>
              <li><a href="https://github.com/digitalwareshub/sharpnotes" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">GitHub</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-orange-600">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/#faq" className="hover:text-orange-400 transition-colors">FAQ</a></li>
              <li><Link href="/blog/how-to-organize-meeting-notes" className="hover:text-orange-400 transition-colors">Meeting Notes Guide</Link></li>
              <li><Link href="/blog/privacy-cost-of-cloud-note-apps" className="hover:text-orange-400 transition-colors">Privacy Guide</Link></li>
              <li><Link href="/blog/shrp-vs-notion-vs-obsidian" className="hover:text-orange-400 transition-colors">Comparison</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-orange-600">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-orange-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/report" className="hover:text-orange-400 transition-colors">Report Bug/Feature</Link></li>
              <li><a href="https://github.com/digitalwareshub/sharpnotes/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Open Source (MIT)</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t text-center text-sm border-orange-200/50 text-gray-600">
          <p className="mb-2">
            Made with ❤️ for Productivity Geeks by{' '}
            <a
              href="https://digiwares.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:underline"
            >
              Digiwares
            </a>
          </p>
          <p className="text-xs">
            © 2025 SHRP Notes. All rights reserved. • Local NLP Processing • 100% Privacy Guaranteed
          </p>
        </div>
      </div>
    </footer>
  );
}
