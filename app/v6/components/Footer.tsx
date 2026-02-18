import { LogoMonogram } from './Logo';

export function Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-container">
        <div className="v2-footer-content">
          <div className="v2-footer-brand">
            <LogoMonogram className="v2-footer-logo" />
            <span className="v2-footer-name">Nice Right</span>
          </div>
          <p className="v2-footer-tagline">
            Chicago&apos;s Northwest Side · Available for new projects
          </p>
          <p className="v2-footer-copyright">
            &copy; 2026 Nice Right. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
