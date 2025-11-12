import { NextResponse } from 'next/server';
import { getBlogPost } from '../../../../lib/blog';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await getBlogPost(params.slug);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
}
