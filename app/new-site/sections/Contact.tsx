export default function Contact() {
  return (
    <section id="contact" className="nr-section nr-section-alt">
      <div className="nr-container">
        <div className="text-center mb-12">
          <h2 className="mb-4">
            Let's figure out what would work for your business
          </h2>
          <p className="text-lg" style={{ color: 'var(--nr-text-muted)' }}>
            30 minutes. No pitch, no pressure — just an honest conversation.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="nr-card text-center">
            <div className="mb-8">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: 'var(--nr-amber-light)' }}
              >
                <svg
                  className="w-8 h-8"
                  width="32"
                  height="32"
                  fill="none"
                  stroke="var(--nr-amber)"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <h3 className="text-2xl mb-4">Book a Free Strategy Call</h3>
              <p className="mb-8" style={{ color: 'var(--nr-text-muted)' }}>
                Pick a time that works for you. I will look at where your
                business is and tell you plainly what would move the needle.
              </p>

              <a
                href="https://cal.com/niceright/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="nr-btn nr-btn-accent text-lg px-8 py-4"
              >
                Schedule Your Call
              </a>
            </div>

            <div
              className="pt-8 border-t"
              style={{ borderColor: 'var(--nr-border)' }}
            >
              <p
                className="text-center mb-4"
                style={{ color: 'var(--nr-text-muted)' }}
              >
                Prefer to reach out directly?
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="mailto:Marcin@uxoxo.xyz"
                  className="flex items-center gap-2 font-medium"
                  style={{ color: 'var(--nr-amber)' }}
                >
                  <svg
                    className="w-5 h-5"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Marcin@uxoxo.xyz
                </a>
                <a
                  href="https://linkedin.com/in/mklaudiusz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-medium"
                  style={{ color: 'var(--nr-amber)' }}
                >
                  <svg
                    className="w-5 h-5"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
