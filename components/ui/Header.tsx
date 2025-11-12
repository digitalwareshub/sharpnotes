'use client';

import Link from 'next/link';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function Header({ isDarkMode, toggleTheme }: HeaderProps) {
  return (
    <nav className={`relative border-b backdrop-blur-sm sticky top-0 z-50 ${
      isDarkMode 
        ? 'border-slate-800/50 bg-slate-900/50' 
        : 'border-violet-200/50 bg-white/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className={`text-xl font-bold bg-clip-text text-transparent ${
            isDarkMode 
              ? 'bg-gradient-to-r from-violet-200 to-fuchsia-200' 
              : 'bg-gradient-to-r from-violet-600 to-purple-600'
          }`}>
            SHRP Notes
          </Link>

          {/* Centered Navigation Links */}
          <div className={`hidden md:flex items-center gap-6 text-sm absolute left-1/2 transform -translate-x-1/2 ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            <a href="/#features" className={isDarkMode ? 'hover:text-violet-300' : 'hover:text-violet-600'}>Features</a>
            <a href="/#how-it-works" className={isDarkMode ? 'hover:text-violet-300' : 'hover:text-violet-600'}>How It Works</a>
            <a href="/#use-cases" className={isDarkMode ? 'hover:text-violet-300' : 'hover:text-violet-600'}>Use Cases</a>
            <Link href="/blog" className={isDarkMode ? 'hover:text-violet-300' : 'hover:text-violet-600'}>Blog</Link>
            <a href="/#faq" className={isDarkMode ? 'hover:text-violet-300' : 'hover:text-violet-600'}>FAQ</a>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`rounded-full border p-2 shadow-lg backdrop-blur-sm transition-colors ${
                isDarkMode
                  ? 'border-violet-300/60 bg-violet-500/30 text-violet-50 shadow-violet-900/40 hover:bg-violet-500/40'
                  : 'border-violet-400/60 bg-white/70 text-violet-900 shadow-violet-300/40 hover:bg-white/90'
              }`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
            >
              <svg 
                className="w-5 h-5" 
                fill={isDarkMode ? "none" : "currentColor"} 
                stroke="currentColor" 
                strokeWidth={isDarkMode ? "2" : "1.5"}
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  opacity={isDarkMode ? "0.4" : "1"}
                />
              </svg>
            </button>

            {/* Launch App Button */}
            <Link
              href="/webapp"
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all hover:scale-105 shadow-lg ${
                isDarkMode
                  ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-violet-900/40'
                  : 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-violet-300/40'
              }`}
            >
              Launch App
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
