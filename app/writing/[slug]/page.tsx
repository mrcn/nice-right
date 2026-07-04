import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { buildSeoMetadata } from '@/app/_shared/seo';
import { getAllArticles, getArticle } from '@/app/lib/articles';

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticle(params.slug);
  return buildSeoMetadata({
    title: article ? `${article.title} | Nice Right` : 'Notes | Nice Right',
    description: article?.description ?? 'Legacy writing article alias for Nice Right notes.',
    path: `/notes/${params.slug}/`,
    type: 'article',
    robots: { index: false, follow: false },
  });
}

export default function WritingSlugRedirect({
  params,
}: {
  params: { slug: string };
}) {
  redirect(`/notes/${params.slug}`);
}
