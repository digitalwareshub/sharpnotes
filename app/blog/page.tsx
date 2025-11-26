'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/ui/Footer';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  // Load blog posts
  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="border-b sticky top-0 z-10 backdrop-blur-sm ">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="text-orange-400 hover:text-orange-400 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <span>←</span>
              <span>SHRP Notes</span>
            </Link>
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="rounded-full border p-2 shadow-lg backdrop-blur-sm transition-colors "
                title="Switch to Dark Mode"
                aria-label="Toggle theme"
              >
                {/* Bulb Icon - On (lit) for Light Mode, Off (unlit) for Dark Mode */}
                <svg 
                  className="w-5 h-5" 
                  fill="currentColor" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  {/* Bulb shape */}
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    opacity="1"
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
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition-colors text-sm font-medium"
              >
                Try SHRP Notes
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-gray-900">
          SHRP Notes Blog
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700">
          Proven strategies for organizing meeting notes, boosting productivity, and building privacy-first workflows.
        </p>
        
        {/* Categories/Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          <span className="px-4 py-2 rounded-full text-sm border ">
            📝 Note-Taking
          </span>
          <span className="px-4 py-2 rounded-full text-sm border ">
            ⚡ Productivity
          </span>
          <span className="px-4 py-2 rounded-full text-sm border ">
            🔒 Privacy
          </span>
          <span className="px-4 py-2 rounded-full text-sm border ">
            🚀 Tutorials
          </span>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="text-center py-16">
            <p className="text-orange-400 text-lg">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className={`text-lg $'text-gray-600'`}>
              No blog posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="h-full p-6 border rounded-2xl transition-all duration-300 ">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full border "
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold mb-3 group-hover:text-orange-400 transition-colors line-clamp-2 text-gray-900">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm mb-4 line-clamp-3 text-gray-600">
                    {post.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs mt-auto pt-4 border-t text-gray-500 border-orange-200/50">
                    <time>{formatDate(post.date)}</time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Read More Arrow */}
                  <div className="mt-4 flex items-center text-orange-400 text-sm font-medium group-hover:gap-2 transition-all">
                    <span>Read article</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="border rounded-2xl p-8 text-center ">
          <h2 className="text-2xl font-bold mb-3 text-gray-900">
            Ready to transform your notes?
          </h2>
          <p className="mb-6 max-w-lg mx-auto text-gray-700">
            Try SHRP Notes free - no signup required. Transform messy meeting notes into organized, actionable summaries in seconds.
          </p>
          <Link 
            href="/webapp"
            className="inline-block px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition-colors font-medium text-lg"
          >
            Try SHRP Notes Free →
          </Link>
          <p className="text-sm mt-4 text-gray-600">
            100% private • No account needed • Unlimited usage
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}