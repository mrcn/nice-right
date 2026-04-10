'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const LABELS: Record<string, string> = {
  work: 'Work',
  'healthcare-real-estate': 'Healthcare Real Estate',
  'northern-trust': 'Northern Trust',
  'green-goods': 'Green Goods',
};

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length < 2) return null;

  return (
    <nav className="v9-breadcrumb" aria-label="Breadcrumb">
      <ol className="v9-breadcrumb-list">
        <li className="v9-breadcrumb-item">
          <Link href="/">Home</Link>
        </li>
        {segments.map((segment, i) => {
          const href = '/' + segments.slice(0, i + 1).join('/');
          const label = LABELS[segment] ?? segment;
          const isLast = i === segments.length - 1;

          return (
            <li key={href} className="v9-breadcrumb-item">
              <span className="v9-breadcrumb-sep" aria-hidden="true">/</span>
              {isLast ? (
                <span aria-current="page">{label}</span>
              ) : (
                <Link href={href}>{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
