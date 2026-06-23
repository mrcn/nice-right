import { UnderstandAnalytics } from '../../_components/UnderstandAnalytics';
import source from '@/data/understand_examples/sources/aesop-fables-vernon-jones.json';
import selections from '@/data/understand_examples/selections/aesop-fables.json';
import retellings from '@/data/understand_examples/retellings/aesop-clear-retellings.json';

const playTestingHref = 'https://play.google.com/apps/testing/xyz.uxoxo.understand';
const audioPath = '/audio/understand-examples/aesop-clear-retellings.ogg';

export const metadata = {
  title: "Aesop's Fables Retold as Clear Audio | Understand",
  description: "Listen to public-domain Aesop's Fables retold in clearer language for phone listening, with original text, comparison notes, and audio.",
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: "Aesop's Fables Retold as Clear Audio",
  description: "Public-domain Aesop's Fables with original text, Understand retellings, comparison notes, and audio.",
  url: 'https://niceright.co/labs/understand/examples/aesop-fables-retold-audio/',
  audio: {
    '@type': 'AudioObject',
    name: "Aesop's Fables retold for clearer listening",
    contentUrl: 'https://niceright.co/audio/understand-examples/aesop-clear-retellings.ogg',
    encodingFormat: 'audio/ogg',
  },
};

function titleCaseFromSource(title: string) {
  return title
    .toLowerCase()
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .replace(/\bAnd\b/g, 'and')
    .replace(/\bThe\b/g, 'The');
}

