'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

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
      }}
    >
      <h2>Something went wrong!</h2>
      <p style={{ color: '#666', marginBottom: '1rem' }}>
        {error.message || 'An unexpected error occurred'}
      </p>
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
        }}
      >
        Try again
      </button>
    </div>
  );
}
