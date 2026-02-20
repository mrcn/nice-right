export function Footer() {
  return (
    <>
      <footer className="v9-footer">
        <div className="v9-footer-inner">
          <p>&copy; 2026 Nice Right. Chicago&apos;s Northwest Side.</p>
        </div>
      </footer>

      <style>{`
        .v9-footer {
          background: #0C1117;
          border-top: 1px solid #1F2937;
          padding: 48px 28px;
        }

        .v9-footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .v9-footer p {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
          line-height: 1.5;
        }
      `}</style>
    </>
  );
}
