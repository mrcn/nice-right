'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const variants = [
  { path: '/v6/', label: 'V6', title: 'Current' },
  { path: '/v7/', label: 'V7', title: 'Noir Editorial' },
  { path: '/v8/', label: 'V8', title: 'Brutalist RAW' },
  { path: '/v9/', label: 'V9', title: 'Immersive Cinematic' },
  { path: '/v10/', label: 'V10', title: 'Neon Cyberpunk' },
  { path: '/v11/', label: 'V11', title: 'Retro Groovy' },
  { path: '/v12/', label: 'V12', title: 'Swiss Precision' },
  { path: '/v13/', label: 'V13', title: 'Glass Aurora' },
]

export function VariantSwitcher() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Design variants"
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        display: 'flex',
        gap: 4,
        padding: 4,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 40,
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
      }}
    >
      {variants.map((v) => {
        const active = pathname === v.path || pathname === v.path.slice(0, -1)
        return (
          <Link
            key={v.path}
            href={v.path}
            title={v.title}
            style={{
              padding: '8px 18px',
              borderRadius: 36,
              background: active ? '#fff' : 'transparent',
              color: active ? '#000' : 'rgba(255,255,255,0.7)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.03em',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {v.label}
          </Link>
        )
      })}
    </nav>
  )
}
