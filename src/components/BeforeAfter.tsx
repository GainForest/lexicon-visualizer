"use client";

import { useState, useEffect, useRef } from "react";

// Static imports for before/after comparison
import origInfo from "@/data/original-lexicons/organization/info.json";
import enrichedInfo from "@/data/lexicons/organization/info.json";
import origSite from "@/data/original-lexicons/organization/site.json";
import enrichedSite from "@/data/lexicons/organization/site.json";
import enrichedAudio from "@/data/lexicons/organization/recordings/audio.json";

type ComparisonItem = {
  id: string;
  title: string;
  subtitle: string;
  before: {
    label: string;
    fieldCount: number;
    highlights: string[];
    description: string;
  };
  after: {
    label: string;
    fieldCount: number;
    highlights: string[];
    description: string;
  };
  newFieldCount: number;
};

function countProperties(data: Record<string, unknown>): number {
  const defs = data["defs"] as Record<string, unknown> | undefined;
  if (!defs) return 0;
  let count = 0;
  for (const def of Object.values(defs)) {
    const d = def as Record<string, unknown>;
    const record = d["record"] as Record<string, unknown> | undefined;
    const props = (record?.["properties"] ?? d["properties"]) as
      | Record<string, unknown>
      | undefined;
    if (props) count += Object.keys(props).length;
  }
  return count;
}

const comparisons: ComparisonItem[] = [
  {
    id: "info",
    title: "organization.info",
    subtitle: "Organization identity & governance",
    before: {
      label: "Original",
      fieldCount: countProperties(origInfo as Record<string, unknown>),
      highlights: [
        "shortDescription as plain string",
        "longDescription as markdown string",
        "visibility: Public | Hidden",
        "email with format: uri (bug!)",
        "No createdAt timestamp",
      ],
      description:
        "The original info lexicon used plain strings for rich content and had a bug where email was typed as a URI.",
    },
    after: {
      label: "Enriched",
      fieldCount: countProperties(enrichedInfo as Record<string, unknown>),
      highlights: [
        "shortDescription → richtext ref",
        "longDescription → linearDocument ref",
        "visibility: Public | Unlisted",
        "email fixed (no format constraint)",
        "createdAt added as required field",
        "ecosystemTypes with 15 known values",
        "focusSpeciesGroups with 19 known values",
        "dataLicense, dataDownloadUrl, fundingSourcesDescription",
      ],
      description:
        "Upgraded to richtext refs, fixed the email bug, added createdAt, and added ecosystem/species focus arrays for discoverability.",
    },
    newFieldCount: 7,
  },
  {
    id: "site",
    title: "organization.site",
    subtitle: "Conservation site with environmental context",
    before: {
      label: "Original",
      fieldCount: countProperties(origSite as Record<string, unknown>),
      highlights: [
        "Only 6 fields total",
        "name, lat, lon, area, shapefile, createdAt",
        "No location hierarchy",
        "No biome or ecosystem data",
        "No protection status",
      ],
      description:
        "The original site lexicon was minimal — just coordinates and a shapefile. No environmental context whatsoever.",
    },
    after: {
      label: "Enriched",
      fieldCount: countProperties(enrichedSite as Record<string, unknown>),
      highlights: [
        "Full location hierarchy (country → municipality)",
        "biome with 17 known values",
        "protectionStatus with 12 known values",
        "IUCN category + WDPA ID",
        "Climate data (rainfall, temperature, zone)",
        "monitoringStartDate",
        "Rich text description",
        "siteRemarks for field notes",
      ],
      description:
        "Transformed from a minimal coordinate record into a comprehensive site profile with full environmental and protection context.",
    },
    newFieldCount: 17,
  },
  {
    id: "audio",
    title: "organization.recordings.audio",
    subtitle: "Bioacoustic recording with device metadata",
    before: {
      label: "Original metadata",
      fieldCount: 5,
      highlights: [
        "metadata: codec, channels, duration, recordedAt, sampleRate",
        "coordinates as single string (deprecated)",
        "No device information",
        "No environmental conditions",
        "No frequency data",
      ],
      description:
        "The original audio metadata was minimal — just the bare technical specs needed to play back the file.",
    },
    after: {
      label: "Enriched metadata",
      fieldCount: countProperties(enrichedAudio as Record<string, unknown>),
      highlights: [
        "deviceModel + deviceSerialNumber",
        "gain, bitDepth, fileFormat, fileSizeBytes",
        "decimalLatitude + decimalLongitude (replaces coordinates)",
        "altitude, habitat, siteRef",
        "minFrequencyHz + maxFrequencyHz",
        "signalToNoiseRatio",
        "weatherConditions, temperature, humidity, windSpeed",
        "spectrogram + thumbnail on main record",
        "license, recordedBy, tags",
      ],
      description:
        "Massively enriched with device provenance, precise GPS, frequency range, environmental conditions, and visual evidence.",
    },
    newFieldCount: 19,
  },
];

