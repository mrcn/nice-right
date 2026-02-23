'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem',
            textAlign: 'center',
            fontFamily: 'Inter, system-ui, sans-serif',
            background: '#fafaf9',
          }}
        >
          <h1
            style={{ fontSize: '2rem', marginBottom: '1rem', color: '#0A0A0A' }}
          >
            Something went wrong
          </h1>
          <p style={{ color: '#666', marginBottom: '2rem', maxWidth: '500px' }}>
            We apologize for the inconvenience. Please try refreshing the page
            or go back home.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => reset()}
              style={{
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                background: '#0000FF',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                padding: '0.75rem 1.5rem',
                textDecoration: 'none',
                background: 'white',
                color: '#0A0A0A',
                border: '2px solid #0A0A0A',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
