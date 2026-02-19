"use client";

import { useState, useEffect, useRef } from "react";
import { LEXICON_METADATA, CATEGORIES, getLexiconsByCategory, type LexiconCategory, type LexiconMeta } from "@/data/lexicon-metadata";
import SchemaView from "./SchemaView";

// Import all lexicon JSONs statically
import orgInfo from "@/data/lexicons/organization/info.json";
import orgSite from "@/data/lexicons/organization/site.json";
import orgMember from "@/data/lexicons/organization/member.json";
import orgDonation from "@/data/lexicons/organization/donation.json";
import orgLayer from "@/data/lexicons/organization/layer.json";
import orgDefaultSite from "@/data/lexicons/organization/defaultSite.json";
import orgGetIndexedOrganizations from "@/data/lexicons/organization/getIndexedOrganizations.json";
import orgMeasuredTreesCluster from "@/data/lexicons/organization/observations/measuredTreesCluster.json";
import orgDendogram from "@/data/lexicons/organization/observations/dendogram.json";
import orgObservationsFlora from "@/data/lexicons/organization/observations/flora.json";
import orgObservationsFauna from "@/data/lexicons/organization/observations/fauna.json";
import orgPredictionsFlora from "@/data/lexicons/organization/predictions/flora.json";
import orgPredictionsFauna from "@/data/lexicons/organization/predictions/fauna.json";
import orgAudio from "@/data/lexicons/organization/recordings/audio.json";
import dwcOccurrence from "@/data/lexicons/dwc/occurrence.json";
import dwcEvent from "@/data/lexicons/dwc/event.json";
import dwcDefs from "@/data/lexicons/dwc/defs.json";
import dwcMeasurement from "@/data/lexicons/dwc/measurement.json";
import evaluatorDefs from "@/data/lexicons/evaluator/defs.json";
import evaluatorEvaluation from "@/data/lexicons/evaluator/evaluation.json";
import evaluatorService from "@/data/lexicons/evaluator/service.json";
import evaluatorSubscription from "@/data/lexicons/evaluator/subscription.json";
import commonDefs from "@/data/lexicons/common/defs.json";

type LexiconDataMap = Record<string, Record<string, unknown>>;

const LEXICON_DATA: LexiconDataMap = {
  "organization/info": orgInfo,
  "organization/site": orgSite,
  "organization/member": orgMember,
  "organization/donation": orgDonation,
  "organization/layer": orgLayer,
  "organization/defaultSite": orgDefaultSite,
  "organization/getIndexedOrganizations": orgGetIndexedOrganizations,
  "organization/observations/measuredTreesCluster": orgMeasuredTreesCluster,
  "organization/observations/dendogram": orgDendogram,
  "organization/observations/flora": orgObservationsFlora,
  "organization/observations/fauna": orgObservationsFauna,
  "organization/predictions/flora": orgPredictionsFlora,
  "organization/predictions/fauna": orgPredictionsFauna,
  "organization/recordings/audio": orgAudio,
  "dwc/occurrence": dwcOccurrence,
  "dwc/event": dwcEvent,
  "dwc/defs": dwcDefs,
  "dwc/measurement": dwcMeasurement,
  "evaluator/defs": evaluatorDefs,
  "evaluator/evaluation": evaluatorEvaluation,
  "evaluator/service": evaluatorService,
  "evaluator/subscription": evaluatorSubscription,
  "common/defs": commonDefs,
};

const CATEGORY_ICONS: Record<LexiconCategory, string> = {
  Organization: "🏢",
  Observations: "🔬",
  Recordings: "🎙️",
  "Darwin Core": "🧬",
  Evaluator: "🤖",
  Common: "📦",
  Predictions: "🔮",
};

