import versionData from '../../../version.json';

export function Footer() {
  return (
    <>
      <footer className="v9-footer" aria-label="Site footer">
        <div className="v9-footer-inner">
          <nav aria-label="Footer navigation">
            <a href="/#services" className="v9-footer-link">
              How it works
            </a>
            <a href="/#results" className="v9-footer-link">
              Proof
            </a>
            <a href="/work" className="v9-footer-link">
              Work
            </a>
            <a href="/labs/understand/" className="v9-footer-link">
              Understand lab
            </a>
            <a href="/#contact" className="v9-footer-link">
              Contact
            </a>
          </nav>
          <p>&copy; 2026 Nice Right. Digital Growth Audit for local service businesses.</p>
          <p className="v9-footer-ownership">
            <a href="https://uxoxo.xyz">A UXOXO product and portfolio umbrella.</a>
          </p>
          <p className="v9-footer-version">v{versionData.version}</p>
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

        .v9-footer nav {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .v9-footer-link {
          font-family: Inter, -apple-system, sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.55);
          text-decoration: none;
          transition: color 0.2s ease;
          min-height: 24px;
          display: inline-flex;
          align-items: center;
        }

        .v9-footer-link:hover {
          color: rgba(255, 255, 255, 0.85);
        }

        .v9-footer p {
          font-family: Inter, -apple-system, sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
          line-height: 1.5;
        }

        .v9-footer-version {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.55);
          margin-top: 8px;
        }

        .v9-footer p.v9-footer-ownership {
          margin-top: 8px;
        }

        .v9-footer-ownership a {
          color: rgba(255, 255, 255, 0.65);
        }
      `}</style>
    </>
  );
}
