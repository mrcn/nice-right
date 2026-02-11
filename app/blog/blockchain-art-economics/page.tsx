import Link from 'next/link'
import './page.css'

export const metadata = {
  title: 'Designing at the intersection of Blockchain, Art, and Economics | Nice Right',
  description: 'Exploring how time and economic value can directly influence artwork itself.',
}

export default function BlockchainArtEconomicsPage() {
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

      <article className="blog-post">
        <div className="container">
          <header className="post-header">
            <div className="post-meta">
              <span className="post-category">Thoughts on Web3</span>
              <span className="post-dot">•</span>
              <span className="post-date">April 28, 2022</span>
              <span className="post-dot">•</span>
              <span className="post-read-time">5 min read</span>
            </div>
            <h1 className="post-title">Designing at the intersection of Blockchain, Art, and Economics</h1>
            <p className="post-subtitle">Exploring how time and economic value can directly influence artwork itself.</p>
          </header>

          <div className="post-content">
            <p>My background in music production, where I gained a small following during the Myspace era, gave me an early glimpse into the power of having dedicated fans. Back then, the connection between creators and their audience was somewhat immediate and rewarding. But as the landscape shifted with Facebook&apos;s rise, my online success waned, and I witnessed how platform-driven ecosystems could erode those connections.</p>

            <p>I carry that experience with me today.</p>

            <p>On one hand, I remain a creative, always exploring new ways to extend artistic mediums. In the NFT space, I find myself inspired by dynamic and interactive art, reminiscent of what I saw while working with tools like MAX/MSP, VVVV, and Pure Data. These tools were playgrounds for creating visuals that responded to dynamic inputs like time or context - a concept that feels especially relevant in the programmable world of NFTs.</p>

            <p>On the other hand, one of my greatest hopes for the NFT space is to see artists and fans alike rewarded as broader markets align in their favor. NFTs hold the potential to deepen the bond between creators and their supporters, creating systems where artistic and economic value grow in tandem.</p>

            <h2>Art and Value: Time as a Creative Medium</h2>

            <p>Recently during a conversation at Art Basel in Miami (2021), we explored the relationship between time, art, and value. We talked about how time can transform a piece of art - whether through market valuation, audience perception, or the artwork&apos;s properties itself. This discussion sparked an idea: what if time and economic value could directly influence the artwork itself?</p>

            <p>NFTs open up fascinating possibilities for this.</p>

            <p>Take a simple example:</p>

            <p>Imagine an SVG (a scalable vector graphic) that evolves progressively...</p>
          </div>

          <footer className="post-footer">
            <div className="post-tags">
              <span className="tag">Web3</span>
              <span className="tag">NFT</span>
              <span className="tag">Art</span>
            </div>
            
            <nav className="post-nav">
              <Link href="/blog" className="back-link">← All Insights</Link>
            </nav>
          </footer>
        </div>
      </article>

      <footer className="site-footer">
        <div className="container">
          <p>© 2026 Nice Right. Digital growth for small businesses.</p>
        </div>
      </footer>
    </>
  )
}
