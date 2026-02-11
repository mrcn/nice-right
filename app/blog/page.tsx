import { Metadata } from 'next'
import Link from 'next/link'
import './page.css'

// This would be replaced with actual data fetching
const blogPosts = [
  {
    slug: 'health-is-wealth',
    title: 'Design a Self-Funded Retirement System Through Healthy Living',
    category: 'Product Strategy',
    readTime: '2 min',
    date: '2024',
    excerpt: 'Exploring behavioral economics and incentive design to create sustainable health habits.',
  },
  {
    slug: 'blockchain-art-economics',
    title: 'Designing at the Intersection of Blockchain, Art, and Economics',
    category: 'Web3 & Economics',
    readTime: '5 min',
    date: '2024',
    excerpt: 'How tokenomics and user experience converge in the creator economy.',
  },
  {
    slug: 'ssh-vscode-lightsail',
    title: 'Setting up SSH with VS Code for Amazon Lightsail',
    category: 'Coding & Config',
    readTime: '3 min',
    date: '2020',
    excerpt: 'A technical guide to connecting VS Code to Amazon Lightsail instances via SSH.',
  },
  {
    slug: 'poshmark-social-commerce',
    title: 'Poshmark: Social Media Behavior & eCommerce Incentives',
    category: 'UX Analysis',
    readTime: '7 min',
    date: '2019',
    excerpt: 'Breaking down the psychology behind successful marketplace engagement.',
  },
  {
    slug: 'google-analytics-scroll-tracking',
    title: 'Google Analytics: Scroll Event Tracking',
    category: 'Analytics',
    readTime: '1 min',
    date: '2019',
    excerpt: 'Technical guide to understanding user engagement through scroll depth measurement.',
  },
  {
    slug: 'google-analytics-cross-domain',
    title: 'Google Analytics: Cross Domain Tracking',
    category: 'Analytics',
    readTime: '4 min',
    date: '2019',
    excerpt: 'How to set up and test cross domain tracking in Google Analytics and Tag Manager.',
  },
]

export const metadata: Metadata = {
  title: 'Insights | Nice Right',
  description: 'Thinking on product, UX, and growth strategy.',
}

export default function BlogIndex() {
  return (
    <>
      <nav className="nav">
        <div className="container nav-content">
          <Link href="/" className="logo">Nice Right</Link>
          <div className="nav-links">
            <a href="/#services">Services</a>
            <a href="/#work">Work</a>
            <a href="/blog">Insights</a>
            <a href="/#contact" className="btn btn-sm">Start Project</a>
          </div>
        </div>
      </nav>

      <section className="blog-header">
        <div className="container">
          <p className="section-label">Insights</p>
          <h1>Thinking on Product, UX & Growth</h1>
          <p className="blog-intro">
            Insights on digital strategy, product design, user experience, and the intersection 
            of technology and business growth.
          </p>
        </div>
      </section>

      <section className="blog-list">
        <div className="container">
          <div className="posts-grid">
            {blogPosts.map((post) => (
              <article key={post.slug} className="post-card">
                <Link href={`/blog/${post.slug}`} className="post-link">
                  <div className="post-meta">
                    <span className="post-category">{post.category}</span>
                    <span className="post-dot">•</span>
                    <span className="post-read-time">{post.readTime} read</span>
                  </div>
                  <h2 className="post-title">{post.title}</h2>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <span className="read-more">Read article →</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="page-footer">
        <div className="container">
          <p>© 2026 Nice Right. Digital growth for small businesses.</p>
        </div>
      </footer>
    </>
  )
}