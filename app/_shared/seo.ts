import type { Metadata } from 'next';

export const SITE_URL = 'https://niceright.co';
export const SITE_NAME = 'Nice Right';
export const DEFAULT_OG_IMAGE = '/og-image.png';

export function slashPath(path: string): string {
  if (!path || path === '/') return '/';
  const clean = path.startsWith('/') ? path : `/${path}`;
  return clean.endsWith('/') ? clean : `${clean}/`;
}

export function absoluteUrl(path: string): string {
  return new URL(slashPath(path), SITE_URL).toString();
}

interface SeoMetadataInput {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  robots?: Metadata['robots'];
}

export function buildSeoMetadata({
  title,
  description,
  path,
  type = 'website',
  image = DEFAULT_OG_IMAGE,
  robots,
}: SeoMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    ...(robots ? { robots } : {}),
  };
}
