'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { captureUTMs } from '@/app/lib/analytics';

export function UTMCapture() {
  const searchParams = useSearchParams();
  useEffect(() => {
    captureUTMs();
  }, [searchParams]);
  return null;
}