export default function AesopExamplePage() {
  const selectionByTitle = new Map(
    (selections as Array<{ source_title: string; original_text: string; word_count: number }>).map((item) => [item.source_title, item]),
  );

  return (
    <>
      <UnderstandAnalytics />
      <main className="ae-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="ae-hero">
        <p className="ae-eyebrow">Understand example library · Public-domain proof</p>
        <h1>Listen to Aesop&apos;s Fables in clearer language</h1>
        <p className="ae-lede">
          A public-domain text, retold for listening. This is the shape of Understand&apos;s SEO strategy:
          real source text, an Understand version, audio you can play, and a direct path to test the app on Android.
        </p>
        <div className="ae-actions">
          <a className="ae-primary" href={playTestingHref} target="_blank" rel="noopener noreferrer" data-understand-event="understand_play_testing_cta_clicked" data-understand-label="play_testing">
            Try the Android test
          </a>
          <a className="ae-secondary" href="#audio">Play audio sample</a>
        </div>
      </section>

      <section className="ae-card ae-source">
        <div>
          <p className="ae-eyebrow">Source</p>
          <h2>{source.title}</h2>
          <p>
            Author: {source.author}. Translator: {source.translator}. Source: <a href={source.source_url}>{source.source_name}</a>.
          </p>
          <p className="ae-note">{source.rights_note}</p>
        </div>
        <div>
          <p className="ae-eyebrow">Why this example?</p>
          <p>
            Aesop is a good first proof because the stories are complete, public-domain, short enough to compare, and long enough as a collection to show that Understand is not just a one-paragraph rewrite toy.
          </p>
        </div>
      </section>

      <section className="ae-card" id="audio">
        <p className="ae-eyebrow">Ready audio</p>
        <h2>Five fables, retold for clearer listening</h2>
        <audio controls preload="metadata" src={audioPath} data-understand-audio="aesop-clear-retellings" className="ae-audio">
          Your browser does not support the audio element.
        </audio>
        <p className="ae-note">
          Retelling style: Plain explainer. Closeness: Clear / Retold. Voice: neutral generated read for this first public proof.
        </p>
      </section>

      <section className="ae-section">
        <p className="ae-eyebrow">Original → Understand</p>
        <h2>What changed?</h2>
        <p className="ae-section-copy">
          Each fable keeps the same characters, plot, and moral, but is smoothed for listening on a phone. The retelling is for comprehension; it does not replace the original.
        </p>
        <div className="ae-grid">
          {(retellings as Array<{
            source_title: string;
            retold_text: string;
            style_label: string;
            closeness_label: string;
            what_changed: string[];
            what_stayed_close: string[];
          }>).map((retelling) => {
            const original = selectionByTitle.get(retelling.source_title);
            return (
              <article className="ae-example" key={retelling.source_title}>
                <p className="ae-badge">{retelling.style_label} · {retelling.closeness_label}</p>
                <h3>{titleCaseFromSource(retelling.source_title)}</h3>
                <div className="ae-compare">
                  <div>
                    <strong>Original</strong>
                    <p>{original?.original_text}</p>
                  </div>
                  <div>
                    <strong>Understand version</strong>
                    <p>{retelling.retold_text}</p>
                  </div>
                </div>
                <div className="ae-notes">
                  <div>
                    <strong>Changed</strong>
                    <ul>{retelling.what_changed.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                  <div>
                    <strong>Stayed close</strong>
                    <ul>{retelling.what_stayed_close.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="ae-card ae-cta">
        <p className="ae-eyebrow">Try it on your phone</p>
        <h2>Use Understand as an on-ramp to difficult text.</h2>
        <p>
          This example page is public proof. The Android test is where you try the product loop on your own text.
        </p>
        <a className="ae-primary" href={playTestingHref} target="_blank" rel="noopener noreferrer" data-understand-event="understand_play_testing_cta_clicked" data-understand-label="play_testing">
          Open the Play testing link
        </a>
      </section>

      <section className="ae-card">
        <p className="ae-eyebrow">FAQ</p>
        <h2>Common questions</h2>
        <details open>
          <summary>Is this the original Aesop text?</summary>
          <p>The page shows public-domain original text from Project Gutenberg alongside an Understand retelling.</p>
        </details>
        <details>
          <summary>Does the retelling replace the original?</summary>
          <p>No. It is retold to help comprehension and listening. Compare with the original when accuracy matters.</p>
        </details>
        <details>
          <summary>Why use public-domain sources?</summary>
          <p>Public-domain sources let us build useful public pages with real examples, source attribution, and ready audio without relying on copyrighted excerpts.</p>
        </details>
      </section>

      <style>{`
        .ae-page{background:#101820;color:#f7f1e8;min-height:100vh;padding:48px 20px;font-family:Inter,system-ui,sans-serif}.ae-hero,.ae-section,.ae-card{max-width:1120px;margin:0 auto 28px}.ae-hero{padding:72px 0}.ae-eyebrow{color:#06d6a0;text-transform:uppercase;letter-spacing:.14em;font-size:.75rem;font-weight:900}.ae-hero h1{font-family:Georgia,serif;font-size:clamp(2.8rem,7vw,6.4rem);line-height:.95;margin:12px 0}.ae-lede,.ae-section-copy{font-size:1.22rem;line-height:1.65;color:rgba(247,241,232,.78);max-width:850px}.ae-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}.ae-primary,.ae-secondary{border-radius:999px;padding:14px 20px;font-weight:900;text-decoration:none}.ae-primary{background:#06d6a0;color:#101820}.ae-secondary{border:1px solid rgba(255,255,255,.2);color:#f7f1e8}.ae-card,.ae-example{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:28px;padding:28px}.ae-source{display:grid;grid-template-columns:1fr 1fr;gap:24px}.ae-card h2,.ae-section h2{font-family:Georgia,serif;font-size:2.2rem;margin:8px 0 12px}.ae-note{color:rgba(247,241,232,.64);line-height:1.55}.ae-audio{width:100%;margin:18px 0}.ae-grid{display:grid;gap:22px}.ae-example h3{font-family:Georgia,serif;font-size:1.8rem;margin:8px 0 16px}.ae-badge{display:inline-block;background:rgba(6,214,160,.13);color:#91f0cf;border:1px solid rgba(6,214,160,.25);border-radius:999px;padding:8px 12px;font-weight:800;font-size:.82rem}.ae-compare,.ae-notes{display:grid;grid-template-columns:1fr 1fr;gap:18px}.ae-compare div,.ae-notes div{background:rgba(0,0,0,.2);border-radius:18px;padding:18px}.ae-compare p,.ae-notes li,.ae-card p{line-height:1.6;color:rgba(247,241,232,.78)}.ae-card a{color:#06d6a0}.ae-cta{text-align:center}.ae-cta .ae-primary{display:inline-block;color:#101820;margin-top:12px}details{border-top:1px solid rgba(255,255,255,.12);padding:16px 0}summary{font-weight:900;cursor:pointer}@media(max-width:760px){.ae-source,.ae-compare,.ae-notes{grid-template-columns:1fr}.ae-hero{padding-top:36px}.ae-card,.ae-example{padding:20px}}
      `}</style>
      </main>
    </>
  );
}
