"use client";

import { useEffect, useRef } from "react";

const cards = [
  {
    icon: "🌿",
    title: "Biodiversity Monitoring",
    description:
      "The enriched lexicons align with Darwin Core standards, enabling interoperability with GBIF, iNaturalist, and global biodiversity databases. New fields for species traits, conservation status, and multi-modal evidence (audio, video, spectrogram) make every observation scientifically rigorous.",
    accent: "#22c55e",
    highlights: ["Darwin Core alignment", "GBIF interoperability", "Multi-modal evidence"],
  },
  {
    icon: "🔐",
    title: "Data Sovereignty",
    description:
      "ATProto's decentralized architecture means organizations own their data. The new evaluator lexicons enable AI services to annotate records without taking ownership. Wallet addresses on member profiles enable direct, transparent funding flows to field researchers.",
    accent: "#c9a84c",
    highlights: ["Decentralized ownership", "AI evaluator pattern", "Direct funding flows"],
  },
  {
    icon: "🌍",
    title: "Conservation Transparency",
    description:
      "Financial donation records with blockchain transaction hashes, site protection status with WDPA IDs, and data licensing fields create an auditable trail from funding to field impact. Every claim is verifiable on-chain and on-protocol.",
    accent: "#4a8c4a",
    highlights: ["On-chain verification", "WDPA integration", "Auditable funding trails"],
  },
];

export default function Overview() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="overview"
      ref={sectionRef}
      className="py-32 px-6"
      style={{
        background:
          "linear-gradient(180deg, var(--forest-deep) 0%, var(--forest-dark) 50%, var(--forest-deep) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <div
            className="inline-block text-xs tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
            style={{
              color: "var(--gold)",
              background: "rgba(201,168,76,0.1)",
              border: "1px solid rgba(201,168,76,0.2)",
            }}
          >
            Context
          </div>
          <h2
            className="font-serif text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Why These Changes Matter
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            GainForest's lexicon enrichment isn't just schema work — it's
            infrastructure for a more transparent, interoperable, and
            sovereign conservation ecosystem.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div
              key={card.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="fade-in-up glass rounded-2xl p-8 flex flex-col gap-6 hover:scale-[1.02] transition-transform duration-300"
              style={{
                borderColor: `${card.accent}30`,
              }}
            >
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: `${card.accent}15`, border: `1px solid ${card.accent}30` }}
              >
                {card.icon}
              </div>

              {/* Title */}
              <h3
                className="font-serif text-2xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: "var(--text-secondary)" }}
              >
                {card.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-col gap-2">
                {card.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: card.accent }}
                    />
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
