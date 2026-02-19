export default function Footer() {
  return (
    <footer
      className="py-8"
      style={{
        backgroundColor: 'var(--nr-navy)',
        color: 'var(--nr-cream)',
      }}
    >
      <div className="nr-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-80">
            © 2026 Nice Right. Digital growth for small businesses.
          </p>
          <p className="text-sm opacity-60">Chicago's Northwest Side</p>
        </div>
      </div>
    </footer>
  );
}
