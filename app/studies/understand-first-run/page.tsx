import Link from 'next/link';
import {
  buildBreadcrumbSchema,
  buildCreativeWorkSchema,
} from '@/app/_shared/schema';
import { buildSeoMetadata } from '@/app/_shared/seo';

const imageBase = '/images/studies/understand-first-run';

const page = {
  title: 'Understand - First Run | Nice Right',
  description:
    "A portfolio-style design iteration study for Understand's first-run experience.",
  path: '/studies/understand-first-run/',
  image: `${imageBase}/current-library.png`,
};

export const metadata = buildSeoMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  image: page.image,
});

export default function UnderstandFirstRunStudy() {
  const creativeWorkSchema = buildCreativeWorkSchema({
    name: 'Understand - First Run',
    description: page.description,
    path: page.path,
    client: 'Understand',
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Studies', path: '/studies/' },
    { name: 'Understand - First Run', path: page.path },
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

      <nav
        className="v9-breadcrumb v9-breadcrumb--studies"
        aria-label="Breadcrumb"
      >
        <ol className="v9-breadcrumb-list">
          <li className="v9-breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="v9-breadcrumb-item">
            <span className="v9-breadcrumb-sep" aria-hidden="true">
              /
            </span>
            <Link href="/studies/">Studies</Link>
          </li>
          <li className="v9-breadcrumb-item">
            <span className="v9-breadcrumb-sep" aria-hidden="true">
              /
            </span>
            <span aria-current="page">Understand - First Run</span>
          </li>
        </ol>
      </nav>

      <article className="v9-study-page v9-understand-study">
        <header className="v9-understand-hero">
          <span className="v9-study-kicker">Design iteration study</span>
          <h1>
            How should first-run get someone into the real Understand experience
            quickly?
          </h1>
          <p className="v9-understand-lead">
            This portfolio piece is about a specific product shift: moving
            first-run away from a small playable sample and toward a cleaner
            library-to-reader flow that feels like the real app from the start.
          </p>
          <div className="v9-understand-actions" aria-label="Study sections">
            <a
              className="v9-understand-button v9-understand-button--primary"
              href="#current-proof"
            >
              See the current wireframes
            </a>
            <a className="v9-understand-button" href="#evolution">
              See the earlier versions
            </a>
            <a className="v9-understand-button" href="#process-shift">
              Why the process changed
            </a>
          </div>
          <div className="v9-understand-proof-note">
            <span className="v9-understand-label">Current proof</span>
            <b>Current first-run library surface</b>
            <p>
              The opening now reads like the start of a real listening product:
              a continuing book, other whole works, and direct ways to paste
              text or upload a file instead of a tiny self-contained demo card.
              The current focus is the wireframe direction, not the older
              prototype routes.
            </p>
          </div>
        </header>

        <main className="v9-understand-sections">
          <section className="v9-understand-section" id="question">
            <div className="v9-understand-section-head">
              <div className="v9-understand-section-no">01 / Question</div>
              <div className="v9-understand-section-body">
                <span className="v9-understand-label">The problem</span>
                <h2>
                  First-run has to feel like entering a real text, not tapping a
                  neat little demo.
                </h2>
                <p>
                  Understand is trying to help someone stay with a difficult,
                  older, or distant text they might otherwise lose. The design
                  question here is how fast the app can get a new user into that
                  feeling without shrinking the product into a sample-sized
                  trick. The app is built around the listening session, so
                  first-run has to feel like an honest way into that session
                  rather than a detached proof moment.
                </p>
              </div>
            </div>
          </section>

          <section className="v9-understand-section" id="why-it-matters">
            <div className="v9-understand-section-head">
              <div className="v9-understand-section-no">
                02 / Why it matters
              </div>
              <div className="v9-understand-section-body">
                <span className="v9-understand-label">The stakes</span>
                <h2>The opening teaches the product model.</h2>
                <p>
                  If the first interaction looks like a self-contained sample,
                  the app feels smaller than it really is. If it feels like the
                  beginning of a listening session inside a larger work, the
                  product promise becomes much clearer.
                </p>
              </div>
            </div>
            <div className="v9-understand-card-grid">
              <div className="v9-understand-note-card">
                <b>What first-run needs to prove</b>
                <p>
                  Not just that audio can start, but that the app can make a
                  difficult text feel easier to stay with and worth continuing.
                </p>
              </div>
              <div className="v9-understand-note-card">
                <b>Why the library matters</b>
                <p>
                  Cold-open users should enter through a real library of whole
                  works, because the product should teach continuity into real
                  reading and listening rather than a disposable sample.
                </p>
              </div>
            </div>
          </section>

          <section className="v9-understand-section" id="current-proof">
            <div className="v9-understand-section-head">
              <div className="v9-understand-section-no">03 / Current proof</div>
              <div className="v9-understand-section-body">
                <span className="v9-understand-label">The product move</span>
                <h2>
                  The strongest current direction is a library entry that leads
                  straight into a real reading session.
                </h2>
                <p>
                  The current proof is not one isolated screen. It is the
                  first-run handoff: a library surface that feels like a real
                  listening product, then a reader surface that makes it obvious
                  the user is inside an actual book rather than a disposable
                  sample.
                </p>
              </div>
            </div>
            <div className="v9-understand-image-grid">
              <figure className="v9-understand-artifact-card">
                <img
                  src={`${imageBase}/current-library.png`}
                  alt="Current library surface with continue listening, starter books, and direct text/file entry."
                />
                <figcaption>
                  <span className="v9-understand-label">Entry point</span>
                  <b>Library first, not a sample card first</b>
                  <p>
                    The opening now gives the user a book to continue, whole
                    works to start, and immediate ways to bring their own text.
                    That makes first-run feel like entry into a durable product
                    instead of a tiny teaser.
                  </p>
                </figcaption>
              </figure>
              <figure className="v9-understand-artifact-card">
                <img
                  src={`${imageBase}/current-reader.png`}
                  alt="Current reader surface with a book title, passage text, playback controls, and Retelling versus Original controls."
                />
                <figcaption>
                  <span className="v9-understand-label">Destination</span>
                  <b>Reader view that feels like the beginning of a session</b>
                  <p>
                    Once the user enters the text, the app keeps the book
                    context visible and the listening controls close. That is
                    the difference between &ldquo;tap a demo&rdquo; and
                    &ldquo;start reading with audio help.&rdquo;
                  </p>
                </figcaption>
              </figure>
            </div>
          </section>

          <section className="v9-understand-section" id="evolution">
            <div className="v9-understand-section-head">
              <div className="v9-understand-section-no">
                04 / Earlier versions
              </div>
              <div className="v9-understand-section-body">
                <span className="v9-understand-label">The progression</span>
                <h2>
                  The earlier artifacts show how the design worked its way out
                  of demo logic.
                </h2>
                <p>
                  These two earlier states still matter because they make the
                  correction visible: first a tiny sample-centered opening, then
                  a fuller passage state that moved closer to the real product
                  before the stronger current library-to-reader direction took
                  over.
                </p>
              </div>
            </div>
            <div className="v9-understand-image-grid">
              <figure className="v9-understand-artifact-card">
                <img
                  src={`${imageBase}/v1-audio-card.png`}
                  alt="V1 audio-card prototype with a small playable sample card."
                />
                <figcaption>
                  <span className="v9-understand-label">Where it started</span>
                  <b>V1 &mdash; tiny playable example</b>
                  <p>
                    Quick proof of audio, but too much like a little sample
                    instead of the start of a relationship with the text.
                  </p>
                </figcaption>
              </figure>
              <figure className="v9-understand-artifact-card">
                <img
                  src={`${imageBase}/v2-passage-interface.png`}
                  alt="V2 passage interface prototype with a fuller preloaded passage."
                />
                <figcaption>
                  <span className="v9-understand-label">Bridge artifact</span>
                  <b>V2 &mdash; fuller passage state</b>
                  <p>
                    More text context. Closer to real use. Still clearly a
                    bridge artifact on the way to a stronger product model.
                  </p>
                </figcaption>
              </figure>
            </div>
          </section>

          <section className="v9-understand-section" id="v1-exposed">
            <div className="v9-understand-section-head">
              <div className="v9-understand-section-no">
                05 / What V1 exposed
              </div>
              <div className="v9-understand-section-body">
                <span className="v9-understand-label">The failure</span>
                <h2>
                  The earlier version proved playback, but taught the wrong
                  rhythm.
                </h2>
                <p>
                  The user could tap, hear something, and understand the
                  mechanic &mdash; but the experience still felt stop-start. It
                  made the app read more like a novelty proof than an
                  environment for sustained listening.
                </p>
              </div>
            </div>
            <div className="v9-understand-card-grid">
              <div className="v9-understand-note-card">
                <b>What it was testing</b>
                <p>
                  Whether a very fast playable sample could trigger the aha
                  moment quickly enough to make the product click.
                </p>
              </div>
              <div className="v9-understand-note-card">
                <b>What it exposed</b>
                <p>
                  The sample got small too fast. The product felt compressed
                  into the proof moment instead of opening into the work.
                </p>
              </div>
            </div>
          </section>

          <section className="v9-understand-section" id="v2-changed">
            <div className="v9-understand-section-head">
              <div className="v9-understand-section-no">
                06 / What V2 changed
              </div>
              <div className="v9-understand-section-body">
                <span className="v9-understand-label">The correction</span>
                <h2>
                  The next step made the text itself carry more of the
                  experience.
                </h2>
                <p>
                  V2 started moving the interaction closer to real
                  reading/listening by giving the passage more room, more
                  context, and less toy-demo energy. It also surfaced a deeper
                  issue: the opening object had to generalize to real passages,
                  documents, and books rather than just look good as a
                  compressed sample.
                </p>
              </div>
            </div>
            <div className="v9-understand-card-grid">
              <div className="v9-understand-note-card">
                <b>What improved</b>
                <p>
                  The user could feel more clearly that they were inside a
                  passage, not just hitting play on a one-off card.
                </p>
              </div>
              <div className="v9-understand-note-card">
                <b>What still wasn&rsquo;t enough</b>
                <p>
                  It clarified the direction, but it still needed a more
                  convincing app surface to feel like the product&rsquo;s actual
                  next shape.
                </p>
              </div>
            </div>
          </section>

          <section className="v9-understand-section" id="product-model">
            <div className="v9-understand-section-head">
              <div className="v9-understand-section-no">07 / Product model</div>
              <div className="v9-understand-section-body">
                <span className="v9-understand-label">The reframe</span>
                <h2>
                  The design got better once the product stopped centering the
                  sample and started centering the session.
                </h2>
                <p>
                  That change affects everything: the library becomes an entry
                  point, the text view becomes the real destination, and the
                  first interaction starts to imply a whole work the user can
                  continue through.
                </p>
              </div>
            </div>
            <div className="v9-understand-decision">
              <span className="v9-understand-label">Current decision</span>
              <h3>Library &rarr; Play &rarr; text view &rarr; continue</h3>
              <p>
                That is the core structural move this study is defending. The
                current screenshots show the entry and destination together, and
                the work is now being pushed forward through wireframes rather
                than through the older prototype routes.
              </p>
            </div>
          </section>

          <section className="v9-understand-section" id="process-shift">
            <div className="v9-understand-section-head">
              <div className="v9-understand-section-no">08 / Process shift</div>
              <div className="v9-understand-section-body">
                <span className="v9-understand-label">
                  Why the tooling changed
                </span>
                <h2>
                  The work started in Codex, then moved into Open Design when
                  the wireframe work needed a better home.
                </h2>
                <p>
                  Earlier design work happened directly inside Codex, which
                  meant the same tool was jumping across visual design,
                  structure, information architecture, and UX thinking at once.
                  The process then shifted into Open Design &mdash; the
                  open-source design tool &mdash; because it fit the current job
                  better and felt closer to how I had done UX work in the past:
                  slower, clearer, and more focused on IA, big-picture
                  structure, and layout.
                </p>
              </div>
            </div>
            <div className="v9-understand-card-grid">
              <div className="v9-understand-note-card">
                <b>What Codex was doing before</b>
                <p>
                  Codex was helping directly with visual direction as well as
                  structure, IA, and UX decisions. That made it useful for
                  exploration, but it also blurred the boundary between design
                  thinking and artifact-making.
                </p>
              </div>
              <div className="v9-understand-note-card">
                <b>Why Open Design became the focus</b>
                <p>
                  Open Design gave the wireframe work a more natural place to
                  live. It matches the current phase better: fewer old prototype
                  links, more attention on the wireframes, the product model,
                  and the structural questions that still need resolving.
                </p>
              </div>
            </div>
          </section>
        </main>

        <div className="v9-study-footer-nav">
          <Link href="/studies/" className="v9-case-back">
            &larr; All studies
          </Link>
        </div>
      </article>
    </>
  );
}
