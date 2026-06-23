'use client';

import { useEffect } from 'react';
import { trackUnderstandEvent } from '@/app/lib/analytics';

export function UnderstandAnalytics() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>('[data-understand-event]');
      if (!el) return;
      trackUnderstandEvent(el.dataset.understandEvent || 'understand_click', {
        label: el.dataset.understandLabel || el.textContent?.trim().slice(0, 80),
        href: el instanceof HTMLAnchorElement ? el.href : undefined,
      });
    };

    const onPlay = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target?.matches('[data-understand-audio]')) return;
      trackUnderstandEvent('understand_audio_play', {
        label: target.getAttribute('data-understand-audio') || 'audio',
      });
    };

    document.addEventListener('click', onClick);
    document.addEventListener('play', onPlay, true);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('play', onPlay, true);
    };
  }, []);

  return null;
}
