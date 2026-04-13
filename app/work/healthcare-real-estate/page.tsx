import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Healthcare Investment Portal | Nice Right',
  description: 'A two-sided deal management platform for a healthcare real estate advisory firm — connecting advisors and global private equity buyers across hundreds of facility listings.',
}

export default function HealthcareRealEstatePage() {
  return (
    <article className="v9-case">
      <header className="v9-case-header">
        <span className="v9-case-client">Healthcare Real Estate Advisory</span>
        <h1>A Deal Management Platform for Healthcare Real Estate Advisory</h1>
        <p className="v9-case-subtitle">
          A two-sided platform connecting advisors and global private equity buyers across hundreds of healthcare facility listings — cutting inquiry-to-close time by 40%.
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
          <h2>Research and Discovery</h2>
          <ul>
            <li>Conducted user interviews and cognitive walkthroughs</li>
            <li>Organized workshop with client&apos;s team</li>
            <li>Created system map and user journeys</li>
            <li>Performed design pattern research</li>
          </ul>
          <p>
            My research phase was multifaceted. I began with one-on-one interviews with platform administrators to understand their needs, pain points, and expectations. A series of cognitive walkthroughs with the lead analyst, a primary user type, provided invaluable insights into the day-to-day use of the system. These sessions were captured on a whiteboard, allowing us to iteratively expand our understanding of the system from the Admin&apos;s perspective.
          </p>
          <p>
            To strengthen our view and increase buy-in, I organized a workshop with a group from the client&apos;s company, including sales team members and our Technical Product Manager. This collaborative session helped us draft a detailed platform description and identify core processes, features, and user actions. We engaged in object-action pairing and exploration, which proved productive and strengthened our relationship with the client.
          </p>
          <p>
            A significant discovery came mid-project: portfolio deals — bundles of multiple facilities sold together — were a meaningful part of the business and hadn&apos;t surfaced in early conversations. We adapted the design to clearly distinguish portfolio listings from single-asset listings, redesigning the hero and photo section so buyers immediately understood what they were evaluating. The underlying architecture required minimal rework; the visual treatment did the heavy lifting.
          </p>
          <p>
            I also conducted design pattern research focused on document management and photo gallery systems — the two areas where the platform&apos;s functional complexity was highest. This research grounded our decisions in established patterns while allowing us to tailor interactions to the specific demands of high-stakes real estate transactions.
          </p>
        </section>

        <section className="v9-case-section">
          <h2>UX Process and Deliverables</h2>
          <ul>
            <li>Created system map, user journeys, and task flows</li>
            <li>Developed Action Inventory and UX Object Map</li>
            <li>Progressed from low-fi map to wireframes and prototypes</li>
            <li>Conducted usability testing</li>
          </ul>
          <p>
            The UX process began with the creation of a system map, which became a cornerstone piece of design documentation. This map not only helped define the project scope but also provided a holistic view of the system, revealing areas for improvement and supporting informed decision-making later on. From there, I developed detailed user journeys and task flows, giving us a clear picture of user processes paired with pain points.
          </p>
          <p>
            One of the most valuable exercises was the creation of an Action Inventory and UX Object Map. The Action Inventory served as a comprehensive catalog of user actions, including triggers, outputs, and user roles. This granular view of system functionality was critical in informing the UX design and setting the context for the next step, Object Mapping. The UX Object Map complemented this by visualizing the various elements within the system and their relationships, which began to shape our user-facing architecture.
          </p>
          <p>
            Our wireframing process evolved as the project progressed. We started with low-fidelity wireframes in Balsamiq for speed, but as the complexity of the project unfolded, we transitioned to Adobe XD for its superior prototyping capabilities. This allowed us to create interactive prototypes that were valuable for client presentation and usability testing.
          </p>
          <p>
            Throughout the process, we conducted usability tests to refine and improve our designs. This iterative approach ensured that our final product was not only visually appealing but also highly functional and user-friendly.
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
