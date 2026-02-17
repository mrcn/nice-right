'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const variants = [
  { path: '/', label: 'Current', title: 'Current Homepage' },
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
    <>
      <nav
        aria-label="Design variants"
        className="variant-switcher"
      >
        {variants.map((v) => {
          const active = pathname === v.path || pathname === v.path.slice(0, -1)
          return (
            <Link
              key={v.path}
              href={v.path}
              title={v.title}
              className={`variant-switcher-link ${active ? 'variant-switcher-active' : ''}`}
            >
              {v.label}
            </Link>
          )
        })}
      </nav>
      <style>{`
        .variant-switcher {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          display: flex;
          gap: 4px;
          padding: 4px;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 40px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
          font-family: var(--font-inter), system-ui, sans-serif;
        }

        .variant-switcher-link {
          padding: 8px 18px;
          border-radius: 36px;
          background: transparent;
          color: rgba(255,255,255,0.7);
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .variant-switcher-link.variant-switcher-active {
          background: #fff;
          color: #000;
        }

        @media (max-width: 640px) {
          .variant-switcher {
            left: 12px;
            right: 12px;
            bottom: 16px;
            transform: none;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            max-width: calc(100vw - 24px);
          }

          .variant-switcher::-webkit-scrollbar {
            display: none;
          }

          .variant-switcher-link {
            padding: 8px 14px;
            font-size: 0.75rem;
            flex-shrink: 0;
          }
        }
      `}</style>
    </>
  )
}
