import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost, BlogPostMeta } from './types/blog';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export async function getBlogPosts(): Promise<BlogPostMeta[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        ...(data as Omit<BlogPostMeta, 'slug'>),
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      content: contentHtml,
      ...(data as Omit<BlogPostMeta, 'slug'>),
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
} 