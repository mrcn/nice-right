import { Metadata } from 'next';
import Link from 'next/link';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
} from '@/app/_shared/schema';
import { buildSeoMetadata } from '@/app/_shared/seo';
import { getAllArticles, getArticle } from '@/app/lib/articles';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle(params.slug);
  if (!article) return { title: 'Not Found | Nice Right' };
  return buildSeoMetadata({
    title: `${article.title} | Nice Right`,
    description: article.description,
    path: `/notes/${article.slug}/`,
    type: 'article',
  });
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle(params.slug);

  if (!article) {
    return (
      <main style={{ padding: '120px 24px', textAlign: 'center' }}>
        <p>Article not found.</p>
        <Link href="/notes">← Back to Notes</Link>
      </main>
    );
  }

  const htmlContent = await markdownToHtml(article.content);
  const articleSchema = buildArticleSchema({
    title: article.title,
    description: article.description,
    path: `/notes/${article.slug}/`,
    date: article.lastUpdated,
    keywords: article.type,
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Notes', path: '/notes/' },
    { name: article.title, path: `/notes/${article.slug}/` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav className="wr-nav">
        <div className="wr-nav-inner">
          <Link href="/" className="wr-nav-logo">
            Nice Right
          </Link>
          <div className="wr-nav-links">
            <Link href="/studies">Studies</Link>
            <Link href="/notes" className="wr-nav-back">
              ← Notes
            </Link>
            <a href="/#contact" className="wr-nav-cta">
              Book a Free Call
            </a>
          </div>
        </div>
      </nav>

      <main className="art-main">
        <div className="art-container">
          <div className="art-meta">
            <span className="art-type">{article.type.join(' · ')}</span>
            {article.lastUpdated && (
              <span className="art-date">
                Last updated: {article.lastUpdated}
              </span>
            )}
          </div>
          <div
            className="art-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </main>

      <footer className="wr-footer">
        <div className="art-container">
          <div className="art-footer-inner">
            <Link href="/notes" className="art-back-link">
              ← All notes
            </Link>
            <p>© 2026 Nice Right.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
