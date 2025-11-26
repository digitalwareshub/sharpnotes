'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <nav className="relative border-b backdrop-blur-sm sticky top-0 z-50 border-gray-200/50 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            SHRP
          </Link>

          {/* Centered Navigation Links - visible on all screen sizes */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm absolute left-1/2 transform -translate-x-1/2 text-gray-900">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <a href="/#how-it-works" className="hover:text-orange-600 whitespace-nowrap">How It Works</a>
            <Link href="/blog" className="hover:text-orange-600">Blog</Link>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            {/* Launch App Button */}
            <Link
              href="/webapp"
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-all hover:scale-105 shadow-lg bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-orange-300/40"
            >
              Launch App
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
