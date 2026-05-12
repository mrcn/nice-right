'use client';

import { useEffect, useState } from 'react';

const cycleWords = [
  'Hegel',
  'Carlyle',
  'Kant',
  'the IRS',
  'Marx',
  'Heidegger',
  'the Iliad',
  'Sun Tzu',
  'Foucault',
];

type SourceKey = 'hegel' | 'marx' | 'iliad' | 'terms' | 'nejm';
type RegisterKey =
  | 'plain'
  | 'kindergarten'
  | 'bedtime'
  | 'wellness'
  | 'barista'
  | 'announcer'
  | 'uncle';

const sources: Record<SourceKey, { title: string; attribution: string; text: string }> = {
  hegel: {
    title: 'Phenomenology of Spirit',
    attribution: '— G.W.F. HEGEL · 1807',
    text: '"The truth is the whole. The whole, however, is merely the essential nature reaching its completeness through the process of its own development."',
  },
  marx: {
    title: 'Capital, Vol. 1',
    attribution: '— KARL MARX · 1867',
    text: '"The wealth of those societies in which the capitalist mode of production prevails, presents itself as an immense accumulation of commodities."',
  },
  iliad: {
    title: 'The Iliad, Book 1',
    attribution: '— HOMER (LATTIMORE TR.)',
    text: '"Sing, goddess, the anger of Peleus\' son Achilles and its devastation, which put pains thousandfold upon the Achaians."',
  },
  terms: {
    title: 'Terms of Service',
    attribution: '— APP STORE · SECTION 4.B',
    text: '"You agree that the Licensed Application is licensed, not sold, to you by the Application Provider for use only under the terms of this license."',
  },
  nejm: {
    title: 'NEJM oncology',
    attribution: '— NEJM · APRIL 2026',
    text: '"Tyrosine kinase inhibitors have demonstrated durable efficacy in patients harboring driver mutations, though acquired resistance through bypass-track activation remains a clinical challenge."',
  },
};

