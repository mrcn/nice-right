export function Footer() {
  return (
    <footer className="v7-footer">
      <div className="v7-container">
        <div className="v7-footer-inner">
          <span className="v7-footer-logo"><em>nice right</em></span>
          <p className="v7-footer-copy">
            &copy; 2026 Nice Right. Chicago&apos;s Northwest Side.
          </p>
          <div className="v7-footer-links">
            <a href="#how-it-works">how it works</a>
            <a href="#services">services</a>
            <a href="#contact">contact</a>
          </div>
        </div>
      </div>

      <style>{`
        .v7-footer-logo em {
          font-family: var(--v7-font-heading, 'Instrument Serif', serif);
          font-style: italic;
          font-size: 1.2rem;
          color: var(--v7-text, #F5F5F0);
        }
      `}</style>
    </footer>
  )
}
