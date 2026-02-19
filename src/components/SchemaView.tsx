"use client";

import FieldCard from "./FieldCard";

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

type SchemaObject = {
  type?: string;
  required?: string[];
  properties?: Record<string, FieldDef>;
};

type LexiconDef = {
  type?: string;
  description?: string;
  key?: string;
  record?: {
    type?: string;
    required?: string[];
    properties?: Record<string, FieldDef>;
  };
  required?: string[];
  properties?: Record<string, FieldDef>;
  // query / procedure / subscription fields
  parameters?: {
    type?: string;
    required?: string[];
    properties?: Record<string, FieldDef>;
  };
  output?: {
    encoding?: string;
    schema?: SchemaObject;
  };
  input?: {
    encoding?: string;
    schema?: SchemaObject;
  };
  message?: {
    schema?: SchemaObject;
  };
};

type SchemaViewProps = {
  lexiconData: Record<string, unknown>;
  newFields: string[];
  modifiedFields: string[];
  onRefClick?: (ref: string) => void;
};

function asLexiconDef(val: unknown): LexiconDef {
  return val as LexiconDef;
}

function asFieldDef(val: unknown): FieldDef {
  return val as FieldDef;
}

export default function SchemaView({
  lexiconData,
  newFields,
  modifiedFields,
  onRefClick,
}: SchemaViewProps) {
  const rawDefs = lexiconData["defs"];
  const defs: Record<string, LexiconDef> =
    rawDefs && typeof rawDefs === "object" && !Array.isArray(rawDefs)
      ? Object.fromEntries(
          Object.entries(rawDefs as Record<string, unknown>).map(([k, v]) => [k, asLexiconDef(v)])
        )
      : {};

  const isRpcType = (type?: string) =>
    type === "query" || type === "procedure" || type === "subscription";

  function renderPropertySection(
    label: string,
    rawProps: Record<string, FieldDef> | undefined,
    required: string[] | undefined
  ) {
    const properties: Record<string, FieldDef> | undefined = rawProps
      ? Object.fromEntries(
          Object.entries(rawProps).map(([k, v]) => [k, asFieldDef(v)])
        )
      : undefined;

    return (
      <div className="mb-4">
        <div
          className="text-xs font-semibold tracking-wide uppercase mb-3 pl-1"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </div>
        {properties && Object.keys(properties).length > 0 ? (
          <div className="flex flex-col gap-3">
            {Object.entries(properties).map(([fieldName, fieldDef]) => (
              <FieldCard
                key={fieldName}
                name={fieldName}
                def={fieldDef}
                isNew={newFields.includes(fieldName)}
                isModified={modifiedFields.includes(fieldName)}
                isRequired={required?.includes(fieldName)}
                onRefClick={onRefClick}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm italic pl-1" style={{ color: "var(--text-muted)" }}>
            No properties defined
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {Object.entries(defs).map(([defName, def]) => {
        const isRecord = def.type === "record";
        const isRpc = isRpcType(def.type);

        // Determine properties + required for record / plain-object defs
        const isMainRecord = defName === "main" && isRecord;
        const rawProperties = isMainRecord
          ? def.record?.properties
          : def.properties;
        const properties: Record<string, FieldDef> | undefined =
          rawProperties
            ? Object.fromEntries(
                Object.entries(rawProperties).map(([k, v]) => [k, asFieldDef(v)])
              )
            : undefined;
        const required = isMainRecord ? def.record?.required : def.required;

        return (
          <div key={defName}>
            {/* Def header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
                style={{
                  background:
                    defName === "main"
                      ? "rgba(74,140,74,0.2)"
                      : "rgba(201,168,76,0.1)",
                  color: defName === "main" ? "#4a8c4a" : "var(--gold)",
                  border: `1px solid ${
                    defName === "main"
                      ? "rgba(74,140,74,0.3)"
                      : "rgba(201,168,76,0.2)"
                  }`,
                }}
              >
                #{defName}
              </div>
              {def.type && (
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {def.type}
                  {isMainRecord && def.key ? ` · key: ${def.key}` : ""}
                </span>
              )}
            </div>

            {/* Description */}
            {def.description && (
              <p
                className="text-sm leading-relaxed mb-4 pl-1"
                style={{ color: "var(--text-secondary)" }}
              >
                {def.description}
              </p>
            )}

            {/* RPC types: query / procedure / subscription */}
            {isRpc ? (
              <div className="flex flex-col gap-2">
                {/* Parameters (query & procedure) */}
                {(def.type === "query" || def.type === "procedure") &&
                  renderPropertySection(
                    "Parameters",
                    def.parameters?.properties as Record<string, FieldDef> | undefined,
                    def.parameters?.required
                  )}

                {/* Input body (procedure) */}
                {def.type === "procedure" &&
                  def.input?.schema?.properties &&
                  renderPropertySection(
                    "Input",
                    def.input.schema.properties as Record<string, FieldDef>,
                    def.input.schema.required
                  )}

                {/* Output (query & procedure) */}
                {(def.type === "query" || def.type === "procedure") &&
                  def.output?.schema?.properties &&
                  renderPropertySection(
                    "Output",
                    def.output.schema.properties as Record<string, FieldDef>,
                    def.output.schema.required
                  )}

                {/* Message (subscription) */}
                {def.type === "subscription" &&
                  def.message?.schema?.properties &&
                  renderPropertySection(
                    "Message",
                    def.message.schema.properties as Record<string, FieldDef>,
                    def.message.schema.required
                  )}
              </div>
            ) : (
              /* Record / object defs */
              <>
                {properties && Object.keys(properties).length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {Object.entries(properties).map(([fieldName, fieldDef]) => (
                      <FieldCard
                        key={fieldName}
                        name={fieldName}
                        def={fieldDef}
                        isNew={newFields.includes(fieldName)}
                        isModified={modifiedFields.includes(fieldName)}
                        isRequired={required?.includes(fieldName)}
                        onRefClick={onRefClick}
                      />
                    ))}
                  </div>
                ) : (
                  <p
                    className="text-sm italic"
                    style={{ color: "var(--text-muted)" }}
                  >
                    No properties defined
                  </p>
                )}
              </>
            )}

            {/* Separator between defs */}
            {Object.keys(defs).length > 1 && (
              <div
                className="mt-8 border-t"
                style={{ borderColor: "var(--border-subtle)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
