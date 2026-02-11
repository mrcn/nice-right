import { Metadata } from 'next'
import Link from 'next/link'
import '../page.css'

export const metadata: Metadata = {
  title: 'Healthcare Real Estate Investment Portal | Nice Right',
  description: 'Designing a custom healthcare real estate investment portal.',
}

export default function HealthcareRealEstatePage() {
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

      <article className="case-study">
        <div className="container">
          <header className="case-header">
            <span className="case-client">Real Estate Investment Company</span>
            <h1>Designing a Custom Healthcare Real Estate Investment Portal</h1>
            <p className="case-subtitle">
              Creating a mobile responsive web app for managing and selling healthcare facilities.
            </p>
            
            <div className="case-meta">
              <div className="meta-item">
                <span className="meta-label">Industry</span>
                <span className="meta-value">Real Estate / Healthcare</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Role</span>
                <span className="meta-value">UX Architect &amp; Project Manager</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Team</span>
                <span className="meta-value">2 UI Designers, Dev Team (Russia)</span>
              </div>
            </div>
          </header>

          <div className="case-content">
            <section className="case-section">
              <h2>Project Overview</h2>
              <p>
                In this project, I took on the dual role of UX Architect and Project Manager for a real estate investment company. The client needed a modern web application to manage and sell their diverse portfolio of healthcare facilities. Our team consisted of myself, two UI designers co-located with me, and a development team headed by a technical project lead in our Russia office.
              </p>
            </section>

            <section className="case-section">
              <h2>Problem Statement</h2>
              <ul>
                <li>Client using outdated system for property management</li>
                <li>Inefficient processes for growing asset portfolio</li>
                <li>Need for modernization and aesthetic improvements for multimillion dollar sales projects</li>
              </ul>
              <p>
                Our client, a real estate investment company, was grappling with an outdated system that was ill-equipped to handle their growing portfolio of healthcare facilities and vetted buyers. As their list of assets expanded, the inefficiencies in their management and sales processes became increasingly apparent.
              </p>
            </section>

            <section className="case-section">
              <h2>Project Goals</h2>
              <ul>
                <li>Develop custom web app for real estate management and sales</li>
                <li>Modernize asset management and sales processes</li>
                <li>Improve overall platform user experience</li>
              </ul>
              <p>
                The primary objective of this project was to develop a custom-built web application that would improve how our client managed and sold their investment properties. We aimed to expand admin functionality, optimize how asset management and sales processes were facilitated on the app, and improve the overall platform experience for admin and buyers by making it more intuitive, efficient, and aligned with modern web standards.
              </p>
            </section>

            <section className="case-section">
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
                To strengthen our view and increase buy-in, I organized a workshop with a group from the client&apos;s company, including sales team members and our Technical Product Manager. This collaborative session helped us draft a detailed platform description and identify core processes, features, and user actions. We engaged in object-action pairing and exploration, which proved to be both productive, fun, and exhausting, strengthening our relationship with the client.
              </p>
              <p>
                Lastly, I conducted extensive design pattern research, focusing on functionalities relevant to our project such as document management and photo gallery management. This research informed our design decisions and ensured we were leveraging established best practices in our solution.
              </p>
            </section>

            <section className="case-section">
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

            <section className="case-section">
              <h2>Design Solutions</h2>
              <ul>
                <li>Addressed platform complexity</li>
                <li>Ensured client alignment and expectations</li>
                <li>Incorporated insights from design pattern research</li>
                <li>Focused on intuitive, user-friendly interfaces</li>
              </ul>
              <p>
                To ensure the platform was both intuitive and effective, we incorporated insights from our client interviews and design pattern research. By leveraging familiar interfaces and interactions from established design patterns—such as e-commerce sites and iPhone applications—we created a solution that felt intuitive to users while still addressing the unique needs of our client&apos;s business. This approach allowed us to build a user-friendly experience that streamlined complex processes and improved overall usability.
              </p>
            </section>

            <section className="case-section">
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

            <section className="case-section">
              <h2>Outcomes and Impact</h2>
              <ul>
                <li>Improved operational efficiency</li>
                <li>Streamlined cumbersome processes</li>
                <li>Positively impacted sales performance</li>
                <li>Enhanced customer retention</li>
              </ul>
              <p>
                The new portal we developed led to a marked improvement in operational efficiency for our client. Processes that were previously cumbersome were streamlined, leading to significant time savings and reduced frustration for users. More importantly, the new platform had a substantial positive impact on our client&apos;s business objectives. We saw improvements in sales performance and customer retention, indicating that the new system was not just easier to use, but also more effective in supporting the client&apos;s core business functions.
              </p>
            </section>

            <section className="case-section">
              <h2>Lessons Learned and Reflections</h2>
              <ul>
                <li>Importance of collaboration across teams</li>
                <li>Effectiveness of OOUX approach for complex systems</li>
                <li>Value of balancing UX research with development</li>
                <li>Power of user-centered design in transforming business processes</li>
              </ul>
              <p>
                This project reinforced the importance of collaborative efforts between the client and internal cross-functional teams. The diverse perspectives brought to the table by different stakeholders proved invaluable in shaping a solution that truly met the needs of all users.
              </p>
              <p>
                The Object-Oriented UX (OOUX) influenced approach I adopted opened new avenues for designing complicated structures. This methodology proved particularly effective in breaking down complex systems into manageable, user-friendly interfaces.
              </p>
              <p>
                Perhaps the most significant takeaway was the importance of balancing UX research and design with steady development progress. The Dual Track Design process we implemented allowed us to achieve this balance, resulting in a final product that was both well-designed, technically sound, and relatively speaking, low risk despite the high profile.
              </p>
              <p>
                In conclusion, this project was a testament to the power of user-centered design principles applied to complex business systems. It demonstrated that with the right approach, even the most intricate processes can be transformed into intuitive, efficient digital experiences.
              </p>
            </section>
          </div>

          <footer className="case-footer">
            <Link href="/work" className="back-link">← All Work</Link>
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
