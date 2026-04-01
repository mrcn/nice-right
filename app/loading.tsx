export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--v9-bg-dark)',
      }}
      aria-label="Loading"
      role="status"
    >
      <span
        style={{
          display: 'inline-block',
          width: '2.5rem',
          height: '2.5rem',
          border: '3px solid var(--v9-border-dark)',
          borderTopColor: 'var(--v9-accent)',
          borderRadius: '50%',
          animation: 'nr-spin 0.7s linear infinite',
        }}
      />
      <style>{`
        @keyframes nr-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
