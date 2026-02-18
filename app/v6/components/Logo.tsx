'use client';

interface LogoProps {
  variant?: 'full' | 'compact' | 'horizontal';
  className?: string;
  showWordmark?: boolean;
}

export function Logo({
  variant = 'full',
  className = '',
  showWordmark = true,
}: LogoProps) {
  const isCompact = variant === 'compact' || !showWordmark;

  return (
    <svg
      viewBox={isCompact ? '0 0 40 40' : '0 0 180 40'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Nice Right"
    >
      <g transform={isCompact ? 'translate(0, 0)' : 'translate(0, 0)'}>
        <rect x="2" y="2" width="36" height="36" rx="4" fill="var(--v2-navy)" />
        <path d="M11 30V10h4l8 14V10h4v20h-4l-8-14v14h-4z" fill="#fafaf9" />
        <path
          d="M25 10h6c3.3 0 6 2.7 6 6s-2.7 6-6 6h-2v8h-4V10zm4 4v4h2c1.1 0 2-.9 2-2s-.9-2-2-2h-2z"
          fill="#fafaf9"
        />
        <path
          d="M27 22l3 3 6-6"
          stroke="var(--v2-amber)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {!isCompact && (
        <text
          x="48"
          y="26"
          fill="var(--v2-navy)"
          fontFamily="Instrument Serif, Georgia, serif"
          fontSize="22"
          fontWeight="400"
          letterSpacing="-0.02em"
        >
          Nice Right
        </text>
      )}
    </svg>
  );
}

export function LogoMonogram({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="NR"
    >
      <rect x="2" y="2" width="36" height="36" rx="4" fill="var(--v2-navy)" />
      <path d="M11 30V10h4l8 14V10h4v20h-4l-8-14v14h-4z" fill="#fafaf9" />
      <path
        d="M25 10h6c3.3 0 6 2.7 6 6s-2.7 6-6 6h-2v8h-4V10zm4 4v4h2c1.1 0 2-.9 2-2s-.9-2-2-2h-2z"
        fill="#fafaf9"
      />
      <path
        d="M27 22l3 3 6-6"
        stroke="var(--v2-amber)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function LogoText({ className = '' }: { className?: string }) {
  return (
    <span
      className={className}
      style={{
        fontFamily: 'Instrument Serif, Georgia, serif',
        fontSize: '1.4rem',
        fontWeight: 400,
        color: 'var(--v2-navy)',
        letterSpacing: '-0.02em',
        textDecoration: 'none',
      }}
    >
      Nice Right
    </span>
  );
}
