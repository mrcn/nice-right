const playTestingHref = 'https://play.google.com/apps/testing/xyz.uxoxo.understand';

const examples = [
  {
    status: 'Live',
    title: "Aesop's Fables retold for listening",
    href: '/labs/understand/examples/aesop-fables-retold-audio/',
    type: 'Fables · public domain',
    description: 'Five complete fables with original text, clearer Understand retellings, comparison notes, and ready audio.',
    proof: 'Shows the public-domain source → retelling → trust notes → audio page pattern.',
  },
  {
    status: 'Next',
    title: 'Shakespeare in plain English audio',
    href: '#shakespeare-next',
    type: 'Classic literature',
    description: 'A high-search, high-friction proof page for old language that people recognize but often avoid.',
    proof: 'Should test archaic syntax, poetry/drama, and trust around modernization.',
  },
  {
    status: 'Next',
    title: 'Plato or Genesis as difficult-text audio',
    href: '#plato-genesis-next',
    type: 'Philosophy or old/sacred text',
    description: 'A stronger trust test: dense argument or familiar old language with comparison requirements.',
    proof: 'Should test whether comparison and closeness controls feel necessary for serious material.',
  },
];

export const metadata = {
  title: 'Understand Examples: Public-Domain Texts Retold for Listening',
  description: 'Public proof pages for Understand: original public-domain texts, clearer retellings, audio, comparison notes, and Android testing CTA.',
};

export default function UnderstandExamplesIndex() {
  return (
    <main className="ex-page">
      <section className="ex-hero">
        <p className="ex-eyebrow">Understand example library</p>
        <h1>Public-domain texts, retold for listening.</h1>
        <p className="ex-lede">
          This is the SEO and product-proof footprint: useful public pages built from real source texts, not tiny demo snippets. Each example should show the original, the Understand version, what changed, what stayed close, and audio you can play.
        </p>
        <div className="ex-actions">
          <a className="ex-primary" href={playTestingHref} target="_blank" rel="noopener noreferrer">Try the Android test</a>
          <a className="ex-secondary" href="/labs/understand/">Back to Understand</a>
        </div>
      </section>

      <section className="ex-grid" aria-label="Understand examples">
        {examples.map((example) => (
          <article className="ex-card" key={example.title} id={example.href.startsWith('#') ? example.href.slice(1) : undefined}>
            <div className="ex-card-top">
              <span className={example.status === 'Live' ? 'ex-status-live' : 'ex-status-next'}>{example.status}</span>
              <span>{example.type}</span>
            </div>
            <h2>{example.title}</h2>
            <p>{example.description}</p>
            <div className="ex-proof"><strong>Why it matters:</strong> {example.proof}</div>
            {example.status === 'Live' ? (
              <a className="ex-link" href={example.href}>Open example →</a>
            ) : (
              <span className="ex-planned">Queued on the Kanban board</span>
            )}
          </article>
        ))}
      </section>

      <section className="ex-card ex-model">
        <p className="ex-eyebrow">Page model</p>
        <h2>Every example should earn search traffic by being useful.</h2>
        <ol>
          <li>Start with a public-domain or open source text.</li>
          <li>Show what makes it hard to read or hear.</li>
          <li>Provide the Understand retelling.</li>
          <li>Explain what changed and what stayed close.</li>
          <li>Include ready audio and a direct Play testing CTA.</li>
        </ol>
      </section>

      <style>{`
        .ex-page{background:#0b1117;color:#f6efe4;min-height:100vh;padding:48px 20px;font-family:Inter,system-ui,sans-serif}.ex-hero,.ex-grid,.ex-card{max-width:1120px;margin-left:auto;margin-right:auto}.ex-hero{padding:64px 0}.ex-eyebrow{color:#06d6a0;text-transform:uppercase;letter-spacing:.14em;font-size:.75rem;font-weight:900}.ex-hero h1{font-family:Georgia,serif;font-size:clamp(2.7rem,7vw,6.6rem);line-height:.94;margin:12px 0}.ex-lede{font-size:1.22rem;line-height:1.65;color:rgba(246,239,228,.76);max-width:880px}.ex-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}.ex-primary,.ex-secondary,.ex-link{border-radius:999px;padding:13px 18px;font-weight:900;text-decoration:none}.ex-primary{background:#06d6a0;color:#0b1117}.ex-secondary{border:1px solid rgba(255,255,255,.18);color:#f6efe4}.ex-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-bottom:28px}.ex-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:28px;padding:26px}.ex-card h2{font-family:Georgia,serif;font-size:1.8rem;line-height:1.05;margin:18px 0 12px}.ex-card p,.ex-card li{color:rgba(246,239,228,.76);line-height:1.6}.ex-card-top{display:flex;justify-content:space-between;gap:12px;color:rgba(246,239,228,.58);font-size:.82rem;font-weight:800}.ex-status-live,.ex-status-next{border-radius:999px;padding:6px 10px}.ex-status-live{background:rgba(6,214,160,.16);color:#93f0d0}.ex-status-next{background:rgba(232,185,118,.14);color:#e8b976}.ex-proof{background:rgba(0,0,0,.22);border-radius:18px;padding:16px;margin:18px 0;color:rgba(246,239,228,.78);line-height:1.55}.ex-link{display:inline-block;background:#f6efe4;color:#0b1117}.ex-planned{display:inline-block;color:#e8b976;font-weight:900}.ex-model{margin-top:20px}.ex-model ol{padding-left:20px}@media(max-width:900px){.ex-grid{grid-template-columns:1fr}.ex-hero{padding-top:32px}}
      `}</style>
    </main>
  );
}
