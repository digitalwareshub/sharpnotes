import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost, getAllBlogPosts } from '../../../lib/blog';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: `${post.title} | SHRP Notes Blog`,
    description: post.description,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      creator: '@digi_wares',
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get related posts
  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== params.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-violet-900">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link 
              href="/blog"
              className="text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-2 text-sm"
            >
              <span>←</span>
              <span>All Posts</span>
            </Link>
            <Link 
              href="/"
              className="text-slate-400 hover:text-slate-300 transition-colors text-sm"
            >
              Try SHRP Notes
            </Link>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-6 text-sm">
          <time className="text-slate-400">{formatDate(post.date)}</time>
          <span className="text-slate-700">•</span>
          <span className="text-slate-400">{post.readTime}</span>
          <span className="text-slate-700">•</span>
          <span className="text-slate-400">By {post.author}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-50 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Description */}
        <p className="text-xl text-slate-300 mb-8 leading-relaxed">
          {post.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {post.tags.map((tag: string) => (
            <span 
              key={tag}
              className="px-3 py-1 text-xs rounded-full bg-slate-800/50 text-slate-400 border border-slate-700/50"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div 
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-slate-50 prose-headings:font-semibold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-slate-800 prose-h2:pb-3
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-violet-400 prose-a:no-underline hover:prose-a:text-violet-300 hover:prose-a:underline
            prose-strong:text-slate-200 prose-strong:font-semibold
            prose-code:text-violet-300 prose-code:bg-slate-900 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']
            prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800
            prose-ul:text-slate-300 prose-ul:my-6
            prose-ol:text-slate-300 prose-ol:my-6
            prose-li:my-2
            prose-blockquote:border-l-violet-500 prose-blockquote:text-slate-400 prose-blockquote:italic
            prose-img:rounded-xl prose-img:shadow-lg
            prose-hr:border-slate-800 prose-hr:my-12
            prose-table:text-slate-300"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />

        {/* CTA Box */}
        <div className="bg-gradient-to-r from-violet-900/30 to-blue-900/30 border border-violet-500/30 rounded-xl p-6 my-12">
          <h3 className="text-xl font-semibold text-slate-50 mb-3">
            Ready to organize your notes?
          </h3>
          <p className="text-slate-300 mb-4">
            Try SHRP Notes free - no signup required. Transform messy meeting notes in seconds.
          </p>
          <Link 
            href="/"
            className="inline-block px-6 py-3 bg-violet-500 text-white rounded-lg hover:bg-violet-400 transition-colors font-medium"
          >
            Try SHRP Notes Free →
          </Link>
        </div>

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-slate-800/50">
          <p className="text-slate-400 mb-4">Share this article:</p>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://shrp.app/blog/${params.slug}`)}&via=digi_wares`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-sm"
            >
              Share on Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://shrp.app/blog/${params.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-sm"
            >
              Share on LinkedIn
            </a>
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-12 p-6 bg-slate-900/50 border border-slate-800/50 rounded-xl">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">👨‍💻</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-50 mb-1">
                {post.author}
              </h3>
              <p className="text-slate-400 text-sm mb-3">
                Founder of Digiwares, creator of SHRP Notes. Building privacy-first productivity tools.
              </p>
              <a 
                href="https://twitter.com/digi_wares"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 text-sm"
              >
                Follow @digi_wares →
              </a>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-slate-50 mb-6">
              Related Articles
            </h3>
            <div className="grid gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="p-6 bg-slate-900/50 border border-slate-800/50 rounded-xl hover:border-violet-500/50 transition-colors group"
                >
                  <h4 className="text-lg font-semibold text-slate-50 mb-2 group-hover:text-violet-300">
                    {relatedPost.title} →
                  </h4>
                  <p className="text-slate-400 text-sm">
                    {relatedPost.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center text-slate-500 text-sm">
            <p className="mb-2">
              Made with ❤️ by{' '}
              <a 
                href="https://digiwares.xyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-violet-400 hover:underline"
              >
                Digiwares
              </a>
            </p>
            <div className="flex items-center justify-center gap-4 text-xs">
              <Link href="/" className="hover:text-violet-400 transition-colors">
                Home
              </Link>
              <span>•</span>
              <Link href="/blog" className="hover:text-violet-400 transition-colors">
                Blog
              </Link>
              <span>•</span>
              <a 
                href="https://twitter.com/digi_wares" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-violet-400 transition-colors"
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