function ComparisonCard({ item }: { item: ComparisonItem }) {
  const [view, setView] = useState<"before" | "after">("before");
  const current = view === "before" ? item.before : item.after;

  return (
    <div
      className="rounded-2xl overflow-hidden glass"
      style={{ border: "1px solid var(--border-subtle)" }}
    >
      {/* Header */}
      <div
        className="p-6 border-b"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3
              className="font-mono text-base font-bold mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              {item.title}
            </h3>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {item.subtitle}
            </p>
          </div>
          <div
            className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              background: "rgba(34,197,94,0.15)",
              color: "#22c55e",
              border: "1px solid rgba(34,197,94,0.3)",
            }}
          >
            +{item.newFieldCount} new fields
          </div>
        </div>

        {/* Toggle */}
        <div
          className="flex mt-4 rounded-lg overflow-hidden"
          style={{ border: "1px solid var(--border-subtle)" }}
        >
          <button
            onClick={() => setView("before")}
            className="flex-1 py-2 text-sm font-medium transition-all duration-200"
            style={{
              background:
                view === "before"
                  ? "rgba(139,111,71,0.2)"
                  : "transparent",
              color:
                view === "before"
                  ? "var(--earth-tan)"
                  : "var(--text-muted)",
              borderRight: "1px solid var(--border-subtle)",
            }}
          >
            Before
          </button>
          <button
            onClick={() => setView("after")}
            className="flex-1 py-2 text-sm font-medium transition-all duration-200"
            style={{
              background:
                view === "after"
                  ? "rgba(74,140,74,0.2)"
                  : "transparent",
              color:
                view === "after" ? "#4a8c4a" : "var(--text-muted)",
            }}
          >
            After
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Field count */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="font-serif text-4xl font-bold"
            style={{
              color: view === "after" ? "#22c55e" : "var(--earth-tan)",
            }}
          >
            {current.fieldCount}
          </div>
          <div>
            <div
              className="text-sm font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              {current.label}
            </div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>
              total fields
            </div>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          {current.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-col gap-2">
          {current.highlights.map((h) => (
            <div key={h} className="flex items-start gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                style={{
                  background:
                    view === "after" ? "#22c55e" : "var(--earth-tan)",
                }}
              />
              <span
                className="text-xs leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {h}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
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
      id="comparison"
      ref={sectionRef}
      className="py-32 px-6"
      style={{
        background:
          "linear-gradient(180deg, var(--forest-deep) 0%, var(--forest-dark) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="inline-block text-xs tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
            style={{
              color: "var(--gold)",
              background: "rgba(201,168,76,0.1)",
              border: "1px solid rgba(201,168,76,0.2)",
            }}
          >
            Before & After
          </div>
          <h2
            className="font-serif text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            The Transformation
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Toggle between the original and enriched versions to see exactly
            what changed — and why it matters for conservation data quality.
          </p>
        </div>

        {/* Comparison cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {comparisons.map((item) => (
            <ComparisonCard key={item.id} item={item} />
          ))}
        </div>

        {/* Bottom note */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-400 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            All changes are backward-compatible. Existing records remain valid —
            new fields are optional unless explicitly marked required.
          </p>
        </div>
      </div>
    </section>
  );
}
