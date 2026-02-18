'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CascadeGridProps {
  children: React.ReactNode;
  className?: string;
  staggerEach?: number;
  revealDistance?: number;
  animateAccentBars?: boolean;
}

export function CascadeGrid({
  children,
  className,
  staggerEach = 0.12,
  revealDistance = 32,
  animateAccentBars = false,
}: CascadeGridProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      Array.from(ref.current.children).forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      const items = ref.current!.children;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 82%',
          once: true,
        },
      });

      // Cards reveal
      tl.fromTo(
        items,
        { opacity: 0, y: revealDistance, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: 'power3.out',
          stagger: { each: staggerEach },
        }
      );

      // Accent bars draw after cards land
      if (animateAccentBars) {
        const bars = ref.current!.querySelectorAll('.v2-service-accent-bar');
        if (bars.length > 0) {
          tl.fromTo(
            bars,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              duration: 0.5,
              ease: 'power2.inOut',
              stagger: { each: staggerEach },
            },
            '-=0.3'
          );
        }
      }
    }, ref);

    return () => ctx.revert();
  }, [staggerEach, revealDistance, animateAccentBars]);

  return (
    <div
      ref={ref}
      className={`${className || ''} v2-cascade-grid`}
      style={{ opacity: 1 }}
    >
      {children}
    </div>
  );
}
