import Link from 'next/link'
import '../page.css'

export const metadata = {
  title: 'Work | Nice Right',
  description: 'Selected projects and case studies from Nice Right.',
}

export default function WorkIndex() {
  return (
    <>
      <nav className="nav">
        <div className="container nav-content">
          <Link href="/" className="logo">Nice Right</Link>
          <div className="nav-links">
            <a href="/#services">Services</a>
            <a href="/work">Work</a>
            <a href="/blog">Insights</a>
            <a href="/#contact" className="btn btn-sm">Start Project</a>
          </div>
        </div>
      </nav>

      <section className="work-header">
        <div className="container">
          <p className="section-label">Selected Work</p>
          <h1>Projects That Moved the Needle</h1>
          <p className="work-intro">Real results for real businesses. Every project focused on measurable outcomes.</p>
        </div>
      </section>

      <section className="work-list">
        <div className="container">
          <div className="work-grid">
            <Link href="/work/northern-trust" className="work-item">
              <div className="work-image">
                <img src="/images/bankk.webp" alt="Northern Trust" />
              </div>
              <div className="work-content">
                <span className="work-client">Northern Trust</span>
                <h3>Corporate Website & Animation System</h3>
                <p>Design and development of micro-interactions for Fortune 500 financial services. Improved engagement metrics and modernized brand perception.</p>
                <span className="work-link">View case study →</span>
              </div>
            </Link>

            <Link href="/work/healthcare-real-estate" className="work-item">
              <div className="work-image">
                <img src="/images/nursing-home-money.webp" alt="Healthcare Portal" />
              </div>
              <div className="work-content">
                <span className="work-client">Healthcare Investment Platform</span>
                <h3>Real Estate Investment Portal</h3>
                <p>Custom B2B platform connecting healthcare providers with property opportunities. Reduced inquiry-to-close time by 40%.</p>
                <span className="work-link">View case study →</span>
              </div>
            </Link>

            <Link href="/work/green-goods" className="work-item">
              <div className="work-image">
                <img src="/images/garden-money.webp" alt="Green Goods" />
              </div>
              <div className="work-content">
                <span className="work-client">GreenPill Dev Guild</span>
                <h3>Biodiversity Impact Platform</h3>
                <p>Software to fund ecological gardens and track environmental impact at scale. Gamified engagement increased participation 3x.</p>
                <span className="work-link">View case study →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <p>© 2026 Nice Right. Digital growth for small businesses.</p>
        </div>
      </footer>
    </>
  )
}