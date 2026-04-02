import './_shared/tokens.css';
import { Nav } from './_home/components/Nav';
import { Footer } from './_home/components/Footer';

export default function NotFound() {
  return (
    <>
      <Nav defaultSolid />
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          padding: '6rem 2rem 4rem',
          textAlign: 'center',
          background: 'var(--v9-bg-dark)',
          color: 'var(--v9-text-light)',
        }}
      >
        <p
          aria-hidden="true"
          style={{
            fontSize: 'clamp(6rem, 20vw, 12rem)',
            fontWeight: 700,
            lineHeight: 1,
            margin: 0,
            color: 'var(--v9-accent)',
            fontFamily: 'var(--v9-font-heading)',
          }}
        >
          404
        </p>
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 600,
            margin: '1rem 0 0.75rem',
            fontFamily: 'var(--v9-font-heading)',
          }}
        >
          Page not found
        </h1>
        <p
          style={{
            color: 'var(--v9-text-muted-light)',
            maxWidth: '36ch',
            marginBottom: '2rem',
            fontFamily: 'var(--v9-font-body)',
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <a
          href="/"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.75rem',
            background: 'var(--v9-accent)',
            color: 'var(--v9-text-light)',
            borderRadius: 'var(--v9-radius)',
            textDecoration: 'none',
            fontFamily: 'var(--v9-font-body)',
            fontWeight: 500,
            fontSize: '1rem',
          }}
        >
          Back to homepage
        </a>
      </main>
      <Footer />
    </>
  );
}