const rewrites: Record<SourceKey, Record<RegisterKey, string>> = {
  hegel: {
    plain:
      "Truth isn't a single thing. It's the entire picture, only revealed when something completes the long process of becoming itself.",
    kindergarten:
      "Truth is like a really big puzzle. You only see the picture when ALL the pieces are in. So you can't know the truth until something has finished growing up.",
    bedtime:
      'And so, the truth was the whole. Slowly, gently, the whole became itself — not all at once, but through a long quiet process. By the end, it was complete.',
    wellness:
      "Babe, truth is a journey. It's not a destination. The whole self only emerges when you've done the WORK and completed the unfolding.",
    barista:
      "Okay so, truth? It's not, like, one thing. It's the whole thing. But the whole thing only happens after a long, exhausting process of becoming. Anyway, your latte's ready.",
    announcer:
      "FOLKS, truth is the whole. THE WHOLE. And he's gotta complete the development, ladies and gentlemen. Through the entire process. Unbelievable.",
    uncle:
      "Lemme tell ya something. The truth? Is the WHOLE thing. Not part of it. The whole damn thing. And it only shows up when somethin' grows all the way up.",
  },
  marx: {
    plain:
      'In capitalist societies, wealth shows up as a huge pile of things you can buy and sell. The basic unit of that wealth is a single thing for sale.',
    kindergarten:
      'In some places, being rich means having a LOT of things. Like a big pile of toys. And one toy is the smallest piece of that pile.',
    bedtime:
      'Long ago, in lands where buying and selling ruled, wealth became a great mountain of things. And the smallest piece of that mountain was a single thing, waiting to be sold.',
    wellness:
      'Capitalism is the energy where abundance shows up as STUFF. The accumulation is real. The unit is a single object — the commodity. Notice how it makes you feel.',
    barista:
      "So like, in capitalism, wealth is just... stuff. A LOT of stuff. And the basic building block of all that wealth is one piece of stuff. That's it.",
    announcer:
      "IN CAPITALIST SOCIETIES, folks, what you're looking at is an IMMENSE accumulation of commodities. And the unit, the basic UNIT — it's one single commodity.",
    uncle:
      "Capitalism, right? It's just a buncha stuff. Mountain of stuff. And every piece of that mountain? One commodity. Same as it ever was.",
  },
  iliad: {
    plain:
      "Goddess, sing about Achilles' anger — the son of Peleus — and how that anger caused enormous suffering to the Greek army.",
    kindergarten:
      'A long time ago there was a man named Achilles. And he got SUPER angry. And his anger made a lot of his friends get hurt.',
    bedtime:
      'Goddess, please tell us the story of the angry warrior Achilles. Tell us how his anger spread, like ripples on dark water, and brought sorrow.',
    wellness:
      "Goddess, hold space for Achilles' rage. His unprocessed anger created a thousandfold ripple of pain across the Greek collective.",
    barista:
      'Okay so, can you tell me the story about how mad Achilles got, and how it ruined everything for the Greeks? Thousands of dead people kind of mad.',
    announcer:
      "GODDESS! Sing it! The ANGER of PELEUS'S SON ACHILLES! And the DEVASTATION! Thousandfold pains upon the ACHAIANS!",
    uncle:
      "There was this guy, Achilles. Got REAL mad. And his mad ruined everything for his whole army. Thousand guys hurt, easy. Sing it.",
  },
  terms: {
    plain:
      "You're not buying the app. You're renting permission to use it under specific rules. The company that made it still owns it.",
    kindergarten:
      "When you get an app, you don't really own it. The company that made it lets you borrow it. You have to follow their rules!",
    bedtime:
      'And the company spoke softly: this little app is not yours. It is mine. You may use it gently, by these terms.',
    wellness:
      "You don't own the app — and that's actually fine. You're holding space for it. The provider holds the energy of ownership.",
    barista:
      "You don't own the app, okay? You're renting it. The rules are the rules. You already agreed.",
    announcer:
      'You AGREE, folks — agree — that the application is LICENSED, NOT SOLD. By the Application Provider. For use, under THE TERMS.',
    uncle:
      "Listen, you don't OWN the app. You're BORROWIN' it. From them. They got rules. You break the rules, they take it back.",
  },
  nejm: {
    plain:
      'A class of cancer drugs called TKIs works really well for patients whose tumors have specific genetic mutations. The problem: tumors often find a workaround and stop responding.',
    kindergarten:
      "There's special medicine that fights cancer cells with broken parts. And it works! But sometimes the cancer learns to go AROUND the medicine.",
    bedtime:
      'Once there was a medicine that knew exactly where the sickness lived. It worked beautifully — for a time. But the sickness was clever. It found another way.',
    wellness:
      'TKIs are a beautiful targeted therapy — they meet the cancer where it is. The challenge is that the body finds another path.',
    barista:
      "There's these cancer drugs called TKIs. They work GREAT — for a while. Then the cancer just like, finds a side road and goes around them.",
    announcer:
      'TKIs, folks. Tyrosine kinase inhibitors. CRUSHING IT for patients with driver mutations. But — BUT — resistance! Through bypass-track activation!',
    uncle:
      "These cancer pills, the TKIs, they work great. Real great. But the cancer's sneaky — it finds a back door.",
  },
};

const registerNames: Record<RegisterKey, string> = {
  plain: 'Plain English',
  kindergarten: 'Kindergarten',
  bedtime: 'Bedtime story',
  wellness: 'Wellness',
  barista: 'Tired barista',
  announcer: 'Sports announcer',
  uncle: 'Drunk uncle',
};

const sourcesOrder: { key: SourceKey; label: string }[] = [
  { key: 'hegel', label: 'Hegel · Phenomenology' },
  { key: 'marx', label: 'Marx · Capital' },
  { key: 'iliad', label: 'Homer · Iliad' },
  { key: 'terms', label: 'App Terms of Service' },
  { key: 'nejm', label: 'NEJM · oncology paper' },
];

const registersOrder: { key: RegisterKey; label: string; fidelity: 'HIGH' | 'MED' | 'LOW' }[] = [
  { key: 'plain', label: 'Plain English', fidelity: 'HIGH' },
  { key: 'kindergarten', label: 'Kindergarten', fidelity: 'HIGH' },
  { key: 'bedtime', label: 'Bedtime story', fidelity: 'MED' },
  { key: 'wellness', label: 'Wellness', fidelity: 'MED' },
  { key: 'barista', label: 'Tired barista', fidelity: 'MED' },
  { key: 'announcer', label: 'Sports announcer', fidelity: 'LOW' },
  { key: 'uncle', label: 'Drunk uncle', fidelity: 'LOW' },
];

