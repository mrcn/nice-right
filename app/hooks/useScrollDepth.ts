'use client';

import { useEffect, useRef } from 'react';
import { trackScrollDepth } from '@/app/lib/analytics';

const MILESTONES = [25, 50, 75, 100] as const;

export function useScrollDepth() {
  const fired = useRef(new Set<number>());

  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const scrolled = el.scrollTop + window.innerHeight;
      const total = el.scrollHeight;
      const pct = Math.round((scrolled / total) * 100);

      for (const milestone of MILESTONES) {
        if (pct >= milestone && !fired.current.has(milestone)) {
          fired.current.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}
