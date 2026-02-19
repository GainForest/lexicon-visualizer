"use client";

import { useState } from "react";

type FieldDef = {
  type?: string;
  description?: string;
  format?: string;
  maxGraphemes?: number;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  enum?: string[];
  knownValues?: string[];
  ref?: string;
  refs?: string[];
  items?: FieldDef;
  required?: string[];
  properties?: Record<string, FieldDef>;
  accept?: string[];
  maxSize?: number;
};

type FieldCardProps = {
  name: string;
  def: FieldDef;
  isNew?: boolean;
  isModified?: boolean;
  isRequired?: boolean;
  onRefClick?: (ref: string) => void;
  depth?: number;
};

function TypeBadge({ type, format }: { type?: string; format?: string }) {
  const colors: Record<string, string> = {
    string: "#4a8c4a",
    integer: "#c9a84c",
    boolean: "#6b8f6b",
    array: "#2d5a2d",
    object: "#1a3a1a",
    ref: "#4a8c4a",
    union: "#8b6f47",
    blob: "#3d2b1f",
  };

  const displayType = format ? `${type}:${format}` : type;
  const color = colors[type ?? "string"] ?? "#4a8c4a";

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium"
      style={{
        background: `${color}20`,
        color: color,
        border: `1px solid ${color}40`,
      }}
    >
      {displayType}
    </span>
  );
}

function ConstraintPill({ label, value }: { label: string; value: string | number }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs"
      style={{
        background: "rgba(74,140,74,0.08)",
        color: "var(--text-muted)",
        border: "1px solid rgba(74,140,74,0.15)",
      }}
    >
      <span style={{ color: "var(--text-muted)", opacity: 0.7 }}>{label}:</span>
      <span className="font-mono" style={{ color: "var(--text-secondary)" }}>{value}</span>
    </span>
  );
}

