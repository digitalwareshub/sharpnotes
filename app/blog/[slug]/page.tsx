'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Script from 'next/script';
import Footer from '@/components/ui/Footer';

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
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);


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
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-orange-400 text-lg">Loading...</div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-center">
          <h1 className={`text-2xl font-bold mb-4 $'text-gray-900'`}>
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
    <div className="min-h-screen ">
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
      <header className="border-b backdrop-blur-sm sticky top-0 z-10 ">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
              <Link 
                href="/"
                className="hover:text-orange-400 transition-colors text-gray-600"
              >
                Home
              </Link>
              <span className='text-gray-400'>/</span>
              <Link 
                href="/blog"
                className="hover:text-orange-400 transition-colors text-gray-600"
              >
                Blog
              </Link>
              <span className='text-gray-400'>/</span>
              <span className={`$'text-gray-900'`}>
                {blogPost?.title.substring(0, 30)}{blogPost?.title && blogPost.title.length > 30 ? '...' : ''}
              </span>
            </nav>
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
                className="transition-colors text-sm text-gray-600 hover:text-slate-800"
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
          <time className='text-gray-600'>{formatDate(blogPost.date)}</time>
          <span className='text-gray-400'>•</span>
          <span className='text-gray-600'>{blogPost.readTime}</span>
          <span className='text-gray-400'>•</span>
          <span className='text-gray-600'>By {blogPost.author}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight text-gray-900">
          {blogPost.title}
        </h1>

        {/* Description */}
        <p className="text-xl mb-8 leading-relaxed text-slate-700">
          {blogPost.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {blogPost.tags.map((tag: string) => (
            <span 
              key={tag}
              className="px-3 py-1 text-xs rounded-full border "
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none "
          dangerouslySetInnerHTML={{ __html: blogPost.content || '' }}
        />

        {/* CTA Box */}
        <div className="border rounded-xl p-6 my-12 ">
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            Ready to organize your notes?
          </h3>
          <p className={`mb-4 $'text-slate-700'`}>
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
        <div className="mt-12 pt-8 border-t border-orange-200/50">
          <p className={`mb-4 $'text-gray-600'`}>Share this article:</p>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blogPost.title)}&url=${encodeURIComponent(`https://shrp.app/blog/${slug}`)}&via=digi_wares`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg transition-colors text-sm "
            >
              Share on Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://shrp.app/blog/${slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg transition-colors text-sm "
            >
              Share on LinkedIn
            </a>
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-12 p-6 border rounded-xl ">
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
              <h3 className="text-lg font-semibold mb-1 text-gray-900">
                {blogPost.author}
              </h3>
              <p className="text-sm mb-3 text-gray-600">
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
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">
              Related Articles
            </h3>
            <div className="grid gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="p-6 border rounded-xl transition-colors group "
                >
                  <h4 className="text-lg font-semibold mb-2 ">
                    {relatedPost.title} →
                  </h4>
                  <p className="text-sm text-gray-600">
                    {relatedPost.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Footer */}
      <Footer />
    </div>
  );
}
