import { Metadata } from 'next';
import { buildBreadcrumbSchema, buildCreativeWorkSchema } from '@/app/_shared/schema';
import { buildSeoMetadata } from '@/app/_shared/seo';

const page = {
  title: 'Green Goods: Biodiversity Impact Platform | Nice Right',
  description:
    'How I co-originated a blockchain-powered conservation tool — from a failed hackathon to two grants and a live community of gardeners.',
  path: '/work/green-goods/',
};

export const metadata: Metadata = buildSeoMetadata(page);

export default function GreenGoodsPage() {
  const workSchema = buildCreativeWorkSchema({
    name: 'Green Goods: Biodiversity Impact Platform',
    description: page.description,
    path: page.path,
    client: 'GreenPill Network',
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work/' },
    { name: 'Green Goods', path: page.path },
  ]);

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
        <span className="v9-case-client">GreenPill Network</span>
        <h1>Green Goods: A Biodiversity Impact Platform</h1>
        <p className="v9-case-subtitle">
          Conservation work that goes undocumented goes unrewarded. We built
          the infrastructure to change that.
        </p>

        <div className="v9-case-meta">
          <div className="v9-meta-item">
            <span className="v9-meta-label">Industry</span>
            <span className="v9-meta-value">Environmental / Blockchain</span>
          </div>
          <div className="v9-meta-item">
            <span className="v9-meta-label">Role</span>
            <span className="v9-meta-value">
              Product Lead &amp; Co-Originator
            </span>
          </div>
        </div>
      </header>

      <div className="v9-case-content">
        <section className="v9-case-section">
          <h2>Problem</h2>
          <p>
            People doing real conservation work — removing invasive species,
            planting native flora, rehabilitating degraded land — have no
            reliable way to document it in a format funders recognize. The
            science exists: you can measure invasive species removed per square
            meter, total biomass volume, carbon sequestered, disposal method.
            But without tooling built around that data, it stays trapped in
            volunteer notebooks or doesn&apos;t get recorded at all.
          </p>
          <p>
            The result is a funding gap. Grant applications require verifiable
            impact. Without it, the best conservation operators lose to whoever
            writes better proposals, not whoever does better work.
          </p>
        </section>

        <section className="v9-case-section">
          <h2>Constraints</h2>
          <p>
            There was no brief. We originated Green Goods from scratch inside
            the GreenPill Dev Guild — a distributed network of regenerative
            developers, scientists, and community organizers, many based in
            Brazil. The people doing the work were not tech users. They shared
            devices, operated in low-bandwidth environments, and worked
            primarily in Brazilian Portuguese. The platform had to disappear —
            the technology couldn&apos;t be what they interacted with.
          </p>
        </section>

        <section className="v9-case-section">
          <h2>Origin</h2>
          <p>
            Green Goods grew out of a failure. At a GreenPill hackathon, our
            team — then called Camp Green — overscoped and underdelivered. We
            didn&apos;t win. But we had something more valuable than a prize: a
            live community of users who wanted to keep building.
          </p>
          <p>
            What changed: instead of building everything at once, we stripped
            back to the essential loop — document a task, get it verified, earn
            recognition for it. That constraint shaped the product.
          </p>
          <p>
            We went on to win two grants: Octant Epoch 5 ($20,000, awarded
            specifically for Green Goods) and an ENS DAO grant ($29,000). The
            platform is in active use today.
          </p>
        </section>

        <section className="v9-case-section">
          <h2>Design Process</h2>
          <p>
            We designed for environmental scientists, horticulturalists, and
            gardeners — people who understand the work deeply but aren&apos;t
            tech users. They share devices, operate in low-bandwidth
            conditions, work in Brazilian Portuguese. The platform had to meet
            them where they are.
          </p>
          <p>
            The core design challenge was the impact data itself. What does
            meaningful measurement look like for a conservation task? We worked
            through this with the team: invasive species removal measured in
            square meters, volume of biomass removed, carbon sequestration
            estimated from that volume, disposal method (mulch, composting,
            removal off-site). Getting this right wasn&apos;t a UX question —
            it was a product definition question, and it&apos;s what made the
            platform fundable.
          </p>
          <p>
            From there: wireframes built around a before/after photo workflow.
            Operator and gardener flows kept deliberately separate. Iteration
            focused on reducing cognitive load at the task completion step —
            the most critical moment in the loop. Later rounds added
            localization (Brazilian Portuguese), improved error handling, and
            unified visual patterns across both user types.
          </p>
        </section>

        <section className="v9-case-section">
          <h2>Solution</h2>
          <p>
            The design goal was to make blockchain infrastructure invisible.
            EAS attestations and hypercerts handle verification and reward —
            but users sign in with a phone number or email, never see a wallet,
            and pay no gas fees. The complexity is abstracted underneath.
          </p>
          <p>
            The task flow is simple by design: view assigned task, read
            guidance, upload before photo, complete work, upload after photo,
            submit. Operators review and approve. Approved tasks generate an
            on-chain attestation and issue a hypercert badge to the gardener.
          </p>
          <p>
            Impact data is collected at the task level — standardized fields
            for species removed, area covered, volume, method. This feeds
            directly into reports that operators can share with funders. The
            measurement infrastructure was the product, as much as the
            interface was.
          </p>
        </section>

        <section className="v9-case-section">
          <h2>Outcomes</h2>
          <ul>
            <li>
              <strong>Octant Epoch 5 grant:</strong> $20,000 — awarded
              specifically to Green Goods
            </li>
            <li>
              <strong>ENS DAO grant:</strong> $29,000
            </li>
            <li>
              <strong>First users:</strong> scientists and gardeners in Brazil,
              active from early rollout
            </li>
            <li>Platform in active use; development ongoing</li>
          </ul>
        </section>
      </div>
    </article>
  );
}
