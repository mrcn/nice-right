import Link from 'next/link';

export const metadata = {
  title: 'Work | Nice Right',
  description: 'Selected projects and case studies from Nice Right.',
};

export default function WorkIndex() {
  return (
    <>
      <section className="v9-work-header">
        <p className="v9-work-label">Selected Work</p>
        <h1>Projects That Moved the Needle</h1>
        <p className="v9-work-intro">
          Real results for real businesses. Every project focused on
          measurable outcomes.
        </p>
      </section>

      <section className="v9-work-list">
        <Link href="/work/northern-trust" className="v9-work-item">
          <div className="v9-work-item-image">
            <img src="/images/bankk.webp" alt="Northern Trust corporate website micro-interactions" width="800" height="450" />
          </div>
          <div className="v9-work-item-content">
            <span className="v9-work-item-client">Northern Trust</span>
            <h2>Corporate Website &amp; Animation System</h2>
            <p>
              Design and development of micro-interactions for Fortune 500
              financial services. Improved engagement metrics and modernized
              brand perception.
            </p>
            <span className="v9-work-item-link">View case study →</span>
          </div>
        </Link>

        <Link href="/work/healthcare-real-estate" className="v9-work-item">
          <div className="v9-work-item-image">
            <img
              src="/images/nursing-home-money.webp"
              alt="Healthcare real estate investment portal dashboard"
              width="800"
              height="450"
            />
          </div>
          <div className="v9-work-item-content">
            <span className="v9-work-item-client">Healthcare Investment Platform</span>
            <h2>Real Estate Investment Portal</h2>
            <p>
              Custom B2B platform connecting healthcare providers with
              property opportunities. Reduced inquiry-to-close time by 40%.
            </p>
            <span className="v9-work-item-link">View case study →</span>
          </div>
        </Link>

        <Link href="/work/green-goods" className="v9-work-item">
          <div className="v9-work-item-image">
            <img src="/images/garden-money.webp" alt="Green Goods biodiversity tracking platform" width="800" height="450" />
          </div>
          <div className="v9-work-item-content">
            <span className="v9-work-item-client">GreenPill Network</span>
            <h2>Biodiversity Impact Platform</h2>
            <p>
              Software to fund ecological gardens and track environmental
              impact at scale. Gamified engagement increased participation
              3x.
            </p>
            <span className="v9-work-item-link">View case study →</span>
          </div>
        </Link>
      </section>
    </>
  );
}
