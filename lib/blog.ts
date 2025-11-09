import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

const blogDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string;
  content?: string;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse markdown metadata and content
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm) // Add GitHub Flavored Markdown support (tables, strikethrough, task lists)
      .use(html, { sanitize: false }) // sanitize: false to allow HTML in markdown
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title,
      description: data.description,
      author: data.author,
      date: data.date,
      readTime: data.readTime,
      tags: data.tags || [],
      image: data.image,
      content: contentHtml,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export function getAllBlogPosts(): BlogPost[] {
  try {
    // Check if blog directory exists
    if (!fs.existsSync(blogDirectory)) {
      console.warn('Blog directory does not exist yet');
      return [];
    }

    const fileNames = fs.readdirSync(blogDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(blogDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
          slug,
          title: data.title,
          description: data.description,
          author: data.author,
          date: data.date,
          readTime: data.readTime,
          tags: data.tags || [],
          image: data.image,
        };
      });

    // Sort posts by date (newest first)
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } 
        return -1;
      
    });
  } catch (error) {
    console.error('Error getting all blog posts:', error);
    return [];
  }
}