import { Metadata } from 'next'
import Link from 'next/link'
import './blog-post.css'

// Template for individual blog post pages
// In production, this would fetch from a CMS or markdown files

interface BlogPostProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  // In production, fetch post data based on slug
  return {
    title: 'Blog Post | Nice Right',
    description: 'UX writing and content strategy insights.',
  }
}

export default function BlogPost({ params }: BlogPostProps) {
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

      <article className="blog-post">
        <div className="container">
          <header className="post-header">
            <div className="post-meta">
              <span className="post-category">Category</span>
              <span className="post-dot">•</span>
              <span className="post-date">Date</span>
              <span className="post-dot">•</span>
              <span className="post-read-time">X min read</span>
            </div>
            <h1 className="post-title">Blog Post Title</h1>
            <p className="post-subtitle">
              Brief description or excerpt of the article goes here.
            </p>
          </header>

          <div className="post-content">
            <p>
              This is a template for blog post content. The actual content would be 
              loaded from the extracted markdown files or a CMS.
            </p>
            
            <h2>Section Heading</h2>
            <p>
              Blog post content would go here. This template provides the structure 
              for displaying long-form content with proper typography and spacing.
            </p>
            
            <h3>Subsection</h3>
            <p>
              More content here. The actual extracted content from UXOXO would be 
              inserted in this area.
            </p>
            
            <blockquote>
              <p>This is a blockquote style for highlighting important quotes or insights.</p>
            </blockquote>
            
            <h2>Another Section</h2>
            <p>Continue with the article content...</p>
          </div>

          <footer className="post-footer">
            <div className="post-tags">
              <span className="tag">Tag 1</span>
              <span className="tag">Tag 2</span>
              <span className="tag">Tag 3</span>
            </div>
            
            <div className="post-nav">
              <Link href="/blog" className="back-link">← All articles</Link>
            </div>
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