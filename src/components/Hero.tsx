export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #050f05 0%, #0a1f0a 30%, #0f2a0f 60%, #1a3a1a 100%)",
      }}
    >
      {/* Animated background orbs */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 animate-pulse-ring"
          style={{
            background:
              "radial-gradient(circle, #4a8c4a 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full opacity-8 animate-pulse-ring"
          style={{
            background:
              "radial-gradient(circle, #c9a84c 0%, transparent 70%)",
            animationDelay: "1.5s",
          }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full opacity-6 animate-pulse-ring"
          style={{
            background:
              "radial-gradient(circle, #2d5a2d 0%, transparent 70%)",
            animationDelay: "3s",
          }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,140,74,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(74,140,74,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass text-sm tracking-widest uppercase"
          style={{ color: "var(--gold)", borderColor: "rgba(201,168,76,0.3)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          ATProto Lexicon Enrichment
        </div>

        {/* Main heading */}
        <h1
          className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          GainForest
          <br />
          <span
            className="animate-gradient"
            style={{
              background:
                "linear-gradient(90deg, #4a8c4a, #c9a84c, #4a8c4a, #22c55e)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Lexicon Evolution
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
          style={{ color: "var(--text-secondary)" }}
        >
          Enriching ATProto schemas for biodiversity monitoring, data
          sovereignty, and conservation transparency — building the open
          infrastructure for nature.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#explorer"
            className="px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #2d5a2d, #4a8c4a)",
              color: "var(--text-primary)",
              boxShadow: "0 4px 24px rgba(74,140,74,0.3)",
            }}
          >
            Explore Lexicons →
          </a>
          <a
            href="#overview"
            className="px-8 py-4 rounded-full font-semibold text-sm tracking-wide glass hover:scale-105 transition-all duration-300"
            style={{ color: "var(--text-secondary)" }}
          >
            Why These Changes
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
          Scroll
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          style={{ color: "var(--text-muted)" }}
        >
          <path
            d="M10 3v14M4 11l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--forest-deep))",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
