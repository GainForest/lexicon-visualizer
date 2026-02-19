export default function Footer() {
  return (
    <footer
      className="relative py-16 px-6 border-t"
      style={{
        borderColor: "var(--border-subtle)",
        background: "linear-gradient(to top, #050f05, var(--forest-deep))",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="font-serif text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
              GainForest
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Building open infrastructure for nature
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a
              href="https://gainforest.earth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:opacity-80 transition-opacity"
              style={{ color: "var(--text-secondary)" }}
            >
              gainforest.earth
            </a>
            <a
              href="https://github.com/GainForest"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:opacity-80 transition-opacity"
              style={{ color: "var(--text-secondary)" }}
            >
              GitHub
            </a>
            <a
              href="https://atproto.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:opacity-80 transition-opacity"
              style={{ color: "var(--text-secondary)" }}
            >
              ATProto
            </a>
          </div>

          {/* Attribution */}
          <div className="text-center md:text-right">
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Built for GainForest
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
              Lexicon Visualizer · 2025
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 border-t text-center"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
            All lexicon schemas are open source and published under the ATProto ecosystem.
            Data sovereignty and conservation transparency are core principles of GainForest.
          </p>
        </div>
      </div>
    </footer>
  );
}
