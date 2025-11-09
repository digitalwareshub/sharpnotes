import type { MetadataRoute } from 'next';
import { getAllBlogPosts } from '../lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://shrp.app';
  const currentDate = new Date();

  // Get all blog posts
  const blogPosts = getAllBlogPosts();

  // Create sitemap entries for blog posts
  const blogPostEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPostEntries,
  ];
}
