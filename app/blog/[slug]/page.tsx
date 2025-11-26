'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Script from 'next/script';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
  content: string;
}

interface RelatedPost {
  slug: string;
  title: string;
  description: string;
}

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  // Initialize from localStorage immediately to prevent flash
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (!savedTheme && false);
    }
    return false;
  });
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
    document.documentElement.style.colorScheme = newTheme ? 'dark' : 'light';
  };

  // Load blog post
  useEffect(() => {
    async function loadPost() {
      try {
        const response = await fetch(`/api/blog/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to load post');
        }
        const data = await response.json();
        setBlogPost(data);
        
        // Load all posts for related posts
        const allPostsResponse = await fetch('/api/blog');
        const allPosts = await allPostsResponse.json();
        const related = allPosts
          .filter((p: BlogPost) => p.slug !== slug)
          .slice(0, 2);
        setRelatedPosts(related);
      } catch (error) {
        console.error('Failed to load blog post:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-orange-900' 
          : 'bg-gradient-to-br from-orange-50 via-white to-blue-50'
      }`}>
        <div className="text-orange-400 text-lg">Loading...</div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-orange-900' 
          : 'bg-gradient-to-br from-orange-50 via-white to-blue-50'
      }`}>
        <div className="text-center">
          <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-slate-50' : 'text-gray-900'}`}>
            Post not found
          </h1>
          <Link href="/blog" className="text-orange-400 hover:text-orange-400">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-orange-900' 
        : 'bg-gradient-to-br from-orange-50 via-white to-blue-50'
    }`}>
      {/* Breadcrumb Schema */}
      {blogPost && (
        <Script id="breadcrumb-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://shrp.app"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://shrp.app/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": blogPost.title,
                "item": `https://shrp.app/blog/${slug}`
              }
            ]
          })}
        </Script>
      )}
      
      {/* Header */}
      <header className={`border-b backdrop-blur-sm sticky top-0 z-10 ${
        isDarkMode 
          ? 'border-slate-800/50 bg-slate-900/50' 
          : 'border-orange-200/50 bg-white/50'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
              <Link 
                href="/"
                className={`hover:text-orange-400 transition-colors ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Home
              </Link>
              <span className={isDarkMode ? 'text-gray-600' : 'text-gray-400'}>/</span>
              <Link 
                href="/blog"
                className={`hover:text-orange-400 transition-colors ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Blog
              </Link>
              <span className={isDarkMode ? 'text-gray-600' : 'text-gray-400'}>/</span>
              <span className={`${isDarkMode ? 'text-slate-300' : 'text-gray-900'}`}>
                {blogPost?.title.substring(0, 30)}{blogPost?.title && blogPost.title.length > 30 ? '...' : ''}
              </span>
            </nav>
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`rounded-full border p-2 shadow-lg backdrop-blur-sm transition-colors ${
                  isDarkMode
                    ? 'border-orange-400/60 bg-orange-500/30 text-orange-50 shadow-orange-900/40 hover:bg-orange-500/40'
                    : 'border-orange-400/60 bg-white/70 text-orange-900 shadow-orange-400/40 hover:bg-white/90'
                }`}
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                aria-label="Toggle theme"
              >
                {/* Bulb Icon - On (lit) for Light Mode, Off (unlit) for Dark Mode */}
                <svg 
                  className="w-5 h-5" 
                  fill={isDarkMode ? "none" : "currentColor"} 
                  stroke="currentColor" 
                  strokeWidth={isDarkMode ? "2" : "1.5"}
                  viewBox="0 0 24 24"
                >
                  {/* Bulb shape */}
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    opacity={isDarkMode ? "0.4" : "1"}
                  />
                  {/* Bulb base */}
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M9 17v1a2 2 0 002 2h2a2 2 0 002-2v-1"
                  />
                </svg>
              </button>
              <Link 
                href="/webapp"
                className={`transition-colors text-sm ${
                  isDarkMode ? 'text-gray-400 hover:text-slate-300' : 'text-gray-600 hover:text-slate-800'
                }`}
              >
                Try SHRP Notes
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-6 text-sm">
          <time className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{formatDate(blogPost.date)}</time>
          <span className={isDarkMode ? 'text-slate-700' : 'text-gray-400'}>•</span>
          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{blogPost.readTime}</span>
          <span className={isDarkMode ? 'text-slate-700' : 'text-gray-400'}>•</span>
          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>By {blogPost.author}</span>
        </div>

        {/* Title */}
        <h1 className={`text-4xl sm:text-5xl font-bold mb-6 leading-tight ${
          isDarkMode ? 'text-slate-50' : 'text-gray-900'
        }`}>
          {blogPost.title}
        </h1>

        {/* Description */}
        <p className={`text-xl mb-8 leading-relaxed ${
          isDarkMode ? 'text-slate-300' : 'text-slate-700'
        }`}>
          {blogPost.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {blogPost.tags.map((tag: string) => (
            <span 
              key={tag}
              className={`px-3 py-1 text-xs rounded-full border ${
                isDarkMode 
                  ? 'bg-slate-800/50 text-gray-400 border-slate-700/50' 
                  : 'bg-orange-100/50 text-orange-600 border-orange-200/50'
              }`}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div 
          className={`prose prose-lg max-w-none ${
            isDarkMode 
              ? `prose-invert
                prose-headings:text-slate-50 prose-headings:font-semibold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-slate-800 prose-h2:pb-3
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-orange-400 prose-a:no-underline hover:prose-a:text-orange-400 hover:prose-a:underline
                prose-strong:text-slate-200 prose-strong:font-semibold
                prose-code:text-orange-400 prose-code:bg-slate-900 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']
                prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800
                prose-ul:text-slate-300 prose-ul:my-6
                prose-ol:text-slate-300 prose-ol:my-6
                prose-li:my-2
                prose-blockquote:border-l-orange-500 prose-blockquote:text-gray-400 prose-blockquote:italic
                prose-img:rounded-xl prose-img:shadow-lg
                prose-hr:border-slate-800 prose-hr:my-12
                prose-table:text-slate-300`
              : `prose-headings:text-gray-900 prose-headings:font-semibold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-orange-200 prose-h2:pb-3
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-orange-600 prose-a:no-underline hover:prose-a:text-orange-500 hover:prose-a:underline
                prose-strong:text-slate-800 prose-strong:font-semibold
                prose-code:text-orange-600 prose-code:bg-orange-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']
                prose-pre:bg-slate-100 prose-pre:border prose-pre:border-orange-200
                prose-ul:text-slate-700 prose-ul:my-6
                prose-ol:text-slate-700 prose-ol:my-6
                prose-li:my-2
                prose-blockquote:border-l-orange-500 prose-blockquote:text-gray-600 prose-blockquote:italic
                prose-img:rounded-xl prose-img:shadow-lg
                prose-hr:border-orange-200 prose-hr:my-12
                prose-table:text-slate-700`
          }`}
          dangerouslySetInnerHTML={{ __html: blogPost.content || '' }}
        />

        {/* CTA Box */}
        <div className={`border rounded-xl p-6 my-12 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-orange-900/30 to-blue-900/30 border-orange-500/30' 
            : 'bg-gradient-to-r from-orange-100/50 to-blue-100/50 border-orange-400/30'
        }`}>
          <h3 className={`text-xl font-semibold mb-3 ${
            isDarkMode ? 'text-slate-50' : 'text-gray-900'
          }`}>
            Ready to organize your notes?
          </h3>
          <p className={`mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            Try SHRP Notes free - no signup required. Transform messy meeting notes in seconds.
          </p>
          <Link 
            href="/webapp"
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition-colors font-medium"
          >
            Try SHRP Notes Free →
          </Link>
        </div>

        {/* Share */}
        <div className={`mt-12 pt-8 border-t ${
          isDarkMode ? 'border-slate-800/50' : 'border-orange-200/50'
        }`}>
          <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Share this article:</p>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blogPost.title)}&url=${encodeURIComponent(`https://shrp.app/blog/${slug}`)}&via=digi_wares`}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                isDarkMode 
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
                  : 'bg-orange-100 text-slate-700 hover:bg-orange-200'
              }`}
            >
              Share on Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://shrp.app/blog/${slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                isDarkMode 
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
                  : 'bg-orange-100 text-slate-700 hover:bg-orange-200'
              }`}
            >
              Share on LinkedIn
            </a>
          </div>
        </div>

        {/* Author Bio */}
        <div className={`mt-12 p-6 border rounded-xl ${
          isDarkMode 
            ? 'bg-slate-900/50 border-slate-800/50' 
            : 'bg-white/50 border-orange-200/50'
        }`}>
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-full flex-shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/kam.JPG" 
                alt={blogPost.author}
                className="w-full h-full object-cover pointer-events-none select-none"
                draggable="false"
              />
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-1 ${
                isDarkMode ? 'text-slate-50' : 'text-gray-900'
              }`}>
                {blogPost.author}
              </h3>
              <p className={`text-sm mb-3 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Founder of Digiwares, creator of SHRP Notes. Building privacy-first productivity tools.
              </p>
              <a 
                href="https://twitter.com/digi_wares"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-400 text-sm"
              >
                Follow @digi_wares →
              </a>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className={`text-2xl font-semibold mb-6 ${
              isDarkMode ? 'text-slate-50' : 'text-gray-900'
            }`}>
              Related Articles
            </h3>
            <div className="grid gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className={`p-6 border rounded-xl transition-colors group ${
                    isDarkMode 
                      ? 'bg-slate-900/50 border-slate-800/50 hover:border-orange-500/50' 
                      : 'bg-white/50 border-orange-200/50 hover:border-orange-400/50'
                  }`}
                >
                  <h4 className={`text-lg font-semibold mb-2 ${
                    isDarkMode 
                      ? 'text-slate-50 group-hover:text-orange-400' 
                      : 'text-gray-900 group-hover:text-orange-600'
                  }`}>
                    {relatedPost.title} →
                  </h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {relatedPost.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Footer */}
      <footer className={`border-t mt-16 ${
        isDarkMode ? 'border-slate-800/50' : 'border-orange-200/50'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center text-sm">
            <p className={`mb-2 ${isDarkMode ? 'text-slate-500' : 'text-gray-600'}`}>
              Made with ❤️ by{' '}
              <a 
                href="https://digiwares.xyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-400 hover:underline"
              >
                Digiwares
              </a>
            </p>
            <div className={`flex items-center justify-center gap-4 text-xs ${
              isDarkMode ? 'text-slate-500' : 'text-gray-600'
            }`}>
              <Link href="/" className="hover:text-orange-400 transition-colors">
                Home
              </Link>
              <span>•</span>
              <Link href="/blog" className="hover:text-orange-400 transition-colors">
                Blog
              </Link>
              <span>•</span>
              <a 
                href="https://twitter.com/digi_wares" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
