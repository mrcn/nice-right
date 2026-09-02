import { Metadata } from 'next'
import { buildBreadcrumbSchema, buildCreativeWorkSchema } from '@/app/_shared/schema'
import { buildSeoMetadata } from '@/app/_shared/seo'

const page = {
  title: 'Healthcare Investment Portal | Nice Right',
  description: 'A two-sided deal management platform for a healthcare real estate advisory firm — connecting advisors and global private equity buyers across hundreds of facility listings.',
  path: '/work/healthcare-real-estate/',
}

export const metadata: Metadata = buildSeoMetadata(page)

export default function HealthcareRealEstatePage() {
  const workSchema = buildCreativeWorkSchema({
    name: 'Healthcare Investment Portal',
    description: page.description,
    path: page.path,
    client: 'Healthcare Real Estate Advisory',
  })
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work/' },
    { name: 'Healthcare Investment Portal', path: page.path },
  ])

  return (
    <article className="v9-case">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <header className="v9-case-header">
        <span className="v9-case-client">Healthcare Real Estate Advisory</span>
        <span className="v9-case-status">Historical · reported 40% result · verification pending</span>
        <h1>A Deal Management Platform for Healthcare Real Estate Advisory</h1>
        <p className="v9-case-subtitle">
          A two-sided platform connecting advisors and global private equity buyers across hundreds of healthcare facility listings. The case study reports a 40% reduction in inquiry-to-close time.
        </p>

        <div className="v9-case-meta">
          <div className="v9-meta-item">
            <span className="v9-meta-label">Industry</span>
            <span className="v9-meta-value">Real Estate / Healthcare</span>
          </div>
          <div className="v9-meta-item">
            <span className="v9-meta-label">Role</span>
            <span className="v9-meta-value">UX Architect &amp; Project Manager</span>
          </div>
          <div className="v9-meta-item">
            <span className="v9-meta-label">Team</span>
            <span className="v9-meta-value">2 UI Designers, Distributed Development Team</span>
          </div>
        </div>
      </header>

      <div className="v9-case-content">
        <section className="v9-case-section">
          <h2>Project Overview</h2>
          <p>
            Our client is a healthcare real estate advisory firm that brokers the sale of healthcare facilities — nursing homes, hospices, hospitals, assisted living communities — to private equity firms worldwide. By 2016, their growing deal pipeline had outgrown their off-the-shelf CRM. They needed a bespoke platform: one where their advisors could manage hundreds of active listings, and where vetted PE buyers could access curated deal flow. I joined as UX Architect and Project Manager to design and deliver it.
          </p>
        </section>

        <section className="v9-case-section">
          <h2>Problem Statement</h2>
          <ul>
            <li>Outdated CRM unable to scale with a rapidly growing asset portfolio</li>
            <li>No structured way to manage document and photo packages for each listing</li>
            <li>Buyer access was manually managed, with no purpose-built deal flow interface</li>
            <li>Multi-million dollar transactions conducted through generic tooling</li>
          </ul>
        </section>

        <section className="v9-case-section">
          <h2>Project Goals</h2>
          <ul>
            <li>Build a two-sided platform: advisor-facing deal management + buyer-facing listing portal</li>
            <li>Centralize document and photo management for hundreds of active healthcare facility listings</li>
            <li>Give pre-vetted global PE buyers a clean, credible interface to evaluate assets</li>
          </ul>
        </section>

        <section className="v9-case-section">
          <h2>UX Process</h2>

          <h3>Discovery</h3>
          <p>
            Interviews with platform admins, cognitive walkthroughs with the lead analyst, and a cross-functional workshop with the client&apos;s sales team and our Technical Product Manager. This produced a detailed platform description, identified core processes and user actions, and surfaced the object-action relationships that would drive the architecture.
          </p>
          <p>
            A significant discovery came mid-project: portfolio deals — bundles of multiple facilities sold together — were a meaningful part of the business and hadn&apos;t surfaced in early conversations. We adapted the design to clearly distinguish portfolio listings from single-asset listings, redesigning the hero and photo section so buyers immediately understood what they were evaluating. The underlying architecture required minimal rework; the visual treatment did the heavy lifting.
          </p>

          <h3>System Mapping</h3>
          <p>
            From discovery outputs, I built a system map — the central piece of design documentation for the project. It defined scope, gave the full team a shared view of the system, and became the reference point for every subsequent design decision.
          </p>

          <h3>Object Mapping &amp; Task Flows</h3>
          <p>
            Using an OOUX-influenced approach, I developed an Action Inventory cataloging every user action, its trigger, output, and associated role. This fed directly into a UX Object Map — a visualization of system elements and their relationships that shaped the user-facing architecture. User journeys and task flows followed, pairing user processes with pain points.
          </p>

          <h3>Wireframes &amp; Prototyping</h3>
          <p>
            We started in Balsamiq for speed. As complexity grew, we moved to Adobe XD for interactive prototyping — used for client presentations, stakeholder alignment, and usability testing.
          </p>

          <h3>Usability Testing</h3>
          <p>
            Iterative testing throughout, refining interactions and validating decisions before handoff to the dev team.
          </p>
        </section>

        <section className="v9-case-section">
          <h2>Design Solutions</h2>
          <p>
            The core UX challenge was document and photo management. Advisors needed to upload legal documents, offering materials, and property photography for each listing — with precise control over what buyers could access and when. Buyers needed to navigate and download those packages cleanly, across assets ranging from single nursing homes to multi-property portfolios.
          </p>
          <p>
            We drew on familiar patterns from document-heavy B2B platforms to reduce cognitive load, while building in enough flexibility to handle edge cases that emerged mid-project — most notably, the portfolio listing format, which required a distinct visual treatment to prevent buyer confusion.
          </p>
        </section>

        <section className="v9-case-section">
          <h2>Project Management Approach</h2>
          <ul>
            <li>Implemented Dual Track Design process</li>
            <li>Managed risks, especially lack of existing database documentation</li>
            <li>Maintained regular communication with stakeholders, engineers, and visual designers</li>
            <li>Balanced chronology of UX research/design with development risks</li>
          </ul>
          <p>
            To manage this complex project effectively, I implemented a Dual Track Design process, which allowed us to merge Agile development practices with user-centric design principles. This approach involved orchestrating parallel sprints for design and development, ensuring that we could conduct UX research and design without impeding development progress.
          </p>
          <p>
            Risk management was a key focus, particularly given the lack of existing documentation for the client&apos;s previous asset management system. To mitigate this, we initiated early-stage requirements and wireframes for key pages, enabling our development team to explore APIs with specific requirements in mind.
          </p>
          <p>
            Throughout the project, I maintained a regular communication cadence with stakeholders, engaging them in iterative design cycles. This involved presenting a range of deliverables, from wireframes to interactive prototypes, tailored to various discussion formats including moderated usability tests and formal presentations.
          </p>
        </section>

        <section className="v9-case-section">
          <h2>Outcomes and Impact</h2>
          <p>
            The platform shipped after eight months and entered active use across the advisory team and buyer network. Inquiry-to-close time dropped 40% — the clearest signal that the platform was doing what the old CRM couldn&apos;t: keeping deals moving on assets where speed and credibility directly affect transaction value.
          </p>
        </section>

        <section className="v9-case-section">
          <h2>Reflections</h2>
          <p>
            This project is where I became a UX designer. As project manager, I needed to give the UI team something structural to build from — wireframes, flows, object maps, interaction specs. The designers didn&apos;t want to work through the complexity. I did. That instinct — to reason through a system before anyone touches pixels — is now the core of how I work.
          </p>
          <p>
            The Object-Oriented UX approach proved particularly effective for a platform this complex. Breaking the system down into objects, actions, and relationships gave us a shared language across design, development, and the client — and made mid-project surprises like the portfolio listing format manageable rather than disruptive.
          </p>
        </section>
      </div>

    </article>
  )
}
