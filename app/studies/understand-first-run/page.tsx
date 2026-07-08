import Link from 'next/link';
import {
  buildBreadcrumbSchema,
  buildCreativeWorkSchema,
} from '@/app/_shared/schema';
import { buildSeoMetadata } from '@/app/_shared/seo';

const page = {
  title: 'Understand — First Run | Nice Right',
  description:
    'An open design study about rethinking first-run for Understand so the opening feels like entry into a real reading-and-listening session.',
  path: '/studies/understand-first-run/',
  image: '/images/studies/understand-first-run/current-library.png',
};

export const metadata = buildSeoMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  image: page.image,
});

export default function UnderstandFirstRunStudy() {
  const creativeWorkSchema = buildCreativeWorkSchema({
    name: 'Understand — First Run',
    description: page.description,
    path: page.path,
    client: 'Understand',
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Studies', path: '/studies/' },
    { name: 'Understand — First Run', path: page.path },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav className="wr-nav">
        <div className="wr-nav-inner">
          <Link href="/" className="wr-nav-logo">
            Nice Right
          </Link>
          <div className="wr-nav-links">
            <Link href="/studies" className="wr-nav-back">
              ← Studies
            </Link>
            <a href="/#contact" className="wr-nav-cta">
              Book a Free Call
            </a>
          </div>
        </div>
      </nav>

      <main className="art-main study-article-main">
        <div className="art-container study-article-container">
          <div className="art-meta">
            <span className="art-type">Open Design · Product UX</span>
            <span className="art-date">Last updated: July 2026</span>
          </div>

          <article className="art-content study-content">
            <h1>Understand — First Run</h1>
            <p className="study-deck">
              A first-run flow for Understand should feel like entry into a real
              reading and listening session, not a small playable demo detached
              from the product.
            </p>

            <figure className="study-hero-figure">
              <img
                src="/images/studies/understand-first-run/current-library.png"
                alt="Current Understand library wireframe with continue listening, starter books, and own-text entry."
              />
              <figcaption>
                Current direction: a library surface that immediately looks like
                the beginning of a real reading-and-listening product.
              </figcaption>
            </figure>

            <hr />

            <h2>The question</h2>
            <p>
              Understand is trying to help someone stay with a difficult, older,
              or distant text they might otherwise lose. The design question
              here was how quickly first-run could get a new person into that
              feeling without shrinking the product into a sample-sized trick.
            </p>
            <p>
              The underlying product is built around the listening session. That
              meant the opening could not just prove that audio starts. It had
              to suggest a real path into a text the person could continue with.
            </p>

            <h2>Why this mattered</h2>
            <p>
              If the first interaction looks like a self-contained sample, the
              app feels smaller than it really is. If it feels like the
              beginning of a listening session inside a larger work, the product
              promise becomes much clearer.
            </p>
            <div className="study-note-grid">
              <div className="study-note-card">
                <h3>What first-run needed to prove</h3>
                <p>
                  Not just that audio can start, but that the app can make a
                  difficult text feel easier to stay with and worth continuing.
                </p>
              </div>
              <div className="study-note-card">
                <h3>Why the library mattered</h3>
                <p>
                  Cold-open users should enter through a real library of whole
                  works, because the product should teach continuity into real
                  reading and listening rather than a disposable sample.
                </p>
              </div>
            </div>

            <h2>Current proof</h2>
            <p>
              The strongest current direction is not one isolated screen. It is
              the first-run handoff: a library surface that feels like a real
              listening product, then a reader surface that makes it obvious the
              person is inside an actual book rather than a disposable sample.
            </p>
            <div className="study-image-grid">
              <figure>
                <img
                  src="/images/studies/understand-first-run/current-library.png"
                  alt="Understand library wireframe with continue listening, starter books, and direct text/file entry."
                />
                <figcaption>
                  <strong>
                    Entry point — Library first, not sample card first.
                  </strong>{' '}
                  The opening now gives someone a book to continue, whole works
                  to start, and immediate ways to bring their own text.
                </figcaption>
              </figure>
              <figure>
                <img
                  src="/images/studies/understand-first-run/current-reader.png"
                  alt="Understand reader wireframe with passage text, playback controls, and retelling versus original controls."
                />
                <figcaption>
                  <strong>
                    Destination — Reader view that feels like the beginning of a
                    session.
                  </strong>{' '}
                  Once inside the text, the book context stays visible and the
                  listening controls stay close.
                </figcaption>
              </figure>
            </div>

            <h2>What went wrong before</h2>
            <p>
              The earlier version proved playback, but it taught the wrong
              rhythm. Someone could tap, hear something, and understand the
              mechanic, but the experience still felt stop-start. It made the
              app read more like a novelty proof than an environment for
              sustained listening.
            </p>
            <div className="study-image-grid study-image-grid--history">
              <figure>
                <img
                  src="/images/studies/understand-first-run/v1-audio-card.png"
                  alt="Earlier V1 Understand wireframe with a small playable sample card."
                />
                <figcaption>
                  <strong>V1 — Tiny playable example.</strong> Quick proof of
                  audio, but too much like a little sample instead of the start
                  of a relationship with the text.
                </figcaption>
              </figure>
              <figure>
                <img
                  src="/images/studies/understand-first-run/v2-passage-interface.png"
                  alt="V2 Understand wireframe with a fuller preloaded passage."
                />
                <figcaption>
                  <strong>V2 — Fuller passage state.</strong> More text context
                  and a clearer sense of passage, but still a bridge artifact
                  rather than the app’s actual next shape.
                </figcaption>
              </figure>
            </div>

            <h2>What changed</h2>
            <p>
              The design got better once the product stopped centering the
              sample and started centering the session. That shift changed the
              whole structure: the library became the entry point, the text view
              became the real destination, and the opening interaction started
              to imply a whole work the person could continue through.
            </p>
            <blockquote>
              <p>Library → Play → text view → continue.</p>
            </blockquote>
            <p>
              That is the core move this study is defending. It also exposed a
              deeper requirement: the opening object had to generalize to real
              passages, documents, and books rather than only looking good as a
              compressed sample.
            </p>

            <h2>Process shift</h2>
            <p>
              Earlier design work happened directly inside Codex, which meant
              the same tool was jumping across visual design, structure,
              information architecture, and UX thinking at once. The process
              then shifted into Open Design — the open-source design tool —
              because it fit the current job better and felt closer to how I had
              done UX work in the past: slower, clearer, and more focused on IA,
              big-picture structure, and layout.
            </p>
            <div className="study-note-grid">
              <div className="study-note-card">
                <h3>What Codex was doing before</h3>
                <p>
                  Codex was helping directly with visual direction as well as
                  structure, IA, and UX decisions. That made it useful for
                  exploration, but it also blurred the boundary between design
                  thinking and artifact-making.
                </p>
              </div>
              <div className="study-note-card">
                <h3>Why Open Design became the focus</h3>
                <p>
                  Open Design gave the wireframe work a more natural place to
                  live. It matched the current phase better: less attention on
                  old prototype routes, more attention on the wireframes, the
                  product model, and the structural questions that still need
                  resolving.
                </p>
              </div>
            </div>
          </article>
        </div>
      </main>

      <footer className="wr-footer">
        <div className="art-container">
          <div className="art-footer-inner">
            <Link href="/studies" className="art-back-link">
              ← All studies
            </Link>
            <p>© 2026 Nice Right.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