function countFields(data: unknown): number {
  if (!data || typeof data !== "object") return 0;
  const d = data as Record<string, unknown>;
  const defs = d["defs"] as Record<string, unknown> | undefined;
  if (!defs) return 0;
  let count = 0;
  for (const def of Object.values(defs)) {
    const defObj = def as Record<string, unknown>;
    const defType = defObj["type"] as string | undefined;

    if (defType === "query" || defType === "procedure" || defType === "subscription") {
      // Count parameters
      const params = defObj["parameters"] as Record<string, unknown> | undefined;
      const paramProps = params?.["properties"] as Record<string, unknown> | undefined;
      if (paramProps) count += Object.keys(paramProps).length;
      // Count output schema
      const output = defObj["output"] as Record<string, unknown> | undefined;
      const outputSchema = output?.["schema"] as Record<string, unknown> | undefined;
      const outputProps = outputSchema?.["properties"] as Record<string, unknown> | undefined;
      if (outputProps) count += Object.keys(outputProps).length;
      // Count input schema (procedure)
      const input = defObj["input"] as Record<string, unknown> | undefined;
      const inputSchema = input?.["schema"] as Record<string, unknown> | undefined;
      const inputProps = inputSchema?.["properties"] as Record<string, unknown> | undefined;
      if (inputProps) count += Object.keys(inputProps).length;
      // Count message schema (subscription)
      const message = defObj["message"] as Record<string, unknown> | undefined;
      const messageSchema = message?.["schema"] as Record<string, unknown> | undefined;
      const messageProps = messageSchema?.["properties"] as Record<string, unknown> | undefined;
      if (messageProps) count += Object.keys(messageProps).length;
    } else {
      const record = defObj["record"] as Record<string, unknown> | undefined;
      const props = (record?.["properties"] ?? defObj["properties"]) as Record<string, unknown> | undefined;
      if (props) count += Object.keys(props).length;
    }
  }
  return count;
}

