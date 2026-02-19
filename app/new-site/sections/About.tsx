export default function About() {
  return (
    <section className="nr-section">
      <div className="nr-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="mb-6">Hi, I'm Marcin.</h2>

            <div
              className="space-y-4"
              style={{ color: 'var(--nr-text-muted)' }}
            >
              <p>
                I spent years building digital products at the enterprise level
                — designing animation systems for Northern Trust, architecting
                healthcare portals that handle multimillion-dollar transactions,
                leading teams at agencies. I was good at it. But I kept noticing
                the same thing: small businesses were getting the worst deal in
                tech.
              </p>

              <p>
                So I made a choice. The same way a Michelin-trained chef might
                leave a hotel kitchen to open a neighborhood restaurant, I took
                everything I learned building for the biggest companies and
                focused it where it actually changes lives — on businesses like
                yours.
              </p>

              <p>
                No account managers. No juniors learning on your dime. When you
                hire Nice Right, you work directly with me — the same person who
                designed micro-interactions for Northern Trust and built a
                restaurant's entire web presence over a weekend.
              </p>
            </div>

            <p className="mt-6 text-sm" style={{ color: 'var(--nr-text-dim)' }}>
              Currently working with clients in financial services, healthcare,
              food service, e-commerce, conservation tech, and local services.
            </p>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative max-w-sm">
              <div
                className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl"
                style={{
                  background:
                    'linear-gradient(135deg, var(--nr-navy-light) 0%, var(--nr-navy) 100%)',
                }}
              >
                <img
                  src="/images/me-low.jpg"
                  alt="Marcin Dabrowski"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
