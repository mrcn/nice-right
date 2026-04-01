'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif',
        background: 'var(--v9-bg-dark)',
        color: 'var(--v9-text-light)',
      }}
    >
      <h2 style={{ marginBottom: '1rem' }}>Something went wrong</h2>
      <p style={{ color: 'var(--v9-text-muted-light)', marginBottom: '1.5rem' }}>
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '0.75rem 1.5rem',
          cursor: 'pointer',
          background: 'var(--v9-accent)',
          color: 'var(--v9-text-light)',
          border: 'none',
          borderRadius: '4px',
          fontSize: '1rem',
        }}
      >
        Try again
      </button>
    </div>
  );
}
