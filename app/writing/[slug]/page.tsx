import { redirect } from 'next/navigation';
import { getAllArticles } from '@/app/lib/articles';

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export default function WritingSlugRedirect({
  params,
}: {
  params: { slug: string };
}) {
  redirect(`/notes/${params.slug}`);
}
