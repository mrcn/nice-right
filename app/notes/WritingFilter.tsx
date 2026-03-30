'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ArticleMeta } from '@/app/lib/articles';

const ALL_TYPES = ['Guide', 'Thinking', 'Perspective', 'Story'] as const;

export default function WritingFilter({ articles }: { articles: ArticleMeta[] }) {
  const [active, setActive] = useState<string | null>(null);

  const filtered = active ? articles.filter((a) => a.type.includes(active)) : articles;

  return (
    <>
      <div className="wr-filters">
        <button
          className={`wr-filter-btn${active === null ? ' wr-filter-btn--active' : ''}`}
          onClick={() => setActive(null)}
        >
          All
        </button>
        {ALL_TYPES.map((t) => (
          <button
            key={t}
            className={`wr-filter-btn${active === t ? ' wr-filter-btn--active' : ''}`}
            onClick={() => setActive(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="wr-grid">
        {filtered.map((article) => (
          <article key={article.slug} className="wr-card">
            <Link href={`/notes/${article.slug}`} className="wr-card-link">
              <div className="wr-card-meta">
                <span className="wr-type">{article.type.join(' · ')}</span>
                {article.lastUpdated && (
                  <span className="wr-date">{article.lastUpdated}</span>
                )}
              </div>
              <h2 className="wr-card-title">{article.title}</h2>
              <p className="wr-card-desc">{article.description}</p>
              <span className="wr-read-more">Read →</span>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
