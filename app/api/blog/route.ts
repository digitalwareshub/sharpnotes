import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '../../../lib/blog';

export async function GET() {
  try {
    const posts = getAllBlogPosts();
    return NextResponse.json(posts);
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}
