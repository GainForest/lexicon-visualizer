"use client";

import { useEffect, useRef, useState } from "react";

const newLexicons = [
  {
    id: "app.gainforest.dwc.event",
    shortName: "dwc.event",
    category: "Darwin Core",
    icon: "📅",
    description:
      "Enables the star-schema pattern where multiple occurrence records share a single event context — location, protocol, and effort — eliminating data duplication.",
    keyFeature: "Star-schema linkage",
  },
  {
    id: "app.gainforest.dwc.defs",
    shortName: "dwc.defs",
    category: "Darwin Core",
    icon: "🧬",
    description:
      "Shared type definitions for geolocation, taxon identification, plant traits, and abundance estimates — reusable building blocks for all biodiversity records.",
    keyFeature: "Reusable type library",
  },
  {
    id: "app.gainforest.dwc.measurement",
    shortName: "dwc.measurement",
    category: "Darwin Core",
    icon: "📏",
    description:
      "Solves the Simple DwC one-measurement-per-record limitation. Multiple measurements (DBH, height, canopy cover) can now link to a single occurrence.",
    keyFeature: "Multi-measurement support",
  },
  {
    id: "app.gainforest.evaluator.defs",
    shortName: "evaluator.defs",
    category: "Evaluator",
    icon: "🤖",
    description:
      "Typed result schemas for AI evaluator services: species ID, bioacoustics detection, deforestation alerts, carbon estimation, and data quality flags.",
    keyFeature: "8 typed result schemas",
  },
  {
    id: "app.gainforest.evaluator.evaluation",
    shortName: "evaluator.evaluation",
    category: "Evaluator",
    icon: "✅",
    description:
      "Decentralized AI evaluators publish typed, versioned evaluation results against any ATProto record. Supports batch evaluation and result supersession.",
    keyFeature: "Decentralized AI annotations",
  },
  {
    id: "app.gainforest.evaluator.service",
    shortName: "evaluator.service",
    category: "Evaluator",
    icon: "🏭",
    description:
      "Analogous to app.bsky.labeler.service — registers an account as an evaluator with declared capabilities, supported collections, and access model.",
    keyFeature: "Service registry pattern",
  },
  {
    id: "app.gainforest.evaluator.subscription",
    shortName: "evaluator.subscription",
    category: "Evaluator",
    icon: "🔔",
    description:
      "Users opt-in to evaluator services by publishing this record. Deleting it unsubscribes. Evaluators discover subscriptions via Jetstream.",
    keyFeature: "Opt-in evaluation model",
  },
];

export default function NewLexicons() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6"
      style={{
        background:
          "linear-gradient(180deg, var(--forest-deep) 0%, #050f05 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="inline-block text-xs tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
            style={{
              color: "#22c55e",
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.2)",
            }}
          >
            ✨ Brand New
          </div>
          <h2
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            7 New Lexicons
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Beyond enriching existing schemas, this release introduces entirely
            new lexicons for Darwin Core star-schema patterns and a
            decentralized AI evaluator system.
          </p>
        </div>

        {/* Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {newLexicons.map((lex, i) => (
            <a
              key={lex.id}
              href="#explorer"
              className="group rounded-xl p-5 flex flex-col gap-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              style={{
                background: "rgba(26,58,26,0.3)",
                border: "1px solid rgba(34,197,94,0.2)",
                transitionDelay: `${i * 50}ms`,
              }}
            >
              {/* Icon + category */}
              <div className="flex items-center justify-between">
                <span className="text-2xl">{lex.icon}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(34,197,94,0.1)",
                    color: "#22c55e",
                    border: "1px solid rgba(34,197,94,0.2)",
                  }}
                >
                  {lex.category}
                </span>
              </div>

              {/* Name */}
              <div>
                <div
                  className="font-mono text-sm font-bold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {lex.shortName}
                </div>
                <div
                  className="text-xs px-2 py-0.5 rounded inline-block"
                  style={{
                    background: "rgba(34,197,94,0.08)",
                    color: "#22c55e",
                    fontSize: "10px",
                  }}
                >
                  {lex.keyFeature}
                </div>
              </div>

              {/* Description */}
              <p
                className="text-xs leading-relaxed flex-1"
                style={{ color: "var(--text-secondary)" }}
              >
                {lex.description}
              </p>

              {/* Arrow */}
              <div
                className="text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "#22c55e" }}
              >
                Explore schema →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
