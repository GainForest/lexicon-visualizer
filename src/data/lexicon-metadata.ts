export type LexiconCategory =
  | "Organization"
  | "Observations"
  | "Recordings"
  | "Darwin Core"
  | "Evaluator"
  | "Common"
  | "Predictions";

export type LexiconMeta = {
  id: string;
  shortName: string;
  category: LexiconCategory;
  path: string; // import path key
  description: string;
  newFields: string[];
  modifiedFields: string[];
  isNew: boolean; // entire lexicon is new
  hasBeforeAfter: boolean;
  changesSummary: string;
  deprecated?: boolean; // lexicon is deprecated
  deprecatedReplacement?: string; // NSID of the replacement lexicon
};

export const LEXICON_METADATA: LexiconMeta[] = [
  // Organization
  {
    id: "app.gainforest.organization.info",
    shortName: "info",
    category: "Organization",
    path: "organization/info",
    description: "Organization or project declaration with identity, contact, and data governance fields",
    newFields: ["createdAt", "ecosystemTypes", "focusSpeciesGroups", "dataLicense", "dataDownloadUrl", "dataDownloadInfo", "fundingSourcesDescription"],
    modifiedFields: ["shortDescription", "longDescription", "visibility", "email"],
    isNew: false,
    hasBeforeAfter: true,
    changesSummary: "Upgraded shortDescription/longDescription to richtext refs, added ecosystem & species focus arrays, data governance fields, and fixed email format.",
  },
  {
    id: "app.gainforest.organization.site",
    shortName: "site",
    category: "Organization",
    path: "organization/site",
    description: "Conservation site with full environmental context, biome classification, and protection status",
    newFields: ["country", "countryCode", "stateProvince", "locality", "minimumElevationInMeters", "maximumElevationInMeters", "biome", "ecosystemType", "protectionStatus", "iucnProtectedAreaCategory", "wdpaId", "averageAnnualRainfallMm", "averageTemperatureCelsius", "climatezone", "monitoringStartDate", "description", "boundary", "siteRemarks"],
    modifiedFields: ["name", "lat", "lon", "area"],
    isNew: false,
    hasBeforeAfter: true,
    changesSummary: "Added 17 new fields covering location hierarchy, biome, protection status, climate data, and monitoring metadata.",
  },
  {
    id: "app.gainforest.organization.member",
    shortName: "member",
    category: "Organization",
    path: "organization/member",
    description: "Team member profile with expertise, languages, and blockchain wallet addresses",
    newFields: ["firstName", "lastName", "bio", "profileImage", "email", "orcid", "did", "expertise", "languages", "displayOrder", "isPublic", "joinedAt", "walletAddresses"],
    modifiedFields: [],
    isNew: false,
    hasBeforeAfter: false,
    changesSummary: "Enriched with personal details, ORCID, ATProto DID, expertise arrays, and multi-chain wallet addresses for direct funding.",
  },
  {
    id: "app.gainforest.organization.donation",
    shortName: "donation",
    category: "Organization",
    path: "organization/donation",
    description: "Financial transaction record for transparency with crypto and fiat support",
    newFields: ["donorName", "donorDid", "recipientMemberRef", "transactionType", "paymentMethod", "transactionHash", "blockchainNetwork", "purpose", "isAnonymous", "receiptUrl", "notes", "amountUsd"],
    modifiedFields: [],
    isNew: false,
    hasBeforeAfter: false,
    changesSummary: "Added full financial transparency fields including crypto transaction hashes, payment methods, anonymity flag, and USD equivalent.",
  },
  {
    id: "app.gainforest.organization.layer",
    shortName: "layer",
    category: "Organization",
    path: "organization/layer",
    description: "Map layer declaration with legend, color scales, tile configuration, and data provenance",
    newFields: ["category", "displayOrder", "isDefault", "opacity", "thumbnail", "legend", "colorScale", "unit", "minValue", "maxValue", "tilePattern", "tileMinZoom", "tileMaxZoom", "bounds", "dataSource", "dataDate", "propertyKey", "siteRef"],
    modifiedFields: [],
    isNew: false,
    hasBeforeAfter: false,
    changesSummary: "Added 18 new fields for full map layer configuration including legends, color scales, tile settings, and data attribution.",
  },
  {
    id: "app.gainforest.organization.defaultSite",
    shortName: "defaultSite",
    category: "Organization",
    path: "organization/defaultSite",
    description: "Pointer to the default site for an organization",
    newFields: [],
    modifiedFields: [],
    isNew: false,
    hasBeforeAfter: false,
    changesSummary: "Minimal record — no changes needed.",
  },
  {
    id: "app.gainforest.organization.getIndexedOrganizations",
    shortName: "getIndexedOrganizations",
    category: "Organization",
    path: "organization/getIndexedOrganizations",
    description: "Query to get all organizations to view initially on map",
    newFields: [],
    modifiedFields: [],
    isNew: true,
    hasBeforeAfter: false,
    changesSummary: "New query lexicon — returns a list of indexed organizations for the initial map view.",
  },
  // Observations
  {
    id: "app.gainforest.organization.observations.measuredTreesCluster",
    shortName: "measuredTreesCluster",
    category: "Observations",
    path: "organization/observations/measuredTreesCluster",
    description: "Forest plot with tree measurement statistics, species counts, and methodology",
    newFields: ["name", "description", "siteRef", "decimalLatitude", "decimalLongitude", "areaSqMeters", "totalTreeCount", "speciesCount", "averageHeightMeters", "averageDbhCm", "dominantSpecies", "measurementDateRange", "measuredBy", "measurementProtocol", "dataSource", "license"],
    modifiedFields: [],
    isNew: false,
    hasBeforeAfter: false,
    changesSummary: "Added 16 fields for forest inventory statistics, measurement provenance, and data licensing.",
  },
  {
    id: "app.gainforest.organization.observations.dendogram",
    shortName: "dendogram",
    category: "Observations",
    path: "organization/observations/dendogram",
    description: "Phylogenetic tree visualization with analysis metadata and taxonomic context",
    newFields: ["name", "description", "siteRef", "analysisDate", "analysisMethod", "dataSource", "taxonCount", "taxonGroup", "rootTaxon", "treeType", "thumbnail"],
    modifiedFields: [],
    isNew: false,
    hasBeforeAfter: false,
    changesSummary: "Added 11 fields for phylogenetic analysis provenance, taxonomic context, and visual preview.",
  },
  {
    id: "app.gainforest.organization.observations.flora",
    shortName: "flora",
    category: "Observations",
    path: "organization/observations/flora",
    description: "DEPRECATED: Use app.gainforest.dwc.occurrence instead. A declaration of a flora observation for an organization.",
    newFields: [],
    modifiedFields: [],
    isNew: false,
    hasBeforeAfter: false,
    changesSummary: "No new fields — this lexicon is deprecated. Migrate to app.gainforest.dwc.occurrence.",
    deprecated: true,
    deprecatedReplacement: "app.gainforest.dwc.occurrence",
  },
  {
    id: "app.gainforest.organization.observations.fauna",
    shortName: "fauna",
    category: "Observations",
    path: "organization/observations/fauna",
    description: "DEPRECATED: Use app.gainforest.dwc.occurrence instead. A declaration of a fauna observation for an organization.",
    newFields: [],
    modifiedFields: [],
    isNew: false,
    hasBeforeAfter: false,
    changesSummary: "No new fields — this lexicon is deprecated. Migrate to app.gainforest.dwc.occurrence.",
    deprecated: true,
    deprecatedReplacement: "app.gainforest.dwc.occurrence",
  },
  // Recordings
  {
    id: "app.gainforest.organization.recordings.audio",
    shortName: "audio",
    category: "Recordings",
    path: "organization/recordings/audio",
    description: "Bioacoustic recording with rich device metadata, environmental conditions, and frequency data",
    newFields: ["spectrogram", "thumbnail", "license", "recordedBy", "tags"],
    modifiedFields: ["metadata"],
    isNew: false,
    hasBeforeAfter: true,
    changesSummary: "Added spectrogram, thumbnail, license, and tags. Massively enriched metadata object with device info, GPS coordinates, frequency range, and environmental conditions.",
  },
  // Darwin Core
  {
    id: "app.gainforest.dwc.occurrence",
    shortName: "occurrence",
    category: "Darwin Core",
    path: "dwc/occurrence",
    description: "Full Simple Darwin Core occurrence record with media evidence, conservation status, and ATProto linkage",
    newFields: ["eventRef", "imageEvidence", "audioEvidence", "videoEvidence", "spectrogramEvidence", "conservationStatus", "plantTraits", "projectRef", "siteRef", "monitoringProgramme", "datasetRef", "thumbnailUrl", "speciesImageUrl"],
    modifiedFields: [],
    isNew: false,
    hasBeforeAfter: false,
    changesSummary: "Added ATProto star-schema linkage (eventRef, projectRef, siteRef), multi-modal evidence blobs, conservation status, and plant trait refs.",
  },
  {
    id: "app.gainforest.dwc.event",
    shortName: "event",
    category: "Darwin Core",
    path: "dwc/event",
    description: "Darwin Core Event record enabling star-schema pattern for shared sampling context",
    newFields: [],
    modifiedFields: [],
    isNew: true,
    hasBeforeAfter: false,
    changesSummary: "Brand new lexicon. Enables multiple occurrences to share location, protocol, and effort metadata via eventRef.",
  },
  {
    id: "app.gainforest.dwc.defs",
    shortName: "defs",
    category: "Darwin Core",
    path: "dwc/defs",
    description: "Shared Darwin Core type definitions: geolocation, taxon identification, plant traits, abundance estimates",
    newFields: [],
    modifiedFields: [],
    isNew: true,
    hasBeforeAfter: false,
    changesSummary: "Brand new lexicon. Provides reusable type definitions for geolocation, taxon identification, plant traits, and abundance estimates.",
  },
  {
    id: "app.gainforest.dwc.measurement",
    shortName: "measurement",
    category: "Darwin Core",
    path: "dwc/measurement",
    description: "Darwin Core MeasurementOrFact extension enabling multiple measurements per occurrence",
    newFields: [],
    modifiedFields: [],
    isNew: true,
    hasBeforeAfter: false,
    changesSummary: "Brand new lexicon. Solves the Simple DwC one-measurement-per-record limitation by linking multiple measurements to a single occurrence.",
  },
  // Evaluator
  {
    id: "app.gainforest.evaluator.defs",
    shortName: "defs",
    category: "Evaluator",
    path: "evaluator/defs",
    description: "Evaluator type definitions: species ID, data quality, bioacoustics, deforestation, carbon estimation",
    newFields: [],
    modifiedFields: [],
    isNew: true,
    hasBeforeAfter: false,
    changesSummary: "Brand new lexicon. Defines typed result schemas for AI evaluator services including species ID, bioacoustics detection, deforestation, and carbon estimation.",
  },
  {
    id: "app.gainforest.evaluator.evaluation",
    shortName: "evaluation",
    category: "Evaluator",
    path: "evaluator/evaluation",
    description: "Evaluation record with typed union results, confidence scores, and supersession support",
    newFields: [],
    modifiedFields: [],
    isNew: true,
    hasBeforeAfter: false,
    changesSummary: "Brand new lexicon. Enables decentralized AI evaluators to publish typed, versioned evaluation results against any ATProto record.",
  },
  {
    id: "app.gainforest.evaluator.service",
    shortName: "service",
    category: "Evaluator",
    path: "evaluator/service",
    description: "Evaluator service declaration with supported evaluation types and access model",
    newFields: [],
    modifiedFields: [],
    isNew: true,
    hasBeforeAfter: false,
    changesSummary: "Brand new lexicon. Analogous to app.bsky.labeler.service — registers an account as an evaluator with declared capabilities.",
  },
  {
    id: "app.gainforest.evaluator.subscription",
    shortName: "subscription",
    category: "Evaluator",
    path: "evaluator/subscription",
    description: "User subscription to an evaluator service for automatic evaluation of their records",
    newFields: [],
    modifiedFields: [],
    isNew: true,
    hasBeforeAfter: false,
    changesSummary: "Brand new lexicon. Users opt-in to evaluator services by publishing this record — deleting it unsubscribes.",
  },
  // Predictions
  {
    id: "app.gainforest.organization.predictions.flora",
    shortName: "flora",
    category: "Predictions",
    path: "organization/predictions/flora",
    description: "DEPRECATED: Use app.gainforest.dwc.occurrence with basisOfRecord='MachineObservation' instead. A declaration of a flora prediction for an organization.",
    newFields: [],
    modifiedFields: [],
    isNew: false,
    hasBeforeAfter: false,
    changesSummary: "No new fields — this lexicon is deprecated. Migrate to app.gainforest.dwc.occurrence with basisOfRecord='MachineObservation'.",
    deprecated: true,
    deprecatedReplacement: "app.gainforest.dwc.occurrence",
  },
  {
    id: "app.gainforest.organization.predictions.fauna",
    shortName: "fauna",
    category: "Predictions",
    path: "organization/predictions/fauna",
    description: "DEPRECATED: Use app.gainforest.dwc.occurrence with basisOfRecord='MachineObservation' instead. A declaration of a fauna prediction for an organization.",
    newFields: [],
    modifiedFields: [],
    isNew: false,
    hasBeforeAfter: false,
    changesSummary: "No new fields — this lexicon is deprecated. Migrate to app.gainforest.dwc.occurrence with basisOfRecord='MachineObservation'.",
    deprecated: true,
    deprecatedReplacement: "app.gainforest.dwc.occurrence",
  },
  // Common
  {
    id: "app.gainforest.common.defs",
    shortName: "defs",
    category: "Common",
    path: "common/defs",
    description: "Shared media types, conservation status, species profiles, and external reference definitions",
    newFields: ["video", "spectrogram", "document", "dataFile", "gpsTrack", "geospatial", "sensorData", "geneticData", "conservationStatus", "speciesProfile", "coordinatePair", "dateRange", "externalReference"],
    modifiedFields: ["image", "audio"],
    isNew: false,
    hasBeforeAfter: false,
    changesSummary: "Added 13 new type definitions covering all media types needed for biodiversity monitoring, plus conservation status, species profiles, and external system references.",
  },
];

export const CATEGORIES: LexiconCategory[] = [
  "Organization",
  "Observations",
  "Recordings",
  "Darwin Core",
  "Evaluator",
  "Common",
  "Predictions",
];

export function getLexiconsByCategory(category: LexiconCategory): LexiconMeta[] {
  return LEXICON_METADATA.filter((l) => l.category === category);
}

export function getLexiconById(id: string): LexiconMeta | undefined {
  return LEXICON_METADATA.find((l) => l.id === id);
}
