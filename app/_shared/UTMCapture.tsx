'use client';

import { useEffect } from 'react';
import { captureUTMs } from '@/app/lib/analytics';

export function UTMCapture() {
  useEffect(() => {
    captureUTMs();
  }, []);
  return null;
}