export default function FieldCard({
  name,
  def,
  isNew = false,
  isModified = false,
  isRequired = false,
  onRefClick,
  depth = 0,
}: FieldCardProps) {
  const [expanded, setExpanded] = useState(false);

  const hasChildren =
    def.type === "object" && def.properties && Object.keys(def.properties).length > 0;
  const isArrayWithItems = def.type === "array" && def.items;
  const isRef = def.type === "ref" && def.ref;
  const isUnion = def.type === "union" && def.refs;

  const borderColor = isNew
    ? "rgba(34,197,94,0.4)"
    : isModified
    ? "rgba(245,158,11,0.4)"
    : "var(--border-subtle)";

  const bgColor = isNew
    ? "rgba(34,197,94,0.04)"
    : isModified
    ? "rgba(245,158,11,0.04)"
    : "rgba(26,58,26,0.3)";

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        border: `1px solid ${borderColor}`,
        background: bgColor,
        marginLeft: depth > 0 ? `${depth * 16}px` : 0,
      }}
    >
      {/* Header */}
      <div
        className="flex items-start gap-3 p-4 cursor-pointer select-none"
        onClick={() => (hasChildren || isArrayWithItems) && setExpanded(!expanded)}
      >
        {/* Expand toggle */}
        {(hasChildren || isArrayWithItems) && (
          <button
            className="mt-0.5 w-4 h-4 flex items-center justify-center flex-shrink-0 rounded transition-transform duration-200"
            style={{
              color: "var(--text-muted)",
              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
            }}
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        {!hasChildren && !isArrayWithItems && (
          <div className="w-4 flex-shrink-0" />
        )}

        {/* Field name */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className="font-mono text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {name}
            </span>

            {/* Type badge */}
            <TypeBadge type={def.type} format={def.format} />

            {/* Status badges */}
            {isNew && (
              <span
                className="px-2 py-0.5 rounded text-xs font-bold tracking-wide"
                style={{
                  background: "rgba(34,197,94,0.15)",
                  color: "#22c55e",
                  border: "1px solid rgba(34,197,94,0.3)",
                }}
              >
                NEW
              </span>
            )}
            {isModified && (
              <span
                className="px-2 py-0.5 rounded text-xs font-bold tracking-wide"
                style={{
                  background: "rgba(245,158,11,0.15)",
                  color: "#f59e0b",
                  border: "1px solid rgba(245,158,11,0.3)",
                }}
              >
                MODIFIED
              </span>
            )}
            {isRequired && (
              <span
                className="px-2 py-0.5 rounded text-xs"
                style={{
                  background: "rgba(201,168,76,0.1)",
                  color: "var(--gold)",
                  border: "1px solid rgba(201,168,76,0.2)",
                }}
              >
                required
              </span>
            )}
          </div>

          {/* Description */}
          {def.description && (
            <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--text-secondary)" }}>
              {def.description}
            </p>
          )}

          {/* Constraints */}
          <div className="flex flex-wrap gap-1.5">
            {def.maxGraphemes !== undefined && (
              <ConstraintPill label="maxGraphemes" value={def.maxGraphemes} />
            )}
            {def.minLength !== undefined && (
              <ConstraintPill label="minLength" value={def.minLength} />
            )}
            {def.maxLength !== undefined && (
              <ConstraintPill label="maxLength" value={def.maxLength} />
            )}
            {def.minimum !== undefined && (
              <ConstraintPill label="min" value={def.minimum} />
            )}
            {def.maximum !== undefined && (
              <ConstraintPill label="max" value={def.maximum} />
            )}
            {def.maxSize !== undefined && (
              <ConstraintPill label="maxSize" value={`${(def.maxSize / 1048576).toFixed(0)}MB`} />
            )}

            {/* Enum values */}
            {def.enum && def.enum.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1 w-full">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>enum:</span>
                {def.enum.map((v) => (
                  <span
                    key={v}
                    className="px-1.5 py-0.5 rounded text-xs font-mono"
                    style={{
                      background: "rgba(74,140,74,0.1)",
                      color: "var(--text-secondary)",
                      border: "1px solid rgba(74,140,74,0.2)",
                    }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            )}

            {/* Known values (first 6) */}
            {def.knownValues && def.knownValues.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1 w-full">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>knownValues:</span>
                {def.knownValues.slice(0, 6).map((v) => (
                  <span
                    key={v}
                    className="px-1.5 py-0.5 rounded text-xs font-mono"
                    style={{
                      background: "rgba(74,140,74,0.08)",
                      color: "var(--text-muted)",
                      border: "1px solid rgba(74,140,74,0.15)",
                    }}
                  >
                    {v}
                  </span>
                ))}
                {def.knownValues.length > 6 && (
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    +{def.knownValues.length - 6} more
                  </span>
                )}
              </div>
            )}

            {/* Ref link */}
            {isRef && def.ref && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRefClick?.(def.ref!);
                }}
                className="text-xs font-mono hover:underline transition-colors"
                style={{ color: "#4a8c4a" }}
              >
                → {def.ref}
              </button>
            )}

            {/* Union refs */}
            {isUnion && def.refs && (
              <div className="flex flex-wrap gap-1 mt-1 w-full">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>union:</span>
                {def.refs.map((r) => (
                  <button
                    key={r}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRefClick?.(r);
                    }}
                    className="text-xs font-mono hover:underline transition-colors"
                    style={{ color: "#4a8c4a" }}
                  >
                    {r.split("#")[1] ?? r.split(".").pop()}
                  </button>
                ))}
              </div>
            )}

            {/* Array items type */}
            {isArrayWithItems && def.items && !hasChildren && (
              <ConstraintPill
                label="items"
                value={def.items.ref ? def.items.ref.split("#")[1] ?? def.items.ref : def.items.type ?? "unknown"}
              />
            )}

            {/* Blob accept types */}
            {def.accept && def.accept.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1 w-full">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>accepts:</span>
                {def.accept.slice(0, 4).map((a) => (
                  <span key={a} className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                    {a.split("/")[1]}
                  </span>
                ))}
                {def.accept.length > 4 && (
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    +{def.accept.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded children (for objects) */}
      {expanded && hasChildren && def.properties && (
        <div
          className="border-t px-4 pb-4 pt-3 flex flex-col gap-3"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          {Object.entries(def.properties).map(([childName, childDef]) => (
            <FieldCard
              key={childName}
              name={childName}
              def={childDef}
              isRequired={def.required?.includes(childName)}
              onRefClick={onRefClick}
              depth={0}
            />
          ))}
        </div>
      )}

      {/* Expanded array items */}
      {expanded && isArrayWithItems && def.items && def.items.properties && (
        <div
          className="border-t px-4 pb-4 pt-3 flex flex-col gap-3"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Array item properties:</p>
          {Object.entries(def.items.properties).map(([childName, childDef]) => (
            <FieldCard
              key={childName}
              name={childName}
              def={childDef}
              isRequired={def.items?.required?.includes(childName)}
              onRefClick={onRefClick}
              depth={0}
            />
          ))}
        </div>
      )}
    </div>
  );
}
