'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const scrollProgress =
        documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="v81-scroll-progress"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        background: '#0000FF',
        zIndex: 1001,
        width: `${progress}%`,
        transition: 'width 0.1s ease-out',
      }}
      aria-hidden="true"
    />
  );
}
