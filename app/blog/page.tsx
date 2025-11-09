import Link from 'next/link';
import { Metadata } from 'next';
import { getAllBlogPosts } from '../../lib/blog';

export const metadata: Metadata = {
  title: 'Blog | SHRP Notes - Productivity & Note-Taking Tips',
  description: 'Learn proven systems for organizing meeting notes, productivity hacks, and privacy-first note-taking strategies.',
  keywords: 'productivity, note-taking, meeting notes, organization, time management',
  openGraph: {
    title: 'SHRP Notes Blog',
    description: 'Productivity tips and note-taking strategies',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SHRP Notes Blog',
    description: 'Productivity tips and note-taking strategies',
    creator: '@digi_wares',
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-violet-900">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <span>←</span>
              <span>SHRP Notes</span>
            </Link>
            <Link 
              href="/"
              className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-400 transition-colors text-sm font-medium"
            >
              Try SHRP Notes
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-slate-50 mb-6">
          SHRP Notes Blog
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Proven strategies for organizing meeting notes, boosting productivity, and building privacy-first workflows.
        </p>
        
        {/* Categories/Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          <span className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-full text-sm border border-slate-700/50">
            📝 Note-Taking
          </span>
          <span className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-full text-sm border border-slate-700/50">
            ⚡ Productivity
          </span>
          <span className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-full text-sm border border-slate-700/50">
            🔒 Privacy
          </span>
          <span className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-full text-sm border border-slate-700/50">
            🚀 Tutorials
          </span>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="h-full p-6 bg-slate-900/50 border border-slate-800/50 rounded-2xl hover:border-violet-500/50 hover:bg-slate-900/70 transition-all duration-300">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/30"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-slate-50 mb-3 group-hover:text-violet-300 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                    {post.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-auto pt-4 border-t border-slate-800/50">
                    <time>{formatDate(post.date)}</time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Read More Arrow */}
                  <div className="mt-4 flex items-center text-violet-400 text-sm font-medium group-hover:gap-2 transition-all">
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
        <div className="bg-gradient-to-r from-violet-900/30 to-blue-900/30 border border-violet-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-50 mb-3">
            Ready to transform your notes?
          </h2>
          <p className="text-slate-300 mb-6 max-w-lg mx-auto">
            Try SHRP Notes free - no signup required. Transform messy meeting notes into organized, actionable summaries in seconds.
          </p>
          <Link 
            href="/"
            className="inline-block px-8 py-3 bg-violet-500 text-white rounded-lg hover:bg-violet-400 transition-colors font-medium text-lg"
          >
            Try SHRP Notes Free →
          </Link>
          <p className="text-slate-500 text-sm mt-4">
            100% private • No account needed • Unlimited usage
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
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
                href="https://github.com/digitalwareshub/sharpnotes" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-violet-400 transition-colors"
              >
                GitHub
              </a>
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