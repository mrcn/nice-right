import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDir = path.join(process.cwd(), 'content/articles');

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  lastUpdated: string;
  type: string[];
}

export interface Article extends ArticleMeta {
  content: string;
}

function parseArticleMonth(value: string): number {
  const parsed = Date.parse(`1 ${value}`);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function getAllArticles(): ArticleMeta[] {
  const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith('.md'));
  return files
    .map((file) => {
      const slug = file.replace('.md', '');
      const raw = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
      const { data } = matter(raw);
      return {
        slug,
        title: (data.title as string) ?? slug,
        description: (data.description as string) ?? '',
        lastUpdated: (data.lastUpdated as string) ?? '',
        type: (data.type as string[]) ?? [],
      };
    })
    .sort((a, b) => {
      const byDate = parseArticleMonth(b.lastUpdated) - parseArticleMonth(a.lastUpdated);
      return byDate || a.title.localeCompare(b.title);
    });
}

export function getArticle(slug: string): Article | null {
  const filePath = path.join(articlesDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? '',
    lastUpdated: (data.lastUpdated as string) ?? '',
    type: (data.type as string[]) ?? [],
    content,
  };
}
