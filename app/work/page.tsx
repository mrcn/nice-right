import Link from 'next/link';
import { buildBreadcrumbSchema, buildCollectionPageSchema } from '@/app/_shared/schema';
import { buildSeoMetadata } from '@/app/_shared/seo';

const page = {
  title: 'Work | Nice Right',
  description: 'Selected projects and case studies from Nice Right.',
  path: '/work/',
};

export const metadata = buildSeoMetadata(page);

export default function WorkIndex() {
  const collectionSchema = buildCollectionPageSchema({
    name: page.title,
    description: page.description,
    path: page.path,
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work/' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="v9-work-header">
        <p className="v9-work-label">Selected Work</p>
        <h1>Selected projects and case studies</h1>
        <p className="v9-work-intro">
          Past client work and product studies, with relationship and evidence
          status shown for each project.
        </p>
      </section>

      <section className="v9-work-list">
        <Link href="/work/northern-trust" className="v9-work-item">
          <div className="v9-work-item-image">
            <img src="/images/bankk.webp" alt="Northern Trust corporate website micro-interactions" width="800" height="450" />
          </div>
          <div className="v9-work-item-content">
            <span className="v9-work-item-client">Northern Trust</span>
            <span className="v9-work-item-status">Historical client work</span>
            <h2>Corporate Website &amp; Animation System</h2>
            <p>
              Design and development of micro-interactions for Fortune 500
              financial services. Quantified engagement outcomes are not
              verified here.
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
            <span className="v9-work-item-status">Historical · reported outcome</span>
            <h2>Real Estate Investment Portal</h2>
            <p>
              Custom B2B platform connecting healthcare providers with
              property opportunities. The case study reports a 40% reduction
              in inquiry-to-close time.
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
            <span className="v9-work-item-status">Unknown · verification pending</span>
            <h2>Biodiversity Impact Platform</h2>
            <p>
              Software to fund ecological gardens and track environmental
              impact at scale. Current status and outcome evidence are not
              verified here.
            </p>
            <span className="v9-work-item-link">View case study →</span>
          </div>
        </Link>
      </section>
    </>
  );
}
