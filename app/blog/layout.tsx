import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog – SHRP Notes',
  description: 'Tips, guides, and insights on effective note-taking, productivity, and privacy-focused tools.',
  alternates: {
    canonical: 'https://shrp.app/blog',
  },
  openGraph: {
    title: 'Blog – SHRP Notes',
    description: 'Tips, guides, and insights on effective note-taking, productivity, and privacy-focused tools.',
    url: 'https://shrp.app/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
