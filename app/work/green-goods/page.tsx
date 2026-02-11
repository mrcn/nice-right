import { Metadata } from 'next'
import Link from 'next/link'
import '../[slug]/work-post.css'

export const metadata: Metadata = {
  title: 'Green Goods: Biodiversity Impact Platform | Nice Right',
  description: 'Green Goods is a blockchain-powered Progressive Web App that streamlines the capture, verification, and rewarding of biodiversity conservation efforts.',
}

export default function GreenGoodsPage() {
  return (
    <>
      <nav className="nav">
        <div className="container nav-content">
          <Link href="/" className="logo">Nice Right</Link>
          <div className="nav-links">
            <a href="/#services">Services</a>
            <a href="/#work">Results</a>
            <a href="/blog">Writing</a>
            <a href="/#contact" className="btn btn-sm">Let&apos;s Talk</a>
          </div>
        </div>
      </nav>

      <article className="case-study">
        <div className="container">
          <header className="case-header">
            <span className="case-client">Green Goods</span>
            <h1>Green Goods: A Biodiversity Impact Platform</h1>
            <p className="case-subtitle">
              A blockchain-powered Progressive Web App that streamlines the capture, verification, and rewarding of biodiversity conservation efforts.
            </p>
            
            <div className="case-meta">
              <div className="meta-item">
                <span className="meta-label">Industry</span>
                <span className="meta-value">Environmental / Blockchain</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Role</span>
                <span className="meta-value">Product Lead &amp; UX Architect</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Timeline</span>
                <span className="meta-value">Q2 2024 - Ongoing</span>
              </div>
            </div>
          </header>

          <div className="case-content">
            <section className="case-section">
              <h2>Overview</h2>
              <p>
                Green Goods is a blockchain-powered Progressive Web App (PWA) that streamlines the capture, verification, and rewarding of biodiversity conservation efforts. Building on the learnings from the &quot;Camp Green&quot; project, Green Goods brings together garden operators, gardeners, and funders in a transparent, accountable ecosystem. By documenting ecological actions—removing invasive species, planting native flora, enhancing garden biodiversity—and linking this data to verifiable on-chain attestations and hypercert-based rewards, Green Goods turns environmental stewardship into a measurable and financially incentivized endeavor.
              </p>
            </section>

            <section className="case-section">
              <h2>Core Objectives</h2>
              <ul>
                <li><strong>Document &amp; Track Biodiversity Actions:</strong> Provide a user-friendly interface for gardeners to log their work (e.g., planting, pruning, biomass creation) with &quot;before and after&quot; evidence.</li>
                <li><strong>Validate &amp; Reward Impact:</strong> Use Ethereum Attestation Service (EAS) and hypercerts to validate actions and reward gardeners and operators with badges and potential funding avenues.</li>
                <li><strong>Attract Funding &amp; Support:</strong> Generate transparent, verifiable impact reports that can be shared with funders, governments, and partner organizations, effectively making impact = profit.</li>
              </ul>
            </section>

            <section className="case-section">
              <h2>My Role</h2>
              <p>As the Product Lead and UX Architect, I guided the product strategy from ideation through MVP and iterative refinement:</p>
              <ul>
                <li><strong>Product Strategy:</strong> Defined the product vision, established key success metrics, and prioritized features to align with user and stakeholder needs.</li>
                <li><strong>UX &amp; Design Architecture:</strong> Designed user flows, wireframes, and high-fidelity prototypes. Ensured user-centricity, simplicity, and accessibility, especially for communities with shared devices and limited bandwidth.</li>
                <li><strong>Stakeholder Collaboration:</strong> Worked closely with product owners, engineers, and data scientists to ensure technical feasibility, data-driven decision-making, and seamless integration of on-chain technologies.</li>
                <li><strong>Continuous Iteration &amp; Testing:</strong> Gathered user feedback, conducted iterative design sprints, and refined the application&apos;s features and interfaces based on real-world insights.</li>
              </ul>
            </section>

            <section className="case-section">
              <h2>Identifying the Problem</h2>
              <p>
                Biodiversity loss is a critical global challenge, yet on-ground efforts—such as removing invasive species or planting native flora—often go undocumented and unrewarded. Lack of standardized tooling makes it hard for garden operators and volunteers (gardeners) to track their work&apos;s impact, and even harder to secure funding without verifiable proof of success.
              </p>
              
              <h3>Key Pain Points</h3>
              <ul>
                <li><strong>Inefficient Documentation:</strong> Gardeners needed a way to easily record their actions and show tangible before/after improvements.</li>
                <li><strong>Lack of Incentives &amp; Recognition:</strong> Volunteers had minimal formal recognition for their efforts, leading to lower engagement.</li>
                <li><strong>Difficult Funding Acquisition:</strong> Operators struggled to produce quantifiable impact reports to justify funding from grants or local governments.</li>
                <li><strong>Need for Standardization:</strong> Without a consistent method for measuring actions, comparing results and scaling projects was nearly impossible.</li>
              </ul>
            </section>

            <section className="case-section">
              <h2>Target Users</h2>
              <ul>
                <li><strong>Garden Operators:</strong> Individuals or organizations managing conservation gardens who need efficient, standardized tools to track and approve actions, and demonstrate outcomes to funders.</li>
                <li><strong>Gardeners (Volunteers):</strong> Individuals performing tasks like planting, pruning, removing invasive species, and documenting their work to earn recognition and rewards.</li>
                <li><strong>Funders &amp; Governments:</strong> Entities interested in supporting biodiversity initiatives, requiring verifiable, data-driven impact reports before committing resources.</li>
              </ul>
            </section>

            <section className="case-section">
              <h2>Solution Approach</h2>
              <p>Green Goods leverages blockchain technology (EAS attestations, hypercerts) and user-friendly UI to:</p>
              
              <h3>Streamlined Task Documentation</h3>
              <ul>
                <li><strong>Before/After Media Upload:</strong> Gardeners capture visual evidence of completed work, ensuring transparent progress tracking.</li>
                <li><strong>Checklists &amp; Guidance:</strong> Step-by-step instructions for actions like &quot;Plant Propagule&quot; or &quot;Observe&quot; help users confidently complete tasks.</li>
              </ul>
              
              <h3>Verified On-Chain Attestations</h3>
              <ul>
                <li><strong>Ethereum Attestation Service (EAS):</strong> Each action and its approval are recorded on-chain, making the data trustworthy and tamper-proof.</li>
                <li><strong>Hypercert Rewards:</strong> Gardeners and operators receive badges (hypercerts) that recognize their contributions, fostering engagement and future governance roles.</li>
              </ul>
              
              <h3>Impact Reporting &amp; Funding</h3>
              <ul>
                <li><strong>Standardized Metrics:</strong> Tracking invasive species removal, biomass created, and carbon sequestration capacity provides clear impact measurements.</li>
                <li><strong>Data-Driven Reports:</strong> Verifiable reports attract funding and partnerships, helping communities scale their conservation efforts.</li>
              </ul>
              
              <h3>Gasless Onboarding &amp; Accessibility</h3>
              <ul>
                <li><strong>Social Logins &amp; Account Abstraction:</strong> Users can sign in with phone/email, avoiding crypto complexity. No gas fees on user actions lower the entry barriers.</li>
                <li><strong>Mobile-First Design:</strong> Optimized for shared devices and low-bandwidth conditions in rural areas.</li>
              </ul>
            </section>

            <section className="case-section">
              <h2>Design &amp; UX Process</h2>
              
              <h3>User Research &amp; Requirements Gathering</h3>
              <p>
                We interviewed garden operators, gardeners, and funders to understand their daily pain points and aspirations. Key insights included the need for a simple, guided interface for task completion, and a transparent approval system operators could trust.
              </p>
              
              <h3>Wireframing &amp; Prototyping</h3>
              <p>Early wireframes focused on core actions:</p>
              <ul>
                <li><strong>Gardener Flows:</strong> Log in, view assigned tasks, document work with images, submit for approval, earn badges.</li>
                <li><strong>Operator Flows:</strong> View gardens, add/remove gardeners, approve or reject submitted work, leave feedback, and generate reports.</li>
              </ul>
              <p>
                As designs evolved, we integrated user feedback: Reduced cognitive load by segmenting tasks into small, manageable steps. Added visual cues (color codes, icons) to differentiate task states (pending, approved, completed). Refined error handling and success confirmations to boost user confidence.
              </p>
              
              <h3>Iteration Based on Feedback</h3>
              <p>
                Subsequent design rounds improved the &quot;before/after&quot; photo workflow, ensuring gardeners clearly understood what to capture. Operators gained streamlined approval interfaces with easily accessible metadata and clear feedback channels. Each iteration moved from functionality-driven to more polished, accessible UIs, with attention to typography, contrast, and native language support (e.g., Brazilian Portuguese).
              </p>
              
              <h3>Key Iteration Outcomes</h3>
              <ul>
                <li>Simplified task steps, so users knew exactly what to do next.</li>
                <li>Enhanced badge visibility, making rewards more prominent and motivating.</li>
                <li>Unified design patterns across gardener and operator interfaces for consistency.</li>
              </ul>
            </section>

            <section className="case-section">
              <h2>Technical Integration</h2>
              
              <h3>Blockchain Components</h3>
              <ul>
                <li><strong>Ethereum Attestation Service (EAS):</strong> On-chain attestations confirm completed tasks, enabling trust and verifiability.</li>
                <li><strong>Hypercerts:</strong> Badges minted upon approval of tasks, reflecting verified ecological contributions.</li>
              </ul>
              
              <h3>Off-Chain Storage &amp; Performance</h3>
              <ul>
                <li><strong>Infura + IPFS:</strong> Stores task metadata (photos, descriptions) off-chain while verifying actions on-chain.</li>
                <li><strong>Account Abstraction (Privy/Pimlico):</strong> Eliminates complexity in user onboarding, ensuring frictionless participation.</li>
              </ul>
              
              <h3>PWA Architecture</h3>
              <ul>
                <li><strong>ViteJS &amp; TailwindCSS:</strong> For fast, mobile-optimized rendering.</li>
                <li><strong>Responsive Design:</strong> Accessible across devices and conditions.</li>
              </ul>
            </section>

            <section className="case-section">
              <h2>Success Metrics &amp; Impact</h2>
              
              <h3>User Metrics</h3>
              <ul>
                <li><strong>Active User Growth:</strong> Aim to onboard 100-1000 users within the first quarter post-MVP.</li>
                <li><strong>Task Completion Rate:</strong> Targeting 1000-10,000 completed biodiversity tasks in the first quarter.</li>
              </ul>
              
              <h3>Ecological Impact</h3>
              <ul>
                <li><strong>Invasive Species Removal:</strong> Measurable reduction in invasive species via documented tasks.</li>
                <li><strong>Biomass &amp; Carbon Sequestration:</strong> Quantifying environmental improvements for gardens.</li>
                <li><strong>Increased Native Species:</strong> Tracking biodiversity improvements over time.</li>
              </ul>
              
              <h3>Funding &amp; Recognition</h3>
              <ul>
                <li><strong>Badges Earned:</strong> 100-1000 hypercert badges issued to recognize collective efforts.</li>
                <li><strong>Funding Acquisition:</strong> Clear impact data encourages more grants, investments, and local government support.</li>
              </ul>
            </section>

            <section className="case-section">
              <h2>Go-To-Market &amp; Next Steps</h2>
              
              <h3>Partnerships &amp; Community Engagement</h3>
              <ul>
                <li>Collaborate with biodiversity networks in Brazil.</li>
                <li>Partner with Greenpill chapters in Los Angeles and Ottawa.</li>
                <li>Seek grants from OP and Gitcoin to support ongoing development and community building.</li>
              </ul>
              
              <h3>Roadmap</h3>
              <ul>
                <li><strong>Q3 2024:</strong> MVP Launch; gather initial user feedback.</li>
                <li><strong>Q4 2024:</strong> Implement user-suggested refinements, bug fixes, and localization.</li>
                <li><strong>Q1 2025:</strong> Integrate with additional Dev Guild tools, add advanced analytics, and refine hypercert governance features.</li>
              </ul>
              
              <h3>Risk Mitigation</h3>
              <ul>
                <li>Addressing rural hardware constraints through lightweight PWAs.</li>
                <li>Ensuring language support for multi-lingual communities.</li>
                <li>Engaging early adopters and stakeholders to reduce resistance and refine value propositions.</li>
              </ul>
            </section>

            <section className="case-section">
              <h2>Outcomes &amp; Learnings</h2>
              <p>
                <strong>For Users:</strong> Gardeners now have a platform that recognizes and documents their efforts, operators can efficiently manage and validate tasks, and funders gain transparent impact reports to inform resource allocation.
              </p>
              <p>
                <strong>For the Product Team:</strong> The successful blending of blockchain infrastructure with a user-friendly interface and iterative design underscores the importance of user-centricity, real-world testing, and rapid prototyping in emerging tech solutions.
              </p>
              
              <h3>Key Takeaways</h3>
              <ul>
                <li><strong>User-Centric Design is Paramount:</strong> Even with cutting-edge blockchain tools, simplicity and clarity determine adoption.</li>
                <li><strong>Iterative Approach:</strong> Regular feedback loops allowed continuous improvement, ensuring a polished final product.</li>
                <li><strong>Scaling Impact:</strong> By making biodiversity actions transparent, verifiable, and rewarded, we paved the way for expanding environmental stewardship globally.</li>
              </ul>
            </section>

            <section className="case-section">
              <h2>Conclusion</h2>
              <p>
                Green Goods transforms how we measure, reward, and scale biodiversity conservation. By fusing usability, trust (via blockchain attestations), and financial incentives, it empowers communities to engage in meaningful environmental work.
              </p>
              <p>
                As Product Lead and UX Architect, I guided the product from concept to MVP, ensuring that every design decision served both user needs and the broader mission of environmental stewardship. The result is a platform that not only functions well but also inspires users to take action for the planet.
              </p>
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