export default function UnderstandPage() {
  const [cycleIdx, setCycleIdx] = useState(0);
  const [cycleVisible, setCycleVisible] = useState(true);
  const [curSource, setCurSource] = useState<SourceKey>('hegel');
  const [curRegister, setCurRegister] = useState<RegisterKey>('plain');
  const [outputVisible, setOutputVisible] = useState(true);

  // Cycle hero word
  useEffect(() => {
    const interval = setInterval(() => {
      setCycleVisible(false);
      setTimeout(() => {
        setCycleIdx((i) => (i + 1) % cycleWords.length);
        setCycleVisible(true);
      }, 220);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  // Fade output when source/register changes
  useEffect(() => {
    setOutputVisible(false);
    const t = setTimeout(() => setOutputVisible(true), 220);
    return () => clearTimeout(t);
  }, [curSource, curRegister]);

  const s = sources[curSource];

  return (
    <>
      <style jsx global>{`
        :root {
          --bg: #07060a;
          --bg-2: #0e0c13;
          --bg-3: #181520;
          --fg: #f4f0e6;
          --fg-dim: rgba(244, 240, 230, 0.62);
          --fg-faint: rgba(244, 240, 230, 0.36);
          --line: rgba(244, 240, 230, 0.08);
          --line-strong: rgba(244, 240, 230, 0.16);
          --warm: #e8b976;
          --warm-2: #d88b5c;
          --green: #5bd389;
        }
        body.understand-body {
          background: var(--bg);
          color: var(--fg);
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
          margin: 0;
        }
        body.understand-body::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 200;
          mix-blend-mode: overlay;
        }
        @keyframes understand-pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.45;
          }
        }
        @keyframes understand-wave {
          0%,
          100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.25);
          }
        }
        @keyframes understand-scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        @keyframes understand-progress {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>

      <UnderstandBodyClass />

      <div className="u-root">
        {/* Header */}
        <header className="u-header">
          <div className="u-container u-header-inner">
            <div className="u-brand">
              <div className="u-brand-mark" />
              Understand
            </div>
            <nav className="u-nav">
              <a href="#demo">Try it</a>
              <a href="#features">Features</a>
              <a href="#tester">Become a tester</a>
            </nav>
            <a href="#play" className="u-play-badge">
              <span className="u-triangle" />
              Get on Play Store
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="u-hero">
          <div className="u-container">
            <div className="u-hero-grid">
              <div className="u-hero-text">
                <div className="u-status-pill">Closed test live · Android · May 2026</div>
                <h1 className="u-h1">
                  Listen to anything.
                  <br />
                  Even{' '}
                  <span
                    className="u-cycle"
                    style={{ opacity: cycleVisible ? 1 : 0 }}
                  >
                    {cycleWords[cycleIdx]}
                  </span>
                  .
                </h1>
                <p className="u-hero-sub">
                  A reader for dense texts. AI rewrites the words for the ear, then reads them
                  aloud. Pick a register — plain English, wellness influencer, sports announcer.
                  Listen on a walk.
                </p>
                <div className="u-hero-ctas">
                  <a href="#play" className="u-play-badge-big">
                    <span className="u-icon">▶</span>
                    <span>
                      <span className="u-label-small">Get on</span>
                      <span className="u-label-big">Google Play</span>
                    </span>
                  </a>
                  <a href="#demo" className="u-ghost-link">
                    Try the demo →
                  </a>
                </div>
              </div>

              <div className="u-hero-phone-wrap">
                <div className="u-phone">
                  <div className="u-notch" />
                  <div className="u-phone-screen">
                    <div className="u-phone-status">
                      <span>9:41</span>
                      <span style={{ fontSize: 11 }}>●●● 5G</span>
                    </div>
                    <div className="u-phone-content">
                      <div className="u-phone-back">← Library</div>
                      <div className="u-phone-eyebrow">NOW LISTENING</div>
                      <div className="u-phone-title">Phenomenology of Spirit</div>
                      <div className="u-phone-meta">HEGEL · 1807 · TRANSLATED FOR THE EAR</div>
                      <div className="u-phone-text">
                        <div className="u-phone-text-scroll">
                          {[0, 1].map((rep) => (
                            <div key={rep}>
                              <p>
                                Truth isn&apos;t a single thing. It&apos;s the entire{' '}
                                <span className="u-hi">picture</span>, only revealed when something
                                completes the long process of becoming itself.
                              </p>
                              <p>
                                This is what philosophers mean when they say the truth is the whole
                                — not a fragment, but the totality.
                              </p>
                              <p>
                                And the totality is not a static state. It&apos;s a development. A
                                becoming. A long unfolding.
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="u-phone-player">
                        <div className="u-phone-play">▶</div>
                        <div className="u-phone-progress" />
                        <div className="u-phone-time">2:14</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="u-trust-bar">
              <div className="u-trust-bar-inner">
                <div className="u-trust-label">Currently</div>
                <div className="u-trust-item">
                  In Closed Testing<span className="u-chip">Google Play</span>
                </div>
                <div className="u-trust-item">
                  Verified on<span className="u-chip">Pixel 6 · Pixel 8</span>
                </div>
                <div className="u-trust-item">
                  Built by<span className="u-chip">Nice Right</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo */}
        <section className="u-demo-section" id="demo">
          <div className="u-container">
            <div className="u-section-eyebrow">The Translator</div>
            <h2 className="u-h2">
              Same source.
              <br />
              <span className="u-italic">Different mind.</span>
            </h2>
            <p className="u-section-sub">
              The AI rewrites the source text in a register you pick. Plain English preserves
              everything. Wellness Influencer reframes it. Sports Announcer embellishes for drama.
              Pick the mind. Hear the result.
            </p>

            <div className="u-demo-stage">
              <div className="u-demo-side">
                <div className="u-demo-card u-before">
                  <div className="u-card-label">
                    <span>The source</span>
                    <span className="u-warm">{s.title}</span>
                  </div>
                  <p>{s.text}</p>
                  <div className="u-source-attribution">{s.attribution}</div>
                </div>

                <div className="u-pills-block">
                  <div className="u-pills-label">Source text</div>
                  <div className="u-pills-row">
                    {sourcesOrder.map((src) => (
                      <button
                        key={src.key}
                        className={`u-pill ${curSource === src.key ? 'u-pill-active' : ''}`}
                        onClick={() => setCurSource(src.key)}
                        type="button"
                      >
                        {src.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="u-pills-block">
                  <div className="u-pills-label">
                    Register{' '}
                    <span className="u-help">— how the AI rewrites · fidelity descends</span>
                  </div>
                  <div className="u-pills-row">
                    {registersOrder.map((reg) => (
                      <button
                        key={reg.key}
                        className={`u-pill ${curRegister === reg.key ? 'u-pill-active' : ''}`}
                        onClick={() => setCurRegister(reg.key)}
                        type="button"
                      >
                        {reg.label} <span className="u-fidelity">{reg.fidelity}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="u-paid-callout">
                  <div className="u-paid-callout-dot" />
                  <div>
                    <strong>Paid tier:</strong> the voice adapts to match the register. Wellness
                    gets a calm warm voice. Sports Announcer gets high-energy. Drunk Uncle gets a
                    slow rasp. Coming with cloud voice.
                  </div>
                </div>
              </div>

              <div className="u-demo-card u-after">
                <div className="u-card-label">
                  <span>Rewritten</span>
                  <span className="u-warm">{registerNames[curRegister]}</span>
                </div>
                <div
                  className="u-output-text"
                  style={{ opacity: outputVisible ? 1 : 0 }}
                >
                  {rewrites[curSource][curRegister]}
                </div>
                <div className="u-audio-bar">
                  <button className="u-audio-play" type="button">
                    ▶
                  </button>
                  <div className="u-audio-wave">
                    {Array.from({ length: 12 }).map((_, idx) => (
                      <span key={idx} />
                    ))}
                  </div>
                  <div className="u-audio-time">0:12</div>
                </div>
                <div className="u-output-meta">
                  <span>Voice · Supertonic Emma (neutral)</span>
                  <span>Rewritten on-device in 1.8s</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="u-pillars" id="features">
          <div className="u-container">
            <div className="u-section-eyebrow">Three things</div>
            <h2 className="u-h2">
              What&apos;s in the box,
              <br />
              <span className="u-italic">honestly.</span>
            </h2>
            <div className="u-pillars-grid">
              <div className="u-pillar">
                <div className="u-pillar-icon">◐</div>
                <h3 className="u-pillar-h3">
                  <em>Offline</em> by default.
                </h3>
                <p>
                  A small language model and a TTS engine ship with the app. Works on a phone with
                  no internet, no account, no signup.
                </p>
              </div>
              <div className="u-pillar">
                <div className="u-pillar-icon">→</div>
                <h3 className="u-pillar-h3">
                  Rewritten <em>for the ear.</em>
                </h3>
                <p>
                  Numbers spelled out. Abbreviations expanded. Archaic prose modernized. Dense
                  academic writing translated for 1.5× speed on a walk.
                </p>
              </div>
              <div className="u-pillar">
                <div className="u-pillar-icon">♪</div>
                <h3 className="u-pillar-h3">
                  Alive <em>anywhere.</em>
                </h3>
                <p>
                  Background playback. Lock-screen controls. Headphones, car audio, the kitchen
                  counter. The app vanishes. The audio remains.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tester */}
        <section className="u-tester" id="tester">
          <div className="u-container">
            <div className="u-status-pill" style={{ marginBottom: 36 }}>
              12 / 14 — testing in progress
            </div>
            <h2 className="u-h2">
              Help me hit <span className="u-italic">the production gate.</span>
            </h2>
            <p className="u-tester-sub">
              I need 12 Android testers opted in for 14 consecutive days before Google lets me ship
              to production. You get the app early. I get over the line.
            </p>
            <a href="#play" className="u-play-badge-big">
              <span className="u-icon">▶</span>
              <span>
                <span className="u-label-small">Get on</span>
                <span className="u-label-big">Google Play</span>
              </span>
            </a>
            <div className="u-tester-fineprint">
              Or comment <span className="u-warm">&quot;tester&quot;</span> on any of my posts and
              I&apos;ll DM you the closed-test link.
            </div>
          </div>
        </section>

        <footer className="u-footer">
          <div className="u-container u-footer-inner">
            <span>
              © 2026 Understand · An experiment by{' '}
              <a href="https://niceright.co">Nice Right</a>
            </span>
            <span>v0.1 · 2026.05.11</span>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .u-root {
          font-family: 'Inter', system-ui, sans-serif;
          color: var(--fg);
          background: var(--bg);
          min-height: 100vh;
        }
        .u-italic {
          font-style: italic;
          color: var(--warm);
        }
        .u-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .u-warm {
          color: var(--warm);
        }
        .u-help {
          color: var(--fg-faint);
          text-transform: none;
          letter-spacing: 0;
          font-size: 12px;
        }
        .u-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(7, 6, 10, 0.7);
          backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid var(--line);
        }
        .u-header-inner {
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .u-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          font-size: 16px;
          letter-spacing: -0.3px;
        }
        .u-brand-mark {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          background: linear-gradient(135deg, var(--warm), var(--warm-2));
          position: relative;
        }
        .u-brand-mark::after {
          content: '';
          position: absolute;
          inset: 6px;
          border: 1.5px solid rgba(7, 6, 10, 0.7);
          border-radius: 2px;
        }
        .u-nav {
          display: flex;
          gap: 28px;
        }
        .u-nav a {
          color: var(--fg-dim);
          text-decoration: none;
          font-size: 14px;
          transition: color 0.15s;
        }
        .u-nav a:hover {
          color: var(--fg);
        }
        .u-play-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          background: var(--fg);
          color: var(--bg);
          border-radius: 100px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
        }
        .u-triangle {
          width: 0;
          height: 0;
          border-left: 8px solid var(--bg);
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          margin-left: 2px;
          display: inline-block;
        }
        .u-hero {
          padding: 80px 0 100px;
          position: relative;
          overflow: hidden;
        }
        .u-hero::before {
          content: '';
          position: absolute;
          top: 30%;
          left: 65%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(232, 185, 118, 0.18), transparent 65%);
          filter: blur(40px);
          z-index: 0;
        }
        .u-hero::after {
          content: '';
          position: absolute;
          top: 60%;
          left: 70%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(216, 139, 92, 0.14), transparent 60%);
          filter: blur(50px);
          z-index: 0;
        }
        .u-hero-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 56px;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        .u-hero-text {
          padding-right: 16px;
        }
        .u-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(91, 211, 137, 0.08);
          border: 1px solid rgba(91, 211, 137, 0.2);
          border-radius: 100px;
          font-size: 12px;
          color: var(--green);
          font-weight: 500;
          margin-bottom: 32px;
        }
        .u-status-pill::before {
          content: '';
          width: 6px;
          height: 6px;
          background: var(--green);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--green);
          animation: understand-pulse 2s ease-in-out infinite;
        }
        .u-h1 {
          font-family: 'Newsreader', 'Times New Roman', serif;
          font-weight: 400;
          font-size: clamp(48px, 6.2vw, 88px);
          line-height: 0.98;
          letter-spacing: -2.5px;
          margin: 0 0 28px;
        }
        .u-cycle {
          display: inline-block;
          color: var(--warm);
          font-style: italic;
          min-width: 5ch;
          transition: opacity 0.25s ease;
        }
        .u-hero-sub {
          font-size: 18px;
          color: var(--fg-dim);
          max-width: 460px;
          margin: 0 0 36px;
          line-height: 1.55;
        }
        .u-hero-ctas {
          display: flex;
          gap: 14px;
          align-items: center;
          flex-wrap: wrap;
        }
        .u-play-badge-big {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 16px 28px;
          background: var(--fg);
          color: var(--bg);
          border-radius: 14px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          transition: transform 0.15s, opacity 0.15s;
        }
        .u-play-badge-big:hover {
          transform: translateY(-1px);
          opacity: 0.92;
        }
        .u-icon {
          font-size: 26px;
          line-height: 1;
        }
        .u-label-small {
          font-size: 11px;
          color: rgba(7, 6, 10, 0.6);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          display: block;
          line-height: 1.2;
          margin-bottom: 2px;
        }
        .u-label-big {
          font-size: 17px;
          font-weight: 700;
        }
        .u-ghost-link {
          color: var(--fg-dim);
          text-decoration: none;
          font-size: 14px;
          padding: 12px 8px;
        }
        .u-ghost-link:hover {
          color: var(--fg);
        }
        .u-hero-phone-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .u-phone {
          width: 300px;
          height: 620px;
          background: linear-gradient(160deg, #1a1726, #0e0b18);
          border-radius: 46px;
          padding: 11px;
          position: relative;
          box-shadow: inset 0 0 0 1.5px rgba(244, 240, 230, 0.12),
            0 0 0 8px #18141f, 0 40px 100px rgba(0, 0, 0, 0.6),
            0 0 100px rgba(232, 185, 118, 0.18);
        }
        .u-notch {
          position: absolute;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          width: 102px;
          height: 26px;
          background: #050308;
          border-radius: 20px;
          z-index: 5;
        }
        .u-phone-screen {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #0b0915 0%, #07050e 100%);
          border-radius: 36px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .u-phone-status {
          height: 44px;
          padding: 14px 26px 4px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          color: var(--fg);
          font-size: 14px;
          font-weight: 600;
        }
        .u-phone-content {
          padding: 26px 22px 14px;
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .u-phone-back {
          font-size: 11px;
          color: var(--fg-faint);
          margin-bottom: 14px;
        }
        .u-phone-eyebrow {
          font-size: 10px;
          color: var(--warm);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .u-phone-eyebrow::before {
          content: '';
          width: 6px;
          height: 6px;
          background: var(--warm);
          border-radius: 50%;
          box-shadow: 0 0 6px var(--warm);
        }
        .u-phone-title {
          font-family: 'Newsreader', 'Times New Roman', serif;
          font-style: italic;
          font-size: 24px;
          line-height: 1.12;
          margin-bottom: 8px;
          color: var(--fg);
        }
        .u-phone-meta {
          font-size: 10px;
          color: var(--fg-faint);
          margin-bottom: 18px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }
        .u-phone-text {
          flex: 1;
          font-size: 13px;
          line-height: 1.6;
          color: rgba(244, 240, 230, 0.85);
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to bottom, black 78%, transparent 100%);
        }
        .u-phone-text-scroll {
          animation: understand-scroll 22s linear infinite;
        }
        .u-phone-text p {
          margin: 0 0 10px;
        }
        .u-hi {
          background: rgba(232, 185, 118, 0.18);
          padding: 1px 3px;
          border-radius: 2px;
        }
        .u-phone-player {
          margin: 12px 0 6px;
          padding: 11px 14px;
          background: rgba(244, 240, 230, 0.06);
          border: 1px solid rgba(244, 240, 230, 0.1);
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .u-phone-play {
          width: 30px;
          height: 30px;
          background: var(--warm);
          color: var(--bg);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          flex-shrink: 0;
        }
        .u-phone-progress {
          flex: 1;
          height: 3px;
          background: var(--line-strong);
          border-radius: 100px;
          overflow: hidden;
          position: relative;
        }
        .u-phone-progress::after {
          content: '';
          position: absolute;
          height: 100%;
          background: var(--warm);
          border-radius: 100px;
          animation: understand-progress 22s linear infinite;
        }
        .u-phone-time {
          font-size: 10px;
          color: var(--fg-dim);
          font-variant-numeric: tabular-nums;
        }
        .u-trust-bar {
          padding: 36px 0 0;
          margin-top: 80px;
          border-top: 1px solid var(--line);
        }
        .u-trust-bar-inner {
          display: flex;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .u-trust-label {
          font-size: 11px;
          color: var(--fg-faint);
          text-transform: uppercase;
          letter-spacing: 2.5px;
        }
        .u-trust-item {
          font-size: 14px;
          color: var(--fg-dim);
          font-weight: 500;
        }
        .u-chip {
          display: inline-block;
          margin-left: 8px;
          padding: 3px 10px;
          background: var(--bg-3);
          border-radius: 100px;
          font-size: 11px;
          color: var(--warm);
        }
        .u-demo-section {
          padding: 140px 0 120px;
          border-top: 1px solid var(--line);
          position: relative;
        }
        .u-section-eyebrow {
          font-size: 12px;
          color: var(--warm);
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .u-section-eyebrow::before {
          content: '';
          width: 36px;
          height: 1px;
          background: var(--warm);
        }
        .u-h2 {
          font-family: 'Newsreader', 'Times New Roman', serif;
          font-weight: 400;
          font-size: clamp(36px, 4.4vw, 56px);
          letter-spacing: -1.5px;
          line-height: 1.05;
          margin: 0 0 12px;
          max-width: 760px;
        }
        .u-section-sub {
          color: var(--fg-dim);
          font-size: 17px;
          max-width: 640px;
          margin: 0 0 56px;
          line-height: 1.5;
        }
        .u-demo-stage {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: stretch;
        }
        .u-demo-side {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .u-demo-card {
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 28px 32px;
          background: var(--bg-2);
        }
        .u-demo-card.u-after {
          border: 1px solid rgba(232, 185, 118, 0.3);
          background: linear-gradient(
            135deg,
            rgba(232, 185, 118, 0.05),
            rgba(216, 139, 92, 0.02)
          );
          flex: 1;
        }
        .u-card-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: var(--fg-faint);
          margin-bottom: 16px;
          display: flex;
          justify-content: space-between;
        }
        .u-demo-card.u-before p {
          font-family: 'Newsreader', 'Times New Roman', serif;
          font-style: italic;
          font-size: clamp(18px, 1.9vw, 22px);
          line-height: 1.4;
          color: var(--fg-dim);
          letter-spacing: -0.3px;
          margin: 0;
        }
        .u-output-text {
          font-family: 'Newsreader', 'Times New Roman', serif;
          font-size: clamp(18px, 1.9vw, 22px);
          line-height: 1.42;
          color: var(--fg);
          letter-spacing: -0.3px;
          min-height: 100px;
          transition: opacity 0.3s ease;
        }
        .u-source-attribution {
          font-size: 11px;
          color: var(--fg-faint);
          margin-top: 16px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .u-audio-bar {
          margin-top: 22px;
          padding: 14px 18px;
          background: rgba(7, 6, 10, 0.45);
          border: 1px solid var(--line);
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .u-audio-play {
          width: 38px;
          height: 38px;
          background: var(--warm);
          color: var(--bg);
          border-radius: 50%;
          border: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          cursor: pointer;
          flex-shrink: 0;
        }
        .u-audio-wave {
          flex: 1;
          display: flex;
          gap: 3px;
          align-items: center;
          height: 28px;
        }
        .u-audio-wave span {
          flex: 1;
          background: var(--warm);
          border-radius: 2px;
          animation: understand-wave 1.3s ease-in-out infinite;
        }
        .u-audio-wave span:nth-child(1) {
          height: 30%;
          animation-delay: 0s;
        }
        .u-audio-wave span:nth-child(2) {
          height: 60%;
          animation-delay: 0.06s;
        }
        .u-audio-wave span:nth-child(3) {
          height: 40%;
          animation-delay: 0.12s;
        }
        .u-audio-wave span:nth-child(4) {
          height: 85%;
          animation-delay: 0.18s;
        }
        .u-audio-wave span:nth-child(5) {
          height: 50%;
          animation-delay: 0.24s;
        }
        .u-audio-wave span:nth-child(6) {
          height: 95%;
          animation-delay: 0.3s;
        }
        .u-audio-wave span:nth-child(7) {
          height: 65%;
          animation-delay: 0.36s;
        }
        .u-audio-wave span:nth-child(8) {
          height: 80%;
          animation-delay: 0.42s;
        }
        .u-audio-wave span:nth-child(9) {
          height: 45%;
          animation-delay: 0.48s;
        }
        .u-audio-wave span:nth-child(10) {
          height: 70%;
          animation-delay: 0.54s;
        }
        .u-audio-wave span:nth-child(11) {
          height: 55%;
          animation-delay: 0.6s;
        }
        .u-audio-wave span:nth-child(12) {
          height: 90%;
          animation-delay: 0.66s;
        }
        .u-audio-time {
          font-size: 12px;
          color: var(--fg-dim);
          font-variant-numeric: tabular-nums;
        }
        .u-output-meta {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: var(--fg-faint);
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .u-pills-block {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .u-pills-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: var(--fg-faint);
        }
        .u-pills-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .u-pill {
          padding: 8px 14px;
          background: var(--bg-2);
          border: 1px solid var(--line);
          border-radius: 100px;
          color: var(--fg-dim);
          font-size: 13px;
          cursor: pointer;
          transition: all 0.18s;
          font-family: inherit;
          user-select: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .u-pill:hover {
          color: var(--fg);
          border-color: var(--line-strong);
        }
        .u-pill-active {
          background: var(--fg);
          color: var(--bg);
          border-color: var(--fg);
        }
        .u-fidelity {
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1px;
          background: rgba(244, 240, 230, 0.08);
          color: var(--fg-faint);
        }
        .u-pill-active .u-fidelity {
          background: rgba(7, 6, 10, 0.18);
          color: rgba(7, 6, 10, 0.6);
        }
        .u-paid-callout {
          margin-top: 24px;
          padding: 16px 20px;
          background: rgba(216, 139, 92, 0.06);
          border: 1px solid rgba(216, 139, 92, 0.22);
          border-radius: 12px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-size: 13px;
          line-height: 1.55;
          color: var(--fg-dim);
        }
        .u-paid-callout-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--warm-2);
          margin-top: 8px;
          flex-shrink: 0;
          box-shadow: 0 0 8px var(--warm-2);
        }
        .u-paid-callout strong {
          color: var(--warm-2);
          font-weight: 600;
        }
        .u-pillars {
          padding: 100px 0;
          border-top: 1px solid var(--line);
        }
        .u-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 56px;
        }
        .u-pillar {
          background: var(--bg-2);
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 32px;
        }
        .u-pillar:hover {
          border-color: var(--line-strong);
        }
        .u-pillar-icon {
          width: 38px;
          height: 38px;
          background: var(--bg-3);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          color: var(--warm);
          font-size: 18px;
        }
        .u-pillar-h3 {
          font-family: 'Newsreader', 'Times New Roman', serif;
          font-weight: 500;
          font-size: 22px;
          letter-spacing: -0.5px;
          margin: 0 0 8px;
        }
        .u-pillar-h3 em {
          font-style: italic;
          color: var(--warm);
        }
        .u-pillar p {
          font-size: 14px;
          color: var(--fg-dim);
          line-height: 1.55;
          margin: 0;
        }
        .u-tester {
          padding: 120px 0;
          border-top: 1px solid var(--line);
          text-align: center;
        }
        .u-tester-sub {
          color: var(--fg-dim);
          font-size: 17px;
          max-width: 540px;
          margin: 0 auto 40px;
          line-height: 1.5;
        }
        .u-tester-fineprint {
          margin-top: 32px;
          font-size: 12px;
          color: var(--fg-faint);
        }
        .u-tester .u-h2 {
          margin: 0 auto 16px;
        }
        .u-footer {
          padding: 48px 0 36px;
          border-top: 1px solid var(--line);
        }
        .u-footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: var(--fg-faint);
        }
        .u-footer a {
          color: var(--warm);
          text-decoration: none;
        }
        @media (max-width: 980px) {
          .u-hero-grid {
            grid-template-columns: 1fr;
            gap: 56px;
          }
          .u-demo-stage {
            grid-template-columns: 1fr;
          }
          .u-pillars-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

// Helper to add a class to the <body> element only on this route
function UnderstandBodyClass() {
  useEffect(() => {
    document.body.classList.add('understand-body');
    return () => {
      document.body.classList.remove('understand-body');
    };
  }, []);
  return null;
}
