import { Metadata } from 'next'
import Link from 'next/link'
import '../page.css'

export const metadata: Metadata = {
  title: 'Northern Trust Micro-Interactions | Nice Right',
  description: 'Designing and developing micro-interactions for Northern Trust\'s corporate website.',
}

export default function NorthernTrustPage() {
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
            <span className="case-client">Northern Trust</span>
            <h1>Designing &amp; Developing Micro-Interactions for Northern Trust&apos;s Corporate Website</h1>
            <p className="case-subtitle">
              Enhancing a global financial institution&apos;s online presence through strategic addition of micro-interactions and transitions.
            </p>
            
            <div className="case-meta">
              <div className="meta-item">
                <span className="meta-label">Industry</span>
                <span className="meta-value">Financial Services</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Role</span>
                <span className="meta-value">UX Designer &amp; Developer</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Timeline</span>
                <span className="meta-value">2020 - 2021</span>
              </div>
            </div>
          </header>

          <div className="case-content">
            <section className="case-section">
              <h2>Project Overview</h2>
              <p>
                As a contracted UX designer and developer, I was engaged to enhance Northern Trust&apos;s global online presence through strategic addition of micro-interactions and transitions. The initial 6-week project aimed to implement a carefully curated set of animations on the client&apos;s public website, with the goal of elevating the brand experience and improving user engagement.
              </p>
            </section>

            <section className="case-section">
              <h2>Role and Collaboration</h2>
              <p>
                While working primarily independently, I maintained close collaboration with key stakeholders within the organization: Front-End Engineer, Senior UX Designer, and UX Manager. This collaborative approach ensured solid integration of my work into the client&apos;s development environment and brand guidelines.
              </p>
            </section>

            <section className="case-section">
              <h2>Project Scope and Evolution</h2>
              <p>The initial engagement focused on:</p>
              <ul>
                <li>Designing and prototyping brand-centric animations</li>
                <li>Coding and implementing these elements into the live website</li>
                <li>Measuring success through brand cohesion and feel</li>
              </ul>
              <p>
                Due to the project&apos;s success and ongoing value, the contract was extended multiple times, spanning throughout 2020 and 2021. This allowed for key refinement and expansion.
              </p>
            </section>

            <section className="case-section">
              <h2>Impact and Approach</h2>
              <p>By incorporating these brand-centric elements, we achieved a dual-purpose solution:</p>
              <ul>
                <li>Engaging user attention with key elements</li>
                <li>Reinforcing the brand narrative throughout the user journey</li>
              </ul>
              <p>
                This strategic approach to UX design demonstrated how functionality and branding could be seamlessly merged, resulting in a more holistic and resonant user experience.
              </p>
            </section>

            <section className="case-section">
              <h2>Results</h2>
              <p>Before diving into the process, let&apos;s look at some of the results and the reasoning behind them.</p>
              
              <h3>Hero Load Sequence</h3>
              <p>
                The hero section animation activates upon page load, featuring an interactive line progressively drawn across the page, sequential fade-in of nearby elements, cued by the line animation&apos;s left-to-right motion, gradient exposure, and progressive fade-ins. This required custom motion eases crafted specifically for this demo. The sequence concludes by highlighting tiles on the right side of the screen, subtly directing viewer attention.
              </p>
              
              <h3>Revealing Page Elements During Scroll</h3>
              <p>
                I developed scroll-based transitions to enhance user engagement utilizing primary design elements and content on the page. Prototyped using HTML, CSS, and GSAP (GreenSock Animation Platform), based on visual designs provided by the client.
              </p>
              <p>
                Key feature: I ensured these animations are highly flexible by reviewing the existing HTML structure and tailoring the code to it. By appending CSS attributes to design elements you&apos;d like to animate, the elements can be predictably animated without altering existing HTML or CSS structure.
              </p>
              
              <h3>Animated Interactive Vue Component</h3>
              <p>
                I created a prototype for a tab-change animation coded with Vue.js and GSAP based on designs provided by the client. I split the hexagonal image into several layers, each containing an individual hexagon. The transitional animations are triggered by clicking the tabs.
              </p>
              <p>
                I used Vue.js for tab functionality intended as a simple copy/paste solution with CDN reference. Vue was chosen to meet specific technical constraints, and as an opportunity to work with Vue.js.
              </p>
              
              <h3>Key Section Fade-ins</h3>
              <p>
                Based on designs provided by the client via Figma, I developed fade-in animations for key sections intended to draw more attention. I cleaned up the provided SVG files for easier programmatic manipulation. Coded with GSAP.js. We explored numerous transition states.
              </p>
            </section>

            <section className="case-section">
              <h2>The Process</h2>
              
              <h3>Project Preparation and Research</h3>
              <p>
                Before diving into the design and development of micro-interactions and transitions, I conducted a thorough analysis of the client&apos;s brand and market position. This preparatory phase was crucial in ensuring that our animations would align with the client&apos;s brand identity and stand out in their competitive landscape.
              </p>
              
              <h3>Brand Immersion</h3>
              <p>
                I began by immersing myself in the client&apos;s branding materials and their recent website redesign. This process involved identifying key brand principles and important on-site design elements. By highlighting these crucial points, I established a solid foundation for guiding and explaining my subsequent design decisions.
              </p>
              
              <h3>Competitive Analysis</h3>
              <p>
                To contextualize our approach, I conducted a comprehensive review of competitors&apos; websites and explored other relevant visual references. This step was vital in helping stakeholders visualize and confirm our intended art direction. The insights gained from this analysis significantly informed and refined the direction of our animation strategy.
              </p>
              
              <h3>Existing Design Audit</h3>
              <p>
                I meticulously cataloged on-site design elements, paying particular attention to those with multiple states and transitions. This audit involved listing and video recording these elements to create a comprehensive reference document. By understanding the existing design language, we could ensure that our new animations would integrate and enhance the site&apos;s overall aesthetic and functionality.
              </p>
              <p>
                This preparatory work laid a strong foundation for the project, ensuring that our micro-interactions and transitions would not only enhance user experience but also reinforce the client&apos;s brand identity effectively. The documentation created during this phase served as a valuable reference throughout the design and development process, helping to maintain consistency and alignment with the project goals.
              </p>
            </section>

            <section className="case-section">
              <h2>Streamlined Delivery Process</h2>
              <p>Given the client&apos;s busy schedule, we adopted a direct approach:</p>
              <ul>
                <li>Developed initial variations</li>
                <li>Narrowed down options</li>
                <li>Presented to stakeholders for feedback</li>
                <li>Refined based on input</li>
                <li>Final presentation to the Director of Marketing</li>
              </ul>
              <p>
                This process ensured efficient communication while allowing for necessary adaptations based on collective feedback.
              </p>
            </section>

            <section className="case-section">
              <h2>Prioritization</h2>
              <p>
                After completing the initial research and analysis phase, I needed to strategically allocate my design efforts for the upcoming weeks. To achieve this, we conducted a collaborative impact/effort exercise, synthesizing insights from the animation audit and the codebase.
              </p>
              <p>The exercise focused on two key questions:</p>
              <ul>
                <li>Which elements, when animated, would potentially have the most significant impact on user experience?</li>
                <li>Considering the client&apos;s technical architecture, how challenging would each element be to implement?</li>
              </ul>
              
              <h3>Methodology</h3>
              <p>
                We used a visual mapping technique for this exercise. Each design element under consideration was written on a Post-it note. These notes were then placed on an impact/effort matrix, leveraging input from both the design team and front-end engineering.
              </p>
              <p>
                The horizontal axis represented the implementation effort required, while the vertical axis indicated the potential impact on user experience. This approach allowed us to visually prioritize elements that offered high impact with relatively low implementation effort.
              </p>
              
              <h3>Collaborative Decision-Making</h3>
              <p>
                The initial mapping was done collaboratively with the core team. This ensured that both creative and technical perspectives were considered in the prioritization process.
              </p>
              <p>
                To finalize our selections, we presented the mapped matrix to the project director. This step allowed for higher-level strategic input and alignment with overall project goals.
              </p>
              
              <h3>Outcome</h3>
              <p>This exercise resulted in a clear, prioritized list of animation elements to focus on. It helped us:</p>
              <ul>
                <li>Identify high-impact, lower-effort quick wins</li>
                <li>Recognize potentially challenging implementations that might require additional resources or reconsideration</li>
                <li>Align the team on priorities and expectations for the animation phase of the project</li>
              </ul>
            </section>

            <section className="case-section">
              <h2>Design Exploration and Refinement</h2>
              <p>
                For each selected element, I developed multiple variations, pushing beyond conventional boundaries to fully understand the design space. This approach led to unexpected solutions, such as our final card animation resulting from a CSS code experiment.
              </p>
              
              <h3>Buttons</h3>
              <p>
                As frequently interacted elements, buttons required responsive, quick, and elegant animations that balanced branding opportunities with usability.
              </p>
              
              <h3>Cards</h3>
              <p>
                I modified the design system to include a hover state, emphasizing copy over imagery to reflect the content hierarchy.
              </p>
              
              <h3>Headers</h3>
              <p>
                Large header images required slower transitions to achieve the desired effect without blocking access to content below.
              </p>
              
              <h3>Documentation</h3>
              <p>
                All design details were recorded in an easily accessible codepen for later transition to the company&apos;s official design library.
              </p>
            </section>
          </div>

          <footer className="case-footer">
            <Link href="/#work" className="back-link">← All case studies</Link>
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
