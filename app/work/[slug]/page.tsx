import { Metadata } from 'next'
import Link from 'next/link'
import './work-post.css'

// Template for individual portfolio/work pages

interface WorkPostProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: WorkPostProps): Promise<Metadata> {
  return {
    title: 'Case Study | Nice Right',
    description: 'UX writing and content strategy case study.',
  }
}

export default function WorkPost({ params }: WorkPostProps) {
  return (
    <>
      <nav className="nav">
        <div className="container nav-content">
          <Link href="/" className="logo">Nice Right</Link>
          <div className="nav-links">
            <a href="/#services">Services</a>
            <a href="/#work">Results</a>
            <a href="/blog">Writing</a>
            <a href="/#contact" className="btn btn-sm">Let's Talk</a>
          </div>
        </div>
      </nav>

      <article className="case-study">
        <div className="container">
          <header className="case-header">
            <span className="case-client">Client Name</span>
            <h1>Case Study Title</h1>
            <p className="case-subtitle">
              Brief description of the project and its impact.
            </p>
            
            <div className="case-meta">
              <div className="meta-item">
                <span className="meta-label">Industry</span>
                <span className="meta-value">Industry Name</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Services</span>
                <span className="meta-value">UX Writing, Content Strategy</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Results</span>
                <span className="meta-value">X% Improvement</span>
              </div>
            </div>
          </header>

          <div className="case-hero-image">
            <div className="image-placeholder">
              Project hero image would go here
            </div>
          </div>

          <div className="case-content">
            <section className="case-section">
              <h2>The Challenge</h2>
              <p>
                Describe the problem the client was facing. What were their pain points? 
                What were they trying to achieve? This sets up the context for the solution.
              </p>
            </section>

            <section className="case-section">
              <h2>The Approach</h2>
              <p>
                Explain the strategy and methodology used. How did you approach the problem? 
                What research or discovery was conducted?
              </p>
              
              <h3>Key Activities</h3>
              <ul>
                <li>Activity one with specific details</li>
                <li>Activity two with specific details</li>
                <li>Activity three with specific details</li>
              </ul>
            </section>

            <section className="case-section">
              <h2>The Solution</h2>
              <p>
                Detail the actual work delivered. What content was created? 
                How did the UX writing and strategy address the challenge?
              </p>
              
              <blockquote className="case-quote">
                <p>Key insight or impactful quote from the project.</p>
              </blockquote>
            </section>

            <section className="case-section">
              <h2>The Results</h2>
              <p>
                Quantify the impact where possible. What metrics improved? 
                How did the work drive business outcomes?
              </p>
              
              <div className="results-grid">
                <div className="result-item">
                  <span className="result-number">40%</span>
                  <span className="result-label">Metric improvement</span>
                </div>
                <div className="result-item">
                  <span className="result-number">3x</span>
                  <span className="result-label">Another metric</span>
                </div>
              </div>
            </section>
          </div>

          <footer className="case-footer">
            <Link href="/#work" className="back-link">← All case studies</Link>
          </footer>
        </div>
      </article>

      <footer className="page-footer">
        <div className="container">
          <p>© 2026 Nice Right. Words that win customers.</p>
        </div>
      </footer>
    </>
  )
}