export default function LexiconExplorer() {
  const [selectedId, setSelectedId] = useState<string>(LEXICON_METADATA[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const selectedMeta = LEXICON_METADATA.find((l) => l.id === selectedId)!;
  const selectedData = LEXICON_DATA[selectedMeta.path];
  const fieldCount = countFields(selectedData);

  function handleRefClick(ref: string) {
    // Try to find a lexicon that matches the ref
    const nsid = ref.split("#")[0];
    const match = LEXICON_METADATA.find((l) => l.id === nsid);
    if (match) {
      setSelectedId(match.id);
    }
  }

  return (
    <section
      id="explorer"
      ref={sectionRef}
      className="py-24 px-4 md:px-6"
      style={{ background: "var(--forest-deep)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className="inline-block text-xs tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
            style={{
              color: "var(--gold)",
              background: "rgba(201,168,76,0.1)",
              border: "1px solid rgba(201,168,76,0.2)",
            }}
          >
            Interactive Explorer
          </div>
          <h2
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Lexicon Explorer
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Click any lexicon to explore its schema. New fields are highlighted in green, modified fields in amber.
          </p>
        </div>

        {/* Main layout */}
        <div
          className={`flex gap-6 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Mobile sidebar toggle */}
          <button
            className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
            style={{
              background: "linear-gradient(135deg, #2d5a2d, #4a8c4a)",
              color: "white",
            }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle lexicon list"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* Sidebar */}
          <aside
            className={`
              fixed md:sticky md:top-20 md:self-start
              inset-0 md:inset-auto z-40 md:z-auto
              w-72 md:w-64 flex-shrink-0
              transition-transform duration-300 md:transform-none
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}
            style={{
              background: "var(--forest-dark)",
              borderRight: "1px solid var(--border-subtle)",
              maxHeight: "calc(100vh - 6rem)",
            }}
          >
            {/* Mobile close */}
            <button
              className="md:hidden absolute top-4 right-4 p-2 rounded-lg"
              style={{ color: "var(--text-muted)" }}
              onClick={() => setSidebarOpen(false)}
            >
              ✕
            </button>

            <div className="p-4 overflow-y-auto h-full">
              <div className="text-xs font-semibold tracking-widest uppercase mb-4 px-2" style={{ color: "var(--text-muted)" }}>
                Lexicons
              </div>

              {CATEGORIES.map((category) => {
                const items = getLexiconsByCategory(category);
                return (
                  <div key={category} className="mb-6">
                    <div className="flex items-center gap-2 px-2 mb-2">
                      <span className="text-sm">{CATEGORY_ICONS[category]}</span>
                      <span
                        className="text-xs font-semibold tracking-wide uppercase"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {category}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      {items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSelectedId(item.id);
                            setSidebarOpen(false);
                          }}
                          className="w-full text-left px-3 py-2.5 rounded-lg transition-all duration-150 flex items-center gap-2 group"
                          style={{
                            background: selectedId === item.id ? "rgba(74,140,74,0.2)" : "transparent",
                            border: selectedId === item.id ? "1px solid rgba(74,140,74,0.3)" : "1px solid transparent",
                            color: selectedId === item.id ? "var(--text-primary)" : "var(--text-secondary)",
                          }}
                        >
                          <span className="font-mono text-xs flex-1 truncate">{item.shortName}</span>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {item.deprecated && (
                              <span
                                className="text-xs px-1 rounded font-semibold"
                                style={{
                                  background: "rgba(239,68,68,0.15)",
                                  color: "#ef4444",
                                  fontSize: "9px",
                                  border: "1px solid rgba(239,68,68,0.3)",
                                }}
                                title={`Deprecated — use ${item.deprecatedReplacement} instead`}
                              >
                                DEP
                              </span>
                            )}
                            {item.isNew && (
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: "#22c55e" }}
                                title="New lexicon"
                              />
                            )}
                            {item.newFields.length > 0 && !item.isNew && (
                              <span
                                className="text-xs px-1 rounded"
                                style={{
                                  background: "rgba(34,197,94,0.15)",
                                  color: "#22c55e",
                                  fontSize: "10px",
                                }}
                              >
                                +{item.newFields.length}
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="md:hidden fixed inset-0 z-30 bg-black/60"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {/* Lexicon header */}
            <div
              className="rounded-2xl p-6 mb-6 glass"
              style={{ border: "1px solid var(--border-subtle)" }}
            >
              <div className="flex flex-wrap items-start gap-4 justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className="text-xs font-mono px-2 py-1 rounded"
                      style={{
                        background: "rgba(74,140,74,0.1)",
                        color: "var(--text-muted)",
                        border: "1px solid rgba(74,140,74,0.2)",
                      }}
                    >
                      {CATEGORY_ICONS[selectedMeta.category]} {selectedMeta.category}
                    </span>
                    {selectedMeta.deprecated && (
                      <span
                        className="text-xs px-2 py-1 rounded font-semibold"
                        style={{
                          background: "rgba(239,68,68,0.15)",
                          color: "#ef4444",
                          border: "1px solid rgba(239,68,68,0.4)",
                        }}
                        title={`Use ${selectedMeta.deprecatedReplacement} instead`}
                      >
                        ⚠️ DEPRECATED
                      </span>
                    )}
                    {selectedMeta.isNew && (
                      <span
                        className="text-xs px-2 py-1 rounded font-semibold"
                        style={{
                          background: "rgba(34,197,94,0.15)",
                          color: "#22c55e",
                          border: "1px solid rgba(34,197,94,0.3)",
                        }}
                      >
                        ✨ New Lexicon
                      </span>
                    )}
                  </div>
                  <h3
                    className="font-mono text-lg font-bold mb-1 break-all"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {selectedMeta.id}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {selectedMeta.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex gap-4 flex-shrink-0">
                  <div className="text-center">
                    <div className="font-serif text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                      {fieldCount}
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>fields</div>
                  </div>
                  {selectedMeta.newFields.length > 0 && (
                    <div className="text-center">
                      <div className="font-serif text-2xl font-bold" style={{ color: "#22c55e" }}>
                        +{selectedMeta.newFields.length}
                      </div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>new</div>
                    </div>
                  )}
                  {selectedMeta.modifiedFields.length > 0 && (
                    <div className="text-center">
                      <div className="font-serif text-2xl font-bold" style={{ color: "#f59e0b" }}>
                        ~{selectedMeta.modifiedFields.length}
                      </div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>modified</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Changes summary */}
              <div
                className="mt-4 pt-4 border-t text-sm"
                style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}
              >
                <span className="font-semibold" style={{ color: "var(--gold)" }}>Changes: </span>
                {selectedMeta.changesSummary}
              </div>

              {/* Deprecation notice */}
              {selectedMeta.deprecated && selectedMeta.deprecatedReplacement && (
                <div
                  className="mt-3 px-4 py-3 rounded-lg text-sm flex items-start gap-2"
                  style={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    color: "#fca5a5",
                  }}
                >
                  <span className="flex-shrink-0">⚠️</span>
                  <span>
                    <span className="font-semibold" style={{ color: "#ef4444" }}>Deprecated. </span>
                    Use{" "}
                    <button
                      className="font-mono underline underline-offset-2 hover:opacity-80 transition-opacity"
                      style={{ color: "#f87171" }}
                      onClick={() => handleRefClick(selectedMeta.deprecatedReplacement!)}
                    >
                      {selectedMeta.deprecatedReplacement}
                    </button>{" "}
                    instead.
                  </span>
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-6 px-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ background: "rgba(34,197,94,0.3)", border: "1px solid rgba(34,197,94,0.5)" }} />
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>New field</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ background: "rgba(245,158,11,0.3)", border: "1px solid rgba(245,158,11,0.5)" }} />
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>Modified field</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)" }} />
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>Required field</span>
              </div>
            </div>

            {/* Schema view */}
            {selectedData ? (
              <SchemaView
                lexiconData={selectedData}
                newFields={selectedMeta.newFields}
                modifiedFields={selectedMeta.modifiedFields}
                onRefClick={handleRefClick}
              />
            ) : null}
          </main>
        </div>
      </div>
    </section>
  );
}
